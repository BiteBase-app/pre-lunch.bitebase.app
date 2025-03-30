import React, { useState, useEffect } from 'react';
import { 
  PlatformComparison as PlatformComparisonType,
  DeliveryPlatformCode 
} from '../models/delivery-platforms';
import { 
  Card, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Chip,
  Rating,
  Divider
} from '@mui/material';

// Platform colors for visual differentiation
const platformColors = {
  [DeliveryPlatformCode.GF]: '#00B14F', // GRABFOOD green
  [DeliveryPlatformCode.LM]: '#01C95A', // LINEMAN green
  [DeliveryPlatformCode.RH]: '#2E4B77', // ROBINHOOD blue
  [DeliveryPlatformCode.FP]: '#D70F64'  // FOOD PANDA pink
};

// Platform icons (you can replace these with actual icons)
const platformIcons = {
  [DeliveryPlatformCode.GF]: '🍔',
  [DeliveryPlatformCode.LM]: '🛵',
  [DeliveryPlatformCode.RH]: '👑',
  [DeliveryPlatformCode.FP]: '🐼',
};

interface PlatformComparisonProps {
  restaurantId: number;
}

const PlatformComparison: React.FC<PlatformComparisonProps> = ({ restaurantId }) => {
  const [comparisonData, setComparisonData] = useState<PlatformComparisonType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComparisonData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/restaurant-platforms/restaurants/${restaurantId}/platform-comparison`);
        
        if (!response.ok) {
          throw new Error(`Error fetching comparison data: ${response.statusText}`);
        }
        
        const data = await response.json();
        setComparisonData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching platform comparison:', err);
      } finally {
        setLoading(false);
      }
    };

    if (restaurantId) {
      fetchComparisonData();
    }
  }, [restaurantId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!comparisonData || comparisonData.platforms.length === 0) {
    return <Alert severity="info">No platform data available for this restaurant.</Alert>;
  }

  return (
    <Card>
      <Box p={3}>
        <Typography variant="h5" gutterBottom>
          {comparisonData.restaurantName} - Platform Comparison
        </Typography>
        
        <Box display="flex" gap={2} mb={3}>
          {comparisonData.platforms.map(platform => (
            <Chip
              key={platform.platformCode}
              label={`${platformIcons[platform.platformCode]} ${platform.platformName}`}
              style={{ 
                backgroundColor: platformColors[platform.platformCode],
                color: 'white',
                fontWeight: 'bold'
              }}
            />
          ))}
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Metric</TableCell>
                {comparisonData.platforms.map(platform => (
                  <TableCell 
                    key={platform.platformCode}
                    align="center"
                    style={{ 
                      borderBottom: `3px solid ${platformColors[platform.platformCode]}`,
                      fontWeight: 'bold'
                    }}
                  >
                    {platform.platformName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Rating */}
              <TableRow>
                <TableCell component="th" scope="row">Rating</TableCell>
                {comparisonData.platforms.map(platform => (
                  <TableCell key={`${platform.platformCode}-rating`} align="center">
                    {platform.avgRating ? (
                      <Box display="flex" flexDirection="column" alignItems="center">
                        <Rating 
                          value={platform.avgRating} 
                          precision={0.1} 
                          readOnly 
                          size="small"
                        />
                        <Typography variant="caption">
                          {platform.avgRating.toFixed(1)} ({platform.ratingCount} reviews)
                        </Typography>
                      </Box>
                    ) : (
                      <Typography variant="caption">No ratings</Typography>
                    )}
                  </TableCell>
                ))}
              </TableRow>
              
              {/* Price Level */}
              <TableRow>
                <TableCell component="th" scope="row">Price Level</TableCell>
                {comparisonData.platforms.map(platform => (
                  <TableCell key={`${platform.platformCode}-price`} align="center">
                    {platform.priceLevel ? '$'.repeat(platform.priceLevel) : 'N/A'}
                  </TableCell>
                ))}
              </TableRow>
              
              {/* Delivery Fee */}
              <TableRow>
                <TableCell component="th" scope="row">Delivery Fee</TableCell>
                {comparisonData.platforms.map(platform => (
                  <TableCell key={`${platform.platformCode}-delivery`} align="center">
                    {platform.deliveryFee !== null ? `$${platform.deliveryFee.toFixed(2)}` : 'N/A'}
                  </TableCell>
                ))}
              </TableRow>
              
              {/* Minimum Order */}
              <TableRow>
                <TableCell component="th" scope="row">Minimum Order</TableCell>
                {comparisonData.platforms.map(platform => (
                  <TableCell key={`${platform.platformCode}-minimum`} align="center">
                    {platform.minimumOrder !== null ? `$${platform.minimumOrder.toFixed(2)}` : 'N/A'}
                  </TableCell>
                ))}
              </TableRow>
              
              {/* Estimated Delivery Time */}
              <TableRow>
                <TableCell component="th" scope="row">Delivery Time</TableCell>
                {comparisonData.platforms.map(platform => (
                  <TableCell key={`${platform.platformCode}-time`} align="center">
                    {platform.estimatedDeliveryTime || 'N/A'}
                  </TableCell>
                ))}
              </TableRow>
              
              {/* Menu Items */}
              <TableRow>
                <TableCell component="th" scope="row">Menu Items</TableCell>
                {comparisonData.platforms.map(platform => (
                  <TableCell key={`${platform.platformCode}-menu`} align="center">
                    {platform.menuItemCount}
                    {platform.avgMenuItemPrice && (
                      <Typography variant="caption" display="block">
                        Avg. price: ${platform.avgMenuItemPrice.toFixed(2)}
                      </Typography>
                    )}
                  </TableCell>
                ))}
              </TableRow>
              
              {/* Popularity */}
              <TableRow>
                <TableCell component="th" scope="row">Order Volume</TableCell>
                {comparisonData.platforms.map(platform => (
                  <TableCell key={`${platform.platformCode}-orders`} align="center">
                    {platform.popularity ? (
                      <>
                        <Typography variant="body2">
                          {platform.popularity.orderCount} orders
                        </Typography>
                        <Typography variant="caption" display="block">
                          ${platform.popularity.totalRevenue.toFixed(2)} total
                        </Typography>
                        {platform.popularity.avgOrderValue && (
                          <Typography variant="caption" display="block">
                            ${platform.popularity.avgOrderValue.toFixed(2)} avg. order
                          </Typography>
                        )}
                      </>
                    ) : 'No data'}
                  </TableCell>
                ))}
              </TableRow>
              
              {/* Popularity Rank */}
              <TableRow>
                <TableCell component="th" scope="row">Platform Rank</TableCell>
                {comparisonData.platforms.map(platform => (
                  <TableCell key={`${platform.platformCode}-rank`} align="center">
                    {platform.popularity?.popularityRank ? 
                      `#${platform.popularity.popularityRank}` : 
                      'N/A'
                    }
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        
        <Typography variant="caption" sx={{ mt: 2, display: 'block', color: 'text.secondary' }}>
          * Data based on the last 30 days of platform performance
        </Typography>
      </Box>
    </Card>
  );
};

export default PlatformComparison; 