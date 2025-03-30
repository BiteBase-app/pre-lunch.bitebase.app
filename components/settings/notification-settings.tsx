"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

export function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Configure how and when you receive notifications.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Email Notifications</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="emailOrders" className="flex-1">
                New Orders
                <p className="text-sm font-normal text-muted-foreground">Receive notifications for new orders</p>
              </Label>
              <Switch id="emailOrders" defaultChecked />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="emailCustomers" className="flex-1">
                New Customers
                <p className="text-sm font-normal text-muted-foreground">
                  Receive notifications for new customer registrations
                </p>
              </Label>
              <Switch id="emailCustomers" defaultChecked />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="emailReports" className="flex-1">
                Weekly Reports
                <p className="text-sm font-normal text-muted-foreground">Receive weekly performance reports</p>
              </Label>
              <Switch id="emailReports" defaultChecked />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="emailInsights" className="flex-1">
                AI Insights
                <p className="text-sm font-normal text-muted-foreground">
                  Receive automated insights about your business
                </p>
              </Label>
              <Switch id="emailInsights" defaultChecked />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">In-App Notifications</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="appOrders" className="flex-1">
                Order Updates
                <p className="text-sm font-normal text-muted-foreground">Show notifications for order status changes</p>
              </Label>
              <Switch id="appOrders" defaultChecked />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="appScraper" className="flex-1">
                Scraper Results
                <p className="text-sm font-normal text-muted-foreground">
                  Show notifications when scraper jobs complete
                </p>
              </Label>
              <Switch id="appScraper" defaultChecked />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="appAlerts" className="flex-1">
                System Alerts
                <p className="text-sm font-normal text-muted-foreground">
                  Show notifications for system alerts and warnings
                </p>
              </Label>
              <Switch id="appAlerts" defaultChecked />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="appTrends" className="flex-1">
                Trend Alerts
                <p className="text-sm font-normal text-muted-foreground">
                  Show notifications for significant trend changes
                </p>
              </Label>
              <Switch id="appTrends" defaultChecked />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button>Save Notification Settings</Button>
        </div>
      </CardContent>
    </Card>
  )
}

