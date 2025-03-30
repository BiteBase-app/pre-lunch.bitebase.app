import { Pool } from 'pg';
import {
  DeliveryPlatform,
  DeliveryPlatformCode,
  Restaurant,
  RestaurantPlatform,
  PlatformMenuItem,
  PlatformReview,
  PlatformPerformance,
  PlatformPromotion,
  RestaurantWithPlatforms,
  PlatformComparison,
  ScrapedRestaurantData,
} from '../models/delivery-platforms';

// Database pool connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export class RestaurantPlatformService {
  // Get all delivery platforms
  async getAllPlatforms(): Promise<DeliveryPlatform[]> {
    const query = 'SELECT * FROM delivery_platforms WHERE is_active = true ORDER BY name';
    const result = await pool.query(query);
    return result.rows.map(this.mapRowToDeliveryPlatform);
  }

  // Get a specific delivery platform by code
  async getPlatformByCode(code: DeliveryPlatformCode): Promise<DeliveryPlatform | null> {
    const query = 'SELECT * FROM delivery_platforms WHERE code = $1';
    const result = await pool.query(query, [code]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return this.mapRowToDeliveryPlatform(result.rows[0]);
  }

  // Get all restaurants
  async getAllRestaurants(): Promise<Restaurant[]> {
    const query = 'SELECT * FROM restaurants WHERE is_active = true ORDER BY name';
    const result = await pool.query(query);
    return result.rows.map(this.mapRowToRestaurant);
  }

  // Get a specific restaurant by ID
  async getRestaurantById(id: number): Promise<Restaurant | null> {
    const query = 'SELECT * FROM restaurants WHERE id = $1';
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return this.mapRowToRestaurant(result.rows[0]);
  }

  // Get a restaurant with all its platform data
  async getRestaurantWithPlatforms(id: number): Promise<RestaurantWithPlatforms | null> {
    // Get the restaurant first
    const restaurant = await this.getRestaurantById(id);
    
    if (!restaurant) {
      return null;
    }
    
    // Get all platform data for this restaurant
    const platformQuery = `
      SELECT rp.*, dp.code, dp.name as platform_name 
      FROM restaurant_platforms rp
      JOIN delivery_platforms dp ON rp.platform_id = dp.id
      WHERE rp.restaurant_id = $1
    `;
    const platformResult = await pool.query(platformQuery, [id]);
    
    const platforms = await Promise.all(
      platformResult.rows.map(async (row) => {
        const platform = await this.getPlatformByCode(row.code as DeliveryPlatformCode);
        const menuItems = await this.getMenuItems(row.id);
        const reviews = await this.getReviews(row.id);
        const performance = await this.getPerformanceMetrics(row.id);
        const promotions = await this.getPromotions(row.id);
        
        return {
          ...this.mapRowToRestaurantPlatform(row),
          platform: platform!,
          menuItems,
          reviews,
          performance,
          promotions,
        };
      })
    );
    
    return {
      ...restaurant,
      platforms,
    };
  }

  // Get platform menu items for a restaurant platform
  async getMenuItems(restaurantPlatformId: number): Promise<PlatformMenuItem[]> {
    const query = 'SELECT * FROM platform_menu_items WHERE restaurant_platform_id = $1';
    const result = await pool.query(query, [restaurantPlatformId]);
    return result.rows.map(this.mapRowToPlatformMenuItem);
  }

  // Get platform reviews for a restaurant platform
  async getReviews(restaurantPlatformId: number): Promise<PlatformReview[]> {
    const query = 'SELECT * FROM platform_reviews WHERE restaurant_platform_id = $1';
    const result = await pool.query(query, [restaurantPlatformId]);
    return result.rows.map(this.mapRowToPlatformReview);
  }

  // Get performance metrics for a restaurant platform
  async getPerformanceMetrics(restaurantPlatformId: number): Promise<PlatformPerformance[]> {
    const query = 'SELECT * FROM platform_performance WHERE restaurant_platform_id = $1 ORDER BY date DESC';
    const result = await pool.query(query, [restaurantPlatformId]);
    return result.rows.map(this.mapRowToPlatformPerformance);
  }

  // Get promotions for a restaurant platform
  async getPromotions(restaurantPlatformId: number): Promise<PlatformPromotion[]> {
    const query = 'SELECT * FROM platform_promotions WHERE restaurant_platform_id = $1';
    const result = await pool.query(query, [restaurantPlatformId]);
    return result.rows.map(this.mapRowToPlatformPromotion);
  }

  // Generate a comparison of platforms for a restaurant
  async generatePlatformComparison(restaurantId: number): Promise<PlatformComparison | null> {
    const restaurant = await this.getRestaurantById(restaurantId);
    
    if (!restaurant) {
      return null;
    }
    
    const platformQuery = `
      SELECT 
        rp.id as restaurant_platform_id,
        rp.platform_id,
        dp.code as platform_code,
        dp.name as platform_name,
        rp.avg_rating,
        rp.rating_count,
        rp.price_level,
        rp.delivery_fee,
        rp.minimum_order,
        rp.estimated_delivery_time,
        COUNT(pmi.id) as menu_item_count,
        AVG(pmi.price) as avg_menu_item_price,
        COALESCE(pp.order_count, 0) as order_count,
        COALESCE(pp.total_revenue, 0) as total_revenue,
        pp.avg_order_value,
        pp.popularity_rank
      FROM restaurant_platforms rp
      JOIN delivery_platforms dp ON rp.platform_id = dp.id
      LEFT JOIN platform_menu_items pmi ON rp.id = pmi.restaurant_platform_id
      LEFT JOIN (
        SELECT 
          restaurant_platform_id, 
          SUM(order_count) as order_count, 
          SUM(total_revenue) as total_revenue,
          AVG(avg_order_value) as avg_order_value,
          MIN(popularity_rank) as popularity_rank
        FROM platform_performance
        WHERE date >= NOW() - INTERVAL '30 days'
        GROUP BY restaurant_platform_id
      ) pp ON rp.id = pp.restaurant_platform_id
      WHERE rp.restaurant_id = $1
      GROUP BY 
        rp.id, 
        rp.platform_id, 
        dp.code, 
        dp.name, 
        rp.avg_rating, 
        rp.rating_count, 
        rp.price_level, 
        rp.delivery_fee, 
        rp.minimum_order, 
        rp.estimated_delivery_time,
        pp.order_count,
        pp.total_revenue,
        pp.avg_order_value,
        pp.popularity_rank
    `;
    
    const platformResult = await pool.query(platformQuery, [restaurantId]);
    
    if (platformResult.rows.length === 0) {
      return {
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        platforms: [],
      };
    }
    
    const platforms = platformResult.rows.map(row => ({
      platformId: row.platform_id,
      platformCode: row.platform_code as DeliveryPlatformCode,
      platformName: row.platform_name,
      avgRating: row.avg_rating,
      ratingCount: row.rating_count,
      priceLevel: row.price_level,
      deliveryFee: row.delivery_fee,
      minimumOrder: row.minimum_order,
      estimatedDeliveryTime: row.estimated_delivery_time,
      menuItemCount: parseInt(row.menu_item_count),
      avgMenuItemPrice: row.avg_menu_item_price,
      popularity: {
        orderCount: parseInt(row.order_count),
        totalRevenue: parseFloat(row.total_revenue),
        avgOrderValue: row.avg_order_value,
        popularityRank: row.popularity_rank,
      },
    }));
    
    return {
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      platforms,
    };
  }

  // Save scraped restaurant data
  async saveScrapedData(data: ScrapedRestaurantData): Promise<void> {
    // Start transaction
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Get platform ID
      const platformQuery = 'SELECT id FROM delivery_platforms WHERE code = $1';
      const platformResult = await client.query(platformQuery, [data.platformCode]);
      
      if (platformResult.rows.length === 0) {
        throw new Error(`Platform with code ${data.platformCode} not found`);
      }
      
      const platformId = platformResult.rows[0].id;
      
      // Check if restaurant exists by name and create if not
      let restaurantId: number;
      const restaurantQuery = 'SELECT id FROM restaurants WHERE name ILIKE $1';
      const restaurantResult = await client.query(restaurantQuery, [data.restaurantData.name]);
      
      if (restaurantResult.rows.length === 0) {
        // Create new restaurant
        const insertRestaurantQuery = `
          INSERT INTO restaurants (
            name, cuisine_type, description, address, city, postal_code, 
            phone, logo_url, is_active
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, true)
          RETURNING id
        `;
        
        const insertRestaurantResult = await client.query(insertRestaurantQuery, [
          data.restaurantData.name,
          data.restaurantData.cuisineType || null,
          data.restaurantData.description || null,
          data.restaurantData.address || null,
          data.restaurantData.city || null,
          data.restaurantData.postalCode || null,
          data.restaurantData.phone || null,
          data.restaurantData.logoUrl || null,
        ]);
        
        restaurantId = insertRestaurantResult.rows[0].id;
      } else {
        restaurantId = restaurantResult.rows[0].id;
      }
      
      // Check if restaurant platform exists and update or create
      const restaurantPlatformQuery = `
        SELECT id FROM restaurant_platforms 
        WHERE restaurant_id = $1 AND platform_id = $2
      `;
      const restaurantPlatformResult = await client.query(restaurantPlatformQuery, [restaurantId, platformId]);
      
      let restaurantPlatformId: number;
      
      if (restaurantPlatformResult.rows.length === 0) {
        // Create new restaurant platform
        const insertRestaurantPlatformQuery = `
          INSERT INTO restaurant_platforms (
            restaurant_id, platform_id, platform_restaurant_id, platform_url,
            is_available, avg_rating, rating_count, price_level, delivery_fee,
            minimum_order, estimated_delivery_time, last_scraped
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          RETURNING id
        `;
        
        const insertRestaurantPlatformResult = await client.query(insertRestaurantPlatformQuery, [
          restaurantId,
          platformId,
          data.restaurantData.platformRestaurantId,
          data.restaurantData.platformUrl,
          data.restaurantData.isAvailable,
          data.restaurantData.avgRating || null,
          data.restaurantData.ratingCount || 0,
          data.restaurantData.priceLevel || null,
          data.restaurantData.deliveryFee || null,
          data.restaurantData.minimumOrder || null,
          data.restaurantData.estimatedDeliveryTime || null,
          data.scrapedAt,
        ]);
        
        restaurantPlatformId = insertRestaurantPlatformResult.rows[0].id;
      } else {
        restaurantPlatformId = restaurantPlatformResult.rows[0].id;
        
        // Update existing restaurant platform
        const updateRestaurantPlatformQuery = `
          UPDATE restaurant_platforms SET
            platform_restaurant_id = $3,
            platform_url = $4,
            is_available = $5,
            avg_rating = $6,
            rating_count = $7,
            price_level = $8,
            delivery_fee = $9,
            minimum_order = $10,
            estimated_delivery_time = $11,
            last_scraped = $12,
            updated_at = NOW()
          WHERE id = $1 AND platform_id = $2
        `;
        
        await client.query(updateRestaurantPlatformQuery, [
          restaurantPlatformId,
          platformId,
          data.restaurantData.platformRestaurantId,
          data.restaurantData.platformUrl,
          data.restaurantData.isAvailable,
          data.restaurantData.avgRating || null,
          data.restaurantData.ratingCount || 0,
          data.restaurantData.priceLevel || null,
          data.restaurantData.deliveryFee || null,
          data.restaurantData.minimumOrder || null,
          data.restaurantData.estimatedDeliveryTime || null,
          data.scrapedAt,
        ]);
      }
      
      // Process menu items if provided
      if (data.restaurantData.menuItems && data.restaurantData.menuItems.length > 0) {
        // First, mark all existing menu items as not available
        await client.query(
          'UPDATE platform_menu_items SET is_available = false WHERE restaurant_platform_id = $1',
          [restaurantPlatformId]
        );
        
        // Insert or update menu items
        for (const menuItem of data.restaurantData.menuItems) {
          const menuItemQuery = `
            SELECT id FROM platform_menu_items 
            WHERE restaurant_platform_id = $1 AND platform_item_id = $2
          `;
          const menuItemResult = await client.query(menuItemQuery, [
            restaurantPlatformId, 
            menuItem.platformItemId
          ]);
          
          if (menuItemResult.rows.length === 0) {
            // Insert new menu item
            const insertMenuItemQuery = `
              INSERT INTO platform_menu_items (
                restaurant_platform_id, name, description, category, price,
                discount_price, image_url, is_available, is_promoted,
                platform_item_id, popularity_index
              ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            `;
            
            await client.query(insertMenuItemQuery, [
              restaurantPlatformId,
              menuItem.name,
              menuItem.description || null,
              menuItem.category || null,
              menuItem.price,
              menuItem.discountPrice || null,
              menuItem.imageUrl || null,
              menuItem.isAvailable !== false, // Default to true if not specified
              menuItem.isPromoted || false,
              menuItem.platformItemId,
              menuItem.popularityIndex || null,
            ]);
          } else {
            // Update existing menu item
            const menuItemId = menuItemResult.rows[0].id;
            const updateMenuItemQuery = `
              UPDATE platform_menu_items SET
                name = $2,
                description = $3,
                category = $4,
                price = $5,
                discount_price = $6,
                image_url = $7,
                is_available = $8,
                is_promoted = $9,
                popularity_index = $10,
                updated_at = NOW()
              WHERE id = $1
            `;
            
            await client.query(updateMenuItemQuery, [
              menuItemId,
              menuItem.name,
              menuItem.description || null,
              menuItem.category || null,
              menuItem.price,
              menuItem.discountPrice || null,
              menuItem.imageUrl || null,
              menuItem.isAvailable !== false, // Default to true if not specified
              menuItem.isPromoted || false,
              menuItem.popularityIndex || null,
            ]);
          }
        }
      }
      
      // Process reviews if provided
      if (data.restaurantData.reviews && data.restaurantData.reviews.length > 0) {
        for (const review of data.restaurantData.reviews) {
          const reviewQuery = `
            SELECT id FROM platform_reviews 
            WHERE restaurant_platform_id = $1 AND platform_review_id = $2
          `;
          const reviewResult = await client.query(reviewQuery, [
            restaurantPlatformId, 
            review.platformReviewId
          ]);
          
          if (reviewResult.rows.length === 0) {
            // Insert new review
            const insertReviewQuery = `
              INSERT INTO platform_reviews (
                restaurant_platform_id, reviewer_name, rating, review_text, 
                review_date, platform_review_id, has_images, likes_count,
                reply_text, reply_date
              ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            `;
            
            await client.query(insertReviewQuery, [
              restaurantPlatformId,
              review.reviewerName || null,
              review.rating,
              review.reviewText || null,
              review.reviewDate || null,
              review.platformReviewId,
              review.hasImages || false,
              review.likesCount || 0,
              review.replyText || null,
              review.replyDate || null,
            ]);
          } else {
            // Update existing review
            const reviewId = reviewResult.rows[0].id;
            const updateReviewQuery = `
              UPDATE platform_reviews SET
                reviewer_name = $2,
                rating = $3,
                review_text = $4,
                review_date = $5,
                has_images = $6,
                likes_count = $7,
                reply_text = $8,
                reply_date = $9,
                updated_at = NOW()
              WHERE id = $1
            `;
            
            await client.query(updateReviewQuery, [
              reviewId,
              review.reviewerName || null,
              review.rating,
              review.reviewText || null,
              review.reviewDate || null,
              review.hasImages || false,
              review.likesCount || 0,
              review.replyText || null,
              review.replyDate || null,
            ]);
          }
        }
      }
      
      // Process promotions if provided
      if (data.restaurantData.promotions && data.restaurantData.promotions.length > 0) {
        // First, mark all existing promotions as not active
        await client.query(
          'UPDATE platform_promotions SET is_active = false WHERE restaurant_platform_id = $1',
          [restaurantPlatformId]
        );
        
        // Insert or update promotions
        for (const promotion of data.restaurantData.promotions) {
          const promotionQuery = `
            SELECT id FROM platform_promotions 
            WHERE restaurant_platform_id = $1 AND name = $2
          `;
          const promotionResult = await client.query(promotionQuery, [
            restaurantPlatformId, 
            promotion.name
          ]);
          
          if (promotionResult.rows.length === 0) {
            // Insert new promotion
            const insertPromotionQuery = `
              INSERT INTO platform_promotions (
                restaurant_platform_id, name, description, discount_type,
                discount_value, start_date, end_date, is_active
              ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            `;
            
            await client.query(insertPromotionQuery, [
              restaurantPlatformId,
              promotion.name,
              promotion.description || null,
              promotion.discountType || null,
              promotion.discountValue || null,
              promotion.startDate || null,
              promotion.endDate || null,
              promotion.isActive !== false, // Default to true if not specified
            ]);
          } else {
            // Update existing promotion
            const promotionId = promotionResult.rows[0].id;
            const updatePromotionQuery = `
              UPDATE platform_promotions SET
                description = $2,
                discount_type = $3,
                discount_value = $4,
                start_date = $5,
                end_date = $6,
                is_active = $7,
                updated_at = NOW()
              WHERE id = $1
            `;
            
            await client.query(updatePromotionQuery, [
              promotionId,
              promotion.description || null,
              promotion.discountType || null,
              promotion.discountValue || null,
              promotion.startDate || null,
              promotion.endDate || null,
              promotion.isActive !== false, // Default to true if not specified
            ]);
          }
        }
      }
      
      // Insert performance record for today if not exists
      const today = new Date().toISOString().split('T')[0];
      const performanceQuery = `
        SELECT id FROM platform_performance 
        WHERE restaurant_platform_id = $1 AND date = $2
      `;
      const performanceResult = await client.query(performanceQuery, [restaurantPlatformId, today]);
      
      if (performanceResult.rows.length === 0) {
        // Initialize empty performance record
        const insertPerformanceQuery = `
          INSERT INTO platform_performance (
            restaurant_platform_id, date, order_count, total_revenue
          ) VALUES ($1, $2, 0, 0)
        `;
        await client.query(insertPerformanceQuery, [restaurantPlatformId, today]);
      }
      
      // Commit transaction
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // Helper methods to map DB rows to model objects
  private mapRowToDeliveryPlatform(row: any): DeliveryPlatform {
    return {
      id: row.id,
      code: row.code as DeliveryPlatformCode,
      name: row.name,
      websiteUrl: row.website_url,
      apiBaseUrl: row.api_base_url,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  private mapRowToRestaurant(row: any): Restaurant {
    return {
      id: row.id,
      name: row.name,
      cuisineType: row.cuisine_type,
      description: row.description,
      address: row.address,
      city: row.city,
      postalCode: row.postal_code,
      phone: row.phone,
      email: row.email,
      website: row.website,
      logoUrl: row.logo_url,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  private mapRowToRestaurantPlatform(row: any): RestaurantPlatform {
    return {
      id: row.id,
      restaurantId: row.restaurant_id,
      platformId: row.platform_id,
      platformCode: row.code as DeliveryPlatformCode,
      platformName: row.platform_name,
      platformRestaurantId: row.platform_restaurant_id,
      platformUrl: row.platform_url,
      isAvailable: row.is_available,
      avgRating: row.avg_rating,
      ratingCount: row.rating_count,
      priceLevel: row.price_level,
      deliveryFee: row.delivery_fee,
      minimumOrder: row.minimum_order,
      estimatedDeliveryTime: row.estimated_delivery_time,
      lastScraped: row.last_scraped,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  private mapRowToPlatformMenuItem(row: any): PlatformMenuItem {
    return {
      id: row.id,
      restaurantPlatformId: row.restaurant_platform_id,
      name: row.name,
      description: row.description,
      category: row.category,
      price: row.price,
      discountPrice: row.discount_price,
      imageUrl: row.image_url,
      isAvailable: row.is_available,
      isPromoted: row.is_promoted,
      platformItemId: row.platform_item_id,
      popularityIndex: row.popularity_index,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  private mapRowToPlatformReview(row: any): PlatformReview {
    return {
      id: row.id,
      restaurantPlatformId: row.restaurant_platform_id,
      reviewerName: row.reviewer_name,
      rating: row.rating,
      reviewText: row.review_text,
      reviewDate: row.review_date,
      platformReviewId: row.platform_review_id,
      hasImages: row.has_images,
      likesCount: row.likes_count,
      replyText: row.reply_text,
      replyDate: row.reply_date,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  private mapRowToPlatformPerformance(row: any): PlatformPerformance {
    return {
      id: row.id,
      restaurantPlatformId: row.restaurant_platform_id,
      date: row.date,
      orderCount: row.order_count,
      totalRevenue: row.total_revenue,
      avgOrderValue: row.avg_order_value,
      popularityRank: row.popularity_rank,
      estimatedDeliveryCompletions: row.estimated_delivery_completions,
      cancelledOrders: row.cancelled_orders,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  private mapRowToPlatformPromotion(row: any): PlatformPromotion {
    return {
      id: row.id,
      restaurantPlatformId: row.restaurant_platform_id,
      name: row.name,
      description: row.description,
      discountType: row.discount_type,
      discountValue: row.discount_value,
      startDate: row.start_date,
      endDate: row.end_date,
      isActive: row.is_active,
      redemptionCount: row.redemption_count,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
} 