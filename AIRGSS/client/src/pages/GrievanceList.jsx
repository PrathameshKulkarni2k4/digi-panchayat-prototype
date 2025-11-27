import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Plus, Filter } from 'lucide-react';

const GrievanceList = () => {
    const [grievances, setGrievances] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchGrievances = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                let url = 'http://localhost:5000/api/grievances/my';
                if (user.role === 'official' || user.role === 'admin') {
                    url = 'http://localhost:5000/api/grievances';
                }
                const { data } = await axios.get(url, config);
                setGrievances(data);
            } catch (error) {
                console.error('Error fetching grievances:', error);
            }
        };

        if (user) {
            fetchGrievances();
        }
    }, [user]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Grievances</h1>
                <Link to="/grievances/new" className="btn-primary flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    New Grievance
                </Link>
            </div>

            {/* Filters (Placeholder) */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
                <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    All
                </button>
                <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Pending
                </button>
                <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Resolved
                </button>
            </div>

            <div className="grid gap-4">
                {grievances.map((grievance) => (
                    <div key={grievance._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">{grievance.title}</h3>
                                <p className="text-sm text-gray-500 mt-1">{grievance.category}</p>
                                <p className="text-gray-600 mt-2 line-clamp-2">{grievance.description}</p>
                            </div>
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${grievance.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                                grievance.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                    'bg-yellow-100 text-yellow-800'
                                }`}>
                                {grievance.status}
                            </span>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center text-xs text-gray-500">
                            <span>ID: {grievance._id.substring(0, 8)}</span>
                            <span>{new Date(grievance.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))}
                {grievances.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No grievances found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GrievanceList;
