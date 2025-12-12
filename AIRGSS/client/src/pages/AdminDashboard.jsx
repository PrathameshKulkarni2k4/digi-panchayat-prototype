import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Settings, Database } from 'lucide-react';

const AdminDashboard = () => {
    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* User Management */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-indigo-100 rounded-xl">
                            <Users className="w-6 h-6 text-indigo-600" />
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">User Management</h3>
                    <p className="text-gray-600 mb-4">Manage citizen and official accounts, roles, and permissions.</p>
                    <Link to="/users" className="block w-full text-center py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                        Manage Users
                    </Link>
                </div>

                {/* System Settings */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-gray-100 rounded-xl">
                            <Settings className="w-6 h-6 text-gray-600" />
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">System Settings</h3>
                    <p className="text-gray-600 mb-4">Configure system-wide settings, notifications, and integrations.</p>
                    <button className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                        Configure
                    </button>
                </div>

                {/* Data Management */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-100 rounded-xl">
                            <Database className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Master Data</h3>
                    <p className="text-gray-600 mb-4">Manage schemes, grievance categories, and other master data.</p>
                    <button className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                        Manage Data
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
