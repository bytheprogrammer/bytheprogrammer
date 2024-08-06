import React, { useState } from 'react';
import { Container, Typography, Box, Tab, Tabs } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import DataFetcher from './components/DataFetcher';
import StockChart from './components/StockChart';
import FinancialRatios from './components/FinancialRatios';
import PortfolioAnalysis from './components/PortfolioAnalysis';
import TechnicalIndicators from './components/TechnicalIndicators';
import ComparisonChart from './components/ComparisonChart';
import PortfolioRiskAnalysis from './components/PortfolioRiskAnalysis';
import './App.css';

function App() {
  const [stockData, setStockData] = useState({});
  const [tabValue, setTabValue] = useState('1');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" className="app-container">
      <Typography variant="h3" component="h1" gutterBottom className="app-title">
        Gelişmiş Finansal Veri Analizi Aracı
      </Typography>
      <DataFetcher setStockData={setStockData} />
      {Object.keys(stockData).length > 0 && (
        <Box mt={4}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="finance tabs">
                <Tab label="Hisse Senedi Grafiği" value="1" />
                <Tab label="Finansal Oranlar" value="2" />
                <Tab label="Teknik Göstergeler" value="3" />
                <Tab label="Karşılaştırma" value="4" />
                <Tab label="Portföy Analizi" value="5" />
                <Tab label="Risk Analizi" value="6" />
              </Tabs>
            </Box>
            <TabPanel value="1"><StockChart data={stockData} /></TabPanel>
            <TabPanel value="2"><FinancialRatios data={stockData} /></TabPanel>
            <TabPanel value="3"><TechnicalIndicators data={stockData} /></TabPanel>
            <TabPanel value="4"><ComparisonChart data={stockData} /></TabPanel>
            <TabPanel value="5"><PortfolioAnalysis data={stockData} /></TabPanel>
            <TabPanel value="6"><PortfolioRiskAnalysis data={stockData} /></TabPanel>
          </TabContext>
        </Box>
      )}
    </Container>
  );
}

export default App;