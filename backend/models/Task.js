const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        enum: ['field_work', 'fertilizer', 'harvest', 'irrigation', 'general'],
        default: 'general'
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Task', TaskSchema);
