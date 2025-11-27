const express = require('express');
const router = express.Router();
const {
    createScheme,
    getSchemes,
    getSchemeById,
    updateScheme,
    deleteScheme,
} = require('../controllers/schemeController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(protect, admin, createScheme).get(getSchemes);
router.route('/:id')
    .get(getSchemeById)
    .put(protect, admin, updateScheme)
    .delete(protect, admin, deleteScheme);

module.exports = router;
