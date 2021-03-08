module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        firstname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        company_role: {
            type: Sequelize.STRING,
            allowNull: false
        },
        user_role: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'guest'
        }
    }, {timestamps: false});
    
    return User;
};