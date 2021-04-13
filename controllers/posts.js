const db = require("../models");
const fs = require("fs");
const { posts } = require("../models");

exports.getAllPosts = (req, res, next) => {
  db.posts
    .findAll({
      include: [
        {
          model: db.users,
          as: "user",
          attributes: [
            "id",
            "firstname",
            "lastname",
            "profile_picture",
            "company_role",
          ],
        },
        {
          model: db.users,
          as: "likedUsers",
          attributes: ["id"],
        },
        {
          model: db.comments,
          as: "comments",
          attributes: ["id", "userId", "text", "postId"],
          include: [{ model: db.users, as: "user" }],
        },
      ],
      order: [["createdAt", "DESC"]],
    })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

exports.getOnePost = (req, res, next) => {
  db.posts
    .findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.users,
          as: "user",
          attributes: ["id"],
        },
        {
          model: db.comments,
          as: "comments",
          attributes: ["id", "userId", "text"],
          include: [{ model: db.users, as: "user" }],
        },
      ],
    })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};

exports.getYourLastPost = (req, res, next) => {
  console.log("test", req.user.id);
  db.posts
    .findAll({
      where: {
        userId: req.user.id,
      },
      include: [
        {
          model: db.users,
          as: "user",
          attributes: [
            "id",
            "firstname",
            "lastname",
            "profile_picture",
            "company_role",
          ],
        },
        {
          model: db.users,
          as: "likedUsers",
          attributes: ["id"],
        },
        {
          model: db.comments,
          as: "comments",
          attributes: ["id", "userId", "text", "postId"],
          include: [{ model: db.users, as: "user" }],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 1,
    })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};

exports.getMostLikedPost = (req, res, next) => {
  db.posts
    .findAll({
      include: [
        {
          model: db.users,
          as: "user",
          attributes: [
            "id",
            "firstname",
            "lastname",
            "profile_picture",
            "company_role",
          ],
        },
        {
          model: db.users,
          as: "likedUsers",
          attributes: ["id"],
        },
        {
          model: db.comments,
          as: "comments",
          attributes: ["id", "userId", "text", "postId"],
          include: [{ model: db.users, as: "user" }],
        },
      ],
      order: [["likes", "DESC"]],
      limit: 1,
    })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
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
  db.posts
    .create(
      req.file
        ? {
            userId: req.user.id,
            description: req.body.description,
            mediaUrl: `${req.protocol}://${req.get("host")}/medias/${
              req.file.filename
            }`,
          }
        : {
            userId: req.user.id,
            description: req.body.description,
          }
    )
    .then((post) => {
      //res.status(201).json(post);
      db.posts
        .findOne({
          where: { id: post.id },
          include: [
            {
              model: db.users,
              as: "user",
            },
            {
              model: db.users,
              as: "likedUsers",
              attributes: ["id"],
            },
            {
              model: db.comments,
              as: "comments",
              attributes: ["id", "userId", "text", "postId"],
              include: [{ model: db.users, as: "user" }],
            },
          ],
        })
        .then(() => res.status(201).json("Post créé !"));
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
  db.posts
    .findOne({
      where: { id: req.params.id },
    })
    .then((post) => {
      post.update(
        {
          description: req.body.description,
        },
        {
          where: { id: req.params.id },
        }
      );
      post.save({ where: { id: req.params.id } });
      res.status(200).json(post);
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
  db.posts
    .findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.comments,
          as: "comments",
          attributes: ["id", "userId", "text"],
        },
      ],
    })
    .then((post) => {
      if (post.mediaUrl == null) {
        post
          .destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: "Post supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        const filename = post.mediaUrl.split("/medias/")[1];
        fs.unlink(`medias/${filename}`, () => {
          db.posts
            .destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: "Post supprimé !" }))
            .catch((error) => res.status(400).json({ error }));
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.updateLikes = (req, res, next) => {
  db.posts
    .findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.users,
          as: "user",
          attributes: ["id"],
        },
        {
          model: db.users,
          as: "likedUsers",
          attributes: ["id"],
        },
      ],
    })
    .then((post) => {
      if (req.body.likes == 1) {
        post.update(
          {
            likes: (post.likes += 1),
            likedUsers: [{id: req.user.id}],
          },
          {
            where: { id: req.params.id },
          },
          {include: [
            {
              model: db.users,
              as: "user",
              attributes: ["id"],
            },
            {
              model: db.users,
              as: "likedUsers",
              attributes: ["id"],
            },
          ]}
        );
        post.save({ where: { id: req.params.id } });
      }
      if (req.body.likes == 0) {
        let index = post.likedUsers.indexOf(req.user.id);
        post.update(
          {
            likes: (post.likes -= 1),
            likedUsers: post.likedUsers.splice(index, 1),
          },
          {
            where: { id: req.params.id },
          }
        );
        post.save({ where: { id: req.params.id } });
      }
      res.status(200).json(post);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};
