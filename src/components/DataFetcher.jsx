import React, { useState } from 'react';
import { TextField, Button, Box, Autocomplete } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const stockSymbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'FB', 'TSLA']; // Örnek hisse senetleri

function DataFetcher({ setStockData }) {
  const [symbol, setSymbol] = useState('');
  const [startDate, setStartDate] = useState(new Date(new Date().setFullYear(new Date().getFullYear() - 1)));
  const [endDate, setEndDate] = useState(new Date());

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=YOUR_API_KEY&outputsize=full`);
      const filteredData = filterDataByDateRange(response.data, startDate, endDate);
      setStockData(filteredData);
    } catch (error) {
      console.error('Veri çekme hatası:', error);
    }
  };

  const filterDataByDateRange = (data, start, end) => {
    const filteredTimeSeries = Object.entries(data['Time Series (Daily)'])
      .filter(([date]) => {
        const currentDate = new Date(date);
        return currentDate >= start && currentDate <= end;
      })
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});

    return {
      ...data,
      'Time Series (Daily)': filteredTimeSeries
    };
  };

  return (
    <Box className="data-fetcher">
      <Autocomplete
        options={stockSymbols}
        renderInput={(params) => <TextField {...params} label="Hisse Senedi Sembolü" />}
        value={symbol}
        onChange={(event, newValue) => setSymbol(newValue)}
      />
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
      <Button variant="contained" onClick={fetchData} className="fetch-button">
        Veri Getir
      </Button>
    </Box>
  );
}

export default DataFetcher;