import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { LogOut, User, Home, FileText, Layers, ClipboardList } from 'lucide-react';

const Layout = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 flex">
            {/* macOS-style Sidebar */}
            <aside className="w-72 sidebar fixed h-full z-10 hidden md:flex flex-col">
                {/* Sidebar Header */}
                <div className="p-6 border-b border-gray-200/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                            <span className="text-white font-extrabold text-xl tracking-tight">DP</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent tracking-tight">DigiPanchayat</h1>
                            <p className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wider">AIRGSS Portal</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {/* Common Dashboard Link */}
                    <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-white/60 hover:text-primary rounded-xl transition-all duration-200 group"
                    >
                        <div className="w-8 h-8 rounded-lg bg-blue-100/50 flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                            <Home className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium">Dashboard</span>
                    </Link>

                    {/* Citizen Links */}
                    {user?.role === 'citizen' && (
                        <>
                            <Link
                                to="/schemes"
                                className="flex items-center px-4 py-3 text-gray-700 hover:bg-white/60 hover:text-primary rounded-xl transition-all duration-200 group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-purple-100/50 flex items-center justify-center mr-3 group-hover:bg-purple-100 transition-colors">
                                    <Layers className="w-4 h-4 text-purple-600" />
                                </div>
                                <span className="font-medium">Schemes</span>
                            </Link>
                            <Link
                                to="/applications"
                                className="flex items-center px-4 py-3 text-gray-700 hover:bg-white/60 hover:text-primary rounded-xl transition-all duration-200 group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-green-100/50 flex items-center justify-center mr-3 group-hover:bg-green-100 transition-colors">
                                    <FileText className="w-4 h-4 text-green-600" />
                                </div>
                                <span className="font-medium">Track Applications</span>
                            </Link>
                            <Link
                                to="/grievances"
                                className="flex items-center px-4 py-3 text-gray-700 hover:bg-white/60 hover:text-primary rounded-xl transition-all duration-200 group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-orange-100/50 flex items-center justify-center mr-3 group-hover:bg-orange-100 transition-colors">
                                    <ClipboardList className="w-4 h-4 text-orange-600" />
                                </div>
                                <span className="font-medium">File Grievance</span>
                            </Link>
                        </>
                    )}

                    {/* Official Links */}
                    {user?.role === 'official' && (
                        <>
                            <Link
                                to="/schemes/new"
                                className="flex items-center px-4 py-3 text-gray-700 hover:bg-white/60 hover:text-primary rounded-xl transition-all duration-200 group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-purple-100/50 flex items-center justify-center mr-3 group-hover:bg-purple-100 transition-colors">
                                    <Layers className="w-4 h-4 text-purple-600" />
                                </div>
                                <span className="font-medium">Upload Scheme</span>
                            </Link>
                            {/* Review Applications removed as per user request */}
                            <Link
                                to="/grievances"
                                className="flex items-center px-4 py-3 text-gray-700 hover:bg-white/60 hover:text-primary rounded-xl transition-all duration-200 group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-orange-100/50 flex items-center justify-center mr-3 group-hover:bg-orange-100 transition-colors">
                                    <ClipboardList className="w-4 h-4 text-orange-600" />
                                </div>
                                <span className="font-medium">Review Grievances</span>
                            </Link>
                        </>
                    )}

                    {/* Admin Links */}
                    {user?.role === 'admin' && (
                        <>
                            <Link
                                to="/users"
                                className="flex items-center px-4 py-3 text-gray-700 hover:bg-white/60 hover:text-primary rounded-xl transition-all duration-200 group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-indigo-100/50 flex items-center justify-center mr-3 group-hover:bg-indigo-100 transition-colors">
                                    <User className="w-4 h-4 text-indigo-600" />
                                </div>
                                <span className="font-medium">Manage Users</span>
                            </Link>
                            {/* Reusing Schemes for Admin to manage */}
                            <Link
                                to="/schemes"
                                className="flex items-center px-4 py-3 text-gray-700 hover:bg-white/60 hover:text-primary rounded-xl transition-all duration-200 group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-purple-100/50 flex items-center justify-center mr-3 group-hover:bg-purple-100 transition-colors">
                                    <Layers className="w-4 h-4 text-purple-600" />
                                </div>
                                <span className="font-medium">Manage Schemes</span>
                            </Link>
                        </>
                    )}
                </nav>

                {/* User Profile Section */}
                <div className="p-4 border-t border-gray-200/50">
                    <div className="flex items-center p-3 bg-white/40 backdrop-blur-sm rounded-xl mb-3 border border-gray-200/30">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="ml-3 overflow-hidden flex-1">
                            <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || 'User'}</p>
                            <p className="text-xs text-gray-500 truncate capitalize">{user?.role || 'Citizen'}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50/80 hover:bg-red-100/80 rounded-xl transition-all duration-200 backdrop-blur-sm border border-red-100/50"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed w-full glass z-20 p-4 flex justify-between items-center border-b border-gray-200/50">
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">DigiPanchayat</h1>
                <button onClick={handleLogout} className="p-2 hover:bg-white/60 rounded-lg transition-colors">
                    <LogOut className="w-5 h-5 text-gray-600" />
                </button>
            </div>

            {/* Main Content */}
            <main className="flex-1 md:ml-72 p-6 md:p-8 pt-20 md:pt-8">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
