import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { FileText, Layers, ClipboardList, AlertCircle, TrendingUp, CheckCircle2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    const stats = [
        {
            title: 'Available Schemes',
            value: '12',
            icon: Layers,
            gradient: 'from-blue-500 to-blue-600',
            bg: 'bg-blue-50/50',
            link: '/schemes'
        },
        {
            title: 'My Applications',
            value: '3',
            icon: FileText,
            gradient: 'from-green-500 to-green-600',
            bg: 'bg-green-50/50',
            link: '/applications'
        },
        {
            title: 'Active Grievances',
            value: '1',
            icon: AlertCircle,
            gradient: 'from-orange-500 to-orange-600',
            bg: 'bg-orange-50/50',
            link: '/grievances'
        },
        {
            title: 'Resolved Issues',
            value: '4',
            icon: CheckCircle2,
            gradient: 'from-purple-500 to-purple-600',
            bg: 'bg-purple-50/50',
            link: '/grievances'
        },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Welcome Header */}
            <div className="glass-dark rounded-3xl p-8 border border-white/30">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Welcome back, {user?.name?.split(' ')[0]}! 👋
                        </h1>
                        <p className="text-gray-600">Here's what's happening with your account today.</p>
                    </div>
                    <div className="hidden md:flex items-center gap-2">
                        <div className="px-4 py-2 bg-green-100/80 backdrop-blur-sm rounded-full border border-green-200/50">
                            <span className="text-sm font-medium text-green-700 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4" />
                                All Systems Active
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <Link
                        to={stat.link}
                        key={index}
                        className="card p-6 hover:scale-105 transition-transform duration-300 group cursor-pointer"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-2xl ${stat.bg} backdrop-blur-sm border border-white/50 group-hover:scale-110 transition-transform duration-300`}>
                                <stat.icon className={`w-6 h-6 bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text' }} />
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                            <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="card p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        Recent Activity
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100/50 hover:bg-blue-50 transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-md">
                                <FileText className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900">PM Awas Yojana</p>
                                <p className="text-xs text-gray-500 mt-1">Application submitted</p>
                            </div>
                            <span className="badge badge-warning">Pending</span>
                        </div>
                        <div className="flex items-start gap-4 p-4 bg-green-50/50 rounded-xl border border-green-100/50 hover:bg-green-50 transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white shadow-md">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900">Water Supply Issue</p>
                                <p className="text-xs text-gray-500 mt-1">Grievance resolved</p>
                            </div>
                            <span className="badge badge-success">Resolved</span>
                        </div>
                    </div>
                </div>

                {/* Quick Actions Card */}
                <div className="card p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Link
                            to="/grievances/new"
                            className="p-4 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl border border-orange-200/50 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform shadow-md">
                                <ClipboardList className="w-5 h-5" />
                            </div>
                            <p className="text-sm font-semibold text-gray-900">Report Issue</p>
                        </Link>
                        <Link
                            to="/schemes"
                            className="p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl border border-purple-200/50 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform shadow-md">
                                <Layers className="w-5 h-5" />
                            </div>
                            <p className="text-sm font-semibold text-gray-900">Browse Schemes</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
