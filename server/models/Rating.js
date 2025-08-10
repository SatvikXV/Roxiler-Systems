module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define('Rating', {
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        }
    });

    Rating.associate = (models) => {
        Rating.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });
        Rating.belongsTo(models.Store, {
            foreignKey: 'storeId',
            as: 'store'
        });
    };

    return Rating;
};