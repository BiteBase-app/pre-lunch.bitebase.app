import express from 'express';
import { RestaurantPlatformService } from '../services/restaurant-platform-service';
import { DeliveryPlatformCode, ScrapedRestaurantData } from '../models/delivery-platforms';

const router = express.Router();
const platformService = new RestaurantPlatformService();

// Get all delivery platforms
router.get('/platforms', async (req, res) => {
  try {
    const platforms = await platformService.getAllPlatforms();
    res.json(platforms);
  } catch (error) {
    console.error('Error fetching delivery platforms:', error);
    res.status(500).json({ error: 'Failed to fetch delivery platforms' });
  }
});

// Get all restaurants
router.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await platformService.getAllRestaurants();
    res.json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
});

// Get a specific restaurant with platform data
router.get('/restaurants/:id', async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.id);
    
    if (isNaN(restaurantId)) {
      return res.status(400).json({ error: 'Invalid restaurant ID' });
    }
    
    const restaurant = await platformService.getRestaurantWithPlatforms(restaurantId);
    
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    
    res.json(restaurant);
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    res.status(500).json({ error: 'Failed to fetch restaurant' });
  }
});

// Get platform comparison for a restaurant
router.get('/restaurants/:id/platform-comparison', async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.id);
    
    if (isNaN(restaurantId)) {
      return res.status(400).json({ error: 'Invalid restaurant ID' });
    }
    
    const comparison = await platformService.generatePlatformComparison(restaurantId);
    
    if (!comparison) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    
    res.json(comparison);
  } catch (error) {
    console.error('Error generating platform comparison:', error);
    res.status(500).json({ error: 'Failed to generate platform comparison' });
  }
});

// Save scraped restaurant data
router.post('/scraped-data', async (req, res) => {
  try {
    const data: ScrapedRestaurantData = req.body;
    
    // Validate the platform code
    if (!Object.values(DeliveryPlatformCode).includes(data.platformCode)) {
      return res.status(400).json({
        error: `Invalid platform code. Must be one of: ${Object.values(DeliveryPlatformCode).join(', ')}`
      });
    }
    
    // Validate required fields
    if (!data.platformName) {
      return res.status(400).json({ error: 'Platform name is required' });
    }
    
    if (!data.scrapedAt) {
      data.scrapedAt = new Date();
    }
    
    if (!data.restaurantData) {
      return res.status(400).json({ error: 'Restaurant data is required' });
    }
    
    if (!data.restaurantData.name || !data.restaurantData.platformRestaurantId || !data.restaurantData.platformUrl) {
      return res.status(400).json({ 
        error: 'Restaurant name, platform restaurant ID, and platform URL are required' 
      });
    }
    
    await platformService.saveScrapedData(data);
    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error saving scraped data:', error);
    res.status(500).json({ error: 'Failed to save scraped data' });
  }
});

export default router; 