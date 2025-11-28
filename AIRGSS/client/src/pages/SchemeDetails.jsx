import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Calendar, Users, DollarSign, Briefcase, User as UserIcon, ArrowLeft, CheckCircle } from 'lucide-react';

const SchemeDetails = () => {
    const [scheme, setScheme] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const [applicationData, setApplicationData] = useState({});
    const [documents, setDocuments] = useState([]);
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchScheme = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/schemes/${id}`);
                setScheme(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching scheme:', error);
                setLoading(false);
            }
        };

        fetchScheme();
    }, [id]);

    const handleApply = async (e) => {
        e.preventDefault();
        setApplying(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const formData = new FormData();
            formData.append('scheme', id);
            // formData.append('submittedData', JSON.stringify(applicationData)); // If backend expects map, might need loop or JSON parsing on backend. 
            // Checking Application model: submittedData is Map of String. 
            // Checking applicationController: const { scheme, submittedData } = req.body;
            // If using multer, req.body will be populated. But if submittedData is object, it might be [object Object].
            // Let's append individual fields of submittedData if any, or send as JSON string and parse in backend if needed.
            // For now, let's assume simple key-values or just notes.
            // Send submittedData as JSON string
            formData.append('submittedData', JSON.stringify(applicationData));

            for (let i = 0; i < documents.length; i++) {
                formData.append('documents', documents[i]);
            }

            await axios.post(
                'http://localhost:5000/api/applications',
                formData,
                config
            );

            alert('Application submitted successfully!');
            navigate('/applications');
        } catch (error) {
            console.error('Error applying:', error);
            alert('Failed to submit application');
        } finally {
            setApplying(false);
        }
    };

    if (loading) {
        return <div className="text-center py-12 text-gray-500">Loading scheme details...</div>;
    }

    if (!scheme) {
        return <div className="text-center py-12 text-gray-500">Scheme not found</div>;
    }

    const { eligibilityCriteria } = scheme;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <button
                onClick={() => navigate('/schemes')}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Schemes
            </button>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{scheme.name}</h1>
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                            Active
                        </span>
                    </div>
                </div>

                <div className="prose max-w-none mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                    <p className="text-gray-600">{scheme.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-blue-50 p-4 rounded-xl">
                        <div className="flex items-center mb-2">
                            <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                            <span className="font-semibold text-gray-900">Deadline</span>
                        </div>
                        <p className="text-gray-700">{new Date(scheme.deadline).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-xl">
                        <div className="flex items-center mb-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                            <span className="font-semibold text-gray-900">Benefits</span>
                        </div>
                        <p className="text-gray-700">{scheme.benefits}</p>
                    </div>
                </div>

                {eligibilityCriteria && (
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Eligibility Criteria</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {eligibilityCriteria.ageMin && (
                                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                    <UserIcon className="w-5 h-5 text-gray-600 mr-3" />
                                    <div>
                                        <p className="text-xs text-gray-500">Age Range</p>
                                        <p className="font-medium text-gray-900">
                                            {eligibilityCriteria.ageMin} - {eligibilityCriteria.ageMax} years
                                        </p>
                                    </div>
                                </div>
                            )}
                            {eligibilityCriteria.gender && eligibilityCriteria.gender !== 'Any' && (
                                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                    <Users className="w-5 h-5 text-gray-600 mr-3" />
                                    <div>
                                        <p className="text-xs text-gray-500">Gender</p>
                                        <p className="font-medium text-gray-900">{eligibilityCriteria.gender}</p>
                                    </div>
                                </div>
                            )}
                            {eligibilityCriteria.incomeLimit && (
                                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                    <DollarSign className="w-5 h-5 text-gray-600 mr-3" />
                                    <div>
                                        <p className="text-xs text-gray-500">Income Limit</p>
                                        <p className="font-medium text-gray-900">
                                            ₹{eligibilityCriteria.incomeLimit.toLocaleString()} per annum
                                        </p>
                                    </div>
                                </div>
                            )}
                            {eligibilityCriteria.occupation && (
                                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                    <Briefcase className="w-5 h-5 text-gray-600 mr-3" />
                                    <div>
                                        <p className="text-xs text-gray-500">Occupation</p>
                                        <p className="font-medium text-gray-900">{eligibilityCriteria.occupation}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {user?.role === 'citizen' && (
                    <div className="border-t border-gray-100 pt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Apply for this Scheme</h3>
                        <form onSubmit={handleApply} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Additional Information (Optional)
                                </label>
                                <textarea
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Any additional information you'd like to provide..."
                                    onChange={(e) => setApplicationData({ ...applicationData, notes: e.target.value })}
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Upload Documents
                                </label>
                                <input
                                    type="file"
                                    multiple
                                    onChange={(e) => setDocuments(e.target.files)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                                <p className="text-xs text-gray-500 mt-1">Upload relevant documents (ID proof, Income certificate, etc.)</p>
                            </div>

                            <button
                                type="submit"
                                disabled={applying}
                                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-lg disabled:opacity-50 transition-colors"
                            >
                                {applying ? 'Submitting Application...' : 'Submit Application'}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SchemeDetails;
