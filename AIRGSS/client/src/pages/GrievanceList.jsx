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

    const handleReview = async (id) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.put(`http://localhost:5000/api/grievances/${id}/review`, {}, config);

            // Update local state
            setGrievances(grievances.map(g => g._id === id ? data : g));
            alert(`Grievance Reviewed! Ticket ID: ${data.ticketId}\nCategory: ${data.category}\nDepartment: ${data.department}`);
        } catch (error) {
            console.error('Error reviewing grievance:', error);
            alert('Failed to review grievance');
        }
    };

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
                            <span>ID: {grievance.ticketId || grievance._id.substring(0, 8)}</span>
                            <span>{new Date(grievance.createdAt).toLocaleDateString()}</span>
                        </div>

                        {(user.role === 'official' || user.role === 'admin') && !grievance.ticketId && (
                            <div className="mt-4">
                                <button
                                    onClick={() => handleReview(grievance._id)}
                                    className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                                >
                                    AI Review & Assign
                                </button>
                            </div>
                        )}

                        {(user.role === 'official' || user.role === 'admin') && grievance.ticketId && (
                            <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                <p><strong>Category:</strong> {grievance.category}</p>
                                <p><strong>Dept:</strong> {grievance.department}</p>
                            </div>
                        )}
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
