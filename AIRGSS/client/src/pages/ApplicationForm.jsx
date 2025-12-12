import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Send, FileText, Upload } from 'lucide-react';

const ApplicationForm = () => {
    const [schemes, setSchemes] = useState([]);
    const [formData, setFormData] = useState({
        schemeId: '',
        notes: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSchemes = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/schemes');
                setSchemes(data);
            } catch (error) {
                console.error('Error fetching schemes:', error);
            }
        };
        fetchSchemes();
    }, []);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const formDataToSend = new FormData();
            formDataToSend.append('scheme', formData.schemeId);
            formDataToSend.append('submittedData', JSON.stringify({ notes: formData.notes }));

            if (formData.documents) {
                for (let i = 0; i < formData.documents.length; i++) {
                    formDataToSend.append('documents', formData.documents[i]);
                }
            }

            await axios.post(
                'http://localhost:5000/api/applications',
                formDataToSend,
                config
            );

            navigate('/applications');
        } catch (error) {
            setError(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-blue-100 rounded-xl">
                        <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Submit Application</h2>
                        <p className="text-gray-500">Apply for a government scheme</p>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Select Scheme
                        </label>
                        <select
                            name="schemeId"
                            value={formData.schemeId}
                            onChange={onChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        >
                            <option value="">-- Select a Scheme --</option>
                            {schemes.map((scheme) => (
                                <option key={scheme._id} value={scheme._id}>
                                    {scheme.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Additional Notes / Description
                        </label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={onChange}
                            rows="4"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Provide any additional details relevant to your application..."
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Upload Documents
                        </label>
                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-blue-500 transition-colors">
                            <input
                                type="file"
                                name="documents"
                                multiple
                                onChange={(e) => setFormData({ ...formData, documents: e.target.files })}
                                className="hidden"
                                id="file-upload"
                            />
                            <label htmlFor="file-upload" className="cursor-pointer">
                                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-500">
                                    Click to upload documents (PDF, DOC, DOCX)
                                </p>
                                {formData.documents && formData.documents.length > 0 && (
                                    <p className="text-sm text-blue-600 mt-2">
                                        {formData.documents.length} file(s) selected
                                    </p>
                                )}
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg transition-all disabled:opacity-50"
                    >
                        {loading ? 'Submitting...' : (
                            <>
                                <Send className="w-5 h-5" />
                                Submit Application
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ApplicationForm;
