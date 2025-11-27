import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import GrievanceList from './pages/GrievanceList';
import GrievanceForm from './pages/GrievanceForm';
import SchemeList from './pages/SchemeList';
import SchemeDetails from './pages/SchemeDetails';
import ApplicationList from './pages/ApplicationList';

// Placeholder components
const Transparency = () => <div className="min-h-screen flex items-center justify-center pt-20"><div className="text-center"><h1 className="text-3xl font-bold text-gray-800 mb-4">Transparency Portal</h1><p className="text-gray-600">Coming Soon</p></div></div>;
const Contact = () => <div className="min-h-screen flex items-center justify-center pt-20"><div className="text-center"><h1 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h1><p className="text-gray-600">Coming Soon</p></div></div>;

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
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="schemes" element={<SchemeList />} />
            <Route path="schemes/:id" element={<SchemeDetails />} />
            <Route path="applications" element={<ApplicationList />} />
            <Route path="grievances" element={<GrievanceList />} />
            <Route path="grievances/new" element={<GrievanceForm />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
