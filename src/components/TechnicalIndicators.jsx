import React from 'react';
import { Typography, Grid } from '@mui/material';
import { Line } from 'react-chartjs-2';

function TechnicalIndicators({ data }) {
  const calculateSMA = (period) => {
    const prices = Object.values(data['Time Series (Daily)'])
      .map(day => parseFloat(day['4. close']))
      .reverse();
    
    return prices.map((_, index, array) => {
      if (index < period - 1) return null;
      const sum = array.slice(index - period + 1, index + 1).reduce((a, b) => a + b, 0);
      return sum / period;
    }).filter(val => val !== null);
  };

  const calculateRSI = (period) => {
    const prices = Object.values(data['Time Series (Daily)'])
      .map(day => parseFloat(day['4. close']))
      .reverse();
    
    const deltas = prices.map((price, index) => {
      if (index === 0) return 0;
      return price - prices[index - 1];
    });

    const gains = deltas.map(delta => delta > 0 ? delta : 0);
    const losses = deltas.map(delta => delta < 0 ? -delta : 0);

    const avgGain = gains.slice(0, period).reduce((a, b) => a + b, 0) / period;
    const avgLoss = losses.slice(0, period).reduce((a, b) => a + b, 0) / period;

    let rs = avgGain / avgLoss;
    let rsi = 100 - (100 / (1 + rs));

    const rsiValues = [rsi];

    for (let i = period; i < prices.length; i++) {
      const currentGain = gains[i];
      const currentLoss = losses[i];

      avgGain = ((avgGain * (period - 1)) + currentGain) / period;
      avgLoss = ((avgLoss * (period - 1)) + currentLoss) / period;

      rs = avgGain / avgLoss;
      rsi = 100 - (100 / (1 + rs));
      rsiValues.push(rsi);
    }

    return rsiValues;
  };

  const dates = Object.keys(data['Time Series (Daily)']).reverse();
  const sma20 = calculateSMA(20);
  const sma50 = calculateSMA(50);
  const rsi = calculateRSI(14);

  const chartData = {
    labels: dates.slice(-sma50.length),
    datasets: [
      {
        label: 'Kapanış Fiyatı',
        data: Object.values(data['Time Series (Daily)'])
          .map(day => parseFloat(day['4. close']))
          .reverse()
          .slice(-sma50.length),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: '20 Günlük SMA',
        data: sma20.slice(-sma50.length),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
      {
        label: '50 Günlük SMA',
        data: sma50,
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1,
      },
    ],
  };

  const rsiChartData = {
    labels: dates.slice(-rsi.length),
    datasets: [
      {
        label: 'RSI',
        data: rsi,
        borderColor: 'rgb(255, 159, 64)',
        tension: 0.1,
      },
    ],
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Teknik Göstergeler
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Line data={chartData} options={{ responsive: true }} />
      </Grid>
      <Grid item xs={12}>
        <Line data={rsiChartData} options={{ responsive: true }} />
      </Grid>
    </Grid>
  );
}

export default TechnicalIndicators;