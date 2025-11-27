import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CitizenDashboard from './pages/CitizenDashboard';
import OfficialDashboard from './pages/OfficialDashboard';
import AdminDashboard from './pages/AdminDashboard';
import GrievanceList from './pages/GrievanceList';
import GrievanceForm from './pages/GrievanceForm';
import SchemeList from './pages/SchemeList';
import SchemeDetails from './pages/SchemeDetails';
import SchemeForm from './pages/SchemeForm';
import ApplicationList from './pages/ApplicationList';
import ApplicationForm from './pages/ApplicationForm';
import UserList from './pages/UserList';

// Placeholder components
const Transparency = () => <div className="min-h-screen flex items-center justify-center pt-20"><div className="text-center"><h1 className="text-3xl font-bold text-gray-800 mb-4">Transparency Portal</h1><p className="text-gray-600">Coming Soon</p></div></div>;
const Contact = () => <div className="min-h-screen flex items-center justify-center pt-20"><div className="text-center"><h1 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h1><p className="text-gray-600">Coming Soon</p></div></div>;

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard if role doesn't match
    if (user.role === 'citizen') return <Navigate to="/dashboard/citizen" />;
    if (user.role === 'official') return <Navigate to="/dashboard/official" />;
    if (user.role === 'admin') return <Navigate to="/dashboard/admin" />;
    return <Navigate to="/" />;
  }

  return children;
};

// Helper component to redirect from /dashboard to role-specific dashboard
const DashboardRedirector = () => {
  const { user } = useAuth();
  if (user?.role === 'citizen') return <Navigate to="/dashboard/citizen" />;
  if (user?.role === 'official') return <Navigate to="/dashboard/official" />;
  if (user?.role === 'admin') return <Navigate to="/dashboard/admin" />;
  return <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="transparency" element={<Transparency />} />
            <Route path="contact" element={<Contact />} />

            {/* Protected Routes */}
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <DashboardRedirector />
                </ProtectedRoute>
              }
            />

            <Route
              path="dashboard/citizen"
              element={
                <ProtectedRoute allowedRoles={['citizen']}>
                  <CitizenDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="dashboard/official"
              element={
                <ProtectedRoute allowedRoles={['official']}>
                  <OfficialDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="dashboard/admin"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route path="schemes" element={<SchemeList />} />
            <Route
              path="schemes/new"
              element={
                <ProtectedRoute allowedRoles={['official']}>
                  <SchemeForm />
                </ProtectedRoute>
              }
            />
            <Route path="schemes/:id" element={<SchemeDetails />} />

            <Route path="applications" element={<ApplicationList />} />
            <Route
              path="applications/new"
              element={
                <ProtectedRoute allowedRoles={['citizen']}>
                  <ApplicationForm />
                </ProtectedRoute>
              }
            />

            <Route
              path="users"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <UserList />
                </ProtectedRoute>
              }
            />

            <Route path="grievances" element={<GrievanceList />} />
            <Route path="grievances/new" element={<GrievanceForm />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
