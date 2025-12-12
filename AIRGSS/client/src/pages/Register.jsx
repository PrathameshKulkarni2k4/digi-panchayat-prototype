import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { UserPlus, Sparkles, Check, X } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'citizen',
        phone: '',
        age: '',
        gender: '',
        income: '',
        occupation: '',
    });

    const [errors, setErrors] = useState({});
    const { register, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const { name, email, password, confirmPassword, role, phone, age, gender, income, occupation } = formData;

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePhone = (phone) => {
        const re = /^[6-9]\d{9}$/; // Indian mobile number validation
        return re.test(phone);
    };

    const validatePassword = (password) => {
        // Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(password);
    };

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
        // Clear error when user starts typing
        if (errors[e.target.name]) {
            setErrors(prev => ({ ...prev, [e.target.name]: '' }));
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!validateEmail(email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (phone && !validatePhone(phone)) {
            newErrors.phone = 'Please enter a valid 10-digit Indian mobile number';
        }

        if (!validatePassword(password)) {
            newErrors.password = 'Password must be at least 8 characters, include uppercase, lowercase, number, and special character';
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const result = await register({
            name,
            email,
            password,
            role,
            phone,
            age,
            gender,
            income,
            occupation,
        });

        if (!result.success) {
            setErrors({ form: result.message });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50/30 to-pink-50/20 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl w-full">
                <div className="glass-dark rounded-3xl p-8 shadow-xl border border-white/30">
                    <div className="text-center mb-8">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                            <UserPlus className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                        <p className="text-gray-600">Join DigiPanchayat today</p>
                    </div>

                    {errors.form && (
                        <div className="mb-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-xl">
                            <p className="text-sm text-red-700">{errors.form}</p>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={submitHandler}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={onChange}
                                    required
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={onChange}
                                    required
                                    className={`w-full px-4 py-2 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                                    placeholder="you@example.com"
                                />
                                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                    required
                                    className={`w-full px-4 py-2 rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                                    placeholder="••••••••"
                                />
                                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={onChange}
                                    required
                                    className={`w-full px-4 py-2 rounded-xl border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                                    placeholder="••••••••"
                                />
                                {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                                <select name="role" value={role} onChange={onChange} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                                    <option value="citizen">Citizen</option>
                                    <option value="official">Official</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={phone}
                                    onChange={onChange}
                                    className={`w-full px-4 py-2 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                                    placeholder="9876543210"
                                />
                                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={age}
                                    onChange={onChange}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="25"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                                <select name="gender" value={gender} onChange={onChange} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Annual Income (₹)</label>
                                <input
                                    type="number"
                                    name="income"
                                    value={income}
                                    onChange={onChange}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="300000"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Occupation</label>
                                <input
                                    type="text"
                                    name="occupation"
                                    value={occupation}
                                    onChange={onChange}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="Farmer"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
                        >
                            <Sparkles className="w-5 h-5" />
                            Create Account
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="font-semibold text-primary hover:text-primary-dark transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
