const express = require('express');
const router = express.Router();
const BuyerNeed = require('../models/BuyerNeed');

// Create a new requirement
router.post('/', async (req, res) => {
    try {
        const { buyer, cropName, quantity, unit, minPrice, maxPrice, deadline, description } = req.body;

        if (!buyer || !cropName || !quantity || !minPrice || !maxPrice || !deadline) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newNeed = new BuyerNeed({
            buyer,
            cropName,
            quantity,
            unit,
            minPrice,
            maxPrice,
            deadline,
            description,
            status: 'active'
        });

        const savedNeed = await newNeed.save();
        res.status(201).json(savedNeed);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get requirements (optionally filtered by buyerId)
router.get('/', async (req, res) => {
    try {
        const { buyerId } = req.query;
        let query = {};
        if (buyerId) {
            query.buyer = buyerId;
        }
        // Sort by newest first
        const needs = await BuyerNeed.find(query).sort({ createdAt: -1 });
        res.json(needs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete/Cancel a requirement
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await BuyerNeed.findByIdAndDelete(id);
        res.json({ message: 'Requirement deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
