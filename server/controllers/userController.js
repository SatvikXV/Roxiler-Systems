const { Store, Rating } = require('../models');
const { Op } = require('sequelize');


exports.getStores = async (req, res) => {
    try {
        const { search } = req.query;
        let where = {};
        if (search) {
            where = {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${search}%` } },
                    { address: { [Op.iLike]: `%${search}%` } }
                ]
            };
        }
        const stores = await Store.findAll({ where, order: [['name', 'ASC']] });
        res.status(200).json(stores);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.addRating = async (req, res) => {
    try {
        const { storeId, rating } = req.body;
        const userId = req.user.id;
      
        let existingRating = await Rating.findOne({ where: { userId, storeId } });
        if (existingRating) {
            existingRating.rating = rating;
            await existingRating.save();
            return res.status(200).json(existingRating);
        }
        const newRating = await Rating.create({ storeId, userId, rating });
        res.status(201).json(newRating);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateRating = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating } = req.body;
        const userId = req.user.id;
        const existingRating = await Rating.findOne({ where: { id, userId } });
        if (!existingRating) {
            return res.status(404).json({ error: 'Rating not found or you are not the owner' });
        }
        existingRating.rating = rating;
        await existingRating.save();
        res.status(200).json(existingRating);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getMyRatings = async (req, res) => {
    try {
        const userId = req.user.id;
        const ratings = await Rating.findAll({ where: { userId } });
        res.status(200).json(ratings);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};