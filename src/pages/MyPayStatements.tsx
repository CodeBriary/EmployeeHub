import { useState, useEffect } from 'react';
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
  Alert,
  Divider
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { getPayrollByEmployeeId, getEmployeeById } from '../data/employeeData';

interface PayrollData {
  payID: number;
  payDate: string;
  earnings: number;
  deductions: {
    fedTax: number;
    fedMed: number;
    fedSS: number;
    stateTax: number;
    retire401k: number;
    healthCare: number;
  };
  netPay: number;
}

export default function MyPayStatements() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [payrollData, setPayrollData] = useState<PayrollData[]>([]);
  const [employeeName, setEmployeeName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPayrollData = () => {
      setLoading(true);
      
      try {
        if (user?.employeeId) {
          const employeeData = getEmployeeById(user.employeeId);
          if (employeeData) {
            setEmployeeName(`${employeeData.Fname} ${employeeData.Lname}`);
            
            // Get payroll data
            const payroll = getPayrollByEmployeeId(user.employeeId);
            const formattedPayroll = payroll.map(pay => ({
              payID: pay.payID,
              payDate: pay.pay_date,
              earnings: pay.earnings,
              deductions: {
                fedTax: pay.fed_tax,
                fedMed: pay.fed_med,
                fedSS: pay.fed_SS,
                stateTax: pay.state_tax,
                retire401k: pay.retire_401k,
                healthCare: pay.health_care
              },
              netPay: pay.earnings - (pay.fed_tax + pay.fed_med + pay.fed_SS + 
                pay.state_tax + pay.retire_401k + pay.health_care)
            }));
            setPayrollData(formattedPayroll);
          } else {
            setError('Employee information not found.');
          }
        } else {
          setError('No employee ID found.');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load payroll data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchPayrollData();
  }, [user]);

  if (loading) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          My Pay Statements
        </Typography>
        <Typography>Loading your pay statements...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          My Pay Statements
        </Typography>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!payrollData.length) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          My Pay Statements
        </Typography>
        <Alert severity="warning">No pay statements found.</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Pay Statements
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        View your pay statements and deductions below. For any discrepancies, please contact HR.
      </Alert>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Box mb={3}>
          <Typography variant="h6" gutterBottom>
            {employeeName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Employee ID: {user?.employeeId}
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Pay Date</TableCell>
                <TableCell align="right">Gross Earnings</TableCell>
                <TableCell align="right">Federal Tax</TableCell>
                <TableCell align="right">Medicare</TableCell>
                <TableCell align="right">Social Security</TableCell>
                <TableCell align="right">State Tax</TableCell>
                <TableCell align="right">401(k)</TableCell>
                <TableCell align="right">Health Care</TableCell>
                <TableCell align="right">Net Pay</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payrollData.map((pay) => (
                <TableRow key={pay.payID}>
                  <TableCell>{new Date(pay.payDate).toLocaleDateString()}</TableCell>
                  <TableCell align="right">${pay.earnings.toFixed(2)}</TableCell>
                  <TableCell align="right">${pay.deductions.fedTax.toFixed(2)}</TableCell>
                  <TableCell align="right">${pay.deductions.fedMed.toFixed(2)}</TableCell>
                  <TableCell align="right">${pay.deductions.fedSS.toFixed(2)}</TableCell>
                  <TableCell align="right">${pay.deductions.stateTax.toFixed(2)}</TableCell>
                  <TableCell align="right">${pay.deductions.retire401k.toFixed(2)}</TableCell>
                  <TableCell align="right">${pay.deductions.healthCare.toFixed(2)}</TableCell>
                  <TableCell align="right">${pay.netPay.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
} 