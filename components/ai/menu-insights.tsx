import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from "lucide-react"

interface MenuInsightsProps {
  data: any
}

export function MenuInsights({ data }: MenuInsightsProps) {
  if (!data || !data.success) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Menu Optimization</CardTitle>
          <CardDescription>{data?.message || "Unable to load menu optimization data"}</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Menu Optimization</CardTitle>
        <CardDescription>Insights to optimize your menu for better performance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="mb-2 text-sm font-medium">Top Performing Items</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead className="text-right">Profit Margin</TableHead>
                <TableHead className="text-right">Popularity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.topPerformingItems.map((item: any, i: number) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-right">{(item.profitMargin * 100).toFixed(1)}%</TableCell>
                  <TableCell className="text-right">{item.popularity}/10</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium">Underperforming Items</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead className="text-right">Profit Margin</TableHead>
                <TableHead className="text-right">Popularity</TableHead>
                <TableHead>Recommended Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.underperformingItems.map((item: any, i: number) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-right">{(item.profitMargin * 100).toFixed(1)}%</TableCell>
                  <TableCell className="text-right">{item.popularity}/10</TableCell>
                  <TableCell>{item.recommendedAction}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium">Pricing Recommendations</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead className="text-right">Current Price</TableHead>
                <TableHead className="text-right">Recommended Price</TableHead>
                <TableHead className="text-right">Change</TableHead>
                <TableHead>Rationale</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.pricingRecommendations.map((item: any, i: number) => {
                const priceDiff = item.recommendedPrice - item.currentPrice
                const percentChange = (priceDiff / item.currentPrice) * 100

                return (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{item.itemName}</TableCell>
                    <TableCell className="text-right">${item.currentPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right">${item.recommendedPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-1">
                        {priceDiff > 0 ? (
                          <ArrowUpIcon className="h-4 w-4 text-green-500" />
                        ) : priceDiff < 0 ? (
                          <ArrowDownIcon className="h-4 w-4 text-red-500" />
                        ) : (
                          <MinusIcon className="h-4 w-4 text-gray-500" />
                        )}
                        <span className={priceDiff > 0 ? "text-green-500" : priceDiff < 0 ? "text-red-500" : ""}>
                          {Math.abs(percentChange).toFixed(1)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">{item.rationale}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium">New Item Suggestions</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {data.newItemSuggestions.map((item: any, i: number) => (
              <Card key={i}>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">{item.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="mb-2 text-sm text-muted-foreground">{item.description}</p>
                  <div className="flex justify-between">
                    <Badge variant="outline">Est. Popularity: {item.estimatedPopularity}/10</Badge>
                    <Badge variant="outline">Est. Margin: {(item.estimatedProfitMargin * 100).toFixed(0)}%</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium">Menu Structure Recommendations</h3>
          <p className="text-sm">{data.menuStructureRecommendations}</p>
        </div>
      </CardContent>
    </Card>
  )
}

