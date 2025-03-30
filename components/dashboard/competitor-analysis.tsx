"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function CompetitorAnalysis() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Competitor Landscape</CardTitle>
          <CardDescription>Analysis of your top competitors in the local market</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Your Restaurant</span>
                  <Badge variant="outline">You</Badge>
                </div>
                <span className="text-sm font-medium">Market Share: 12%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 rounded-full bg-primary" style={{ width: "12%" }}></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Bistro Deluxe</span>
                <span className="text-sm font-medium">Market Share: 18%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 rounded-full bg-red-500" style={{ width: "18%" }}></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Gourmet Garden</span>
                <span className="text-sm font-medium">Market Share: 15%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 rounded-full bg-amber-500" style={{ width: "15%" }}></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Urban Plate</span>
                <span className="text-sm font-medium">Market Share: 10%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 rounded-full bg-green-500" style={{ width: "10%" }}></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Flavor Factory</span>
                <span className="text-sm font-medium">Market Share: 8%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 rounded-full bg-blue-500" style={{ width: "8%" }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Price Comparison</CardTitle>
          <CardDescription>Average prices compared to competitors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Appetizers</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">$12.50</span>
                <Badge variant="outline" className="text-green-500">
                  -5%
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Main Courses</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">$24.75</span>
                <Badge variant="outline" className="text-amber-500">
                  +2%
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Desserts</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">$9.25</span>
                <Badge variant="outline" className="text-green-500">
                  -8%
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Beverages</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">$7.50</span>
                <Badge variant="outline" className="text-red-500">
                  +12%
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Average Check</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">$42.50</span>
                <Badge variant="outline" className="text-amber-500">
                  +3%
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Online Presence</CardTitle>
          <CardDescription>Digital footprint comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Google Rating</span>
                <span className="font-medium">4.6/5.0</span>
              </div>
              <div className="flex items-center gap-1 text-amber-500">
                <span className="text-lg">★★★★</span>
                <span className="text-lg">☆</span>
                <span className="ml-1 text-xs text-muted-foreground">(+0.2 vs competitors)</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Yelp Rating</span>
                <span className="font-medium">4.3/5.0</span>
              </div>
              <div className="flex items-center gap-1 text-amber-500">
                <span className="text-lg">★★★★</span>
                <span className="text-lg">☆</span>
                <span className="ml-1 text-xs text-muted-foreground">(+0.1 vs competitors)</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Social Media Followers</span>
                <span className="font-medium">5,240</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-red-500">(-15% vs competitors)</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Website Traffic</span>
                <span className="font-medium">1,850/month</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-green-500">(+8% vs competitors)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Menu Analysis</CardTitle>
          <CardDescription>Menu comparison with competitors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Menu Size</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">32 items</span>
                <Badge variant="outline" className="text-amber-500">
                  +4 items
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Unique Items</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">8 items</span>
                <Badge variant="outline" className="text-green-500">
                  +3 items
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Vegetarian Options</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">6 items</span>
                <Badge variant="outline" className="text-red-500">
                  -2 items
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Seasonal Items</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">4 items</span>
                <Badge variant="outline" className="text-green-500">
                  +1 item
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

