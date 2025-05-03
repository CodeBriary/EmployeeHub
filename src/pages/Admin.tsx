import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { 
  Employee, 
  employees, 
  getEmployeeById, 
  getPayrollByEmployeeId,
  getDivisionById,
  snoopyPayroll 
} from '../data/employeeData';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function Admin() {
  const { isAdmin } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [salaryUpdateDialogOpen, setSalaryUpdateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    Fname: '',
    Lname: '',
    email: '',
    jobTitle: '',
    division: '',
    Salary: 0,
    SSN: ''
  });
  const [salaryUpdateData, setSalaryUpdateData] = useState({
    minSalary: 58000,
    maxSalary: 105000,
    percentage: 3.2
  });
  const [payrollData, setPayrollData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Handle employee search
  const handleSearch = () => {
    setLoading(true);
    try {
      const results = employees.filter(emp => 
        emp.Fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.Lname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.SSN.includes(searchQuery) ||
        emp.empid.toString().includes(searchQuery)
      );
      setSearchResults(results);
      setError('');
    } catch (err) {
      setError('Failed to search employees');
    }
    setLoading(false);
  };

  // Handle employee selection
  const handleEmployeeSelect = (employee: Employee) => {
    setSelectedEmployee(employee);
    setFormData({
      Fname: employee.Fname,
      Lname: employee.Lname,
      email: employee.email,
      jobTitle: employee.jobTitle || '',
      division: employee.division || '',
      Salary: employee.Salary,
      SSN: employee.SSN
    });
    setEditDialogOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'Salary' ? parseFloat(value) || 0 : value
    });
  };

  // Handle salary update input changes
  const handleSalaryUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSalaryUpdateData({
      ...salaryUpdateData,
      [name]: parseFloat(value) || 0
    });
  };

  // Handle employee update
  const handleUpdateEmployee = () => {
    if (selectedEmployee) {
      // Update employee logic here
      setEditDialogOpen(false);
    }
  };

  // Handle salary update
  const handleUpdateSalaries = () => {
    // Update salaries logic here
    setSalaryUpdateDialogOpen(false);
  };

  // Load payroll data
  useEffect(() => {
    if (tabValue === 2) { // Payroll Reports tab
      setLoading(true);
      try {
        // Get all payroll data
        const allPayroll = snoopyPayroll; // This should be expanded to include all employees
        setPayrollData(allPayroll);
        setError('');
      } catch (err) {
        setError('Failed to load payroll data');
      }
      setLoading(false);
    }
  }, [tabValue]);

  if (!isAdmin) {
    return (
      <Box>
        <Alert severity="error">
          You do not have permission to access this page.
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Employee Search" />
          <Tab label="Salary Updates" />
          <Tab label="Payroll Reports" />
        </Tabs>
      </Box>

      {/* Employee Search Tab */}
      <TabPanel value={tabValue} index={0}>
        <Box>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Search Employees
            </Typography>
            <Box display="flex" gap={2} mb={3}>
              <TextField
                fullWidth
                label="Search by Name, SSN, or Employee ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                variant="contained" 
                onClick={handleSearch}
                disabled={loading}
              >
                Search
              </Button>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Job Title</TableCell>
                    <TableCell>Division</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Salary</TableCell>
                    <TableCell>SSN</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchResults.map((employee) => (
                    <TableRow key={employee.empid}>
                      <TableCell>{employee.empid}</TableCell>
                      <TableCell>{`${employee.Fname} ${employee.Lname}`}</TableCell>
                      <TableCell>{employee.jobTitle || 'Not specified'}</TableCell>
                      <TableCell>{employee.division || 'Not specified'}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>${employee.Salary.toLocaleString()}</TableCell>
                      <TableCell>{employee.SSN}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outlined" 
                          size="small"
                          onClick={() => handleEmployeeSelect(employee)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </TabPanel>

      {/* Salary Updates Tab */}
      <TabPanel value={tabValue} index={1}>
        <Box>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Bulk Salary Updates
            </Typography>
            <Box display="flex" gap={2} mb={3}>
              <TextField
                label="Minimum Salary"
                type="number"
                name="minSalary"
                value={salaryUpdateData.minSalary}
                onChange={handleSalaryUpdateChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
              <TextField
                label="Maximum Salary"
                type="number"
                name="maxSalary"
                value={salaryUpdateData.maxSalary}
                onChange={handleSalaryUpdateChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
              <TextField
                label="Percentage Increase"
                type="number"
                name="percentage"
                value={salaryUpdateData.percentage}
                onChange={handleSalaryUpdateChange}
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
              />
              <Button 
                variant="contained" 
                onClick={() => setSalaryUpdateDialogOpen(true)}
              >
                Update Salaries
              </Button>
            </Box>
          </Paper>
        </Box>
      </TabPanel>

      {/* Payroll Reports Tab */}
      <TabPanel value={tabValue} index={2}>
        <Box>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Payroll Reports
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Employee ID</TableCell>
                    <TableCell>Pay Date</TableCell>
                    <TableCell>Gross Earnings</TableCell>
                    <TableCell>Federal Tax</TableCell>
                    <TableCell>Medicare</TableCell>
                    <TableCell>Social Security</TableCell>
                    <TableCell>State Tax</TableCell>
                    <TableCell>401(k)</TableCell>
                    <TableCell>Health Care</TableCell>
                    <TableCell>Net Pay</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {payrollData.map((payroll) => (
                    <TableRow key={payroll.payID}>
                      <TableCell>{payroll.empid}</TableCell>
                      <TableCell>{new Date(payroll.pay_date).toLocaleDateString()}</TableCell>
                      <TableCell>${payroll.earnings.toLocaleString()}</TableCell>
                      <TableCell>${payroll.fed_tax.toLocaleString()}</TableCell>
                      <TableCell>${payroll.fed_med.toLocaleString()}</TableCell>
                      <TableCell>${payroll.fed_SS.toLocaleString()}</TableCell>
                      <TableCell>${payroll.state_tax.toLocaleString()}</TableCell>
                      <TableCell>${payroll.retire_401k.toLocaleString()}</TableCell>
                      <TableCell>${payroll.health_care.toLocaleString()}</TableCell>
                      <TableCell>
                        ${(payroll.earnings - 
                          payroll.fed_tax - 
                          payroll.fed_med - 
                          payroll.fed_SS - 
                          payroll.state_tax - 
                          payroll.retire_401k - 
                          payroll.health_care
                        ).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </TabPanel>

      {/* Edit Employee Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="Fname"
            label="First Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.Fname}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="Lname"
            label="Last Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.Lname}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="jobTitle"
            label="Job Title"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.jobTitle}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="division"
            label="Division"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.division}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="Salary"
            label="Salary"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.Salary}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="SSN"
            label="SSN"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.SSN}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateEmployee} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Salary Update Confirmation Dialog */}
      <Dialog open={salaryUpdateDialogOpen} onClose={() => setSalaryUpdateDialogOpen(false)}>
        <DialogTitle>Confirm Salary Update</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to update salaries by {salaryUpdateData.percentage}% for employees
            earning between ${salaryUpdateData.minSalary.toLocaleString()} and ${salaryUpdateData.maxSalary.toLocaleString()}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSalaryUpdateDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateSalaries} variant="contained" color="primary">
            Confirm Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 