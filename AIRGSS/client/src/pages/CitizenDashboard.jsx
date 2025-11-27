import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ClipboardList, AlertCircle, Activity } from 'lucide-react';

const CitizenDashboard = () => {
    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Citizen Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Schemes Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-100 rounded-xl">
                            <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-500">Services</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Available Schemes</h3>
                    <p className="text-gray-600 mb-4">Browse and apply for government schemes tailored for you.</p>
                    <Link to="/schemes" className="inline-block w-full text-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        View Schemes
                    </Link>
                </div>

                {/* Applications Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-purple-100 rounded-xl">
                            <ClipboardList className="w-6 h-6 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-500">Status</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">My Applications</h3>
                    <p className="text-gray-600 mb-4">Track the status of your submitted applications.</p>
                    <Link to="/applications" className="inline-block w-full text-center py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        Track Status
                    </Link>
                </div>

                {/* Grievances Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-red-100 rounded-xl">
                            <AlertCircle className="w-6 h-6 text-red-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-500">Support</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">File Grievance</h3>
                    <p className="text-gray-600 mb-4">Report issues or file complaints directly to officials.</p>
                    <Link to="/grievances" className="inline-block w-full text-center py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        Go to Grievances
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CitizenDashboard;
