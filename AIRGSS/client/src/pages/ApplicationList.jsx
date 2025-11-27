import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { FileText, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

const ApplicationList = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const { data } = await axios.get('http://localhost:5000/api/applications/my', config);
                setApplications(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching applications:', error);
                setLoading(false);
            }
        };

        if (user) {
            fetchApplications();
        }
    }, [user]);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Approved':
                return <CheckCircle className="w-5 h-5 text-green-600" />;
            case 'Rejected':
                return <XCircle className="w-5 h-5 text-red-600" />;
            default:
                return <Clock className="w-5 h-5 text-yellow-600" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved':
                return 'bg-green-100 text-green-800';
            case 'Rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-yellow-100 text-yellow-800';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">My Applications</h1>
                    <p className="text-gray-500 mt-1">Track your scheme applications</p>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500">Loading applications...</div>
            ) : applications.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl text-center border border-gray-100">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-gray-300" />
                    </div>
                    <p className="text-gray-500 text-lg mb-2">No applications yet</p>
                    <p className="text-gray-400 text-sm">Browse schemes and apply to get started</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {applications.map((application) => (
                        <div
                            key={application._id}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="p-2 bg-blue-50 rounded-lg">
                                            <FileText className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {application.scheme?.name || 'Scheme'}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {application.scheme?.description || 'No description available'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                        <div className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            Applied: {new Date(application.createdAt).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center">
                                            {getStatusIcon(application.status)}
                                            <span className="ml-2">Status: {application.status}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span
                                        className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(
                                            application.status
                                        )}`}
                                    >
                                        {application.status}
                                    </span>
                                </div>
                            </div>

                            {application.submittedData?.notes && (
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Notes:</span> {application.submittedData.notes}
                                    </p>
                                </div>
                            )}

                            <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center text-xs text-gray-500">
                                <span>Application ID: {application._id.substring(0, 8)}</span>
                                <span>Last updated: {new Date(application.updatedAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ApplicationList;
