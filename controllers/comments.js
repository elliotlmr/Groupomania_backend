const db = require("../models");

exports.getAllComments = (req, res, next) => {
  db.comments
    .findAll({
      where: { postId: req.params.id },
      include: [
        {
          model: db.posts,
          as: "post",
          attributes: ["id"],
        },
        {
          model: db.users,
          as: "user",
          attributes: ["id", "firstname", "lastname"],
        },
      ],
    })
    .then((comments) => res.status(200).json(comments))
    .catch((error) => res.status(400).json({ error }));
};

exports.createComment = (req, res, next) => {
  db.comments
    .create({
      userId: req.user.id,
      text: req.body.comment_text,
      postId: req.params.id,
    })
    .then((comment) => res.status(201).json(comment))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyComment = (req, res, next) => {
  db.comments
    .findOne({ where: { id: req.params.commentId } })
    .then((comment) => {
      comment.update(
        {
          text: req.body.comment_text,
        },
        {
          where: { id: req.params.commentId },
        }
      );
      comment.save({ where: { id: req.params.commentId } });
      res.status(200).json(comment);
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteComment = (req, res, next) => {
  db.comments
    .findOne({ where: { id: req.params.commentId } })
    .then((comment) => {
      comment.destroy({ where: { id: req.params.commentId } });
    })
    .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};
