const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comments");
const auth = require("../middlewares/auth");

router.get("/:id/comments/", auth, commentCtrl.getAllComments); //Affiche tous les commentaires d'un post.

router.post("/:id/comments/", auth, commentCtrl.createComment); //Créer un commentaire sur un post spécifique.

router.put("/:id/comments/:commentId", auth, commentCtrl.modifyComment); //Modifier un commentaire déjà existant (par son créateur).

router.delete("/:id/comments/:commentId", auth, commentCtrl.deleteComment); //Supprimer un commentaire (par son créateur).

module.exports = router;
