const { User, Store, Rating } = require('../models');

exports.addStore = async (req, res) => {
    try {
        const { name, address, ownerId } = req.body;
        const newStore = await Store.create({ name, address, ownerId });
        res.status(201).json(newStore);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getStores = async (req, res) => {
    try {
        const stores = await Store.findAll();
        res.status(200).json(stores);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.addUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const newUser = await User.create({ name, email, password, role });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getDashboardData = async (req, res) => {
    try {
        const userCount = await User.count();
        const storeCount = await Store.count();
        const ratingCount = await Rating.count();
        res.status(200).json({ userCount, storeCount, ratingCount });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};