const jwt = require("jsonwebtoken");
const db = require("../models");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; //Split le mot 'Bearer' et le Token, puis récupère le 2eme element
    const decodedToken = jwt.verify(
      token,
      "RANDOM_TOKEN_FOR_GPM__NEED_TO_BE_DEFINED"
    );
    const user_id = decodedToken.userId;
    const role = decodedToken.role;
    /*if (userId && role && role === 'admin') {
            next();
        } else {*/
    if (!user_id) {
      return res.status(401).json({ error });
    } else {
      db.users
        .findOne({ where: { id: user_id } })
        .then((user) => {
          req.user = user;
          next();
        })
        .catch((error) => res.status(401).json({ error }));
    }
    //};
  } catch (error) {
    res.status(401).json({ error });
  }
};
