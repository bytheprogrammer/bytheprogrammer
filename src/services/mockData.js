// src/services/mockData.js

export const mockCustomers = [
    { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@example.com', phone: '555-1234' },
    { id: 2, name: 'Ayşe Demir', email: 'ayse@example.com', phone: '555-5678' },
    { id: 3, name: 'Mehmet Kaya', email: 'mehmet@example.com', phone: '555-9012' },
    { id: 4, name: 'Asya Yanık', email: 'asya@example.com', phone: '555-4983'},
    { id: 5, name: 'Buğçe İrikaya', email: 'bugce@example.com', phone: '555-7031'},
    { id: 6, name: 'Hümeyra Bilmez', email: 'humeyra@example.com', phone: '555-2855'}
  ];
  
  export const mockSales = [
    { id: 1, customer: 'Ahmet Yılmaz', product: 'Laptop', date: '2024-08-01', amount: 5000 },
    { id: 2, customer: 'Ayşe Demir', product: 'Telefon', date: '2024-08-02', amount: 4000 },
    { id: 3, customer: 'Mehmet Kaya', product: 'Tablet', date: '2024-08-03', amount: 3000 },
    { id: 4, customer: 'Asya Yanık', product: 'Kulaklık', date: '2024-08-04', amount: 1000},
    { id: 5, customer: 'Buğçe irikaya', product: 'Akıllı Saat', date: '2024-08-05', amount: 2000},
    { id: 6, customer: 'Hümeyra Bilmez', product: 'Xbox', date: '2024-08-06', amount: 6000}
  ];
  
  export const mockDashboardData = {
    salesSummary: { total: 21000, thisMonth: 10000 },
    recentActivities: [
      { description: 'Yeni müşteri eklendi: Hümeyra Bilmez', date: '2024-08-06' },
      { description: 'Satış yapıldı: Xbox', date: '2024-08-07' },
    ],
    upcomingTasks: [
      { title: 'Müşteri görüşmesi: Buğçe İrikaya', dueDate: '2024-08-10' },
      { title: 'Ürün tanıtımı', dueDate: '2024-08-15' },
    ],
  };
  
  export const mockReportData = {
    salesByMonth: [
      { month: 'Ocak', sales: 4000 },
      { month: 'Şubat', sales: 3000 },
      { month: 'Mart', sales: 7000 },
    ],
    customerDistribution: [
      { name: 'Yeni Müşteriler', value: 400 },
      { name: 'Tekrar Eden Müşteriler', value: 300 },
      { name: 'VIP Müşteriler', value: 300 },
    ],
  };