const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/posts");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");

router.get("/", auth, postCtrl.getAllPosts); //Affiche tous les posts.

router.get("/last", auth, postCtrl.getYourLastPost); //Affiche le dernier post de l'utilisateur.

router.get("/mostLiked", auth, postCtrl.getMostLikedPost); //Affiche le post le plus 'liked'.

router.get("/:id", auth, postCtrl.getOnePost); //Affiche un post en fonction de l'id de la req.

router.post("/", auth, multer, postCtrl.createPost); //Crée un nouveau post.

router.put("/:id", auth, multer, postCtrl.modifyPost); //Modifie un post (possible que par son créateur).

router.delete("/:id", auth, postCtrl.deletePost); //Supprimer un post (possible que par son créateur).

router.post("/:id/likes", auth, postCtrl.updateLikes); //Ajouter/retirer un like sur un post spécifique.

module.exports = router;
