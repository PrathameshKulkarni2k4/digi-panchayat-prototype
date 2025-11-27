import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { PlusCircle, Layers } from 'lucide-react';

const SchemeForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        eligibility: '',
        benefits: '',
        deadline: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

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
            formDataToSend.append('name', formData.name);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('eligibilityCriteria', JSON.stringify({
                // Parsing simple string input into object structure for now
                description: formData.eligibility
            }));
            // Note: Ideally eligibility would be a structured object, but keeping it simple based on current UI
            // If backend expects specific fields, we might need to adjust. 
            // For now, let's send the text as 'benefits' and 'eligibilityCriteria'

            formDataToSend.append('benefits', formData.benefits);
            formDataToSend.append('deadline', formData.deadline);
            if (formData.document) {
                formDataToSend.append('document', formData.document);
            }

            await axios.post(
                'http://localhost:5000/api/schemes',
                formDataToSend,
                config
            );

            navigate('/schemes');
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
        <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-purple-100 rounded-xl">
                        <Layers className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Upload New Scheme</h2>
                        <p className="text-gray-500">Create a new government scheme for citizens</p>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Scheme Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={onChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="e.g., PM Kisan Samman Nidhi"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={onChange}
                            required
                            rows="3"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Brief description of the scheme..."
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Eligibility Criteria</label>
                            <textarea
                                name="eligibility"
                                value={formData.eligibility}
                                onChange={onChange}
                                required
                                rows="3"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Who can apply?"
                            ></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Benefits</label>
                            <textarea
                                name="benefits"
                                value={formData.benefits}
                                onChange={onChange}
                                required
                                rows="3"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="What will they get?"
                            ></textarea>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Application Deadline</label>
                        <input
                            type="date"
                            name="deadline"
                            value={formData.deadline}
                            onChange={onChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Scheme Document (PDF/DOC)</label>
                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={(e) => {
                                    setFormData({ ...formData, document: e.target.files[0] });
                                }}
                            />
                            <div className="flex flex-col items-center justify-center">
                                <Layers className="w-8 h-8 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500">
                                    Click to upload or drag and drop
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                    PDF, DOC, DOCX up to 10MB
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-lg transition-all disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : (
                            <>
                                <PlusCircle className="w-5 h-5" />
                                Create Scheme
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SchemeForm;
