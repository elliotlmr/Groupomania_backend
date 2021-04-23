module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    mediaUrl: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    },
    likes: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });

  return Post;
};
