import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function StockChart({ data }) {
  const chartData = {
    labels: Object.keys(data['Time Series (Daily)']).slice(0, 30).reverse(),
    datasets: [
      {
        label: 'Kapanış Fiyatı',
        data: Object.values(data['Time Series (Daily)'])
          .slice(0, 30)
          .map((day) => day['4. close'])
          .reverse(),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${data['Meta Data']['2. Symbol']} Hisse Senedi Grafiği`,
      },
    },
  };

  return <Line options={options} data={chartData} />;
}

export default StockChart;