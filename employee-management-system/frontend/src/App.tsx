import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useAuth } from './contexts/AuthContext';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Reports from './pages/Reports';
import EmployeeSearch from './pages/EmployeeSearch';
import MyProfile from './pages/MyProfile';
import MyPayStatements from './pages/MyPayStatements';
import Payroll from './pages/Payroll';
import Settings from './pages/Settings';

// Role-based route protection component
const ProtectedRoute = ({ 
  children, 
  requiredRole 
}: { 
  children: JSX.Element, 
  requiredRole?: 'admin' | 'employee' 
}) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRole === 'admin' && !isAdmin) {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* Admin-only routes */}
          <Route path="employees" element={
            <ProtectedRoute requiredRole="admin">
              <Employees />
            </ProtectedRoute>
          } />
          <Route path="employee-search" element={
            <ProtectedRoute requiredRole="admin">
              <EmployeeSearch />
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
          
          {/* Routes accessible to all authenticated users */}
          <Route path="my-profile" element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          } />
          <Route path="my-pay-statements" element={
            <ProtectedRoute>
              <MyPayStatements />
            </ProtectedRoute>
          } />
          <Route path="settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
        </Route>
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Box>
  );
}

export default App;
