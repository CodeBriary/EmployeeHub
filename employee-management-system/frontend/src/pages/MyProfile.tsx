import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  Alert
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

interface EmployeeData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  jobTitle: string;
  manager: string;
  hireDate: string;
  address: string;
  emergencyContact: string;
}

export default function MyProfile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState<EmployeeData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // In a real app, this would fetch employee data from the backend
    // For this prototype, we'll simulate with mock data
    const fetchEmployeeData = () => {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        try {
          // Mock data
          const mockEmployee: EmployeeData = {
            id: 'EMP001',
            firstName: 'John',
            lastName: 'Employee',
            email: 'john.employee@company-z.com',
            phone: '(555) 123-4567',
            department: 'Engineering',
            jobTitle: 'Software Developer',
            manager: 'Jane Manager',
            hireDate: '2020-03-15',
            address: '123 Main St, Anytown, USA 12345',
            emergencyContact: 'Jane Doe (Spouse) - (555) 987-6543'
          };
          
          setEmployee(mockEmployee);
          setLoading(false);
        } catch (err) {
          setError('Failed to load employee data. Please try again later.');
          setLoading(false);
        }
      }, 1000);
    };
    
    fetchEmployeeData();
  }, []);

  if (loading) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Typography>Loading your information...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!employee) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Alert severity="warning">Employee information not found.</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        As an employee, you can view your personal information below. If any information is incorrect, please contact HR.
      </Alert>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5">
            {employee.firstName} {employee.lastName}
          </Typography>
          <Typography variant="subtitle1" color="primary">
            ID: {employee.id}
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid component={Box} gridColumn={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            
            <List>
              <ListItem>
                <ListItemText 
                  primary="Email" 
                  secondary={employee.email} 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Phone" 
                  secondary={employee.phone} 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Home Address" 
                  secondary={employee.address} 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Emergency Contact" 
                  secondary={employee.emergencyContact} 
                />
              </ListItem>
            </List>
          </Grid>
          
          <Grid component={Box} gridColumn={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>
              Employment Information
            </Typography>
            
            <List>
              <ListItem>
                <ListItemText 
                  primary="Department" 
                  secondary={employee.department} 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Job Title" 
                  secondary={employee.jobTitle} 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Manager" 
                  secondary={employee.manager} 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Hire Date" 
                  secondary={employee.hireDate} 
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
        
        <Box display="flex" justifyContent="center" mt={3}>
          <Button variant="contained" color="primary" href="/my-pay-statements">
            View My Pay Statements
          </Button>
        </Box>
      </Paper>
    </Box>
  );
} 