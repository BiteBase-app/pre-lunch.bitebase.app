import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function CompetitorAnalysisTable() {
  const competitors = [
    {
      name: "Cafe Milano",
      distance: 0.3,
      type: "Italian Cafe",
      rating: 4.2,
      priceLevel: "$$",
      strengths: "Authentic Italian pastries, strong coffee program",
      weaknesses: "Limited seating, slow service during peak hours",
    },
    {
      name: "Espresso Bar",
      distance: 0.5,
      type: "Coffee Shop",
      rating: 3.8,
      priceLevel: "$",
      strengths: "Low prices, fast service",
      weaknesses: "Average quality, limited food options",
    },
    {
      name: "The Coffee House",
      distance: 0.8,
      type: "Specialty Coffee",
      rating: 4.5,
      priceLevel: "$$$",
      strengths: "Premium coffee, modern atmosphere",
      weaknesses: "High prices, minimal food offerings",
    },
    {
      name: "Brew & Bake",
      distance: 1.2,
      type: "Bakery Cafe",
      rating: 4.0,
      priceLevel: "$$",
      strengths: "Excellent pastries, family-friendly",
      weaknesses: "Average coffee, limited lunch options",
    },
  ]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Distance</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead className="hidden md:table-cell">Price</TableHead>
            <TableHead className="hidden lg:table-cell">Strengths/Weaknesses</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {competitors.map((competitor) => (
            <TableRow key={competitor.name}>
              <TableCell className="font-medium">{competitor.name}</TableCell>
              <TableCell>{competitor.distance} mi</TableCell>
              <TableCell>{competitor.type}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span className="mr-2">{competitor.rating}</span>
                  <Badge
                    variant={
                      competitor.rating >= 4.3 ? "destructive" : competitor.rating >= 4.0 ? "default" : "secondary"
                    }
                  >
                    {competitor.rating >= 4.3 ? "Strong" : competitor.rating >= 4.0 ? "Moderate" : "Weak"}
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{competitor.priceLevel}</TableCell>
              <TableCell className="hidden lg:table-cell">
                <div className="text-xs">
                  <div>
                    <span className="font-medium">Strengths:</span> {competitor.strengths}
                  </div>
                  <div>
                    <span className="font-medium">Weaknesses:</span> {competitor.weaknesses}
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

