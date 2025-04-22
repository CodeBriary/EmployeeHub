import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Box,
  Typography,
  Paper,
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
  SelectChangeEvent,
  Chip,
  Grid,
  Card,
  CardContent,
  Alert
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ReceiptIcon from '@mui/icons-material/Receipt';

interface PayStatement {
  id: number;
  employeeId: string;
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

// Mock pay statement data
const payStatementData: PayStatement[] = [
  { 
    id: 1, 
    employeeId: 'EMP001', 
    payDate: '2023-03-15', 
    periodStartDate: '2023-03-01',
    periodEndDate: '2023-03-15',
    grossPay: 3958.33, 
    netPay: 2968.75, 
    taxWithholding: 989.58,
    federalTax: 593.75,
    stateTax: 197.92,
    medicareTax: 57.40,
    socialSecurityTax: 245.42,
    retirementDeduction: 197.92,
    healthInsuranceDeduction: 150.00,
    otherDeductions: 0.00
  },
  { 
    id: 2, 
    employeeId: 'EMP001', 
    payDate: '2023-03-31', 
    periodStartDate: '2023-03-16',
    periodEndDate: '2023-03-31',
    grossPay: 3958.33, 
    netPay: 2968.75, 
    taxWithholding: 989.58,
    federalTax: 593.75,
    stateTax: 197.92,
    medicareTax: 57.40,
    socialSecurityTax: 245.42,
    retirementDeduction: 197.92,
    healthInsuranceDeduction: 150.00,
    otherDeductions: 0.00
  },
  { 
    id: 3, 
    employeeId: 'EMP001', 
    payDate: '2023-04-15', 
    periodStartDate: '2023-04-01',
    periodEndDate: '2023-04-15',
    grossPay: 3958.33, 
    netPay: 2968.75, 
    taxWithholding: 989.58,
    federalTax: 593.75,
    stateTax: 197.92,
    medicareTax: 57.40,
    socialSecurityTax: 245.42,
    retirementDeduction: 197.92,
    healthInsuranceDeduction: 150.00,
    otherDeductions: 0.00
  },
  { 
    id: 4, 
    employeeId: 'EMP001', 
    payDate: '2023-04-30', 
    periodStartDate: '2023-04-16',
    periodEndDate: '2023-04-30',
    grossPay: 3958.33, 
    netPay: 2968.75, 
    taxWithholding: 989.58,
    federalTax: 593.75,
    stateTax: 197.92,
    medicareTax: 57.40,
    socialSecurityTax: 245.42,
    retirementDeduction: 197.92,
    healthInsuranceDeduction: 150.00,
    otherDeductions: 0.00
  },
];

export default function MyPayStatements() {
  const { user } = useAuth();
  const [selectedYear, setSelectedYear] = useState('2023');
  const [selectedPayStatement, setSelectedPayStatement] = useState<PayStatement | null>(null);
  
  // Filter pay statements based on employee ID and year
  const filteredPayStatements = payStatementData.filter(statement => 
    statement.employeeId === (user?.employeeId || 'EMP001') && 
    statement.payDate.startsWith(selectedYear)
  );

  const handleYearChange = (event: SelectChangeEvent) => {
    setSelectedYear(event.target.value);
  };

  const handleViewPayStatement = (statement: PayStatement) => {
    setSelectedPayStatement(statement);
  };

  const handleDownloadPayStatement = (statement: PayStatement) => {
    // In a real app, this would generate and download a PDF file
    alert(`Downloading pay statement for ${statement.payDate}`);
  };

  const handleClosePayStatement = () => {
    setSelectedPayStatement(null);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Pay Statements
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        View and download your pay statements here. Pay statements are available for the past 2 years.
      </Alert>

      {/* Filter Controls */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <ReceiptIcon sx={{ fontSize: 28, color: 'primary.main', mr: 1 }} />
          <Typography variant="h6">
            Pay Statements
          </Typography>
        </Box>
        
        <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel id="year-select-label">Year</InputLabel>
            <Select
              labelId="year-select-label"
              id="year-select"
              value={selectedYear}
              label="Year"
              onChange={handleYearChange}
            >
              <MenuItem value="2022">2022</MenuItem>
              <MenuItem value="2023">2023</MenuItem>
            </Select>
          </FormControl>
          
          <Chip 
            label={`${filteredPayStatements.length} Pay Statements`} 
            color="primary" 
          />
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        {/* Pay Statements List */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Pay Date</TableCell>
                <TableCell>Pay Period</TableCell>
                <TableCell align="right">Gross Pay</TableCell>
                <TableCell align="right">Net Pay</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPayStatements.map((statement) => (
                <TableRow key={statement.id}>
                  <TableCell>{statement.payDate}</TableCell>
                  <TableCell>{statement.periodStartDate} - {statement.periodEndDate}</TableCell>
                  <TableCell align="right">${statement.grossPay.toLocaleString()}</TableCell>
                  <TableCell align="right">${statement.netPay.toLocaleString()}</TableCell>
                  <TableCell align="right">
                    <Box display="flex" justifyContent="flex-end" gap={1}>
                      <Button 
                        size="small" 
                        variant="outlined"
                        onClick={() => handleViewPayStatement(statement)}
                      >
                        View
                      </Button>
                      <Button 
                        size="small" 
                        variant="contained"
                        startIcon={<FileDownloadIcon />}
                        onClick={() => handleDownloadPayStatement(statement)}
                      >
                        Download
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {filteredPayStatements.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No pay statements found for the selected year.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      
      {/* Selected Pay Statement Detail */}
      {selectedPayStatement && (
        <Paper sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">
              Pay Statement: {selectedPayStatement.payDate}
            </Typography>
            <Button 
              variant="outlined" 
              onClick={handleClosePayStatement}
            >
              Close
            </Button>
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3}>
            {/* Summary Card */}
            <Grid component={Box} gridColumn={{ xs: 12, md: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Summary
                  </Typography>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>Gross Pay:</Typography>
                    <Typography fontWeight="bold">${selectedPayStatement.grossPay.toLocaleString()}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>Total Taxes:</Typography>
                    <Typography color="error">${selectedPayStatement.taxWithholding.toLocaleString()}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>Total Deductions:</Typography>
                    <Typography color="error">
                      ${(selectedPayStatement.retirementDeduction + 
                         selectedPayStatement.healthInsuranceDeduction + 
                         selectedPayStatement.otherDeductions).toLocaleString()}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box display="flex" justifyContent="space-between">
                    <Typography fontWeight="bold">Net Pay:</Typography>
                    <Typography fontWeight="bold" color="primary">
                      ${selectedPayStatement.netPay.toLocaleString()}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Taxes Card */}
            <Grid component={Box} gridColumn={{ xs: 12, md: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Tax Withholdings
                  </Typography>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>Federal Tax:</Typography>
                    <Typography>${selectedPayStatement.federalTax.toLocaleString()}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>State Tax:</Typography>
                    <Typography>${selectedPayStatement.stateTax.toLocaleString()}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>Medicare:</Typography>
                    <Typography>${selectedPayStatement.medicareTax.toLocaleString()}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>Social Security:</Typography>
                    <Typography>${selectedPayStatement.socialSecurityTax.toLocaleString()}</Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box display="flex" justifyContent="space-between">
                    <Typography fontWeight="bold">Total Taxes:</Typography>
                    <Typography fontWeight="bold" color="error">
                      ${selectedPayStatement.taxWithholding.toLocaleString()}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Deductions Card */}
            <Grid component={Box} gridColumn={{ xs: 12, md: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Deductions
                  </Typography>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>401(k) Retirement:</Typography>
                    <Typography>${selectedPayStatement.retirementDeduction.toLocaleString()}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>Health Insurance:</Typography>
                    <Typography>${selectedPayStatement.healthInsuranceDeduction.toLocaleString()}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>Other Deductions:</Typography>
                    <Typography>${selectedPayStatement.otherDeductions.toLocaleString()}</Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box display="flex" justifyContent="space-between">
                    <Typography fontWeight="bold">Total Deductions:</Typography>
                    <Typography fontWeight="bold" color="error">
                      ${(selectedPayStatement.retirementDeduction + 
                         selectedPayStatement.healthInsuranceDeduction + 
                         selectedPayStatement.otherDeductions).toLocaleString()}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          <Box display="flex" justifyContent="center" mt={3}>
            <Button 
              variant="contained" 
              startIcon={<FileDownloadIcon />}
              onClick={() => handleDownloadPayStatement(selectedPayStatement)}
            >
              Download Pay Statement
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
} 