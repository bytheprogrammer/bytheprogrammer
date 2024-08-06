import React, { useState } from 'react';
import { Typography, TextField, Button, Grid } from '@mui/material';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

function ComparisonChart({ data }) {
  const [comparisonSymbol, setComparisonSymbol] = useState('');
  const [comparisonData, setComparisonData] = useState(null);

  const fetchComparisonData = async () => {
    try {
      const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${comparisonSymbol}&apikey=YOUR_API_KEY&outputsize=full`);
      setComparisonData(response.data);
    } catch (error) {
      console.error('Karşılaştırma verisi çekme hatası:', error);
    }
  };

  const prepareChartData = () => {
    if (!comparisonData) return null;

    const mainSymbol = data['Meta Data']['2. Symbol'];
    const compSymbol = comparisonData['Meta Data']['2. Symbol'];

    const dates = Object.keys(data['Time Series (Daily)'])
      .filter(date => comparisonData['Time Series (Daily)'][date])
      .reverse();

    const mainPrices = dates.map(date => parseFloat(data['Time Series (Daily)'][date]['4. close']));
    const compPrices = dates.map(date => parseFloat(comparisonData['Time Series (Daily)'][date]['4. close']));

    // Normalize prices
    const mainStartPrice = mainPrices[0];
    const compStartPrice = compPrices[0];

    const normalizedMainPrices = mainPrices.map(price => (price / mainStartPrice - 1) * 100);
    const normalizedCompPrices = compPrices.map(price => (price / compStartPrice - 1) * 100);

    return {
      labels: dates,
      datasets: [
        {
          label: `${mainSymbol} Performans`,
          data: normalizedMainPrices,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
        {
          label: `${compSymbol} Performans`,
          data: normalizedCompPrices,
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1,
        },
      ],
    };
  };

  const chartData = prepareChartData();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Hisse Senedi Karşılaştırma
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Karşılaştırılacak Hisse Senedi Sembolü"
          value={comparisonSymbol}
          onChange={(e) => setComparisonSymbol(e.target.value)}
        />
        <Button variant="contained" onClick={fetchComparisonData} sx={{ ml: 2 }}>
          Karşılaştır
        </Button>
      </Grid>
      {chartData && (
        <Grid item xs={12}>
          <Line data={chartData} options={{ responsive: true }} />
        </Grid>
      )}
    </Grid>
  );
}

export default ComparisonChart;