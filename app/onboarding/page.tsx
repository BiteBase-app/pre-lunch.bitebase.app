"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Utensils, ArrowRight, ArrowLeft } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(25)

  const [formData, setFormData] = useState({
    // Restaurant Info
    restaurantName: "",
    restaurantType: "",
    locations: 1,

    // POS System
    posSystem: "",
    hasExistingData: false,

    // Business Goals
    goals: {
      increaseRevenue: false,
      reduceWaste: false,
      optimizeMenu: false,
      improveCustomerExperience: false,
      staffManagement: false,
      competitorAnalysis: false,
    },

    // Preferences
    preferredReportFrequency: "weekly",
    notificationPreferences: {
      email: true,
      inApp: true,
      sms: false,
    },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (category: string, name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...(prev[category as keyof typeof prev] as Record<string, boolean>),
        [name]: checked,
      },
    }))
  }

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
      setProgress((step + 1) * 25)
    } else {
      // Complete onboarding and redirect to project creation
      router.push("/dashboard/new-project")
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      setProgress((step - 1) * 25)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b py-4">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Utensils className="h-6 w-6 text-primary" />
            <span className="font-bold">BiteBaseAI</span>
          </Link>
          <div className="text-sm text-muted-foreground">
            Need help?{" "}
            <Link href="#" className="text-primary hover:underline">
              Contact support
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="container max-w-2xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Set up your BiteBase account</h1>
            <p className="text-muted-foreground">Tell us about your restaurant to get the most out of BiteBase</p>
            <Progress value={progress} className="mt-4 h-2" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {step === 1 && "Restaurant Information"}
                {step === 2 && "POS System"}
                {step === 3 && "Business Goals"}
                {step === 4 && "Preferences"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Tell us about your restaurant"}
                {step === 2 && "Connect your point of sale system"}
                {step === 3 && "What are your main business goals?"}
                {step === 4 && "Set your reporting and notification preferences"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Step 1: Restaurant Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="restaurantName">Restaurant Name</Label>
                    <Input
                      id="restaurantName"
                      name="restaurantName"
                      value={formData.restaurantName}
                      onChange={handleInputChange}
                      placeholder="e.g., Joe's Italian Bistro"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="restaurantType">Restaurant Type</Label>
                    <Select
                      value={formData.restaurantType}
                      onValueChange={(value) => handleSelectChange("restaurantType", value)}
                    >
                      <SelectTrigger id="restaurantType">
                        <SelectValue placeholder="Select restaurant type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="casual_dining">Casual Dining</SelectItem>
                        <SelectItem value="fine_dining">Fine Dining</SelectItem>
                        <SelectItem value="fast_casual">Fast Casual</SelectItem>
                        <SelectItem value="quick_service">Quick Service (QSR)</SelectItem>
                        <SelectItem value="cafe">Café</SelectItem>
                        <SelectItem value="bar">Bar/Pub</SelectItem>
                        <SelectItem value="food_truck">Food Truck</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="locations">Number of Locations</Label>
                    <Input
                      id="locations"
                      name="locations"
                      type="number"
                      min="1"
                      value={formData.locations}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: POS System */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="posSystem">POS System</Label>
                    <Select
                      value={formData.posSystem}
                      onValueChange={(value) => handleSelectChange("posSystem", value)}
                    >
                      <SelectTrigger id="posSystem">
                        <SelectValue placeholder="Select your POS system" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="toast">Toast</SelectItem>
                        <SelectItem value="square">Square</SelectItem>
                        <SelectItem value="clover">Clover</SelectItem>
                        <SelectItem value="lightspeed">Lightspeed</SelectItem>
                        <SelectItem value="shopify">Shopify POS</SelectItem>
                        <SelectItem value="revel">Revel</SelectItem>
                        <SelectItem value="touchbistro">TouchBistro</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="none">No POS System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-start space-x-2 pt-4">
                    <Checkbox
                      id="hasExistingData"
                      checked={formData.hasExistingData}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, hasExistingData: checked as boolean }))
                      }
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="hasExistingData"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I have existing sales data I want to import
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        We can help you import historical data for better insights
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Business Goals */}
              {step === 3 && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Select all that apply. This helps us customize your dashboard and insights.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="increaseRevenue"
                        checked={formData.goals.increaseRevenue}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("goals", "increaseRevenue", checked as boolean)
                        }
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="increaseRevenue" className="text-sm font-medium">
                          Increase Revenue
                        </Label>
                        <p className="text-xs text-muted-foreground">Boost sales and overall revenue</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="reduceWaste"
                        checked={formData.goals.reduceWaste}
                        onCheckedChange={(checked) => handleCheckboxChange("goals", "reduceWaste", checked as boolean)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="reduceWaste" className="text-sm font-medium">
                          Reduce Waste
                        </Label>
                        <p className="text-xs text-muted-foreground">Optimize inventory and reduce food waste</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="optimizeMenu"
                        checked={formData.goals.optimizeMenu}
                        onCheckedChange={(checked) => handleCheckboxChange("goals", "optimizeMenu", checked as boolean)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="optimizeMenu" className="text-sm font-medium">
                          Optimize Menu
                        </Label>
                        <p className="text-xs text-muted-foreground">Identify best and worst performing items</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="improveCustomerExperience"
                        checked={formData.goals.improveCustomerExperience}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("goals", "improveCustomerExperience", checked as boolean)
                        }
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="improveCustomerExperience" className="text-sm font-medium">
                          Improve Customer Experience
                        </Label>
                        <p className="text-xs text-muted-foreground">Enhance service and customer satisfaction</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="staffManagement"
                        checked={formData.goals.staffManagement}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("goals", "staffManagement", checked as boolean)
                        }
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="staffManagement" className="text-sm font-medium">
                          Staff Management
                        </Label>
                        <p className="text-xs text-muted-foreground">Optimize scheduling and staff performance</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="competitorAnalysis"
                        checked={formData.goals.competitorAnalysis}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("goals", "competitorAnalysis", checked as boolean)
                        }
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="competitorAnalysis" className="text-sm font-medium">
                          Competitor Analysis
                        </Label>
                        <p className="text-xs text-muted-foreground">Track competitors and market positioning</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Preferences */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="preferredReportFrequency">Report Frequency</Label>
                    <Select
                      value={formData.preferredReportFrequency}
                      onValueChange={(value) => handleSelectChange("preferredReportFrequency", value)}
                    >
                      <SelectTrigger id="preferredReportFrequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Notification Preferences</Label>
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="emailNotifications"
                          checked={formData.notificationPreferences.email}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("notificationPreferences", "email", checked as boolean)
                          }
                        />
                        <Label htmlFor="emailNotifications">Email Notifications</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="inAppNotifications"
                          checked={formData.notificationPreferences.inApp}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("notificationPreferences", "inApp", checked as boolean)
                          }
                        />
                        <Label htmlFor="inAppNotifications">In-App Notifications</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="smsNotifications"
                          checked={formData.notificationPreferences.sms}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("notificationPreferences", "sms", checked as boolean)
                          }
                        />
                        <Label htmlFor="smsNotifications">SMS Notifications</Label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack} disabled={step === 1}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>

              <Button onClick={handleNext}>
                {step < 4 ? (
                  <>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Complete Setup
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

