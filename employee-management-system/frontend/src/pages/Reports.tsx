import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
  Alert,
  SelectChangeEvent
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ReceiptIcon from '@mui/icons-material/Receipt';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import WorkIcon from '@mui/icons-material/Work';

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
      id={`report-tabpanel-${index}`}
      aria-labelledby={`report-tab-${index}`}
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

// Mock pay statement data
const payStatementData = [
  { id: 1, employeeId: 'EMP001', employeeName: 'John Doe', payDate: '2023-03-15', grossPay: 3958.33, netPay: 2968.75, taxWithholding: 989.58 },
  { id: 2, employeeId: 'EMP001', employeeName: 'John Doe', payDate: '2023-03-31', grossPay: 3958.33, netPay: 2968.75, taxWithholding: 989.58 },
  { id: 3, employeeId: 'EMP002', employeeName: 'Jane Smith', payDate: '2023-03-15', grossPay: 3541.67, netPay: 2656.25, taxWithholding: 885.42 },
  { id: 4, employeeId: 'EMP002', employeeName: 'Jane Smith', payDate: '2023-03-31', grossPay: 3541.67, netPay: 2656.25, taxWithholding: 885.42 },
  { id: 5, employeeId: 'EMP003', employeeName: 'Robert Johnson', payDate: '2023-03-15', grossPay: 3125.00, netPay: 2343.75, taxWithholding: 781.25 },
  { id: 6, employeeId: 'EMP003', employeeName: 'Robert Johnson', payDate: '2023-03-31', grossPay: 3125.00, netPay: 2343.75, taxWithholding: 781.25 },
];

// Mock job title pay data
const jobTitlePayData = [
  { jobTitle: 'Software Developer', employeeCount: 8, totalMonthlyPay: 68000 },
  { jobTitle: 'Marketing Manager', employeeCount: 3, totalMonthlyPay: 25500 },
  { jobTitle: 'Financial Analyst', employeeCount: 5, totalMonthlyPay: 37500 },
  { jobTitle: 'HR Specialist', employeeCount: 2, totalMonthlyPay: 13600 },
  { jobTitle: 'Product Manager', employeeCount: 4, totalMonthlyPay: 36800 },
];

// Mock division pay data
const divisionPayData = [
  { division: 'Engineering', employeeCount: 15, totalMonthlyPay: 127500 },
  { division: 'Marketing', employeeCount: 8, totalMonthlyPay: 64000 },
  { division: 'Finance', employeeCount: 7, totalMonthlyPay: 52500 },
  { division: 'Human Resources', employeeCount: 4, totalMonthlyPay: 28000 },
  { division: 'Product', employeeCount: 6, totalMonthlyPay: 51000 },
];

export default function Reports() {
  const { user, isAdmin } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [month, setMonth] = useState('march');
  const [year, setYear] = useState('2023');
  const [employeeId, setEmployeeId] = useState('all');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMonthChange = (event: SelectChangeEvent) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event: SelectChangeEvent) => {
    setYear(event.target.value);
  };

  const handleEmployeeIdChange = (event: SelectChangeEvent) => {
    setEmployeeId(event.target.value);
  };

  // Filter pay statements based on employee ID
  const filteredPayStatements = isAdmin 
    ? payStatementData 
    : payStatementData.filter(statement => statement.employeeId === (user?.employeeId || ''));

  // Handle download report
  const handleDownloadReport = () => {
    // In a real app, this would generate and download a CSV or PDF file
    alert('In a real application, this would download a report file.');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>

      {!isAdmin && (
        <Alert severity="info" sx={{ mb: 3 }}>
          As an employee, you can only view your own pay statement history.
        </Alert>
      )}

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="report tabs">
          <Tab 
            label="Pay Statement History" 
            icon={<ReceiptIcon />} 
            iconPosition="start"
          />
          {isAdmin && (
            <Tab 
              label="Pay by Job Title" 
              icon={<WorkIcon />} 
              iconPosition="start"
            />
          )}
          {isAdmin && (
            <Tab 
              label="Pay by Division" 
              icon={<GroupWorkIcon />} 
              iconPosition="start"
            />
          )}
        </Tabs>
      </Box>

      {/* Pay Statement History Report */}
      <TabPanel value={tabValue} index={0}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Pay Statement History
          </Typography>
          
          <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="month-label">Month</InputLabel>
              <Select
                labelId="month-label"
                id="month"
                value={month}
                label="Month"
                onChange={handleMonthChange}
              >
                <MenuItem value="january">January</MenuItem>
                <MenuItem value="february">February</MenuItem>
                <MenuItem value="march">March</MenuItem>
                <MenuItem value="april">April</MenuItem>
                {/* Add more months as needed */}
              </Select>
            </FormControl>
            
            <FormControl sx={{ minWidth: 100 }}>
              <InputLabel id="year-label">Year</InputLabel>
              <Select
                labelId="year-label"
                id="year"
                value={year}
                label="Year"
                onChange={handleYearChange}
              >
                <MenuItem value="2022">2022</MenuItem>
                <MenuItem value="2023">2023</MenuItem>
              </Select>
            </FormControl>
            
            {isAdmin && (
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel id="employee-label">Employee</InputLabel>
                <Select
                  labelId="employee-label"
                  id="employee"
                  value={employeeId}
                  label="Employee"
                  onChange={handleEmployeeIdChange}
                >
                  <MenuItem value="all">All Employees</MenuItem>
                  <MenuItem value="EMP001">John Doe (EMP001)</MenuItem>
                  <MenuItem value="EMP002">Jane Smith (EMP002)</MenuItem>
                  <MenuItem value="EMP003">Robert Johnson (EMP003)</MenuItem>
                </Select>
              </FormControl>
            )}
            
            <Button 
              variant="contained" 
              startIcon={<FileDownloadIcon />}
              onClick={handleDownloadReport}
            >
              Download Report
            </Button>
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Pay Date</TableCell>
                  {isAdmin && <TableCell>Employee ID</TableCell>}
                  {isAdmin && <TableCell>Employee Name</TableCell>}
                  <TableCell align="right">Gross Pay</TableCell>
                  <TableCell align="right">Tax Withholding</TableCell>
                  <TableCell align="right">Net Pay</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPayStatements.map((statement) => (
                  <TableRow key={statement.id}>
                    <TableCell>{statement.payDate}</TableCell>
                    {isAdmin && <TableCell>{statement.employeeId}</TableCell>}
                    {isAdmin && <TableCell>{statement.employeeName}</TableCell>}
                    <TableCell align="right">${statement.grossPay.toLocaleString()}</TableCell>
                    <TableCell align="right">${statement.taxWithholding.toLocaleString()}</TableCell>
                    <TableCell align="right">${statement.netPay.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </TabPanel>

      {/* Pay by Job Title Report - Admin Only */}
      <TabPanel value={tabValue} index={1}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Total Pay by Job Title
          </Typography>
          
          <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="month-label-job">Month</InputLabel>
              <Select
                labelId="month-label-job"
                id="month-job"
                value={month}
                label="Month"
                onChange={handleMonthChange}
              >
                <MenuItem value="january">January</MenuItem>
                <MenuItem value="february">February</MenuItem>
                <MenuItem value="march">March</MenuItem>
                <MenuItem value="april">April</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl sx={{ minWidth: 100 }}>
              <InputLabel id="year-label-job">Year</InputLabel>
              <Select
                labelId="year-label-job"
                id="year-job"
                value={year}
                label="Year"
                onChange={handleYearChange}
              >
                <MenuItem value="2022">2022</MenuItem>
                <MenuItem value="2023">2023</MenuItem>
              </Select>
            </FormControl>
            
            <Button 
              variant="contained" 
              startIcon={<FileDownloadIcon />}
              onClick={handleDownloadReport}
            >
              Download Report
            </Button>
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Job Title</TableCell>
                  <TableCell align="right">Number of Employees</TableCell>
                  <TableCell align="right">Total Monthly Pay</TableCell>
                  <TableCell align="right">Average Monthly Pay</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobTitlePayData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.jobTitle}</TableCell>
                    <TableCell align="right">{data.employeeCount}</TableCell>
                    <TableCell align="right">${data.totalMonthlyPay.toLocaleString()}</TableCell>
                    <TableCell align="right">
                      ${(data.totalMonthlyPay / data.employeeCount).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
                {/* Total Row */}
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                    {jobTitlePayData.reduce((sum, data) => sum + data.employeeCount, 0)}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                    ${jobTitlePayData.reduce((sum, data) => sum + data.totalMonthlyPay, 0).toLocaleString()}
                  </TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </TabPanel>

      {/* Pay by Division Report - Admin Only */}
      <TabPanel value={tabValue} index={2}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Total Pay by Division
          </Typography>
          
          <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="month-label-div">Month</InputLabel>
              <Select
                labelId="month-label-div"
                id="month-div"
                value={month}
                label="Month"
                onChange={handleMonthChange}
              >
                <MenuItem value="january">January</MenuItem>
                <MenuItem value="february">February</MenuItem>
                <MenuItem value="march">March</MenuItem>
                <MenuItem value="april">April</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl sx={{ minWidth: 100 }}>
              <InputLabel id="year-label-div">Year</InputLabel>
              <Select
                labelId="year-label-div"
                id="year-div"
                value={year}
                label="Year"
                onChange={handleYearChange}
              >
                <MenuItem value="2022">2022</MenuItem>
                <MenuItem value="2023">2023</MenuItem>
              </Select>
            </FormControl>
            
            <Button 
              variant="contained" 
              startIcon={<FileDownloadIcon />}
              onClick={handleDownloadReport}
            >
              Download Report
            </Button>
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Division</TableCell>
                  <TableCell align="right">Number of Employees</TableCell>
                  <TableCell align="right">Total Monthly Pay</TableCell>
                  <TableCell align="right">Average Monthly Pay</TableCell>
                  <TableCell align="right">% of Total Payroll</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {divisionPayData.map((data, index) => {
                  const totalPayroll = divisionPayData.reduce((sum, d) => sum + d.totalMonthlyPay, 0);
                  const percentOfTotal = (data.totalMonthlyPay / totalPayroll) * 100;
                  
                  return (
                    <TableRow key={index}>
                      <TableCell>{data.division}</TableCell>
                      <TableCell align="right">{data.employeeCount}</TableCell>
                      <TableCell align="right">${data.totalMonthlyPay.toLocaleString()}</TableCell>
                      <TableCell align="right">
                        ${(data.totalMonthlyPay / data.employeeCount).toLocaleString()}
                      </TableCell>
                      <TableCell align="right">{percentOfTotal.toFixed(1)}%</TableCell>
                    </TableRow>
                  );
                })}
                {/* Total Row */}
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                    {divisionPayData.reduce((sum, data) => sum + data.employeeCount, 0)}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                    ${divisionPayData.reduce((sum, data) => sum + data.totalMonthlyPay, 0).toLocaleString()}
                  </TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right">100%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </TabPanel>
    </Box>
  );
} 