import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Sales from './pages/Sales';
import Reports from './pages/Reports';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            CRM Sistemi
          </Typography>
          <Button color="inherit" component={Link} to="/">Ana Sayfa</Button>
          <Button color="inherit" component={Link} to="/customers">Müşteriler</Button>
          <Button color="inherit" component={Link} to="/sales">Satışlar</Button>
          <Button color="inherit" component={Link} to="/reports">Raporlar</Button>
        </Toolbar>
      </AppBar>

      <Container>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;