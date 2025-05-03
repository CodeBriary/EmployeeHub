import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Switch,
  Divider,
  Button,
  Alert
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

export default function Settings() {
  const { user } = useAuth();
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = React.useState(false);
  const [success, setSuccess] = React.useState('');

  const handleSaveSettings = () => {
    // In a real app, this would save settings to a backend
    setSuccess('Settings saved successfully');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Account Preferences
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <List>
          <ListItem>
            <ListItemText
              primary="Email Notifications"
              secondary="Receive email notifications for important updates"
            />
            <Switch
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Dark Mode"
              secondary="Toggle dark mode for the application interface"
            />
            <Switch
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Two-Factor Authentication"
              secondary="Enable two-factor authentication for additional security"
            />
            <Switch
              checked={twoFactorAuth}
              onChange={(e) => setTwoFactorAuth(e.target.checked)}
            />
          </ListItem>
        </List>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" onClick={handleSaveSettings}>
            Save Settings
          </Button>
        </Box>
      </Paper>
    </Box>
  );
} 