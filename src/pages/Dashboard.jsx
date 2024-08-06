import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, List, ListItem, ListItemText } from '@mui/material';
import { mockDashboardData } from '../services/mockData';

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(mockDashboardData);

  return (
    <div>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">Satış Özeti</Typography>
            <Typography>Toplam Satış: {dashboardData.salesSummary.total} TL</Typography>
            <Typography>Bu Ay: {dashboardData.salesSummary.thisMonth} TL</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">Son Aktiviteler</Typography>
            <List>
              {dashboardData.recentActivities.map((activity, index) => (
                <ListItem key={index}>
                  <ListItemText primary={activity.description} secondary={activity.date} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">Yaklaşan Görevler</Typography>
            <List>
              {dashboardData.upcomingTasks.map((task, index) => (
                <ListItem key={index}>
                  <ListItemText primary={task.title} secondary={task.dueDate} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;