const mongoose = require('mongoose');

const BuyerNeedSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cropName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unit: {
        type: String, // kg, tons, quintals
        default: 'kg',
        required: true
    },
    minPrice: {
        type: Number,
        required: true // Budget Low
    },
    maxPrice: {
        type: Number,
        required: true // Budget High
    },
    description: {
        type: String,
        required: false
    },
    deadline: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'fulfilled', 'cancelled', 'expired'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('BuyerNeed', BuyerNeedSchema);
