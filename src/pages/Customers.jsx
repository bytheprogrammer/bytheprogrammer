import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, Paper } from '@mui/material';
import { mockCustomers } from '../services/mockData';

function Customers() {
  const [customers, setCustomers] = useState(mockCustomers);

  return (
    <div>
      <Typography variant="h4" gutterBottom>Müşteriler</Typography>
      <Paper elevation={3}>
        <List>
          {customers.map(customer => (
            <ListItem key={customer.id}>
              <ListItemText 
                primary={customer.name} 
                secondary={`Email: ${customer.email} | Telefon: ${customer.phone}`} 
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
}

export default Customers;