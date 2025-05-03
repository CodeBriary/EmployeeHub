import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { user, isAdmin } = useAuth();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Typography variant="subtitle1" sx={{ mb: 4 }}>
        Welcome back, {user?.name}
      </Typography>

      <Grid container spacing={3}>
        <Grid component={Box} gridColumn={{ xs: 12, md: 6, lg: 4 }}>
          <Card>
            <CardHeader title="Recent Announcements" />
            <Divider />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                No new announcements at this time.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid component={Box} gridColumn={{ xs: 12, md: 6, lg: 4 }}>
          <Card>
            <CardHeader title="Quick Stats" />
            <Divider />
            <CardContent>
              {isAdmin ? (
                <>
                  <Typography variant="body2" gutterBottom>
                    Total Employees: 45
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Departments: 6
                  </Typography>
                  <Typography variant="body2">
                    New Hires (30 days): 3
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="body2" gutterBottom>
                    Hours This Week: 37.5
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    PTO Balance: 15 days
                  </Typography>
                  <Typography variant="body2">
                    Next Pay Date: 04/30/2025
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid component={Box} gridColumn={{ xs: 12, md: 6, lg: 4 }}>
          <Card>
            <CardHeader title="Upcoming Events" />
            <Divider />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                No upcoming events scheduled.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
} 