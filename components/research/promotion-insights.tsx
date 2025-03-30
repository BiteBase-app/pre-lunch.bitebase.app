import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomerSegmentationChart } from "@/components/research/customer-segmentation-chart"
import { MarketingChannelsChart } from "@/components/research/marketing-channels-chart"
import { SocialMediaAnalysisTable } from "@/components/research/social-media-analysis-table"
import { BrandPositioningChart } from "@/components/research/brand-positioning-chart"
import { MarketingCalendarTable } from "@/components/research/marketing-calendar-table"

export function PromotionInsights() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Promotion & Marketing Insights</CardTitle>
          <CardDescription>Marketing strategy recommendations and customer engagement insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md border p-4">
              <h3 className="text-lg font-medium">AI Recommendation Summary</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Based on your location, target audience, and concept, we recommend a marketing strategy focused on
                digital channels with an emphasis on visual content and local community engagement. Your target
                demographic of young professionals and business customers is highly active on Instagram and responds
                well to quality visuals and authentic brand storytelling. We recommend allocating 60% of your marketing
                budget to digital channels, 25% to local community engagement, and 15% to traditional marketing.
              </p>
            </div>

            <Tabs defaultValue="segments" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="segments">Customer Segments</TabsTrigger>
                <TabsTrigger value="channels">Marketing Channels</TabsTrigger>
                <TabsTrigger value="social">Social Media</TabsTrigger>
                <TabsTrigger value="branding">Brand Positioning</TabsTrigger>
                <TabsTrigger value="calendar">Marketing Calendar</TabsTrigger>
              </TabsList>

              <TabsContent value="segments" className="space-y-4 pt-4">
                <CustomerSegmentationChart />

                <div className="rounded-md border p-4">
                  <h3 className="text-lg font-medium">Customer Segmentation Analysis</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Understanding your customer segments is crucial for targeted marketing. Based on your location and
                    concept, we've identified the following key customer segments:
                  </p>

                  <h4 className="mt-4 font-medium">Primary Segments</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Urban Professionals (35%):</strong> Ages 25-40, higher income, value quality and
                        convenience, visit during morning rush and lunch
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Business Customers (25%):</strong> Corporate employees, expense accounts, value
                        reliability and service, potential for catering
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Food Enthusiasts (15%):</strong> All ages, value authenticity and quality, willing to
                        pay premium, active on social media
                      </span>
                    </li>
                  </ul>

                  <h4 className="mt-4 font-medium">Secondary Segments</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Students (10%):</strong> Ages 18-24, more price-sensitive, value atmosphere and WiFi,
                        longer stays
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Local Residents (10%):</strong> Mixed demographics, value convenience and community,
                        potential for regular customers
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Tourists (5%):</strong> Seasonal, value experience and authenticity, higher spend per
                        visit
                      </span>
                    </li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="channels" className="space-y-4 pt-4">
                <MarketingChannelsChart />

                <div className="rounded-md border p-4">
                  <h3 className="text-lg font-medium">Marketing Channel Recommendations</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Based on your target segments and concept, we recommend the following marketing channel mix:
                  </p>

                  <h4 className="mt-4 font-medium">Digital Channels (60% of budget)</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Instagram (25%):</strong> High-quality food and atmosphere photos, stories featuring
                        daily specials
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Local SEO (15%):</strong> Google My Business optimization, local keywords, review
                        management
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Email Marketing (10%):</strong> Newsletter with promotions, events, and seasonal menu
                        updates
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Targeted Ads (10%):</strong> Geo-targeted ads on social platforms and Google
                      </span>
                    </li>
                  </ul>

                  <h4 className="mt-4 font-medium">Local Community (25% of budget)</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Local Partnerships (15%):</strong> Collaborations with nearby businesses and offices
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Community Events (10%):</strong> Hosting or sponsoring local events
                      </span>
                    </li>
                  </ul>

                  <h4 className="mt-4 font-medium">Traditional Marketing (15% of budget)</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Signage & Storefront (10%):</strong> Eye-catching exterior design and signage
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Print Materials (5%):</strong> Business cards, menus, and local flyers
                      </span>
                    </li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="social" className="space-y-4 pt-4">
                <SocialMediaAnalysisTable />

                <div className="rounded-md border p-4">
                  <h3 className="text-lg font-medium">Social Media Strategy</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Social media will be a key component of your marketing strategy. Based on your target audience and
                    concept, we recommend the following approach:
                  </p>

                  <h4 className="mt-4 font-medium">Content Strategy</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Visual Content (50%):</strong> High-quality photos of food, drinks, and atmosphere
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Behind-the-Scenes (20%):</strong> Coffee preparation, pastry making, staff introductions
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Customer Features (15%):</strong> Customer spotlights, testimonials, user-generated
                        content
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Educational Content (10%):</strong> Coffee brewing tips, Italian cuisine facts,
                        ingredient spotlights
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Promotional Content (5%):</strong> Special offers, events, new menu items
                      </span>
                    </li>
                  </ul>

                  <h4 className="mt-4 font-medium">Posting Schedule</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Instagram:</strong> 4-5 posts per week, daily stories
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Facebook:</strong> 2-3 posts per week, events and community engagement
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Twitter:</strong> 3-4 posts per week, local engagement and news
                      </span>
                    </li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="branding" className="space-y-4 pt-4">
                <BrandPositioningChart />

                <div className="rounded-md border p-4">
                  <h3 className="text-lg font-medium">Brand Positioning Strategy</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Your brand positioning will differentiate you from competitors and attract your target audience.
                    Based on your concept and market analysis, we recommend the following positioning:
                  </p>

                  <h4 className="mt-4 font-medium">Brand Pillars</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Authentic Italian Experience:</strong> Emphasize traditional Italian cafe culture with
                        modern touches
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Premium Quality:</strong> Focus on high-quality ingredients, preparation methods, and
                        presentation
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Urban Sophistication:</strong> Create an atmosphere that appeals to urban professionals
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Community Connection:</strong> Position as a neighborhood gathering place
                      </span>
                    </li>
                  </ul>

                  <h4 className="mt-4 font-medium">Competitive Differentiation</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>vs. Chain Cafes:</strong> More authentic, higher quality, better atmosphere
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>vs. Specialty Coffee Shops:</strong> More food options, Italian focus, business-friendly
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>vs. Italian Restaurants:</strong> More casual, faster service, lower price point
                      </span>
                    </li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="calendar" className="space-y-4 pt-4">
                <MarketingCalendarTable />

                <div className="rounded-md border p-4">
                  <h3 className="text-lg font-medium">Marketing Calendar Strategy</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    A strategic marketing calendar will help you plan promotions, content, and campaigns throughout the
                    year. Based on your concept and target audience, we recommend the following approach:
                  </p>

                  <h4 className="mt-4 font-medium">Launch Phase (Months 1-3)</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Pre-Opening:</strong> Social media teasers, local PR, soft opening for influencers
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Grand Opening:</strong> Special promotions, local media coverage, community event
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>First 90 Days:</strong> Loyalty program launch, customer feedback collection, menu
                        refinement
                      </span>
                    </li>
                  </ul>

                  <h4 className="mt-4 font-medium">Seasonal Campaigns</h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Spring:</strong> "Taste of Italian Spring" campaign with seasonal menu items
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Summer:</strong> "Italian Summer Nights" with extended evening hours and special menu
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Fall:</strong> "Autumn in Italy" featuring seasonal ingredients and warm drinks
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>
                        <strong>Winter:</strong> "Italian Holiday Traditions" with festive specials and gift cards
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

