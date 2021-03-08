const db = require("./index");

module.exports = (sequelize, Sequelize) => {
    const usersLiked = sequelize.define('usersLiked', {
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: db.users,
                key: 'id'
            }
        },
        post_id: {
            type: Sequelize.INTEGER,
            references: {
                model: db.posts,
                key: 'id'
            }
        }
    });

    return usersLiked;
};