import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Avatar, 
  Button, 
  TextField, 
  Box, 
  Typography, 
  Container,
  Alert,
  Divider
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const validateUsername = (value: string) => {
    // Check if username follows the required format
    // First letter capitalized, rest lowercase, must end with .admin or .employee
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

  const validateConfirmPassword = (value: string) => {
    if (value !== password) {
      setConfirmPasswordError('Passwords do not match');
      return false;
    }
    setConfirmPasswordError('');
    return true;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    
    // Validate all fields
    const isUsernameValid = validateUsername(username);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);
    
    if (!isUsernameValid || !isPasswordValid || !isConfirmPasswordValid) {
      return;
    }

    if (!fullName || !email) {
      setError('All fields are required');
      return;
    }

    // In a real application, you would send this data to your backend
    // For now, we'll just simulate saving to "database" by storing in localStorage
    try {
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Extract role from username suffix
      const isAdmin = username.endsWith('.admin');
      const baseName = username.replace(/\.(admin|employee)$/, '');
      
      // Store in localStorage for now (in a real app, this would be in a database)
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if username already exists
      if (users.some((user: any) => user.username === username)) {
        setError('Username already exists');
        return;
      }
      
      // Add new user
      users.push({
        username,
        password, // In a real app, this would be hashed
        fullName,
        email,
        role: isAdmin ? 'admin' : 'employee',
        employeeId: !isAdmin ? `EMP${Math.floor(Math.random() * 9000) + 1000}` : undefined,
        createdAt: new Date().toISOString()
      });
      
      localStorage.setItem('users', JSON.stringify(users));
      
      setSuccess(true);
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err) {
      setError('Failed to register. Please try again.');
    }
  };

  if (success) {
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
          <Alert severity="success" sx={{ width: '100%', mb: 3 }}>
            Registration successful! Redirecting to login...
          </Alert>
        </Box>
      </Container>
    );
  }

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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
            {error}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="Full Name"
            name="fullName"
            autoFocus
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!usernameError}
            helperText={usernameError || "Must start with capital letter and end with .admin or .employee"}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError || "Must contain at least one digit and no special characters"}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!confirmPasswordError}
            helperText={confirmPasswordError}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          
          <Divider sx={{ my: 2 }} />
          
          <Box textAlign="center">
            <Typography variant="body2">
              Already have an account?{' '}
              <Link to="/login" style={{ textDecoration: 'none' }}>
                Login here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
} 