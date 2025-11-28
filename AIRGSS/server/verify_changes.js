const mongoose = require('mongoose');
const { classifyGrievance } = require('./utils/grievanceClassifier');
const path = require('path');
require('dotenv').config();

const verifyCategorization = () => {
    console.log('--- Verifying Grievance Categorization ---');
    const testCases = [
        { input: 'My street light is broken and it is very dark', expected: 'Electricity' },
        { input: 'There is no water coming from the tap since morning', expected: 'Water' },
        { input: 'Garbage is piling up on the corner of the street', expected: 'Sanitation' },
        { input: 'Big pothole on the main road causing traffic', expected: 'Roads' },
        { input: 'I need a birth certificate', expected: 'General' } // Fallback/General
    ];

    testCases.forEach(test => {
        const result = classifyGrievance(test.input);
        console.log(`Input: "${test.input}"`);
        console.log(`Predicted Category: ${result.category}`);
        console.log(`Assigned Department: ${result.department}`);
        console.log(`Match: ${result.category === test.expected ? 'PASS' : 'FAIL'}`);
        console.log('-----------------------------------');
    });
};

verifyCategorization();
