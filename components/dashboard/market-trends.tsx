"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

export function MarketTrends() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Market Trend Analysis</CardTitle>
          <CardDescription>Current trends in the restaurant industry affecting your business</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="food">
            <TabsList className="mb-4">
              <TabsTrigger value="food">Food Trends</TabsTrigger>
              <TabsTrigger value="tech">Technology</TabsTrigger>
              <TabsTrigger value="consumer">Consumer Behavior</TabsTrigger>
              <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
            </TabsList>
            <TabsContent value="food" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <TrendCard
                  title="Plant-Based Options"
                  trend="up"
                  percentage={32}
                  description="Growing demand for plant-based alternatives across all demographics"
                />
                <TrendCard
                  title="Global Fusion Cuisine"
                  trend="up"
                  percentage={18}
                  description="Increasing interest in dishes that blend multiple cultural influences"
                />
                <TrendCard
                  title="Artisanal Cocktails"
                  trend="up"
                  percentage={24}
                  description="Premium, craft cocktails with unique ingredients and presentations"
                />
                <TrendCard
                  title="Formal Fine Dining"
                  trend="down"
                  percentage={12}
                  description="Decreasing interest in traditional formal dining experiences"
                />
                <TrendCard
                  title="Comfort Food"
                  trend="neutral"
                  percentage={3}
                  description="Stable demand for familiar comfort foods with slight upward trend"
                />
                <TrendCard
                  title="Fermented Foods"
                  trend="up"
                  percentage={28}
                  description="Growing interest in kimchi, kombucha, and other fermented options"
                />
              </div>
            </TabsContent>
            <TabsContent value="tech" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <TrendCard
                  title="QR Code Menus"
                  trend="up"
                  percentage={45}
                  description="Widespread adoption of digital menus accessed via QR codes"
                />
                <TrendCard
                  title="Contactless Payment"
                  trend="up"
                  percentage={38}
                  description="Strong preference for contactless payment options across all age groups"
                />
                <TrendCard
                  title="Online Ordering"
                  trend="up"
                  percentage={52}
                  description="Continued growth in direct online ordering from restaurant websites"
                />
                <TrendCard
                  title="Delivery Robots"
                  trend="up"
                  percentage={15}
                  description="Emerging technology for automated food delivery in urban areas"
                />
                <TrendCard
                  title="AI-Powered Analytics"
                  trend="up"
                  percentage={67}
                  description="Rapid adoption of AI tools for business intelligence and forecasting"
                />
                <TrendCard
                  title="Third-Party Delivery"
                  trend="neutral"
                  percentage={2}
                  description="Stabilizing usage of third-party delivery platforms after pandemic surge"
                />
              </div>
            </TabsContent>
            <TabsContent value="consumer" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <TrendCard
                  title="Experience-Focused Dining"
                  trend="up"
                  percentage={29}
                  description="Growing demand for unique, memorable dining experiences"
                />
                <TrendCard
                  title="Health-Conscious Choices"
                  trend="up"
                  percentage={41}
                  description="Increasing preference for nutritional information and healthy options"
                />
                <TrendCard
                  title="Value-Oriented Dining"
                  trend="up"
                  percentage={22}
                  description="Growing focus on perceived value rather than just low prices"
                />
                <TrendCard
                  title="Late Night Dining"
                  trend="down"
                  percentage={18}
                  description="Decreasing demand for late-night dining options post-pandemic"
                />
                <TrendCard
                  title="Family-Style Dining"
                  trend="up"
                  percentage={14}
                  description="Increasing interest in shareable, family-style meal formats"
                />
                <TrendCard
                  title="Loyalty Programs"
                  trend="up"
                  percentage={35}
                  description="Strong growth in customer engagement with restaurant loyalty programs"
                />
              </div>
            </TabsContent>
            <TabsContent value="sustainability" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <TrendCard
                  title="Sustainable Packaging"
                  trend="up"
                  percentage={47}
                  description="Strong consumer preference for eco-friendly packaging solutions"
                />
                <TrendCard
                  title="Local Sourcing"
                  trend="up"
                  percentage={28}
                  description="Growing demand for locally sourced ingredients and transparency"
                />
                <TrendCard
                  title="Food Waste Reduction"
                  trend="up"
                  percentage={32}
                  description="Increasing focus on reducing food waste throughout operations"
                />
                <TrendCard
                  title="Carbon Footprint"
                  trend="up"
                  percentage={24}
                  description="Growing consumer awareness of restaurant carbon footprints"
                />
                <TrendCard
                  title="Ethical Labor Practices"
                  trend="up"
                  percentage={19}
                  description="Increasing consumer concern about fair labor practices in restaurants"
                />
                <TrendCard
                  title="Water Conservation"
                  trend="up"
                  percentage={21}
                  description="Growing focus on water usage reduction in restaurant operations"
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

interface TrendCardProps {
  title: string
  trend: "up" | "down" | "neutral"
  percentage: number
  description: string
}

function TrendCard({ title, trend, percentage, description }: TrendCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{title}</CardTitle>
          {trend === "up" && (
            <Badge className="bg-green-500 hover:bg-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              {percentage}%
            </Badge>
          )}
          {trend === "down" && (
            <Badge className="bg-red-500 hover:bg-red-600">
              <TrendingDown className="mr-1 h-3 w-3" />
              {percentage}%
            </Badge>
          )}
          {trend === "neutral" && (
            <Badge variant="outline">
              <Minus className="mr-1 h-3 w-3" />
              {percentage}%
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

