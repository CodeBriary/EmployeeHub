import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Divider,
  Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  ssn: string;
  email: string;
  phone: string;
  department: string;
  jobTitle: string;
  salary: number;
  hireDate: string;
}

export default function EmployeeSearch() {
  // State for search parameters
  const [searchType, setSearchType] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Employee[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState('');

  // Handle search type change
  const handleSearchTypeChange = (event: SelectChangeEvent) => {
    setSearchType(event.target.value);
    setSearchQuery('');
  };

  // Handle search query change
  const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Handle search submission
  const handleSearch = () => {
    setError('');
    
    // Validate search query
    if (!searchQuery.trim()) {
      setError('Please enter a search term');
      return;
    }

    // In a real app, this would make an API call to search employees
    // For this prototype, we'll simulate with mock data
    const mockEmployees: Employee[] = [
      {
        id: 'EMP001',
        firstName: 'John',
        lastName: 'Doe',
        dob: '1985-05-15',
        ssn: 'XXX-XX-1234',
        email: 'john.doe@company-z.com',
        phone: '(555) 123-4567',
        department: 'Engineering',
        jobTitle: 'Senior Developer',
        salary: 95000,
        hireDate: '2018-03-10'
      },
      {
        id: 'EMP002',
        firstName: 'Jane',
        lastName: 'Smith',
        dob: '1990-10-20',
        ssn: 'XXX-XX-5678',
        email: 'jane.smith@company-z.com',
        phone: '(555) 987-6543',
        department: 'Marketing',
        jobTitle: 'Marketing Manager',
        salary: 85000,
        hireDate: '2019-07-15'
      },
      {
        id: 'EMP003',
        firstName: 'Robert',
        lastName: 'Johnson',
        dob: '1982-02-28',
        ssn: 'XXX-XX-9012',
        email: 'robert.johnson@company-z.com',
        phone: '(555) 456-7890',
        department: 'Finance',
        jobTitle: 'Financial Analyst',
        salary: 75000,
        hireDate: '2020-01-05'
      }
    ];

    // Filter based on search type and query
    let filteredResults: Employee[] = [];
    
    switch (searchType) {
      case 'name':
        const query = searchQuery.toLowerCase();
        filteredResults = mockEmployees.filter(
          emp => 
            emp.firstName.toLowerCase().includes(query) || 
            emp.lastName.toLowerCase().includes(query)
        );
        break;
      case 'empid':
        filteredResults = mockEmployees.filter(
          emp => emp.id.toLowerCase().includes(searchQuery.toLowerCase())
        );
        break;
      case 'ssn':
        // In a real app, SSN search would be highly secured and possibly hashed
        filteredResults = mockEmployees.filter(
          emp => emp.ssn.includes(searchQuery)
        );
        break;
      case 'dob':
        filteredResults = mockEmployees.filter(
          emp => emp.dob === searchQuery
        );
        break;
      default:
        filteredResults = [];
    }

    setSearchResults(filteredResults);
    setHasSearched(true);
  };

  // Handle view/edit employee
  const handleViewEmployee = (employeeId: string) => {
    // In a real app, this would navigate to employee detail view
    console.log(`View employee ${employeeId}`);
    // navigate(`/employees/${employeeId}`);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Employee Search
      </Typography>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <PersonSearchIcon sx={{ fontSize: 28, color: 'primary.main', mr: 1 }} />
          <Typography variant="h6">
            Search Criteria
          </Typography>
        </Box>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Grid container spacing={3}>
          <Grid component={Box} gridColumn={{ xs: 12, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="search-type-label">Search By</InputLabel>
              <Select
                labelId="search-type-label"
                id="search-type"
                value={searchType}
                label="Search By"
                onChange={handleSearchTypeChange}
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="empid">Employee ID</MenuItem>
                <MenuItem value="ssn">SSN</MenuItem>
                <MenuItem value="dob">Date of Birth</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid component={Box} gridColumn={{ xs: 12, md: 7 }}>
            <TextField
              fullWidth
              label={
                searchType === 'name' ? 'Enter Name' :
                searchType === 'empid' ? 'Enter Employee ID' :
                searchType === 'ssn' ? 'Enter SSN (Last 4 digits)' :
                'Enter Date of Birth (YYYY-MM-DD)'
              }
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchQueryChange}
              placeholder={
                searchType === 'name' ? 'e.g. John Doe' :
                searchType === 'empid' ? 'e.g. EMP001' :
                searchType === 'ssn' ? 'e.g. XXX-XX-1234' :
                'e.g. 1990-01-15'
              }
            />
          </Grid>
          
          <Grid component={Box} gridColumn={{ xs: 12, md: 2 }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSearch}
              sx={{ height: '56px' }}
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Search Results */}
      {hasSearched && (
        <Box>
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h6" gutterBottom>
            Search Results {searchResults.length > 0 ? `(${searchResults.length} found)` : ''}
          </Typography>
          
          {searchResults.length === 0 ? (
            <Alert severity="info">
              No employees found matching your search criteria.
            </Alert>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Employee ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Job Title</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchResults.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>{employee.id}</TableCell>
                      <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>{employee.jobTitle}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          onClick={() => handleViewEmployee(employee.id)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      )}
    </Box>
  );
} 