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
import { employees, Employee } from '../data/employeeData';

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

interface PayStatement {
  id: number;
  employeeId: string;
  employeeName: string;
  payDate: string;
  periodStartDate: string;
  periodEndDate: string;
  grossPay: number;
  netPay: number;
  taxWithholding: number;
  federalTax: number;
  stateTax: number;
  medicareTax: number;
  socialSecurityTax: number;
  retirementDeduction: number;
  healthInsuranceDeduction: number;
  otherDeductions: number;
}

interface JobTitleStats {
  employeeCount: number;
  totalMonthlyPay: number;
}

interface DivisionStats {
  employeeCount: number;
  totalMonthlyPay: number;
}

// Remove mock data and use actual data
const employeeData = employees;

// Generate pay statements from employee data
const generatePayStatements = (emp: Employee, payDate: string, startDate: string, endDate: string): PayStatement => {
  const monthlyGrossPay = emp.Salary / 12;
  const federalTax = monthlyGrossPay * 0.15; // 15% federal tax
  const stateTax = monthlyGrossPay * 0.05; // 5% state tax
  const medicareTax = monthlyGrossPay * 0.0145; // 1.45% Medicare
  const socialSecurityTax = monthlyGrossPay * 0.062; // 6.2% Social Security
  const retirementDeduction = monthlyGrossPay * 0.05; // 5% 401k
  const healthInsurance = 150; // Flat rate health insurance
  
  const totalDeductions = federalTax + stateTax + medicareTax + socialSecurityTax + retirementDeduction + healthInsurance;
  const netPay = monthlyGrossPay - totalDeductions;
  
  return {
    id: emp.empid,
    employeeId: `EMP${emp.empid.toString().padStart(3, '0')}`,
    employeeName: `${emp.Fname} ${emp.Lname}`,
    payDate,
    periodStartDate: startDate,
    periodEndDate: endDate,
    grossPay: monthlyGrossPay,
    netPay,
    taxWithholding: federalTax + stateTax,
    federalTax,
    stateTax,
    medicareTax,
    socialSecurityTax,
    retirementDeduction,
    healthInsuranceDeduction: healthInsurance,
    otherDeductions: 0
  };
};

// Generate pay statements for all employees
const payStatementData: PayStatement[] = employees.flatMap(emp => [
  // First half of March
  generatePayStatements(emp, '2023-03-15', '2023-03-01', '2023-03-15'),
  // Second half of March
  generatePayStatements(emp, '2023-03-31', '2023-03-16', '2023-03-31'),
  // First half of April
  generatePayStatements(emp, '2023-04-15', '2023-04-01', '2023-04-15'),
  // Second half of April
  generatePayStatements(emp, '2023-04-30', '2023-04-16', '2023-04-30')
]);

// Calculate job title statistics from actual data
const jobTitlePayData = Object.entries(
  employees.reduce<Record<string, JobTitleStats>>((acc, emp) => {
    const jobTitle = emp.jobTitle as string;
    if (!acc[jobTitle]) {
      acc[jobTitle] = { employeeCount: 0, totalMonthlyPay: 0 };
    }
    acc[jobTitle].employeeCount++;
    acc[jobTitle].totalMonthlyPay += emp.Salary / 12;
    return acc;
  }, {})
).map(([jobTitle, data]) => ({
  jobTitle,
  employeeCount: data.employeeCount,
  totalMonthlyPay: Math.round(data.totalMonthlyPay)
}));

// Calculate division statistics from actual data
const divisionPayData = Object.entries(
  employees.reduce<Record<string, DivisionStats>>((acc, emp) => {
    const division = emp.division as string;
    if (!acc[division]) {
      acc[division] = { employeeCount: 0, totalMonthlyPay: 0 };
    }
    acc[division].employeeCount++;
    acc[division].totalMonthlyPay += emp.Salary / 12;
    return acc;
  }, {})
).map(([division, data]) => ({
  division,
  employeeCount: data.employeeCount,
  totalMonthlyPay: Math.round(data.totalMonthlyPay)
}));

export default function Reports() {
  const { user, isAdmin } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [month, setMonth] = useState('march');
  const [year, setYear] = useState('2023');
  const [employeeId, setEmployeeId] = useState('all');

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
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

  // Filter pay statements based on employee ID and month
  const filteredPayStatements = payStatementData.filter(statement => {
    const statementMonth = statement.payDate.split('-')[1].toLowerCase();
    const monthMatch = month === 'march' ? statementMonth === '03' : statementMonth === '04';
    const employeeMatch = employeeId === 'all' || statement.employeeId === employeeId;
    const userMatch = !isAdmin ? statement.employeeId === `EMP${user?.employeeId?.toString().padStart(3, '0')}` : true;
    
    return monthMatch && employeeMatch && userMatch;
  });

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
                <MenuItem value="march">March</MenuItem>
                <MenuItem value="april">April</MenuItem>
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
                  {employees.map((emp) => (
                    <MenuItem key={emp.empid} value={`EMP${emp.empid.toString().padStart(3, '0')}`}>
                      {emp.Fname} {emp.Lname} (EMP{emp.empid.toString().padStart(3, '0')})
                    </MenuItem>
                  ))}
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
                  <TableCell>Period</TableCell>
                  {isAdmin && <TableCell>Employee ID</TableCell>}
                  {isAdmin && <TableCell>Employee Name</TableCell>}
                  <TableCell align="right">Gross Pay</TableCell>
                  <TableCell align="right">Federal Tax</TableCell>
                  <TableCell align="right">State Tax</TableCell>
                  <TableCell align="right">Medicare</TableCell>
                  <TableCell align="right">Social Security</TableCell>
                  <TableCell align="right">Retirement</TableCell>
                  <TableCell align="right">Health Insurance</TableCell>
                  <TableCell align="right">Net Pay</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPayStatements.map((statement) => (
                  <TableRow key={`${statement.employeeId}-${statement.payDate}`}>
                    <TableCell>{statement.payDate}</TableCell>
                    <TableCell>{statement.periodStartDate} - {statement.periodEndDate}</TableCell>
                    {isAdmin && <TableCell>{statement.employeeId}</TableCell>}
                    {isAdmin && <TableCell>{statement.employeeName}</TableCell>}
                    <TableCell align="right">${statement.grossPay.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                    <TableCell align="right">${statement.federalTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                    <TableCell align="right">${statement.stateTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                    <TableCell align="right">${statement.medicareTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                    <TableCell align="right">${statement.socialSecurityTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                    <TableCell align="right">${statement.retirementDeduction.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                    <TableCell align="right">${statement.healthInsuranceDeduction.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                    <TableCell align="right">${statement.netPay.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
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