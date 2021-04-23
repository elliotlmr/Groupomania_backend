module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      company_role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profile_picture: {
        type: Sequelize.STRING,
        defaultValue: `http://localhost:1331/medias/default_picture.jpg`,
      },
      user_role: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "guest",
      },
    },
    { timestamps: false }
  );

  return User;
};
