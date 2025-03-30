import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

export function TrendingDishesTable() {
  const trendingDishes = [
    {
      name: "Artisanal Espresso",
      category: "Coffee",
      trend: "up",
      trendPercentage: 28,
      popularity: 95,
      averagePrice: "$4.50",
      notes: "Premium single-origin beans with craft brewing methods",
    },
    {
      name: "Italian Pastries",
      category: "Baked Goods",
      trend: "up",
      trendPercentage: 32,
      popularity: 88,
      averagePrice: "$4.75",
      notes: "Authentic Italian recipes with local ingredients",
    },
    {
      name: "Gourmet Panini",
      category: "Sandwiches",
      trend: "up",
      trendPercentage: 24,
      popularity: 86,
      averagePrice: "$12.50",
      notes: "Italian meats and cheeses on artisanal bread",
    },
    {
      name: "Light Pasta Dishes",
      category: "Entrees",
      trend: "up",
      trendPercentage: 18,
      popularity: 72,
      averagePrice: "$14.50",
      notes: "Lighter pasta options for lunch crowd",
    },
    {
      name: "Avocado Toast",
      category: "Breakfast",
      trend: "neutral",
      trendPercentage: 2,
      popularity: 65,
      averagePrice: "$10.50",
      notes: "Plateauing after years of strong growth",
    },
    {
      name: "Traditional Muffins",
      category: "Baked Goods",
      trend: "down",
      trendPercentage: 12,
      popularity: 55,
      averagePrice: "$3.75",
      notes: "Declining in favor of more unique pastry options",
    },
  ]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Trend</TableHead>
            <TableHead className="hidden md:table-cell">Popularity</TableHead>
            <TableHead className="hidden md:table-cell">Avg. Price</TableHead>
            <TableHead className="hidden lg:table-cell">Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trendingDishes.map((dish) => (
            <TableRow key={dish.name}>
              <TableCell className="font-medium">{dish.name}</TableCell>
              <TableCell>{dish.category}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  {dish.trend === "up" && (
                    <Badge className="flex items-center gap-1 bg-green-500 hover:bg-green-600">
                      <TrendingUp className="h-3 w-3" />
                      {dish.trendPercentage}%
                    </Badge>
                  )}
                  {dish.trend === "down" && (
                    <Badge className="flex items-center gap-1 bg-red-500 hover:bg-red-600">
                      <TrendingDown className="h-3 w-3" />
                      {dish.trendPercentage}%
                    </Badge>
                  )}
                  {dish.trend === "neutral" && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Minus className="h-3 w-3" />
                      {dish.trendPercentage}%
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{dish.popularity}/100</TableCell>
              <TableCell className="hidden md:table-cell">{dish.averagePrice}</TableCell>
              <TableCell className="hidden lg:table-cell text-xs">{dish.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

