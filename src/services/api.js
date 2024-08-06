import axios from 'axios';

const API_URL = 'https://api.example.com'; // Backend API URL'nizi buraya ekleyin

export const getCustomers = async () => {
  try {
    const response = await axios.get(`${API_URL}/customers`);
    return response.data;
  } catch (error) {
    console.error("Müşteri verileri alınırken hata oluştu:", error);
    throw error;
  }
};

export const getDashboardData = async () => {
  try {
    const response = await axios.get(`${API_URL}/dashboard`);
    return response.data;
  } catch (error) {
    console.error("Dashboard verileri alınırken hata oluştu:", error);
    throw error;
  }
};

export const getSales = async () => {
  try {
    const response = await axios.get(`${API_URL}/sales`);
    return response.data;
  } catch (error) {
    console.error("Satış verileri alınırken hata oluştu:", error);
    throw error;
  }
};

export const getReports = async () => {
  try {
    const response = await axios.get(`${API_URL}/reports`);
    return response.data;
  } catch (error) {
    console.error("Rapor verileri alınırken hata oluştu:", error);
    throw error;
  }
};