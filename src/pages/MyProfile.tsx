import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { getEmployeeById, getPayrollByEmployeeId, getDivisionById } from '../data/employeeData';

interface EmployeeData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  division: string;
  hireDate: string;
  salary: number;
  ssn: string;
  divisionDetails?: {
    city: string;
    address: string;
    state: string;
    country: string;
    postalCode: string;
  };
}

export default function MyProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState<EmployeeData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployeeData = () => {
      setLoading(true);
      
      try {
        if (user?.employeeId) {
          const employeeData = getEmployeeById(user.employeeId);
          if (employeeData) {
            // Get division details
            const divisionDetails = getDivisionById(999); // HQ division ID
            
            setEmployee({
              id: employeeData.empid,
              firstName: employeeData.Fname,
              lastName: employeeData.Lname,
              email: employeeData.email,
              jobTitle: employeeData.jobTitle || 'Not specified',
              division: employeeData.division || 'Not specified',
              hireDate: employeeData.HireDate,
              salary: employeeData.Salary,
              ssn: employeeData.SSN,
              divisionDetails: divisionDetails ? {
                city: divisionDetails.city,
                address: divisionDetails.addressLine1,
                state: divisionDetails.state,
                country: divisionDetails.country,
                postalCode: divisionDetails.postalCode
              } : undefined
            });
          } else {
            setError('Employee information not found.');
          }
        } else {
          setError('No employee ID found.');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load employee data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchEmployeeData();
  }, [user]);

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
                  primary="SSN" 
                  secondary={employee.ssn} 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Division" 
                  secondary={employee.division} 
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
                  primary="Annual Salary" 
                  secondary={`$${employee.salary.toLocaleString()}`} 
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
                  primary="Hire Date" 
                  secondary={new Date(employee.hireDate).toLocaleDateString()} 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Employee ID" 
                  secondary={employee.id} 
                />
              </ListItem>
              {employee.divisionDetails && (
                <>
                  <ListItem>
                    <ListItemText 
                      primary="Division Location" 
                      secondary={`${employee.divisionDetails.city}, ${employee.divisionDetails.state}`} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Division Address" 
                      secondary={`${employee.divisionDetails.address}, ${employee.divisionDetails.city}, ${employee.divisionDetails.state} ${employee.divisionDetails.postalCode}`} 
                    />
                  </ListItem>
                </>
              )}
            </List>
          </Grid>
        </Grid>
        
        <Box display="flex" justifyContent="center" mt={3}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/my-pay-statements')}
          >
            View My Pay Statements
          </Button>
        </Box>
      </Paper>
    </Box>
  );
} 