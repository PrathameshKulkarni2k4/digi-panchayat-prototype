const express = require('express');
const router = express.Router();
const {
    createGrievance,
    getGrievances,
    getMyGrievances,
    getGrievanceById,
    updateGrievanceStatus,
    reviewGrievance,
} = require('../controllers/grievanceController');
const { protect, admin, official } = require('../middleware/authMiddleware');

router.route('/').post(protect, createGrievance).get(protect, official, getGrievances);
router.route('/my').get(protect, getMyGrievances);
router.route('/:id').get(protect, getGrievanceById);
router.route('/:id/status').put(protect, official, updateGrievanceStatus);
router.route('/:id/review').put(protect, official, reviewGrievance);

module.exports = router;
