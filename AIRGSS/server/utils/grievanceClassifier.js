const natural = require('natural');

const classifier = new natural.BayesClassifier();

// Train the classifier with some seed data
const trainingData = [
    { text: 'water not coming', category: 'Water', department: 'Water Department' },
    { text: 'dirty water supply', category: 'Water', department: 'Water Department' },
    { text: 'pipe leakage', category: 'Water', department: 'Water Department' },
    { text: 'no electricity', category: 'Electricity', department: 'Electricity Board' },
    { text: 'power cut', category: 'Electricity', department: 'Electricity Board' },
    { text: 'street light not working', category: 'Electricity', department: 'Electricity Board' },
    { text: 'road broken', category: 'Roads', department: 'Public Works Department' },
    { text: 'potholes on road', category: 'Roads', department: 'Public Works Department' },
    { text: 'garbage not collected', category: 'Sanitation', department: 'Sanitation Department' },
    { text: 'drainage overflow', category: 'Sanitation', department: 'Sanitation Department' },
    { text: 'dustbin full', category: 'Sanitation', department: 'Sanitation Department' },
    { text: 'trash on street', category: 'Sanitation', department: 'Sanitation Department' },
    { text: 'cleaning not done', category: 'Sanitation', department: 'Sanitation Department' },
    { text: 'birth certificate', category: 'General', department: 'General Administration' },
    { text: 'death certificate', category: 'General', department: 'General Administration' },
    { text: 'property tax', category: 'General', department: 'General Administration' },
    { text: 'marriage registration', category: 'General', department: 'General Administration' },
    { text: 'ration card', category: 'General', department: 'General Administration' },
];

trainingData.forEach(item => {
    classifier.addDocument(item.text, item.category);
});

classifier.train();

const departmentMap = {
    'Water': 'Water Department',
    'Electricity': 'Electricity Board',
    'Roads': 'Public Works Department',
    'Sanitation': 'Sanitation Department',
    'General': 'General Administration'
};

const classifyGrievance = (text) => {
    const category = classifier.classify(text);
    const department = departmentMap[category] || 'General Administration';
    return { category, department };
};

module.exports = { classifyGrievance };
