const Grievance = require('../models/Grievance');
const { classifyGrievance } = require('../utils/grievanceClassifier');

// @desc    Create a new grievance
// @route   POST /api/grievances
// @access  Private
const createGrievance = async (req, res) => {
    const { title, description, attachments } = req.body;

    if (!title || !description) {
        res.status(400).json({ message: 'Please fill in all fields' });
        return;
    }

    // Classification is now done by officer review
    // const { category, department } = classifyGrievance(`${title} ${description}`);

    const grievance = new Grievance({
        user: req.user._id,
        title,
        description,
        // category,
        // department,
        attachments,
    });

    const createdGrievance = await grievance.save();
    res.status(201).json(createdGrievance);
};

// @desc    Review and categorize grievance (AI)
// @route   PUT /api/grievances/:id/review
// @access  Private/Official
const reviewGrievance = async (req, res) => {
    const grievance = await Grievance.findById(req.params.id);

    if (grievance) {
        const { category, department } = classifyGrievance(`${grievance.title} ${grievance.description}`);

        grievance.category = category;
        grievance.department = department;
        grievance.status = 'In Progress';

        // Generate Ticket ID if not exists
        if (!grievance.ticketId) {
            grievance.ticketId = `GRV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        }

        const updatedGrievance = await grievance.save();
        res.json(updatedGrievance);
    } else {
        res.status(404).json({ message: 'Grievance not found' });
    }
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
    reviewGrievance,
};
