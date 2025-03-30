// Core data interfaces
export interface Customer {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  status: 'active' | 'inactive';
  createdAt: Date;
}

export interface Order {
  id: string;
  product: string;
  customerId: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  orderDate: Date;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
}

// Analytics data types
export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface DashboardStats {
  totalCustomers: number;
  totalRevenue: number;
  activeOrders: number;
  stockAlerts: number;
}

// Mock datasets
export const customers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'admin',
    status: 'active',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'CUST-002',
    name: 'Mike Chen',
    email: 'mike@example.com',
    role: 'user',
    status: 'inactive',
    createdAt: new Date('2024-02-10'),
  },
];

export const orders: Order[] = [
  {
    id: 'ORD-1001',
    product: 'Premium Subscription',
    customerId: 'CUST-001',
    amount: 299.99,
    status: 'completed',
    orderDate: new Date('2024-03-01'),
  },
  {
    id: 'ORD-1002',
    product: 'Basic Plan',
    customerId: 'CUST-002',
    amount: 99.99,
    status: 'pending',
    orderDate: new Date('2024-03-05'),
  },
];

export const products: Product[] = [
  {
    id: 'PROD-001',
    name: 'Enterprise License',
    price: 999.0,
    category: 'Software',
    stock: 50,
  },
  {
    id: 'PROD-002',
    name: 'Cloud Storage Pack',
    price: 49.99,
    category: 'Storage',
    stock: 200,
  },
];

export const chartData: ChartDataPoint[] = [
  { label: 'Q1', value: 45 },
  { label: 'Q2', value: 65 },
  { label: 'Q3', value: 53 },
  { label: 'Q4', value: 81 },
];

export const dashboardStats: DashboardStats = {
  totalCustomers: 245,
  totalRevenue: 45230.5,
  activeOrders: 12,
  stockAlerts: 3,
};