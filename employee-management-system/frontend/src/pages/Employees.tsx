import { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Employee type definition
interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
}

export default function Employees() {
  // Mock data for employees
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: 'John Doe', position: 'Software Engineer', department: 'Engineering', email: 'john@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', position: 'HR Manager', department: 'Human Resources', email: 'jane@example.com', phone: '987-654-3210' },
    { id: 3, name: 'Bob Johnson', position: 'Product Manager', department: 'Product', email: 'bob@example.com', phone: '555-123-4567' },
    { id: 4, name: 'Alice Brown', position: 'UX Designer', department: 'Design', email: 'alice@example.com', phone: '444-333-2222' },
    { id: 5, name: 'Charlie Wilson', position: 'Marketing Specialist', department: 'Marketing', email: 'charlie@example.com', phone: '111-222-3333' },
  ]);

  // State for dialog
  const [open, setOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    email: '',
    phone: ''
  });

  // Handle opening dialog for adding new employee
  const handleAddClick = () => {
    setCurrentEmployee(null);
    setFormData({
      name: '',
      position: '',
      department: '',
      email: '',
      phone: ''
    });
    setOpen(true);
  };

  // Handle opening dialog for editing employee
  const handleEditClick = (employee: Employee) => {
    setCurrentEmployee(employee);
    setFormData({
      name: employee.name,
      position: employee.position,
      department: employee.department,
      email: employee.email,
      phone: employee.phone
    });
    setOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle saving employee (add or update)
  const handleSave = () => {
    if (currentEmployee) {
      // Update existing employee
      setEmployees(employees.map(emp => 
        emp.id === currentEmployee.id 
          ? { ...emp, ...formData } 
          : emp
      ));
    } else {
      // Add new employee
      const newEmployee: Employee = {
        id: Math.max(0, ...employees.map(e => e.id)) + 1,
        ...formData
      };
      setEmployees([...employees, newEmployee]);
    }
    setOpen(false);
  };

  // Handle deleting employee
  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          Employees
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={handleAddClick}
        >
          Add Employee
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell align="right">
                  <IconButton 
                    color="primary" 
                    onClick={() => handleEditClick(employee)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="error" 
                    onClick={() => handleDelete(employee.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Employee Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {currentEmployee ? 'Edit Employee' : 'Add New Employee'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Full Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="position"
            label="Position"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.position}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="department"
            label="Department"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.department}
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
            name="phone"
            label="Phone"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 