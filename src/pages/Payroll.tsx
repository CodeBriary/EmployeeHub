import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControlLabel,
  Switch,
  Chip
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import PaidIcon from '@mui/icons-material/Paid';
import { employees } from '../data/employeeData';

interface Employee {
  empid: number;
  Fname: string;
  Lname: string;
  email: string;
  HireDate: string;
  Salary: number;
  selected: boolean;
  newSalary?: number;
  jobTitle?: string;
  division?: string;
}

export default function Payroll() {
  const [minSalary, setMinSalary] = useState<string>('');
  const [maxSalary, setMaxSalary] = useState<string>('');
  const [increasePercentage, setIncreasePercentage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [employeesList, setEmployeesList] = useState<Employee[]>(
    employees.map(emp => ({
      ...emp,
      selected: false
    }))
  );
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [hasFiltered, setHasFiltered] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Handle filter by salary range
  const handleFilterEmployees = () => {
    setError('');
    setSuccess('');
    setShowPreview(false);
    
    // Validate inputs
    if (!minSalary || !maxSalary || !increasePercentage) {
      setError('Please fill in all fields');
      return;
    }
    
    const min = parseFloat(minSalary);
    const max = parseFloat(maxSalary);
    const percentage = parseFloat(increasePercentage);
    
    if (isNaN(min) || isNaN(max) || isNaN(percentage)) {
      setError('Please enter valid numbers');
      return;
    }
    
    if (min >= max) {
      setError('Minimum salary must be less than maximum salary');
      return;
    }
    
    if (percentage <= 0 || percentage > 20) {
      setError('Percentage must be between 0 and 20');
      return;
    }
    
    // Filter employees within salary range
    const filtered = employeesList.map(emp => {
      if (emp.Salary >= min && emp.Salary < max) {
        return {
          ...emp,
          selected: true,
          newSalary: Math.round(emp.Salary * (1 + percentage / 100))
        };
      }
      return { ...emp, selected: false, newSalary: undefined };
    });
    
    setFilteredEmployees(filtered);
    setHasFiltered(true);
    
    const selectedCount = filtered.filter(emp => emp.selected).length;
    if (selectedCount === 0) {
      setError('No employees found in the specified salary range');
    } else {
      setShowPreview(true);
    }
  };

  // Handle save salary changes
  const handleSaveChanges = () => {
    // In a real app, this would send updates to the backend
    // For this prototype, we'll just update the local state
    const updatedEmployees = employeesList.map(emp => {
      const filtered = filteredEmployees.find(f => f.empid === emp.empid);
      if (filtered && filtered.selected) {
        return {
          ...emp,
          Salary: filtered.newSalary!
        };
      }
      return emp;
    });
    
    setEmployeesList(updatedEmployees);
    setFilteredEmployees([]);
    setHasFiltered(false);
    setShowPreview(false);
    setSuccess(`Successfully updated salaries for ${filteredEmployees.filter(e => e.selected).length} employees`);
    
    // Reset form
    setMinSalary('');
    setMaxSalary('');
    setIncreasePercentage('');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Payroll Management
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        As an admin, you can update employee salaries by specifying a percentage increase 
        for employees within a certain salary range.
      </Alert>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <PaidIcon sx={{ fontSize: 28, color: 'primary.main', mr: 1 }} />
          <Typography variant="h6">
            Salary Update Configuration
          </Typography>
        </Box>
        
        <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
          <TextField
            label="Minimum Salary"
            type="number"
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
            variant="outlined"
            placeholder="e.g. 50000"
            helperText="Salary greater than or equal to"
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
            }}
            sx={{ minWidth: 200 }}
          />
          
          <TextField
            label="Maximum Salary"
            type="number"
            value={maxSalary}
            onChange={(e) => setMaxSalary(e.target.value)}
            variant="outlined"
            placeholder="e.g. 100000"
            helperText="Salary less than"
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
            }}
            sx={{ minWidth: 200 }}
          />
          
          <TextField
            label="Increase Percentage"
            type="number"
            value={increasePercentage}
            onChange={(e) => setIncreasePercentage(e.target.value)}
            variant="outlined"
            placeholder="e.g. 3.5"
            helperText="Percentage increase (0-20%)"
            InputProps={{
              endAdornment: <Typography sx={{ ml: 1 }}>%</Typography>,
            }}
            sx={{ minWidth: 200 }}
          />
        </Box>
        
        <Button
          variant="contained"
          color="primary"
          onClick={handleFilterEmployees}
        >
          Preview Changes
        </Button>
      </Paper>
      
      {showPreview && (
        <Paper sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">
              Salary Update Preview
            </Typography>
            <Chip 
              label={`${filteredEmployees.filter(e => e.selected).length} employees selected`} 
              color="primary" 
            />
          </Box>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Hire Date</TableCell>
                  <TableCell align="right">Current Salary</TableCell>
                  <TableCell align="right">New Salary</TableCell>
                  <TableCell align="right">Difference</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow 
                    key={employee.empid}
                    sx={{
                      backgroundColor: employee.selected ? 'rgba(25, 118, 210, 0.08)' : 'inherit'
                    }}
                  >
                    <TableCell>EMP{employee.empid.toString().padStart(3, '0')}</TableCell>
                    <TableCell>{employee.Fname} {employee.Lname}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{new Date(employee.HireDate).toLocaleDateString()}</TableCell>
                    <TableCell align="right">${employee.Salary.toLocaleString()}</TableCell>
                    <TableCell align="right">
                      {employee.selected 
                        ? `$${employee.newSalary?.toLocaleString()}` 
                        : '—'}
                    </TableCell>
                    <TableCell align="right">
                      {employee.selected && employee.newSalary 
                        ? <>
                            +${(employee.newSalary - employee.Salary).toLocaleString()} 
                            <Typography component="span" color="text.secondary" sx={{ ml: 1 }}>
                              ({parseFloat(increasePercentage)}%)
                            </Typography>
                          </>
                        : '—'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSaveChanges}
              disabled={filteredEmployees.filter(e => e.selected).length === 0}
            >
              Save Changes
            </Button>
          </Box>
        </Paper>
      )}
      
      {!showPreview && !success && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            All Employees
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Hire Date</TableCell>
                  <TableCell align="right">Current Salary</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employeesList.map((employee) => (
                  <TableRow key={employee.empid}>
                    <TableCell>EMP{employee.empid.toString().padStart(3, '0')}</TableCell>
                    <TableCell>{employee.Fname} {employee.Lname}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{new Date(employee.HireDate).toLocaleDateString()}</TableCell>
                    <TableCell align="right">${employee.Salary.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
} 