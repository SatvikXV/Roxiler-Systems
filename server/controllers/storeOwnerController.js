const { Store, Rating, User, sequelize } = require('../models');

exports.getDashboard = async (req, res) => {
    try {
        const ownerId = req.user.id;
        const store = await Store.findOne({ where: { ownerId } });

        if (!store) {
            return res.status(404).json({ error: 'Store not found for this owner.' });
        }

        const ratings = await Rating.findAll({
            where: { storeId: store.id },
            include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }]
        });

        const averageRatingResult = await Rating.findOne({
            where: { storeId: store.id },
            attributes: [
                [sequelize.fn('AVG', sequelize.col('rating')), 'averageRating']
            ],
            raw: true
        });
        
        const averageRating = averageRatingResult.averageRating ? parseFloat(averageRatingResult.averageRating).toFixed(2) : 0;


        res.status(200).json({ ratings, averageRating });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
