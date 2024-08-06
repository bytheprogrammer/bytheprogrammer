import React, { useState } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';

function PortfolioAnalysis({ data }) {
  const [shares, setShares] = useState('');
  const [result, setResult] = useState(null);

  const analyzePortfolio = () => {
    const latestDate = Object.keys(data['Time Series (Daily)'])[0];
    const latestPrice = parseFloat(data['Time Series (Daily)'][latestDate]['4. close']);
    const portfolioValue = latestPrice * parseInt(shares);

    setResult({
      currentPrice: latestPrice.toFixed(2),
      totalValue: portfolioValue.toFixed(2),
    });
  };

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        Portföy Analizi
      </Typography>
      <TextField
        label="Hisse Senedi Adedi"
        type="number"
        value={shares}
        onChange={(e) => setShares(e.target.value)}
      />
      <Button variant="contained" onClick={analyzePortfolio} sx={{ ml: 2 }}>
        Analiz Et
      </Button>
      {result && (
        <Box mt={2}>
          <Typography>Güncel Fiyat: ${result.currentPrice}</Typography>
          <Typography>Toplam Portföy Değeri: ${result.totalValue}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default PortfolioAnalysis;