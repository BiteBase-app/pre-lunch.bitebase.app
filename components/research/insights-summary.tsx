import { Badge } from "@/components/ui/badge"

export function InsightsSummary() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border p-4">
        <div className="flex items-center gap-2">
          <Badge className="bg-primary">Product</Badge>
          <h3 className="font-medium">Menu Recommendations</h3>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Focus on premium coffee, artisanal pastries, and gourmet sandwiches with Italian influence. Your target
          demographic shows strong preference for quality over price.
        </p>
      </div>

      <div className="rounded-md border p-4">
        <div className="flex items-center gap-2">
          <Badge className="bg-green-500 hover:bg-green-600">Place</Badge>
          <h3 className="font-medium">Location Analysis</h3>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Your selected location scores 86/100 with excellent foot traffic and demographic match. The area has moderate
          competition but none with your specific Italian cafe concept.
        </p>
      </div>

      <div className="rounded-md border p-4">
        <div className="flex items-center gap-2">
          <Badge className="bg-amber-500 hover:bg-amber-600">Price</Badge>
          <h3 className="font-medium">Pricing Strategy</h3>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Implement a premium pricing strategy 10-15% above standard cafes. Projected monthly revenue of $45,000-$65,000
          with break-even at approximately 8 months.
        </p>
      </div>

      <div className="rounded-md border p-4">
        <div className="flex items-center gap-2">
          <Badge className="bg-blue-500 hover:bg-blue-600">Promotion</Badge>
          <h3 className="font-medium">Marketing Strategy</h3>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Focus on Instagram and local SEO with high-quality visual content. Target urban professionals and business
          customers through digital channels (60% of budget) and local community engagement (25%).
        </p>
      </div>

      <div className="rounded-md border p-4 bg-muted/20">
        <h3 className="font-medium">AI Recommendation</h3>
        <p className="mt-2 text-sm">
          Based on our comprehensive analysis, your Italian cafe concept shows strong potential in the selected
          location. The combination of premium offerings, strategic pricing, and targeted marketing should position you
          well for success in this competitive market.
        </p>
        <p className="mt-2 text-sm">
          <strong>Next steps:</strong> Review the detailed insights in each category tab, finalize your business plan,
          and begin implementation with a focus on brand development and pre-opening marketing.
        </p>
      </div>
    </div>
  )
}

