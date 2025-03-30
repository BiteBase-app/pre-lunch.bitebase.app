import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RevenueProjectionChart } from "@/components/research/revenue-projection-chart"
import { BreakEvenAnalysisChart } from "@/components/research/break-even-analysis-chart"
import { PeakHoursChart } from "@/components/research/peak-hours-chart"
import { PricingComparisonTable } from "@/components/research/pricing-comparison-table"
import { PromotionEffectivenessChart } from "@/components/research/promotion-effectiveness-chart"

export function PriceInsights() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Price & Revenue Insights</CardTitle>
          <CardDescription>Financial projections and pricing strategy recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md border p-4">
              <h3 className="text-lg font-medium">AI Recommendation Summary</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Based on your location, target audience, and concept, we recommend a premium pricing strategy that
                positions your Italian cafe as a high-quality option. Your target demographic of young professionals and
                business customers in this area has higher disposable income and is willing to pay more for quality and
                experience. We project a monthly revenue range of $45,000-$65,000 with a break-even point at
                approximately 8 months.
              </p>
            </div>

            <Tabs defaultValue="revenue" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="break-even">Break-Even</TabsTrigger>
                <TabsTrigger value="peak-hours">Peak Hours</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="promotions">Promotions</TabsTrigger>
              </TabsList>

              <TabsContent value="revenue" className="space-y-4 pt-4">
                <RevenueProjectionChart />

                <div className="rounded-md border p-4">
                  <h3 className="text-lg font-medium">Revenue Projections</h3>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Month 1-3:</strong> $35,000-$45,000 monthly (ramp-up period)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Month 4-6:</strong> $45,000-$55,000 monthly (growing customer base)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Month 7-12:</strong> $55,000-$65,000 monthly (established operation)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Year 2:</strong> $65,000-$80,000 monthly (mature business)
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-md border p-4">
                    <h3 className="text-lg font-medium">Revenue Drivers</h3>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>
                          <strong>Coffee & Espresso:</strong> 35% of revenue
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>
                          <strong>Food Items:</strong> 55% of revenue
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>
                          <strong>Retail & Other:</strong> 10% of revenue
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-md border p-4">
                    <h3 className="text-lg font-medium">Key Assumptions</h3>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>
                          <strong>Average Customer Count:</strong> 150-200 daily
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>
                          <strong>Average Ticket Size:</strong> $12.50
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>
                          <strong>Operating Days:</strong> 26 days per month
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="break-even" className="space-y-4 pt-4">
                <BreakEvenAnalysisChart />

                <div className="rounded-md border p-4">
                  <h3 className="text-lg font-medium">Break-Even Analysis</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Based on your initial investment of $250,000 and projected revenue and expenses, we estimate you
                    will reach break-even in approximately 8 months. This is faster than the industry average of 12-18
                    months for similar concepts.
                  </p>

                  <h4 className="mt-4 font-medium">Initial Investment Breakdown</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Lease & Deposits:</strong> $35,000 (14%)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Renovations & Build-out:</strong> $85,000 (34%)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Equipment & Furniture:</strong> $65,000 (26%)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Initial Inventory:</strong> $25,000 (10%)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Marketing & Branding:</strong> $20,000 (8%)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Working Capital:</strong> $20,000 (8%)
                      </span>
                    </li>
                  </ul>

                  <h4 className="mt-4 font-medium">Monthly Fixed Expenses</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Rent:</strong> $6,500
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Labor:</strong> $18,000
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Utilities:</strong> $2,200
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Insurance:</strong> $1,500
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Other Fixed Costs:</strong> $2,800
                      </span>
                    </li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="peak-hours" className="space-y-4 pt-4">
                <PeakHoursChart />

                <div className="rounded-md border p-4">
                  <h3 className="text-lg font-medium">Peak Hours Analysis</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Understanding peak hours is crucial for staffing, inventory management, and maximizing revenue.
                    Based on the foot traffic patterns in your selected location and the behavior of your target
                    demographic, we've identified the following peak periods:
                  </p>

                  <h4 className="mt-4 font-medium">Weekday Patterns</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Morning Rush (7:00 AM - 9:30 AM):</strong> High volume of coffee and breakfast items
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Lunch Peak (11:30 AM - 1:30 PM):</strong> High demand for sandwiches and light pasta
                        dishes
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Afternoon Lull (2:00 PM - 4:00 PM):</strong> Lower traffic, opportunity for special
                        promotions
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>After-Work (4:30 PM - 6:30 PM):</strong> Moderate traffic, potential for happy hour
                        promotions
                      </span>
                    </li>
                  </ul>

                  <h4 className="mt-4 font-medium">Weekend Patterns</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Morning (8:00 AM - 11:00 AM):</strong> Steady traffic, longer customer stays
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Midday (11:30 AM - 2:30 PM):</strong> Peak weekend traffic, higher food sales
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Afternoon (3:00 PM - 6:00 PM):</strong> Moderate traffic, more leisure customers
                      </span>
                    </li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-4 pt-4">
                <PricingComparisonTable />

                <div className="rounded-md border p-4">
                  <h3 className="text-lg font-medium">Pricing Strategy Recommendations</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Based on competitor analysis, customer demographics, and your concept positioning, we recommend a
                    premium pricing strategy that emphasizes quality and experience. Your target demographic has the
                    disposable income and willingness to pay for premium offerings.
                  </p>

                  <h4 className="mt-4 font-medium">Key Pricing Insights</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        Position your coffee prices 10-15% above standard cafes but slightly below high-end specialty
                        coffee shops.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        For food items, a 15-20% premium over standard cafes is justified by your Italian focus and
                        quality ingredients.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        Consider bundle pricing for coffee + pastry combinations to increase average ticket size.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        Implement a tiered pricing structure for coffee sizes with a proportionally higher markup on
                        larger sizes.
                      </span>
                    </li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="promotions" className="space-y-4 pt-4">
                <PromotionEffectivenessChart />

                <div className="rounded-md border p-4">
                  <h3 className="text-lg font-medium">Promotion Strategy Recommendations</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Strategic promotions can drive traffic during slower periods and increase customer loyalty. Based on
                    your concept and target market, we recommend the following promotion strategies:
                  </p>

                  <h4 className="mt-4 font-medium">Recommended Promotions</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Loyalty Program:</strong> Digital punch card offering a free coffee after 10 purchases
                        (22% effectiveness rating)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Happy Hour:</strong> 20% off pastries 3-5 PM weekdays to drive afternoon traffic (18%
                        effectiveness rating)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Business Meeting Package:</strong> Discounted coffee and pastry platters for office
                        meetings (15% effectiveness rating)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Seasonal Specials:</strong> Limited-time menu items to create urgency and repeat visits
                        (20% effectiveness rating)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Social Media Check-in:</strong> Small discount for customers who check in on social
                        media (12% effectiveness rating)
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

