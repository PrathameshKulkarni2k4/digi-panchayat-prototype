const mongoose = require('mongoose');

const grievanceSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Resolved'],
        default: 'Pending',
    },
    category: {
        type: String,
        required: true,
    },
    attachments: [
        {
            type: String, // URL to the file
        },
    ],
}, {
    timestamps: true,
});

const Grievance = mongoose.model('Grievance', grievanceSchema);

module.exports = Grievance;
