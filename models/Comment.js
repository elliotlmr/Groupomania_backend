const { sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define('comment', {
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        text: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    });

    return Comment;
};