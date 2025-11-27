import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Layers, Calendar, Users, ChevronRight, Sparkles } from 'lucide-react';

const SchemeList = () => {
    const [schemes, setSchemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchSchemes = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/schemes');
                setSchemes(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching schemes:', error);
                setLoading(false);
            }
        };

        fetchSchemes();
    }, []);

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="glass-dark rounded-3xl p-8 border border-white/30">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Layers className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Government Schemes</h1>
                        <p className="text-gray-600">Browse and apply for available schemes</p>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <div className="inline-block w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-500">Loading schemes...</p>
                </div>
            ) : schemes.length === 0 ? (
                <div className="card p-12 text-center">
                    <Layers className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No schemes available at the moment.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {schemes.map((scheme, index) => (
                        <Link
                            key={scheme._id}
                            to={`/schemes/${scheme._id}`}
                            className="card p-6 hover:scale-105 transition-all duration-300 group"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200/50 rounded-2xl border border-purple-200/50 group-hover:scale-110 transition-transform">
                                    <Layers className="w-6 h-6 text-purple-600" />
                                </div>
                                <span className="badge badge-success">
                                    <Sparkles className="w-3 h-3 mr-1" />
                                    Active
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                                {scheme.name}
                            </h3>

                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                {scheme.description}
                            </p>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center text-xs text-gray-500 bg-gray-50/50 px-3 py-2 rounded-lg">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Deadline: {new Date(scheme.deadline).toLocaleDateString()}
                                </div>
                                {scheme.eligibilityCriteria?.incomeLimit && (
                                    <div className="flex items-center text-xs text-gray-500 bg-gray-50/50 px-3 py-2 rounded-lg">
                                        <Users className="w-4 h-4 mr-2" />
                                        Income limit: ₹{scheme.eligibilityCriteria.incomeLimit.toLocaleString()}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                                View Details <ChevronRight className="w-4 h-4" />
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SchemeList;
