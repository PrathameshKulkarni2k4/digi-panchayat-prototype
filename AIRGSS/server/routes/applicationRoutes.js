const express = require('express');
const router = express.Router();
const {
    applyForScheme,
    getMyApplications,
    getAllApplications,
    updateApplicationStatus,
} = require('../controllers/applicationController');
const { protect, admin, official } = require('../middleware/authMiddleware');

router.route('/').post(protect, applyForScheme).get(protect, official, getAllApplications);
router.route('/my').get(protect, getMyApplications);
router.route('/:id/status').put(protect, official, updateApplicationStatus);

module.exports = router;
