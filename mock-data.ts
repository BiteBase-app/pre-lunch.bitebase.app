// Mock data for restaurant BI platform

export const locations = [
  {
    name: 'Downtown Bistro',
    address: '123 Main St',
    city: 'Metropolis',
    state: 'NY',
    latitude: 40.712776,
    longitude: -74.005974,
    monthly_revenue: 125000.00,
    seating_capacity: 80,
    kitchen_size: 'Medium',
    equipment_list: ['oven', 'grill', 'fryer']
  },
  {
    name: 'Harbor View Cafe',
    address: '456 Bay Rd',
    city: 'Seaport City',
    state: 'CA',
    latitude: 34.052235,
    longitude: -118.243683,
    monthly_revenue: 98000.50,
    seating_capacity: 50,
    kitchen_size: 'Compact',
    equipment_list: ['griddle', 'steamer']
  }
];

export const customers = [
  {
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1-555-0101',
    visits: 4,
    last_visit_date: '2024-02-15T12:30:00Z',
    age_group: '30-40',
    dietary_preferences: ['gluten-free'],
    loyalty_points: 120
  },
  {
    name: 'Sarah Johnson',
    email: 's.johnson@example.com',
    visits: 8,
    last_visit_date: '2024-03-01T18:45:00Z',
    age_group: '25-35',
    loyalty_points: 250
  }
];

export const menu_items = [
  {
    name: 'Classic Burger',
    description: 'Angus beef patty with lettuce and tomato',
    price: 14.99,
    cost: 5.50,
    category: 'Main Course',
    allergens: 'gluten, dairy'
  },
  {
    name: 'Caesar Salad',
    description: 'Romaine lettuce with parmesan and croutons',
    price: 12.50,
    cost: 4.20,
    category: 'Appetizer',
    allergens: 'dairy'
  }
];

export const orders = [
  {
    customer_id: 1,
    location_id: 1,
    total_amount: 42.48,
    payment_method: 'Credit Card',
    tip_amount: 8.50,
    service_rating: 4
  },
  {
    customer_id: 2,
    location_id: 2,
    total_amount: 25.00,
    payment_method: 'Mobile Pay',
    tip_amount: 5.00,
    service_rating: 5
  }
];

export const order_items = [
  {
    order_id: 1,
    menu_item_id: 1,
    quantity: 2,
    price: 14.99
  },
  {
    order_id: 2,
    menu_item_id: 2,
    quantity: 1,
    price: 12.50
  }
];

export const staff = [
  {
    email: 'manager@bistro.com',
    password_hash: 'hashed_password_123',
    role: 'manager',
    location_id: 1,
    last_login: '2024-03-10T09:15:00Z'
  },
  {
    email: 'chef@harborcafe.com',
    password_hash: 'hashed_password_456',
    role: 'kitchen_staff',
    location_id: 2,
    last_login: '2024-03-09T14:30:00Z'
  }
];

export const sessions = [
  {
    staff_id: 1,
    session_token: 'abc123',
    expires_at: '2024-03-11T09:15:00Z'
  },
  {
    staff_id: 2,
    session_token: 'def456',
    expires_at: '2024-03-10T14:30:00Z'
  }
];

export const suppliers = [
  {
    name: 'Prime Meats Co.',
    contact_email: 'sales@primemeats.com',
    phone: '+1-555-0202',
    delivery_frequency: 'weekly'
  },
  {
    name: 'Fresh Produce Direct',
    contact_email: 'orders@freshproduce.com',
    phone: '+1-555-0303',
    delivery_frequency: 'bi-weekly'
  }
];

export const inventory = [
  {
    menu_item_id: 1,
    quantity: 150,
    unit: 'patties',
    low_stock_alert: 30,
    last_restocked: '2024-03-08T07:00:00Z',
    supplier_id: 1
  },
  {
    menu_item_id: 2,
    quantity: 80,
    unit: 'bags',
    low_stock_alert: 20,
    last_restocked: '2024-03-09T08:30:00Z',
    supplier_id: 2
  }
];

export const projects = [
  {
    name: 'Menu Optimization 2024',
    description: 'Analyze and improve menu profitability',
    owner_id: 1,
    location_id: 1,
    status: 'active',
    start_date: '2024-01-15',
    end_date: '2024-06-30'
  }
];

export const research = [
  {
    project_id: 1,
    research_type: 'customer_survey',
    findings: {
      popular_items: ['Classic Burger', 'Caesar Salad'],
      avg_rating: 4.2
    },
    conducted_by: 1
  }
];

export const subscriptions = [
  {
    location_id: 1,
    plan_type: 'premium',
    start_date: '2024-01-01',
    renewal_date: '2025-01-01',
    payment_status: 'active'
  }
];

export const invoices = [
  {
    subscription_id: 1,
    amount: 599.00,
    due_date: '2024-02-01',
    paid_at: '2024-01-25T10:00:00Z'
  }
];

export const insights_history = [
  {
    question: 'Most profitable menu items last month',
    insight: {
      top_items: ['Classic Burger', 'Caesar Salad'],
      total_profit: 2450.75
    }
  }
];

export const scraper_sources = [
  {
    name: 'Local Review Site',
    url: 'https://reviews.example.com',
    type: 'review_scraper',
    selector: '.review-item',
    frequency: 'daily'
  }
];

export const scraped_data = [
  {
    source_id: 1,
    data: {
      rating: 4.5,
      review_count: 142,
      date: '2024-03-10'
    }
  }
];