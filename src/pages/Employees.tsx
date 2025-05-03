import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  InputAdornment,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';
import { employees, Employee } from '../data/employeeData';

const Employees: React.FC = () => {
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setEmployeeList(employees);
      setLoading(false);
    } catch (err) {
      setError('Failed to load employees');
      setLoading(false);
    }
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setEmployeeList(employees);
      return;
    }

    const filteredEmployees = employees.filter(emp => {
      const searchValue = query.toLowerCase();
      switch (searchType) {
        case 'name':
          return `${emp.Fname} ${emp.Lname}`.toLowerCase().includes(searchValue);
        case 'id':
          return emp.empid.toString().includes(searchValue);
        case 'ssn':
          return emp.SSN.includes(searchValue);
        default:
          return true;
      }
    });
    setEmployeeList(filteredEmployees);
  };

  const handleOpen = (employee?: Employee) => {
    if (employee) {
      setSelectedEmployee(employee);
    } else {
      setSelectedEmployee(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEmployee(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (selectedEmployee) {
      setSelectedEmployee({
        ...selectedEmployee,
        [name]: value
      });
    }
  };

  const handleSave = () => {
    if (selectedEmployee) {
      if (selectedEmployee.empid) {
        // Update existing employee
        const updatedList = employeeList.map(emp =>
          emp.empid === selectedEmployee.empid ? selectedEmployee : emp
        );
        setEmployeeList(updatedList);
      } else {
        // Add new employee
        const newEmployee = {
          ...selectedEmployee,
          empid: Math.max(...employeeList.map(e => e.empid)) + 1
        };
        setEmployeeList([...employeeList, newEmployee]);
      }
    }
    handleClose();
  };

  const handleDelete = (id: number) => {
    setEmployeeList(employeeList.filter(emp => emp.empid !== id));
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Employee Management
      </Typography>

      {/* Search Section */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Search By</InputLabel>
          <Select
            value={searchType}
            label="Search By"
            onChange={(e) => setSearchType(e.target.value)}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="id">ID</MenuItem>
            <MenuItem value="ssn">SSN</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={`Search by ${searchType}...`}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpen()}
        sx={{ mb: 2 }}
      >
        Add Employee
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Division</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Hire Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeList.map((employee) => (
              <TableRow key={employee.empid}>
                <TableCell>{employee.empid}</TableCell>
                <TableCell>{`${employee.Fname} ${employee.Lname}`}</TableCell>
                <TableCell>{employee.jobTitle || 'N/A'}</TableCell>
                <TableCell>{employee.division || 'N/A'}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>${employee.Salary.toLocaleString()}</TableCell>
                <TableCell>{new Date(employee.HireDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(employee)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(employee.empid)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedEmployee?.empid ? 'Edit Employee' : 'Add Employee'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mt: 1 }}>
            <Box>
              <TextField
                fullWidth
                label="First Name"
                name="Fname"
                value={selectedEmployee?.Fname || ''}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="Last Name"
                name="Lname"
                value={selectedEmployee?.Lname || ''}
                onChange={handleInputChange}
              />
            </Box>
            <Box sx={{ gridColumn: 'span 2' }}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={selectedEmployee?.email || ''}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="Job Title"
                name="jobTitle"
                value={selectedEmployee?.jobTitle || ''}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="Division"
                name="division"
                value={selectedEmployee?.division || ''}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="Salary"
                name="Salary"
                type="number"
                value={selectedEmployee?.Salary || ''}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="SSN"
                name="SSN"
                value={selectedEmployee?.SSN || ''}
                onChange={handleInputChange}
              />
            </Box>
            <Box sx={{ gridColumn: 'span 2' }}>
              <TextField
                fullWidth
                label="Hire Date"
                name="HireDate"
                type="date"
                value={selectedEmployee?.HireDate || ''}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Employees; 