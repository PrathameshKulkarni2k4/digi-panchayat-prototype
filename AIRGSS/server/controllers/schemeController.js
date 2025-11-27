const Scheme = require('../models/Scheme');

// @desc    Create a new scheme
// @route   POST /api/schemes
// @access  Private/Admin
const createScheme = async (req, res) => {
    const { name, description, eligibilityCriteria, benefits, deadline } = req.body;

    if (!name || !description || !benefits || !deadline) {
        res.status(400).json({ message: 'Please fill in all required fields' });
        return;
    }

    const scheme = new Scheme({
        name,
        description,
        eligibilityCriteria,
        benefits,
        deadline,
    });

    const createdScheme = await scheme.save();
    res.status(201).json(createdScheme);
};

// @desc    Get all schemes
// @route   GET /api/schemes
// @access  Public
const getSchemes = async (req, res) => {
    const schemes = await Scheme.find({});
    res.json(schemes);
};

// @desc    Get scheme by ID
// @route   GET /api/schemes/:id
// @access  Public
const getSchemeById = async (req, res) => {
    const scheme = await Scheme.findById(req.params.id);

    if (scheme) {
        res.json(scheme);
    } else {
        res.status(404).json({ message: 'Scheme not found' });
    }
};

// @desc    Update a scheme
// @route   PUT /api/schemes/:id
// @access  Private/Admin
const updateScheme = async (req, res) => {
    const { name, description, eligibilityCriteria, benefits, deadline } = req.body;

    const scheme = await Scheme.findById(req.params.id);

    if (scheme) {
        scheme.name = name || scheme.name;
        scheme.description = description || scheme.description;
        scheme.eligibilityCriteria = eligibilityCriteria || scheme.eligibilityCriteria;
        scheme.benefits = benefits || scheme.benefits;
        scheme.deadline = deadline || scheme.deadline;

        const updatedScheme = await scheme.save();
        res.json(updatedScheme);
    } else {
        res.status(404).json({ message: 'Scheme not found' });
    }
};

// @desc    Delete a scheme
// @route   DELETE /api/schemes/:id
// @access  Private/Admin
const deleteScheme = async (req, res) => {
    const scheme = await Scheme.findById(req.params.id);

    if (scheme) {
        await scheme.deleteOne();
        res.json({ message: 'Scheme removed' });
    } else {
        res.status(404).json({ message: 'Scheme not found' });
    }
};

module.exports = {
    createScheme,
    getSchemes,
    getSchemeById,
    updateScheme,
    deleteScheme,
};
