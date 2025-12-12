const express = require('express');
const router = express.Router();
const {
    createScheme,
    getSchemes,
    getSchemeById,
    updateScheme,
    deleteScheme,
} = require('../controllers/schemeController');
const { protect, admin, official } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/').post(protect, official, upload.single('document'), createScheme).get(getSchemes);
router.route('/:id')
    .get(getSchemeById)
    .put(protect, admin, updateScheme)
    .delete(protect, admin, deleteScheme);

module.exports = router;
