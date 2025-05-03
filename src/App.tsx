import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MyProfile from './pages/MyProfile';
import MyPayStatements from './pages/MyPayStatements';
import Employees from './pages/Employees';
import Reports from './pages/Reports';
import Payroll from './pages/Payroll';
import Admin from './pages/Admin';
import { useAuth } from './contexts/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode; requiredRole?: string }> = ({ 
  children, 
  requiredRole 
}) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/dashboard" />} />
      
      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="my-profile" element={<MyProfile />} />
        <Route path="my-pay-statements" element={<MyPayStatements />} />
        
        {/* Admin only routes */}
        <Route path="employees" element={
          <ProtectedRoute requiredRole="admin">
            <Employees />
          </ProtectedRoute>
        } />
        <Route path="reports" element={
          <ProtectedRoute requiredRole="admin">
            <Reports />
          </ProtectedRoute>
        } />
        <Route path="payroll" element={
          <ProtectedRoute requiredRole="admin">
            <Payroll />
          </ProtectedRoute>
        } />
        <Route path="admin" element={
          <ProtectedRoute requiredRole="admin">
            <Admin />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  );
};

export default App;
