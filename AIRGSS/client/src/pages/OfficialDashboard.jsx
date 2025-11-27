import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardCheck, Users, AlertTriangle, BarChart2 } from 'lucide-react';

const OfficialDashboard = () => {
    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Official Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Pending Applications */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-yellow-100 rounded-xl">
                            <ClipboardCheck className="w-6 h-6 text-yellow-600" />
                        </div>
                        <span className="text-2xl font-bold text-gray-800">12</span>
                    </div>
                    <h3 className="text-gray-600 font-medium">Pending Applications</h3>
                    <Link to="/applications" className="text-sm text-blue-600 hover:underline mt-2 inline-block">Review Queue &rarr;</Link>
                </div>

                {/* Active Grievances */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-red-100 rounded-xl">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                        <span className="text-2xl font-bold text-gray-800">5</span>
                    </div>
                    <h3 className="text-gray-600 font-medium">Open Grievances</h3>
                    <Link to="/grievances" className="text-sm text-blue-600 hover:underline mt-2 inline-block">Resolve Issues &rarr;</Link>
                </div>

                {/* Total Citizens */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-green-100 rounded-xl">
                            <Users className="w-6 h-6 text-green-600" />
                        </div>
                        <span className="text-2xl font-bold text-gray-800">1,240</span>
                    </div>
                    <h3 className="text-gray-600 font-medium">Registered Citizens</h3>
                </div>

                {/* Reports */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-purple-100 rounded-xl">
                            <BarChart2 className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                    <h3 className="text-gray-600 font-medium">View Reports</h3>
                    <p className="text-xs text-gray-400 mt-1">Weekly analytics</p>
                </div>
            </div>
        </div>
    );
};

export default OfficialDashboard;
