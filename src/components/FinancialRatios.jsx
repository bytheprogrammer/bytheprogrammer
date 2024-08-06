import React from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function FinancialRatios({ data }) {
  const latestDate = Object.keys(data['Time Series (Daily)'])[0];
  const latestData = data['Time Series (Daily)'][latestDate];

  const calculateRatios = () => {
    const close = parseFloat(latestData['4. close']);
    const open = parseFloat(latestData['1. open']);
    const high = parseFloat(latestData['2. high']);
    const low = parseFloat(latestData['3. low']);

    return {
      'Günlük Değişim (%)': ((close - open) / open * 100).toFixed(2),
      'Gün İçi Değişim Aralığı (%)': ((high - low) / low * 100).toFixed(2),
    };
  };

  const ratios = calculateRatios();

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Finansal Oranlar
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Oran</TableCell>
              <TableCell align="right">Değer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(ratios).map(([name, value]) => (
              <TableRow key={name}>
                <TableCell component="th" scope="row">
                  {name}
                </TableCell>
                <TableCell align="right">{value}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default FinancialRatios;