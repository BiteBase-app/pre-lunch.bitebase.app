"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Utensils, Check, Info } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Define plan types
interface PlanFeature {
  name: string
  tooltip?: string
}

interface Plan {
  id: string
  name: string
  tagline: string
  price: number
  billingPeriod: string
  features: PlanFeature[]
  useCase: string
  popular?: boolean
}

export default function SubscribePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialPlan = searchParams.get("plan") || "professional"

  const [selectedPlan, setSelectedPlan] = useState(initialPlan)
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")

  // Define plans with the new tier structure
  const plans: Record<string, Plan> = {
    basic: {
      id: "basic",
      name: "Restaurant Essentials",
      tagline: "Basic Tier",
      price: billingCycle === "monthly" ? 9.99 : 99.9, // 10% discount for annual
      billingPeriod: billingCycle === "monthly" ? "per month" : "per year",
      features: [
        { name: "Analytics Overview: Basic performance metrics dashboard" },
        { name: "Local Market Snapshot: Limited radius market data analysis" },
        { name: "Review Monitoring: Basic review aggregation (Google & Yelp only)" },
        { name: "Competitor Tracking: Monitor up to 5 direct competitors" },
        { name: "Basic AI Insights: Monthly business health reports" },
        { name: "Data History: 3-month history retention" },
        { name: "Support: Standard email support" },
      ],
      useCase: "Ideal for single-location independent restaurants or cafes seeking foundational insights",
    },
    professional: {
      id: "professional",
      name: "Restaurant Growth",
      tagline: "Professional Tier",
      price: billingCycle === "monthly" ? 99 : 990, // 10% discount for annual
      billingPeriod: billingCycle === "monthly" ? "per month" : "per year",
      features: [
        { name: "Everything in Basic, plus:" },
        { name: "Advanced Analytics: Detailed performance breakdown with customizable KPIs" },
        { name: "Extended Market Analysis: Expanded radius analysis with demographic segmentation" },
        { name: "Full Review Suite: Complete review management across all platforms with sentiment analysis" },
        { name: "Enhanced Competitor Analysis: Monitor up to 15 competitors with detailed benchmarking" },
        { name: "AI Strategy Recommendations: Weekly actionable insights with implementation guidance" },
        { name: "Menu Optimization Engine: Full menu performance analysis and optimization" },
        { name: "Marketing Channel Analysis: ROI tracking for marketing efforts" },
        { name: "Data History: 1-year data history" },
        { name: "Support: Priority support with dedicated account manager" },
      ],
      useCase: "Perfect for growing restaurant groups with 2-5 locations looking to optimize operations and expand",
      popular: true,
    },
    enterprise: {
      id: "enterprise",
      name: "Restaurant Empire",
      tagline: "Enterprise Tier",
      price: billingCycle === "monthly" ? 499 : 4990, // 10% discount for annual
      billingPeriod: billingCycle === "monthly" ? "per month" : "per year",
      features: [
        { name: "Everything in Professional, plus:" },
        { name: "Enterprise Analytics Dashboard: Cross-location performance comparison" },
        { name: "Predictive Forecasting: AI-powered sales and trend predictions" },
        { name: "Custom Market Research: On-demand custom research for specific business questions" },
        { name: "White-Glove Review Management: Managed review response service" },
        { name: "Unlimited Competitor Tracking: Monitor unlimited competitors with industry benchmarking" },
        { name: "Strategic AI Partnership: Monthly strategy sessions with AI insights specialists" },
        { name: "Location Expansion Planning: Site selection analytics for new locations" },
        { name: "Custom API Access: Integrate BiteBase Intelligence data with your existing systems" },
        { name: "Data History: Unlimited historical data retention" },
        { name: "Support: 24/7 premium support with dedicated success team" },
      ],
      useCase:
        "Designed for restaurant chains, franchises, and multi-concept hospitality groups with sophisticated data needs",
    },
  }

  // Handle continue to registration
  const handleContinue = () => {
    // In a real implementation, you would create a checkout session with Stripe here
    // For now, we'll just redirect to the registration page with plan info
    router.push(`/register?plan=${selectedPlan}&billing=${billingCycle}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b py-4">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Utensils className="h-6 w-6 text-primary" />
            <span className="font-bold">BiteBase Intelligence</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="container max-w-6xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight">Choose Your Plan</h1>
            <p className="text-muted-foreground mt-2">
              All plans include a 14-day free trial. No credit card required to start.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-8 space-x-4">
            <span className={billingCycle === "monthly" ? "font-medium" : "text-muted-foreground"}>Monthly</span>
            <div className="flex items-center space-x-2">
              <Switch
                checked={billingCycle === "annual"}
                onCheckedChange={(checked) => setBillingCycle(checked ? "annual" : "monthly")}
              />
              <Label>Annual (Save 10%)</Label>
            </div>
            <span className={billingCycle === "annual" ? "font-medium" : "text-muted-foreground"}>Annual</span>
          </div>

          {/* Plan Selection */}
          <div className="grid gap-6 md:grid-cols-3">
            {Object.values(plans).map((plan) => (
              <Card
                key={plan.id}
                className={`relative overflow-hidden transition-all ${
                  selectedPlan === plan.id ? "border-primary shadow-lg" : "hover:border-primary/50"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <Badge className="rounded-tl-none rounded-br-none rounded-tr-md rounded-bl-md px-3 py-1.5">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.tagline}</CardDescription>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">${plan.price.toFixed(2)}</span>
                    <span className="text-muted-foreground"> {plan.billingPeriod}</span>
                  </div>
                </CardHeader>
                <CardContent className="h-[400px] overflow-y-auto">
                  <TooltipProvider>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                          <span>
                            {feature.name}
                            {feature.tooltip && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-4 w-4 inline-block ml-1 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs">{feature.tooltip}</p>
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </TooltipProvider>

                  <div className="mt-6 pt-4 border-t">
                    <h4 className="font-medium mb-2">Best For:</h4>
                    <p className="text-sm text-muted-foreground">{plan.useCase}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => {
                      setSelectedPlan(plan.id)
                      handleContinue()
                    }}
                    className="w-full"
                    variant={selectedPlan === plan.id ? "default" : "outline"}
                  >
                    {selectedPlan === plan.id ? "Continue with this plan" : "Select this plan"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Guarantee */}
          <div className="text-center mt-10">
            <p className="text-muted-foreground">
              14-day free trial. Cancel anytime. No credit card required to start.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2">
              <Utensils className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">© 2023 BiteBase Intelligence. All rights reserved.</span>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

