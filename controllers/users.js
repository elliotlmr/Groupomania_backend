const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../models");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 12)
    .then((hash) => {
      db.users
        .create({
          email: req.body.email,
          password: hash,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          company_role: req.body.company_role,
        })
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error });
    });
};

exports.login = (req, res, next) => {
  db.users
    .findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user.id,
            token: jwt.sign(
              { userId: user.id, role: user.user_role },
              "RANDOM_TOKEN_FOR_GPM__NEED_TO_BE_DEFINED",
              { expiresIn: "2h" }
            ),
            author: user.firstname + " " + user.lastname,
            role: user.user_role,
            profile_picture: user.profile_picture,
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getPublicInfos = (req, res, next) => {
  db.users
    .findOne({
      where: { id: req.params.userId },
      attributes: ["firstname", "lastname", "company_role", "profile_picture"],
      include: [
        {
          model: db.posts,
          as: "posts",
          include: [
            {
              model: db.comments,
              as: "comments",
              include: [
                {
                  model: db.users,
                  as: "user",
                  attributes: ["firstname", "lastname", "id"],
                },
              ],
            },
          ],
        },
      ],
    })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(500).json(error));
};

exports.getPrivateInfos = (req, res, next) => {
  db.users
    .findOne({
      where: { id: req.user.id },
      attributes: [
        "firstname",
        "lastname",
        "company_role",
        "profile_picture",
        "email",
      ],
      include: [
        {
          model: db.posts,
          as: "posts",
          attributes: ["id"],
        },
      ],
    })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(500).json(error));
};

exports.modifyUser = (req, res, next) => {
  db.users
    .findOne({ where: { id: req.user.id } })
    .then((user) => {
      user.update(
        req.file
        ? {
          company_role: req.body.company_role,
          profile_picture: `${req.protocol}://${req.get("host")}/medias/${
            req.file.filename
          }`,
        }
        : {
          company_role: req.body.company_role,
        },
        {
          where: { id: req.user.id },
        }
      );
      user.save({ where: { id: req.user.id } });
      res.status(200).json(user);
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteUser = (req, res, next) => {
  db.users
    .findOne({
      where: { id: req.user.id },
      include: [
        {
          model: db.posts,
          as: "posts",
          include: [{ model: db.comments, as: "comments" }],
        },
        {
          model: db.comments,
          as: "comments",
        },
      ],
    })
    .then((user) => {
      bcrypt.compare(req.body.password, user.password).then((valid) => {
        if (valid) {
          user.destroy({
            where: { id: req.user.id },
            include: [
              {
                model: db.posts,
                as: "posts",
                include: [{ model: db.comments, as: "comments" }],
              },
              {
                model: db.comments,
                as: "comments",
              },
            ],
          });
          db.posts.destroy({ where: {userId: req.user.id }});
          db.comments.destroy({ where: {userId: req.user.id }});
          res.status(200).json({ message: "Post supprimé !" });
        } else {
          return res.status(401).json({ error: "Mot de passe incorrect !" });
        }
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
