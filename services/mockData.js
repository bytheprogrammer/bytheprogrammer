// src/services/mockData.js

export const mockCustomers = [
    { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@example.com', phone: '555-1234' },
    { id: 2, name: 'Ayşe Demir', email: 'ayse@example.com', phone: '555-5678' },
    { id: 3, name: 'Mehmet Kaya', email: 'mehmet@example.com', phone: '555-9012' },
  ];
  
  export const mockSales = [
    { id: 1, customer: 'Ahmet Yılmaz', product: 'Laptop', date: '2024-08-01', amount: 5000 },
    { id: 2, customer: 'Ayşe Demir', product: 'Telefon', date: '2024-08-02', amount: 3000 },
    { id: 3, customer: 'Mehmet Kaya', product: 'Tablet', date: '2024-08-03', amount: 2000 },
  ];
  
  export const mockDashboardData = {
    salesSummary: { total: 10000, thisMonth: 5000 },
    recentActivities: [
      { description: 'Yeni müşteri eklendi: Ahmet Yılmaz', date: '2024-08-01' },
      { description: 'Satış yapıldı: Laptop', date: '2024-08-02' },
    ],
    upcomingTasks: [
      { title: 'Müşteri görüşmesi: Ayşe Demir', dueDate: '2024-08-10' },
      { title: 'Ürün tanıtımı', dueDate: '2024-08-15' },
    ],
  };
  
  export const mockReportData = {
    salesByMonth: [
      { month: 'Ocak', sales: 4000 },
      { month: 'Şubat', sales: 3000 },
      { month: 'Mart', sales: 5000 },
    ],
    customerDistribution: [
      { name: 'Yeni Müşteriler', value: 400 },
      { name: 'Tekrar Eden Müşteriler', value: 300 },
      { name: 'VIP Müşteriler', value: 300 },
    ],
  };