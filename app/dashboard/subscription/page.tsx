"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Check, CreditCard, AlertTriangle, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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

export default function SubscriptionPage() {
  const { user, updateSubscription } = useAuth()
  const router = useRouter()
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")
  const [selectedPlan, setSelectedPlan] = useState(user?.subscription?.plan || "basic")
  const [isProcessing, setIsProcessing] = useState(false)

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

  const currentPlan = plans[user?.subscription?.plan || "basic"] || plans.basic
  const isTrialing = user?.subscription?.status === "trialing"
  const trialEndsAt = user?.subscription?.trialEndsAt

  // Calculate days left in trial
  const daysLeft = trialEndsAt
    ? Math.max(0, Math.ceil((trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0

  const handleUpgrade = async () => {
    setIsProcessing(true)

    try {
      // In a real implementation, you would create a checkout session with Stripe here
      // For now, we'll just update the subscription status
      await updateSubscription(selectedPlan, "active")

      // Show success message and redirect
      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    } catch (error) {
      console.error("Error upgrading subscription:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Subscription Management" text="Manage your subscription plan and billing details." />

      {isTrialing && (
        <Alert variant={daysLeft <= 3 ? "warning" : "default"} className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Trial Period</AlertTitle>
          <AlertDescription>
            You are currently on a trial period. Your trial will end in {daysLeft} days.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Your current subscription details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{currentPlan.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {user?.subscription?.status === "active"
                    ? `$${currentPlan.price} ${currentPlan.billingPeriod}`
                    : "Free Trial"}
                </p>
              </div>
              <div className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {user?.subscription?.status === "active" ? "Active" : "Trial"}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Included Features:</h4>
              <ul className="space-y-1">
                {currentPlan.features.slice(0, 5).map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 shrink-0" />
                    <span>{feature.name}</span>
                  </li>
                ))}
                {currentPlan.features.length > 5 && (
                  <li className="text-sm text-muted-foreground pl-6">
                    + {currentPlan.features.length - 5} more features
                  </li>
                )}
              </ul>
            </div>

            {user?.subscription?.status === "active" && (
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Payment Method</h4>
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">•••• •••• •••• 4242</span>
                  <Button variant="link" size="sm" className="text-xs">
                    Update
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            {user?.subscription?.status === "active" ? (
              <Button variant="outline" className="w-full">
                Manage Billing
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() => document.getElementById("upgrade-section")?.scrollIntoView({ behavior: "smooth" })}
              >
                Upgrade Now
              </Button>
            )}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>View your past invoices and payment history</CardDescription>
          </CardHeader>
          <CardContent>
            {user?.subscription?.status === "active" ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <p className="font-medium">Invoice #1001</p>
                    <p className="text-sm text-muted-foreground">Mar 1, 2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${currentPlan.price}</p>
                    <p className="text-xs text-green-600">Paid</p>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <p className="font-medium">Invoice #1002</p>
                    <p className="text-sm text-muted-foreground">Apr 1, 2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${currentPlan.price}</p>
                    <p className="text-xs text-green-600">Paid</p>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2">
                  <div>
                    <p className="font-medium">Invoice #1003</p>
                    <p className="text-sm text-muted-foreground">May 1, 2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${currentPlan.price}</p>
                    <p className="text-xs text-green-600">Paid</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <p className="text-muted-foreground mb-2">No billing history available</p>
                <p className="text-sm text-muted-foreground">
                  Your billing history will appear here once you upgrade to a paid plan.
                </p>
              </div>
            )}
          </CardContent>
          {user?.subscription?.status === "active" && (
            <CardFooter>
              <Button variant="outline" className="w-full">
                Download All Invoices
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>

      {/* Upgrade Section */}
      {user?.subscription?.status !== "active" && (
        <div id="upgrade-section" className="mt-10">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Upgrade Your Plan</h2>

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

          <div className="grid gap-6 md:grid-cols-3">
            {Object.values(plans).map((plan) => (
              <Card
                key={plan.id}
                className={`relative overflow-hidden transition-all ${
                  selectedPlan === plan.id ? "border-primary shadow-lg" : "hover:border-primary/50"
                }`}
                onClick={() => setSelectedPlan(plan.id)}
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
                <CardContent className="h-[300px] overflow-y-auto">
                  <TooltipProvider>
                    <ul className="space-y-2">
                      {plan.features.slice(0, 6).map((feature, index) => (
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
                      {plan.features.length > 6 && (
                        <li className="text-sm text-muted-foreground pl-7">
                          + {plan.features.length - 6} more features
                        </li>
                      )}
                    </ul>
                  </TooltipProvider>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleUpgrade()}
                    className="w-full"
                    variant={selectedPlan === plan.id ? "default" : "outline"}
                    disabled={
                      isProcessing || (user?.subscription?.plan === plan.id && user?.subscription?.status === "active")
                    }
                  >
                    {isProcessing
                      ? "Processing..."
                      : selectedPlan === plan.id
                        ? "Upgrade to This Plan"
                        : "Select This Plan"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </DashboardShell>
  )
}

