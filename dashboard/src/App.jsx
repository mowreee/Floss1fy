import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AdminLayout from './layouts/AdminLayout';
import PatientLayout from './layouts/PatientLayout';

// Admin pages
import Dashboard from './pages/admin/Dashboard';
import Appointments from './pages/admin/Appointments';
import Patients from './pages/admin/Patients';
import Records from './pages/admin/Records';
import Transactions from './pages/admin/Transactions';
import './styles/adminstyles/theme.css';

// Patient pages
import PatientDashboard from './pages/patient/Dashboard';
import MedicalHistory from './pages/patient/MedicalHistory';
import Profile from './pages/patient/Profile';
import PatientAppointments from './pages/patient/PatientAppointments';
import PatientTransactions from './pages/patient/Transactions';

import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

const App = () => {
  const [userType, setUserType] = useState(null);

  const handleLoginSuccess = (role) => {
    setUserType(role); // 'admin' or 'patient'
  };

  if (!userType) {
    return (
      <Routes>
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return userType === 'admin' ? (
    <AdminLayout>
      <Routes>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/appointments" element={<Appointments />} />
        <Route path="/admin/patients" element={<Patients />} />
        <Route path="/admin/records" element={<Records />} />
        <Route path="/admin/transactions" element={<Transactions />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </AdminLayout>
  ) : (
    <PatientLayout>
      <Routes>
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/patient/appointments" element={<PatientAppointments />} />
        <Route path="/patient/medical-history" element={<MedicalHistory />} />
        <Route path="/patient/profile" element={<Profile />} />
        <Route path="/patient/transactions" element={<PatientTransactions />} />
        <Route path="*" element={<Navigate to="/patient/dashboard" replace />} />
      </Routes>
    </PatientLayout>
  );
};

export default App;
