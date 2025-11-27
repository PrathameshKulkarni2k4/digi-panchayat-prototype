const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    scheme: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Scheme',
    },
    status: {
        type: String,
        enum: ['Applied', 'Approved', 'Rejected'],
        default: 'Applied',
    },
    submittedData: {
        type: Map,
        of: String,
    },
}, {
    timestamps: true,
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
