module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    text: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  });

  return Comment;
};
