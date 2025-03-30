"use client"

import { useTranslation } from "react-i18next"
import { BarChart3, Users, Calendar, ShoppingCart, TrendingUp, Map, Brain, Utensils } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Features() {
  const { t } = useTranslation()

  const features = [
    {
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      title: "Sales Analytics",
      description: "Track revenue, analyze sales patterns, and identify your most profitable items and time periods.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Customer Insights",
      description: "Understand your customer demographics, preferences, and buying behaviors to tailor your offerings.",
    },
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: "Staff Scheduling",
      description: "Optimize your staffing based on predicted busy periods and historical data.",
    },
    {
      icon: <ShoppingCart className="h-10 w-10 text-primary" />,
      title: "Inventory Management",
      description: "Reduce waste and control costs with smart inventory tracking and ordering suggestions.",
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-primary" />,
      title: "Performance Metrics",
      description: "Monitor KPIs like average check size, table turnover, and customer satisfaction scores.",
    },
    {
      icon: <Map className="h-10 w-10 text-primary" />,
      title: "Geospatial Analytics",
      description: "Analyze location-based data to understand market penetration and competition.",
    },
    {
      icon: <Brain className="h-10 w-10 text-primary" />,
      title: "AI-Powered Insights",
      description: "Get intelligent recommendations and predictions based on your restaurant's unique data.",
    },
    {
      icon: <Utensils className="h-10 w-10 text-primary" />,
      title: "Menu Optimization",
      description: "Identify your menu's stars, workhorses, puzzles, and dogs to maximize profitability.",
    },
  ]

  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Powerful Features for Restaurant Success
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
              Everything you need to run a smarter, more profitable restaurant business
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 pt-12 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <div className="mb-2">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

