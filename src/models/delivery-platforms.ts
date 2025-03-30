// Delivery platform models for BitBase Intelligence platform

// Enum for delivery platform codes
export enum DeliveryPlatformCode {
  GF = 'GF',  // GRABFOOD
  LM = 'LM',  // LINEMAN
  RH = 'RH',  // ROBINHOOD
  FP = 'FP',  // FOOD PANDA
}

// Delivery platform entity
export interface DeliveryPlatform {
  id: number;
  code: DeliveryPlatformCode;
  name: string;
  websiteUrl: string | null;
  apiBaseUrl: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Restaurant base entity
export interface Restaurant {
  id: number;
  name: string;
  cuisineType: string | null;
  description: string | null;
  address: string | null;
  city: string | null;
  postalCode: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  logoUrl: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Restaurant platform data
export interface RestaurantPlatform {
  id: number;
  restaurantId: number;
  platformId: number;
  platformCode?: DeliveryPlatformCode; // Convenience field for frontend
  platformName?: string; // Convenience field for frontend
  platformRestaurantId: string | null;
  platformUrl: string | null;
  isAvailable: boolean;
  avgRating: number | null;
  ratingCount: number;
  priceLevel: number | null;
  deliveryFee: number | null;
  minimumOrder: number | null;
  estimatedDeliveryTime: string | null;
  lastScraped: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Platform-specific menu item
export interface PlatformMenuItem {
  id: number;
  restaurantPlatformId: number;
  name: string;
  description: string | null;
  category: string | null;
  price: number;
  discountPrice: number | null;
  imageUrl: string | null;
  isAvailable: boolean;
  isPromoted: boolean;
  platformItemId: string | null;
  popularityIndex: number | null;
  createdAt: Date;
  updatedAt: Date;
}

// Platform review
export interface PlatformReview {
  id: number;
  restaurantPlatformId: number;
  reviewerName: string | null;
  rating: number;
  reviewText: string | null;
  reviewDate: Date | null;
  platformReviewId: string | null;
  hasImages: boolean;
  likesCount: number;
  replyText: string | null;
  replyDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Platform performance metrics
export interface PlatformPerformance {
  id: number;
  restaurantPlatformId: number;
  date: Date;
  orderCount: number;
  totalRevenue: number;
  avgOrderValue: number | null;
  popularityRank: number | null;
  estimatedDeliveryCompletions: number | null;
  cancelledOrders: number;
  createdAt: Date;
  updatedAt: Date;
}

// Platform promotion
export interface PlatformPromotion {
  id: number;
  restaurantPlatformId: number;
  name: string;
  description: string | null;
  discountType: string | null;
  discountValue: number | null;
  startDate: Date | null;
  endDate: Date | null;
  isActive: boolean;
  redemptionCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Restaurant with all platform data
export interface RestaurantWithPlatforms extends Restaurant {
  platforms: (RestaurantPlatform & {
    platform: DeliveryPlatform;
    menuItems?: PlatformMenuItem[];
    reviews?: PlatformReview[];
    performance?: PlatformPerformance[];
    promotions?: PlatformPromotion[];
  })[];
}

// Comparison data structure for platform analysis
export interface PlatformComparison {
  restaurantId: number;
  restaurantName: string;
  platforms: {
    platformId: number;
    platformCode: DeliveryPlatformCode;
    platformName: string;
    avgRating: number | null;
    ratingCount: number;
    priceLevel: number | null;
    deliveryFee: number | null;
    minimumOrder: number | null;
    estimatedDeliveryTime: string | null;
    menuItemCount: number;
    avgMenuItemPrice: number | null;
    popularity: {
      orderCount: number;
      totalRevenue: number;
      avgOrderValue: number | null;
      popularityRank: number | null;
    } | null;
  }[];
}

// Data structure for scraped restaurant data
export interface ScrapedRestaurantData {
  platformCode: DeliveryPlatformCode;
  platformName: string;
  scrapedAt: Date;
  restaurantData: {
    platformRestaurantId: string;
    name: string;
    cuisineType?: string;
    description?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    phone?: string;
    platformUrl: string;
    isAvailable: boolean;
    avgRating?: number;
    ratingCount?: number;
    priceLevel?: number;
    deliveryFee?: number;
    minimumOrder?: number;
    estimatedDeliveryTime?: string;
    logoUrl?: string;
    menuItems?: {
      platformItemId: string;
      name: string;
      description?: string;
      category?: string;
      price: number;
      discountPrice?: number;
      imageUrl?: string;
      isAvailable?: boolean;
      isPromoted?: boolean;
      popularityIndex?: number;
    }[];
    reviews?: {
      platformReviewId: string;
      reviewerName?: string;
      rating: number;
      reviewText?: string;
      reviewDate?: Date;
      hasImages?: boolean;
      likesCount?: number;
      replyText?: string;
      replyDate?: Date;
    }[];
    promotions?: {
      name: string;
      description?: string;
      discountType?: string;
      discountValue?: number;
      startDate?: Date;
      endDate?: Date;
      isActive?: boolean;
    }[];
  }
} 