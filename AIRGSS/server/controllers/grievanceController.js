const Grievance = require('../models/Grievance');

// @desc    Create a new grievance
// @route   POST /api/grievances
// @access  Private
const createGrievance = async (req, res) => {
    const { title, description, category, attachments } = req.body;

    if (!title || !description || !category) {
        res.status(400).json({ message: 'Please fill in all fields' });
        return;
    }

    const grievance = new Grievance({
        user: req.user._id,
        title,
        description,
        category,
        attachments,
    });

    const createdGrievance = await grievance.save();
    res.status(201).json(createdGrievance);
};

// @desc    Get all grievances
// @route   GET /api/grievances
// @access  Private/Admin/Official
const getGrievances = async (req, res) => {
    const grievances = await Grievance.find({}).populate('user', 'id name email');
    res.json(grievances);
};

// @desc    Get logged in user grievances
// @route   GET /api/grievances/my
// @access  Private
const getMyGrievances = async (req, res) => {
    const grievances = await Grievance.find({ user: req.user._id });
    res.json(grievances);
};

// @desc    Get grievance by ID
// @route   GET /api/grievances/:id
// @access  Private
const getGrievanceById = async (req, res) => {
    const grievance = await Grievance.findById(req.params.id).populate('user', 'name email');

    if (grievance) {
        res.json(grievance);
    } else {
        res.status(404).json({ message: 'Grievance not found' });
    }
};

// @desc    Update grievance status
// @route   PUT /api/grievances/:id/status
// @access  Private/Admin/Official
const updateGrievanceStatus = async (req, res) => {
    const { status } = req.body;

    const grievance = await Grievance.findById(req.params.id);

    if (grievance) {
        grievance.status = status;
        const updatedGrievance = await grievance.save();
        res.json(updatedGrievance);
    } else {
        res.status(404).json({ message: 'Grievance not found' });
    }
};

module.exports = {
    createGrievance,
    getGrievances,
    getMyGrievances,
    getGrievanceById,
    updateGrievanceStatus,
};
