const Application = require('../models/Application');
const Scheme = require('../models/Scheme');

// @desc    Apply for a scheme
// @route   POST /api/applications
// @access  Private
const applyForScheme = async (req, res) => {
    const { scheme, submittedData } = req.body;

    if (!scheme) {
        res.status(400).json({ message: 'Scheme ID is required' });
        return;
    }

    // Check if scheme exists
    const schemeExists = await Scheme.findById(scheme);
    if (!schemeExists) {
        res.status(404).json({ message: 'Scheme not found' });
        return;
    }

    const application = new Application({
        user: req.user._id,
        scheme,
        submittedData,
    });

    const createdApplication = await application.save();
    res.status(201).json(createdApplication);
};

// @desc    Get logged in user applications
// @route   GET /api/applications/my
// @access  Private
const getMyApplications = async (req, res) => {
    const applications = await Application.find({ user: req.user._id }).populate('scheme', 'name description');
    res.json(applications);
};

// @desc    Get all applications
// @route   GET /api/applications
// @access  Private/Admin/Official
const getAllApplications = async (req, res) => {
    const applications = await Application.find({}).populate('user', 'name email').populate('scheme', 'name');
    res.json(applications);
};

// @desc    Update application status
// @route   PUT /api/applications/:id/status
// @access  Private/Admin/Official
const updateApplicationStatus = async (req, res) => {
    const { status } = req.body;

    const application = await Application.findById(req.params.id);

    if (application) {
        application.status = status;
        const updatedApplication = await application.save();
        res.json(updatedApplication);
    } else {
        res.status(404).json({ message: 'Application not found' });
    }
};

module.exports = {
    applyForScheme,
    getMyApplications,
    getAllApplications,
    updateApplicationStatus,
};
