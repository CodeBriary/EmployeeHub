import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Avatar, 
  Button, 
  TextField, 
  Box, 
  Typography, 
  Container,
  FormControlLabel,
  Checkbox,
  Alert,
  Divider
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateUsername = (value: string) => {
    // Check if username follows the required format
    // First letter capitalized, rest lowercase, can end with .admin or .employee
    const nameRegex = /^[A-Z][a-z]+(\.admin|\.employee)$/;
    if (!nameRegex.test(value)) {
      setUsernameError('Username must start with a capital letter and end with .admin or .employee');
      return false;
    }
    setUsernameError('');
    return true;
  };

  const validatePassword = (value: string) => {
    // Password must contain at least one digit and no special characters
    const passwordRegex = /^[a-zA-Z0-9]*[0-9][a-zA-Z0-9]*$/;
    if (!passwordRegex.test(value)) {
      setPasswordError('Password must contain at least one digit and no special characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    
    // Validate input format
    const isUsernameValid = validateUsername(username);
    const isPasswordValid = validatePassword(password);
    
    if (!isUsernameValid || !isPasswordValid) {
      return;
    }

    // Check credentials against stored users
    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Find user by username
      const user = users.find((u: any) => u.username === username);
      
      if (!user) {
        setError('User not found. Please sign up first.');
        return;
      }
      
      // Check password (in a real app, this would be hashed and compared securely)
      if (user.password !== password) {
        setError('Invalid password');
        return;
      }
      
      // Extract base name and role
      const isAdmin = username.endsWith('.admin');
      const baseName = username.replace(/\.(admin|employee)$/, '');
      
      // Log in the user
      login({
        username: user.username,
        role: user.role,
        name: user.fullName || baseName,
        employeeId: user.employeeId
      });
      
      // Navigate to dashboard
      navigate('/dashboard');
      
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Employee Management System
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 1 }}>
          Company Z
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
            {error}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!usernameError}
            helperText={usernameError}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          
          <Divider sx={{ my: 2 }} />
          
          <Box textAlign="center">
            <Typography variant="body2">
              Don't have an account?{' '}
              <Link to="/signup" style={{ textDecoration: 'none' }}>
                Sign up here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
} 