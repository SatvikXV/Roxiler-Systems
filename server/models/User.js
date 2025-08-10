const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [20, 60] 
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 16],
                is: /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,16}$/
            }
        },
        role: {
            type: DataTypes.ENUM('normal', 'admin', 'store_owner'),
            defaultValue: 'normal'
        }
    });

    User.beforeCreate(async (user, options) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    });

    User.prototype.validPassword = async function(password) {
        return await bcrypt.compare(password, this.password);
    };

    User.associate = (models) => {
        User.hasMany(models.Rating, {
            foreignKey: 'userId',
            as: 'ratings'
        });
    };

    return User;
};