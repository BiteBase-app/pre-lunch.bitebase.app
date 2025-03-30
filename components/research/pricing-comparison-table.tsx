import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function PricingComparisonTable() {
  const pricingData = [
    {
      category: "Coffee",
      item: "Espresso",
      your: "$3.75",
      market: "$3.25",
      premium: "$4.25",
      recommended: "$3.75",
      note: "Your pricing aligns with your premium positioning",
    },
    {
      category: "Coffee",
      item: "Cappuccino",
      your: "$4.50",
      market: "$4.00",
      premium: "$5.00",
      recommended: "$4.75",
      note: "Slight increase recommended for premium perception",
    },
    {
      category: "Coffee",
      item: "Specialty Latte",
      your: "$5.25",
      market: "$4.75",
      premium: "$5.75",
      recommended: "$5.50",
      note: "Competitive with room for premium positioning",
    },
    {
      category: "Food",
      item: "Pastry",
      your: "$3.75",
      market: "$3.25",
      premium: "$4.25",
      recommended: "$4.00",
      note: "Increase justified by artisanal quality",
    },
    {
      category: "Food",
      item: "Panini",
      your: "$10.50",
      market: "$9.50",
      premium: "$12.50",
      recommended: "$11.50",
      note: "Premium pricing for gourmet ingredients",
    },
    {
      category: "Food",
      item: "Pasta Dish",
      your: "$13.50",
      market: "$12.00",
      premium: "$15.00",
      recommended: "$14.50",
      note: "Premium positioning for unique offering",
    },
  ]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Your Price</TableHead>
            <TableHead className="hidden md:table-cell">Market Avg</TableHead>
            <TableHead className="hidden md:table-cell">Premium</TableHead>
            <TableHead>Recommended</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pricingData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.item}</TableCell>
              <TableCell>{item.your}</TableCell>
              <TableCell className="hidden md:table-cell">{item.market}</TableCell>
              <TableCell className="hidden md:table-cell">{item.premium}</TableCell>
              <TableCell>
                <div>
                  {item.recommended}
                  {item.recommended !== item.your && (
                    <Badge
                      className="ml-2"
                      variant={
                        Number.parseFloat(item.recommended.substring(1)) > Number.parseFloat(item.your.substring(1))
                          ? "default"
                          : "secondary"
                      }
                    >
                      {Number.parseFloat(item.recommended.substring(1)) > Number.parseFloat(item.your.substring(1))
                        ? "↑"
                        : "↓"}
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-muted-foreground hidden lg:block">{item.note}</div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

