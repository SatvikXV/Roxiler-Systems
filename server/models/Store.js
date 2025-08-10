module.exports = (sequelize, DataTypes) => {
    const Store = sequelize.define('Store', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 100]
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [10, 400]
            }
        },
        ownerId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    });

    Store.associate = (models) => {
        Store.hasMany(models.Rating, {
            foreignKey: 'storeId',
            as: 'ratings'
        });
        Store.belongsTo(models.User, {
            foreignKey: 'ownerId',
            as: 'owner'
        });
    };

    return Store;
};