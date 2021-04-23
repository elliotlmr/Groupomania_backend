// Environment variables
const dotenv = require("dotenv");
dotenv.config();
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("gpmania", dbUser, dbPassword, {
  host: "localhost",
  dialect: "mysql",
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./User.js")(sequelize, Sequelize);
db.posts = require("./Post.js")(sequelize, Sequelize);
db.comments = require("./Comment.js")(sequelize, Sequelize);

db.users.hasMany(db.posts, { as: "posts" });
db.posts.belongsTo(db.users, { foreignKey: "userId", as: "user" });

db.users.belongsToMany(db.posts, { through: "usersLiked", as: "likedPosts" });
db.posts.belongsToMany(db.users, { through: "usersLiked", as: "likedUsers" });

db.posts.hasMany(db.comments, { as: "comments" });
db.users.hasMany(db.comments, { as: "comments" });
db.comments.belongsTo(db.posts, { foreignKey: "postId", as: "post" });
db.comments.belongsTo(db.users, { foreignKey: "userId", as: "user" });

module.exports = db;
