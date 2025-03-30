import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MenuAnalysisChart } from "@/components/research/menu-analysis-chart"
import { TrendingDishesTable } from "@/components/research/trending-dishes-table"
import { PricingStrategyChart } from "@/components/research/pricing-strategy-chart"
import { SeasonalTrendsChart } from "@/components/research/seasonal-trends-chart"

export function ProductInsights() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Product Insights</CardTitle>
          <CardDescription>Menu and product recommendations based on market analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md border p-4">
              <h3 className="text-lg font-medium">AI Recommendation Summary</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Based on your location, target audience, and cuisine type, we recommend focusing on a menu that combines
                traditional Italian cafe offerings with modern, health-conscious options. Your primary target
                demographic of young professionals and business customers in this area shows strong preference for
                premium coffee options, artisanal pastries, and quick but high-quality lunch items.
              </p>
            </div>

            <Tabs defaultValue="menu" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="menu">Menu Analysis</TabsTrigger>
                <TabsTrigger value="trends">Trending Dishes</TabsTrigger>
                <TabsTrigger value="pricing">Pricing Strategy</TabsTrigger>
                <TabsTrigger value="seasonal">Seasonal Trends</TabsTrigger>
              </TabsList>

              <TabsContent value="menu" className="space-y-4 pt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="mb-2 text-lg font-medium">Recommended Menu Categories</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-primary">High Priority</Badge>
                          <span>Premium Coffee & Espresso</span>
                        </div>
                        <span className="text-sm font-medium">92% match</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-primary">High Priority</Badge>
                          <span>Artisanal Pastries</span>
                        </div>
                        <span className="text-sm font-medium">88% match</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-primary">High Priority</Badge>
                          <span>Gourmet Sandwiches</span>
                        </div>
                        <span className="text-sm font-medium">85% match</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Medium Priority</Badge>
                          <span>Light Pasta Dishes</span>
                        </div>
                        <span className="text-sm font-medium">76% match</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Medium Priority</Badge>
                          <span>Breakfast Items</span>
                        </div>
                        <span className="text-sm font-medium">72% match</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">Low Priority</Badge>
                          <span>Smoothies & Juices</span>
                        </div>
                        <span className="text-sm font-medium">58% match</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-lg font-medium">Menu Category Analysis</h3>
                    <MenuAnalysisChart />
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <h3 className="text-lg font-medium">Key Insights</h3>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        Your target demographic shows strong preference for premium coffee options with specialty beans
                        and brewing methods.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        Artisanal pastries with Italian influence would differentiate your cafe from competitors in the
                        area.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        Gourmet sandwiches with Italian ingredients would serve the lunch crowd well, especially with
                        business professionals.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        Light pasta dishes would provide a unique offering compared to other cafes in the area, creating
                        a competitive advantage.
                      </span>
                    </li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="trends" className="space-y-4 pt-4">
                <TrendingDishesTable />

                <div className="rounded-md border p-4">
                  <h3 className="text-lg font-medium">Trend Analysis</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    The data shows a clear trend toward health-conscious options with Italian influence. Plant-based
                    alternatives and gluten-free options are growing in popularity, especially among the young
                    professional demographic. Incorporating these trends into your menu would align well with current
                    market demands.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-4 pt-4">
                <PricingStrategyChart />

                <div className="rounded-md border p-4">
                  <h3 className="text-lg font-medium">Pricing Recommendations</h3>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Premium Coffee:</strong> $4.50-$6.50 (15% above market average justified by quality and
                        experience)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Artisanal Pastries:</strong> $3.75-$5.50 (competitive with specialty bakeries)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Gourmet Sandwiches:</strong> $10.50-$14.50 (premium positioning justified by quality
                        ingredients)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Light Pasta Dishes:</strong> $12.50-$16.50 (unique offering allows premium pricing)
                      </span>
                    </li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="seasonal" className="space-y-4 pt-4">
                <SeasonalTrendsChart />

                <div className="rounded-md border p-4">
                  <h3 className="text-lg font-medium">Seasonal Menu Planning</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Incorporating seasonal menu items can drive repeat business and create anticipation. Based on your
                    location and target market, we recommend the following seasonal strategy:
                  </p>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Spring:</strong> Light pasta dishes with fresh vegetables, fruit-based pastries
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Summer:</strong> Cold brew specials, chilled pasta salads, fruit-based desserts
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Fall:</strong> Pumpkin and spice pastries, hearty sandwiches, warm drink specials
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Winter:</strong> Holiday-themed pastries, rich pasta dishes, specialty hot drinks
                      </span>
                    </li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

