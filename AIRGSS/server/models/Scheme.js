const mongoose = require('mongoose');

const schemeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    eligibilityCriteria: {
        ageMin: Number,
        ageMax: Number,
        gender: String, // 'Male', 'Female', 'Any'
        incomeLimit: Number,
        occupation: String,
    },
    benefits: {
        type: String,
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
    },
    documentUrl: {
        type: String,
    },
}, {
    timestamps: true,
});

const Scheme = mongoose.model('Scheme', schemeSchema);

module.exports = Scheme;
