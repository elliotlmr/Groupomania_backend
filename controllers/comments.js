const { post } = require('../App');
const db = require('../models');

exports.getAllComments = (req, res, next) => {
    db.comments.findAll({ 
        include: [
            {
                model: db.posts,
                as: 'post',
                attributes: ['id'],
            }
        ]
     })
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({ error }));
};

exports.createComment = (req, res, next) => {
    db.comments.create({
        user_id: req.user.id,
        text: req.body.comment_text,
        postId: req.params.id
    })
    .then(() => res.status(201).json({ message: 'Commentaire créé !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.modifyComment = (req, res, next) => {
    db.comments.findOne({ where: {id: req.params.commentId} })
    .then(comment => {
        comment.update({
            text: req.body.comment_text,
        });
        comment.save();
    })
    .then(() => res.status(200).json({ message: 'Commentaire modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteComment = (req, res, next) => {
    db.comments.findOne({ where: {id: req.params.commentId} })
    .then(comment => {
        comment.destroy();
    })
    .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
    .catch(error => res.status(400).json({ error }));
};