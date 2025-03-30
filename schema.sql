-- Create tables for restaurant BI platform

-- Locations table
CREATE TABLE locations (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  monthly_revenue DECIMAL(12, 2) NOT NULL DEFAULT 0,
  seating_capacity INTEGER,
  kitchen_size VARCHAR(50),
  equipment_list JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Customers table
CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  visits INTEGER NOT NULL DEFAULT 0,
  last_visit_date TIMESTAMP,
  age_group VARCHAR(20),
  dietary_preferences VARCHAR(255)[] DEFAULT '{}',
  loyalty_points INTEGER DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Menu items table
CREATE TABLE menu_items (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  cost DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100) NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  allergens TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  order_date TIMESTAMP NOT NULL DEFAULT NOW(),
  customer_id INTEGER REFERENCES customers(id),
  location_id INTEGER REFERENCES locations(id) NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  tip_amount DECIMAL(10, 2) DEFAULT 0,
  service_rating INTEGER CHECK (service_rating BETWEEN 1 AND 5),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
  id INTEGER PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) NOT NULL,
  menu_item_id INTEGER REFERENCES menu_items(id) NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Insights history table
CREATE TABLE insights_history (
  id INTEGER PRIMARY KEY,
  question TEXT NOT NULL,
  insight JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Scraper sources table
CREATE TABLE scraper_sources (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  type VARCHAR(50) NOT NULL,
  selector TEXT NOT NULL,
  frequency VARCHAR(20) NOT NULL,
  last_run TIMESTAMP,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Scraped data table
CREATE TABLE scraped_data (
  id INTEGER PRIMARY KEY,
  source_id INTEGER REFERENCES scraper_sources(id) NOT NULL,
  data JSONB NOT NULL,
  scraped_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Delivery platforms table
CREATE TABLE delivery_platforms (
  id INTEGER PRIMARY KEY,
  code VARCHAR(10) NOT NULL UNIQUE,  -- GF, LM, RH, FP
  name VARCHAR(100) NOT NULL UNIQUE, -- GRABFOOD, LINEMAN, ROBINHOOD, FOOD PANDA
  website_url TEXT,
  api_base_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Restaurants table (core restaurant data)
CREATE TABLE restaurants (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  cuisine_type VARCHAR(100),
  description TEXT,
  address TEXT,
  city VARCHAR(100),
  postal_code VARCHAR(20),
  phone VARCHAR(20),
  email VARCHAR(255),
  website TEXT,
  logo_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Restaurant delivery platform data
CREATE TABLE restaurant_platforms (
  id INTEGER PRIMARY KEY,
  restaurant_id INTEGER REFERENCES restaurants(id) NOT NULL,
  platform_id INTEGER REFERENCES delivery_platforms(id) NOT NULL,
  platform_restaurant_id VARCHAR(100), -- ID used by the platform
  platform_url TEXT,                   -- URL on the delivery platform
  is_available BOOLEAN DEFAULT TRUE,
  avg_rating DECIMAL(3, 2),            -- Average rating on platform
  rating_count INTEGER DEFAULT 0,      -- Number of ratings
  price_level INTEGER,                 -- Price level (1-4)
  delivery_fee DECIMAL(10, 2),
  minimum_order DECIMAL(10, 2),
  estimated_delivery_time VARCHAR(50), -- e.g., "15-30 min"
  last_scraped TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE (restaurant_id, platform_id)  -- Restaurant can be on each platform only once
);

-- Platform-specific menu items
CREATE TABLE platform_menu_items (
  id INTEGER PRIMARY KEY,
  restaurant_platform_id INTEGER REFERENCES restaurant_platforms(id) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  price DECIMAL(10, 2) NOT NULL,
  discount_price DECIMAL(10, 2),
  image_url TEXT,
  is_available BOOLEAN DEFAULT TRUE,
  is_promoted BOOLEAN DEFAULT FALSE,
  platform_item_id VARCHAR(100),       -- ID used by the platform
  popularity_index INTEGER,            -- Higher number means more popular
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Customer reviews from platforms
CREATE TABLE platform_reviews (
  id INTEGER PRIMARY KEY,
  restaurant_platform_id INTEGER REFERENCES restaurant_platforms(id) NOT NULL,
  reviewer_name VARCHAR(255),
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT,
  review_date TIMESTAMP,
  platform_review_id VARCHAR(100),     -- ID used by the platform
  has_images BOOLEAN DEFAULT FALSE,
  likes_count INTEGER DEFAULT 0,
  reply_text TEXT,                     -- Restaurant's reply
  reply_date TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Restaurant performance metrics by platform
CREATE TABLE platform_performance (
  id INTEGER PRIMARY KEY,
  restaurant_platform_id INTEGER REFERENCES restaurant_platforms(id) NOT NULL,
  date DATE NOT NULL,
  order_count INTEGER DEFAULT 0,
  total_revenue DECIMAL(12, 2) DEFAULT 0,
  avg_order_value DECIMAL(10, 2),
  popularity_rank INTEGER,             -- Rank within platform
  estimated_delivery_completions INTEGER,
  cancelled_orders INTEGER DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE (restaurant_platform_id, date)
);

-- Promotion tracking by platform
CREATE TABLE platform_promotions (
  id INTEGER PRIMARY KEY,
  restaurant_platform_id INTEGER REFERENCES restaurant_platforms(id) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  discount_type VARCHAR(50),           -- Percentage, Fixed amount, Free item, etc.
  discount_value DECIMAL(10, 2),
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  redemption_count INTEGER DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_location_id ON orders(location_id);
CREATE INDEX idx_orders_order_date ON orders(order_date);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_menu_item_id ON order_items(menu_item_id);
CREATE INDEX idx_scraped_data_source_id ON scraped_data(source_id);

-- Indexes for new platform-related tables
CREATE INDEX idx_restaurant_platforms_restaurant_id ON restaurant_platforms(restaurant_id);
CREATE INDEX idx_restaurant_platforms_platform_id ON restaurant_platforms(platform_id);
CREATE INDEX idx_platform_menu_items_restaurant_platform_id ON platform_menu_items(restaurant_platform_id);
CREATE INDEX idx_platform_reviews_restaurant_platform_id ON platform_reviews(restaurant_platform_id);
CREATE INDEX idx_platform_performance_restaurant_platform_id ON platform_performance(restaurant_platform_id);
CREATE INDEX idx_platform_performance_date ON platform_performance(date);
CREATE INDEX idx_platform_promotions_restaurant_platform_id ON platform_promotions(restaurant_platform_id);
CREATE INDEX idx_platform_promotions_active ON platform_promotions(is_active);

-- Staff authentication tables
CREATE TABLE staff (
  id INTEGER PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(50) NOT NULL,
  location_id INTEGER REFERENCES locations(id),
  last_login TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE sessions (
  id INTEGER PRIMARY KEY,
  staff_id INTEGER REFERENCES staff(id) NOT NULL,
  session_token TEXT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Inventory management tables
CREATE TABLE inventory (
  id INTEGER PRIMARY KEY,
  menu_item_id INTEGER REFERENCES menu_items(id) NOT NULL,
  quantity INTEGER NOT NULL,
  unit VARCHAR(50) NOT NULL,
  low_stock_alert INTEGER NOT NULL DEFAULT 10,
  last_restocked TIMESTAMP,
  supplier_id INTEGER REFERENCES suppliers(id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE suppliers (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  contact_email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  delivery_frequency VARCHAR(50),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Project/research tracking tables
CREATE TABLE projects (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  owner_id INTEGER REFERENCES staff(id) NOT NULL,
  location_id INTEGER REFERENCES locations(id) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'planning',
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE research (
  id INTEGER PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id) NOT NULL,
  research_type VARCHAR(50) NOT NULL,
  findings JSONB NOT NULL,
  conducted_by INTEGER REFERENCES staff(id) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Subscription billing tables
CREATE TABLE subscriptions (
  id INTEGER PRIMARY KEY,
  location_id INTEGER REFERENCES locations(id) NOT NULL,
  plan_type VARCHAR(50) NOT NULL,
  start_date DATE NOT NULL,
  renewal_date DATE NOT NULL,
  payment_status VARCHAR(50) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE invoices (
  id INTEGER PRIMARY KEY,
  subscription_id INTEGER REFERENCES subscriptions(id) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  due_date DATE NOT NULL,
  paid_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Add indexes for new tables
CREATE INDEX idx_staff_location_id ON staff(location_id);
CREATE INDEX idx_sessions_staff_id ON sessions(staff_id);
CREATE INDEX idx_inventory_menu_item_id ON inventory(menu_item_id);
CREATE INDEX idx_projects_location_id ON projects(location_id);
CREATE INDEX idx_research_project_id ON research(project_id);
CREATE INDEX idx_subscriptions_location_id ON subscriptions(location_id);

-- Initialize standard delivery platforms
INSERT INTO delivery_platforms (code, name, website_url) VALUES 
('GF', 'GRABFOOD', 'https://food.grab.com'),
('LM', 'LINEMAN', 'https://lineman.line.me'),
('RH', 'ROBINHOOD', 'https://robinhood.co.th'),
('FP', 'FOOD PANDA', 'https://www.foodpanda.co.th')
ON CONFLICT (code) DO NOTHING;

