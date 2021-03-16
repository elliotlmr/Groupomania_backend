const db = require('../models');
const fs = require('fs');

exports.getAllPosts = (req, res, next) => {
    db.posts.findAll({
        include: [
            {
                model: db.users,
                as: 'user',
                //attributes: ['id'],
            },
            {
                model: db.users,
                as: 'likedUsers',
                attributes: ['id'],
            },
            {
                model: db.comments,
                as: 'comments',
                attributes: ['id', 'user_id', 'text', 'postId'],
            }
        ]
    })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
    db.posts.findOne({ 
        where: {id: req.params.id},
        include: [
            {
                model: db.users,
                as: 'users',
                attributes: ['id'],
            },
            {
                model: db.comments,
                as: 'comments',
                attributes: ['id', 'user_id', 'text'],
            }
        ]
    })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
};

/*exports.getSomePosts = (req, res, next) => {
    db.posts.findAll({
        where: {
            [Op.like]: [
                {author: '%' + req.query.search + '%' }
            ]
        }
    })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
};*/

exports.createPost = (req, res, next) => {
    db.posts.create({
        userId: req.user.id,
        description: req.body.description,
        //mediaUrl: `${req.protocol}://${req.get('host')}/medias/${req.file.filename}`
    })
    .then(() => res.status(201).json({ message: 'Post créé !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
    const postObject = req.file ?
    {
        author: req.params.author,
        description: req.body.description,
        mediaUrl: `${req.protocol}://${req.get('host')}/medias/${req.file.filename}`
    } : {
        ...req.body
    };
    db.posts.update(req.body, {...postObject, where: {id: req.params.id} })
        //.then(post => post.save())
        .then(() => res.status(200).json({ message: 'Post modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
    db.posts.findOne({ 
        where: {id: req.params.id},
        include: [
            {
                model: db.comments,
                as: 'comments',
                attributes: ['id', 'user_id', 'text'],
            }
        ]
    })
        .then(post => {
            if ( post.mediaUrl == null ) {
                post.destroy()
                    .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            } else {
                const filename = post.mediaUrl.split('/medias/')[1];
                fs.unlink(`medias/${filename}`, () => {
                    db.posts.destroy({ where: {id: req.params.id} })
                        .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                        .catch(error => res.status(400).json({ error }));
                })
            };
        })
        .catch(error => res.status(500).json({ error }));
};

exports.updateLikes = (req, res, next) => {
    const like = req.body.likes;
    const userId = req.user.id;
    const postId = req.params.id;

    db.posts.findOne({ 
        where: {id: postId},
        include: [
            {
                model: db.users,
                as: 'users',
                attributes: ['id'],
            }
        ]
    })
        .then(post => {
            db.usersLiked.findAll({ where: { post_id: postId }})
                .then(verifyLike => {
                    if (like == 1 && userId != verifyLike.user_id ) {
                        post.likes += 1;
                        db.usersLiked.create({
                            user_id: userId,
                            post_id: postId
                        })
                        .catch(error => console.log(error));
                    } else {
                        post.likes -= 1;
                        db.usersLiked.destroy({
                            where: {
                                user_id: userId,
                                post_id: postId
                            }
                        })
                        .catch(error => console.log(error));
                    }
                })
            /*if (like == 1 &&  !== userId) {
                db.usersLiked.create({
                    user_id: userId,
                    post_id: postId
                })
                .catch(error => console.log(error));
                post.likes += 1;
            } else {
                post.likes -= 1;
                db.usersLiked.destroy({
                    where: {
                        user_id: userId,
                        post_id: postId
                    }
                })
                .catch(error => console.log(error));
            };*/
            post.save()
                .then(() => res.status(200).json({ message: 'Post liked/unliked !' }))
                .catch(error => console.log(error));
        })
        .catch(error => res.status(400).json({ error }));
};