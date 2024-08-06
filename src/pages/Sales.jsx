import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import { mockSales } from '../services/mockData';

function Sales() {
  const [sales, setSales] = useState(mockSales);
  const [filteredSales, setFilteredSales] = useState(mockSales);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filtered = sales.filter(sale => 
      sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.product.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSales(filtered);
  }, [searchTerm, sales]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>Satışlar</Typography>
      <TextField
        label="Ara"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Müşteri</TableCell>
              <TableCell>Ürün</TableCell>
              <TableCell>Tarih</TableCell>
              <TableCell>Tutar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.customer}</TableCell>
                <TableCell>{sale.product}</TableCell>
                <TableCell>{sale.date}</TableCell>
                <TableCell>{sale.amount} TL</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Sales;