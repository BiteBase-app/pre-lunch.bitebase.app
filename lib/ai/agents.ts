import { z } from "zod"

// Base schema for all agent responses
const BaseResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  timestamp: z.string().optional(),
})

// Market Analysis Schema
export const MarketAnalysisSchema = z
  .object({
    marketSize: z.number(),
    growthRate: z.number(),
    keyTrends: z.array(z.string()),
    competitorDensity: z.number(),
    marketSaturation: z.number(),
    consumerPreferences: z.array(
      z.object({
        preference: z.string(),
        percentage: z.number(),
      }),
    ),
    seasonalFactors: z.array(
      z.object({
        season: z.string(),
        impact: z.string(),
        opportunityScore: z.number(),
      }),
    ),
    recommendations: z.array(z.string()),
  })
  .merge(BaseResponseSchema)

// Menu Optimization Schema
export const MenuOptimizationSchema = z
  .object({
    topPerformingItems: z.array(
      z.object({
        name: z.string(),
        profitMargin: z.number(),
        popularity: z.number(),
      }),
    ),
    underperformingItems: z.array(
      z.object({
        name: z.string(),
        profitMargin: z.number(),
        popularity: z.number(),
        recommendedAction: z.string(),
      }),
    ),
    pricingRecommendations: z.array(
      z.object({
        itemName: z.string(),
        currentPrice: z.number(),
        recommendedPrice: z.number(),
        rationale: z.string(),
      }),
    ),
    newItemSuggestions: z.array(
      z.object({
        name: z.string(),
        description: z.string(),
        estimatedPopularity: z.number(),
        estimatedProfitMargin: z.number(),
      }),
    ),
    menuStructureRecommendations: z.string(),
  })
  .merge(BaseResponseSchema)

// Customer Insights Schema
export const CustomerInsightsSchema = z
  .object({
    demographicBreakdown: z.array(
      z.object({
        segment: z.string(),
        percentage: z.number(),
        spendingHabits: z.string(),
      }),
    ),
    customerSentiment: z.object({
      overall: z.number(),
      food: z.number(),
      service: z.number(),
      ambiance: z.number(),
      value: z.number(),
    }),
    loyaltyMetrics: z.object({
      repeatCustomerRate: z.number(),
      averageVisitsPerMonth: z.number(),
      customerLifetimeValue: z.number(),
    }),
    feedbackThemes: z.array(
      z.object({
        theme: z.string(),
        frequency: z.number(),
        sentiment: z.string(),
      }),
    ),
    customerJourneyInsights: z.string(),
  })
  .merge(BaseResponseSchema)

// Competitor Analysis Schema
export const CompetitorAnalysisSchema = z
  .object({
    directCompetitors: z.array(
      z.object({
        name: z.string(),
        strengths: z.array(z.string()),
        weaknesses: z.array(z.string()),
        marketShare: z.number().optional(),
        priceComparison: z.string(),
      }),
    ),
    indirectCompetitors: z.array(
      z.object({
        name: z.string(),
        type: z.string(),
        threatLevel: z.string(),
        notes: z.string(),
      }),
    ),
    competitiveAdvantages: z.array(z.string()),
    competitiveDisadvantages: z.array(z.string()),
    marketPositioning: z.string(),
    recommendedStrategies: z.array(z.string()),
  })
  .merge(BaseResponseSchema)

// Financial Analysis Schema
export const FinancialAnalysisSchema = z
  .object({
    profitabilityMetrics: z.object({
      grossProfitMargin: z.number(),
      netProfitMargin: z.number(),
      operatingProfitMargin: z.number(),
      returnOnInvestment: z.number(),
    }),
    cashFlowAnalysis: z.object({
      operatingCashFlow: z.number(),
      freeCashFlow: z.number(),
      cashBurnRate: z.number().optional(),
      cashRunway: z.number().optional(),
    }),
    costBreakdown: z.array(
      z.object({
        category: z.string(),
        percentage: z.number(),
        optimizationPotential: z.string(),
      }),
    ),
    revenueStreams: z.array(
      z.object({
        stream: z.string(),
        percentage: z.number(),
        growthRate: z.number(),
      }),
    ),
    financialProjections: z.array(
      z.object({
        period: z.string(),
        revenue: z.number(),
        expenses: z.number(),
        profit: z.number(),
      }),
    ),
    breakEvenAnalysis: z.object({
      breakEvenPoint: z.number(),
      timeToBreakEven: z.string(),
    }),
    financialRecommendations: z.array(z.string()),
  })
  .merge(BaseResponseSchema)

// Location Analysis Schema
export const LocationAnalysisSchema = z
  .object({
    locationScore: z.number(),
    footTrafficAnalysis: z.object({
      averageDaily: z.number(),
      peakHours: z.array(z.string()),
      weekdayVsWeekend: z.string(),
    }),
    demographicFit: z.object({
      score: z.number(),
      notes: z.string(),
    }),
    competitorProximity: z.object({
      directCompetitorsNearby: z.number(),
      indirectCompetitorsNearby: z.number(),
      competitiveSaturation: z.string(),
    }),
    accessibilityFactors: z.object({
      publicTransport: z.string(),
      parking: z.string(),
      walkability: z.string(),
    }),
    rentalCostAnalysis: z.object({
      currentRate: z.number(),
      marketComparison: z.string(),
      projectedGrowth: z.string(),
    }),
    locationRisks: z.array(z.string()),
    locationOpportunities: z.array(z.string()),
  })
  .merge(BaseResponseSchema)

// Trend Forecast Schema
export const TrendForecastSchema = z
  .object({
    emergingCulinaryTrends: z.array(
      z.object({
        trend: z.string(),
        projectedGrowth: z.string(),
        relevanceScore: z.number(),
        adoptionRecommendation: z.string(),
      }),
    ),
    consumerBehaviorShifts: z.array(
      z.object({
        behavior: z.string(),
        impact: z.string(),
        timeframe: z.string(),
      }),
    ),
    technologyTrends: z.array(
      z.object({
        technology: z.string(),
        applicationInRestaurants: z.string(),
        implementationCost: z.string(),
        potentialROI: z.string(),
      }),
    ),
    sustainabilityTrends: z.array(
      z.object({
        trend: z.string(),
        consumerDemand: z.string(),
        implementationStrategy: z.string(),
      }),
    ),
    seasonalPredictions: z.array(
      z.object({
        season: z.string(),
        predictedTrends: z.array(z.string()),
        recommendedFocus: z.string(),
      }),
    ),
    longTermIndustryOutlook: z.string(),
  })
  .merge(BaseResponseSchema)

