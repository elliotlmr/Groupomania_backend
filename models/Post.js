module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('post', {
        description: {
            type: Sequelize.STRING,
            allowNull: true
        },
        mediaUrl: {
            type: Sequelize.STRING,
            allowNull: true
        },
        likes: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {timestamps: false});

    return Post;
};