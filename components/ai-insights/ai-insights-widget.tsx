"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bot, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AIInsightsWidget() {
  const [insights] = useState([
    {
      id: 1,
      title: "Revenue Opportunity",
      description:
        "Your weekend dinner service has 15% higher average ticket than weekdays. Consider running a weekday dinner promotion to boost revenue.",
      category: "revenue",
      confidence: "high",
    },
    {
      id: 2,
      title: "Menu Optimization",
      description:
        "Your appetizer to entrée ratio is below industry average. Adding 2-3 shareable appetizers could increase average check size by 8-12%.",
      category: "menu",
      confidence: "medium",
    },
    {
      id: 3,
      title: "Customer Insight",
      description:
        "Repeat customers spend 22% more than first-time visitors. Consider implementing a loyalty program to increase retention.",
      category: "customers",
      confidence: "high",
    },
  ])

  const getConfidenceBadge = (confidence: string) => {
    switch (confidence) {
      case "high":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">High Confidence</Badge>
      case "medium":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Medium Confidence</Badge>
      case "low":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Low Confidence</Badge>
      default:
        return null
    }
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "revenue":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Revenue
          </Badge>
        )
      case "menu":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Menu
          </Badge>
        )
      case "customers":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            Customers
          </Badge>
        )
      case "location":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Location
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card className="w-full glass-panel">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle>AI Insights</CardTitle>
          </div>
          <Link href="/dashboard/ai-insights">
            <Button variant="ghost" size="sm" className="h-8 gap-1">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <CardDescription>AI-powered recommendations for your restaurant</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight) => (
          <div key={insight.id} className="p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full mt-1">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-medium text-sm">{insight.title}</h3>
                  {getCategoryBadge(insight.category)}
                  {getConfidenceBadge(insight.confidence)}
                </div>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <Sparkles className="h-4 w-4 mr-2" />
          Generate New Insights
        </Button>
      </CardFooter>
    </Card>
  )
}

