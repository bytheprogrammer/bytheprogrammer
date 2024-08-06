import React, { useState } from 'react';
import { Typography, TextField, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function PortfolioRiskAnalysis({ data }) {
  const [portfolio, setPortfolio] = useState([{ symbol: '', shares: 0 }]);
  const [riskAnalysis, setRiskAnalysis] = useState(null);

  const handleAddStock = () => {
    setPortfolio([...portfolio, { symbol: '', shares: 0 }]);
  };

  const handleInputChange = (index, field, value) => {
    const newPortfolio = [...portfolio];
    newPortfolio[index][field] = field === 'shares' ? parseInt(value) : value;
    setPortfolio(newPortfolio);
  };

  const calculateRiskAnalysis = () => {
    // Bu örnek için basit bir risk analizi yapıyoruz. Gerçek uygulamada daha karmaşık hesaplamalar gerekebilir.
    const totalValue = portfolio.reduce((sum, stock) => {
      const price = parseFloat(data['Time Series (Daily)'][Object.keys(data['Time Series (Daily)'])[0]]['4. close']);
      return sum + stock.shares * price;
    }, 0);

    const stockWeights = portfolio.map(stock => {
      const price = parseFloat(data['Time Series (Daily)'][Object.keys(data['Time Series (Daily)'])[0]]['4. close']);
      return (stock.shares * price) / totalValue;
    });

    const volatility = 0.2; // Örnek volatilite değeri
    const portfolioRisk = Math.sqrt(stockWeights.reduce((sum, weight) => sum + Math.pow(weight * volatility, 2), 0));

    setRiskAnalysis({
      totalValue: totalValue.toFixed(2),
      portfolioRisk: (portfolioRisk * 100).toFixed(2),
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Portföy Risk Analizi
        </Typography>
      </Grid>
      {portfolio.map((stock, index) => (
        <Grid item xs={12} key={index}>
          <TextField
            label="Hisse Senedi Sembolü"
            value={stock.symbol}
            onChange={(e) => handleInputChange(index, 'symbol', e.target.value)}
            sx={{ mr: 2 }}
          />
          <TextField
            label="Hisse Senedi Adedi"
            type="number"
            value={stock.shares}
            onChange={(e) => handleInputChange(index, 'shares', e.target.value)}
          />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleAddStock} sx={{ mr: 2 }}>
          Hisse Senedi Ekle
        </Button>
        <Button variant="contained" onClick={calculateRiskAnalysis}>
          Risk Analizi Yap
        </Button>
      </Grid>
      {riskAnalysis && (
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Toplam Portföy Değeri</TableCell>
                  <TableCell>Portföy Riski (%)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>${riskAnalysis.totalValue}</TableCell>
                  <TableCell>{riskAnalysis.portfolioRisk}%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
    </Grid>
  );
}

export default PortfolioRiskAnalysis;