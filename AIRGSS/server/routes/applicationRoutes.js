const express = require('express');
const router = express.Router();
const {
    applyForScheme,
    getMyApplications,
    getAllApplications,
    updateApplicationStatus,
} = require('../controllers/applicationController');
const { protect, admin, official } = require('../middleware/authMiddleware');

const upload = require('../middleware/uploadMiddleware');

router.route('/').post(protect, upload.array('documents'), applyForScheme).get(protect, official, getAllApplications);
router.route('/my').get(protect, getMyApplications);
router.route('/:id/status').put(protect, official, updateApplicationStatus);

module.exports = router;
