import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

export function CompetitorList() {
  const competitors = [
    {
      id: 1,
      name: "Bella Vita",
      distance: 0.3,
      cuisine: "Italian",
      rating: 4.2,
      priceLevel: "$$",
      yearOpened: 2019,
    },
    {
      id: 2,
      name: "Pasta Palace",
      distance: 0.7,
      cuisine: "Italian",
      rating: 3.8,
      priceLevel: "$$",
      yearOpened: 2015,
    },
    {
      id: 3,
      name: "Milano Bistro",
      distance: 1.2,
      cuisine: "Italian",
      rating: 4.5,
      priceLevel: "$$$",
      yearOpened: 2020,
    },
    {
      id: 4,
      name: "Trattoria Roma",
      distance: 1.4,
      cuisine: "Italian",
      rating: 4.0,
      priceLevel: "$$",
      yearOpened: 2017,
    },
  ]

  return (
    <div className="space-y-3">
      {competitors.map((competitor) => (
        <div key={competitor.id} className="rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <div className="font-medium">{competitor.name}</div>
            <Badge variant="outline">{competitor.distance} mi</Badge>
          </div>
          <div className="mt-1 flex items-center text-sm text-muted-foreground">
            <span>{competitor.cuisine}</span>
            <span className="mx-2">•</span>
            <span>{competitor.priceLevel}</span>
            <span className="mx-2">•</span>
            <span>Since {competitor.yearOpened}</span>
          </div>
          <div className="mt-2 flex items-center">
            <div className="flex items-center text-amber-500">
              <Star className="mr-1 h-4 w-4 fill-current" />
              <span className="text-sm font-medium">{competitor.rating}</span>
            </div>
            <div className="ml-auto text-xs text-muted-foreground">
              {getCompetitorInsight(competitor.rating, competitor.priceLevel)}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function getCompetitorInsight(rating: number, priceLevel: string): string {
  if (rating >= 4.5) {
    return "Strong competitor"
  } else if (rating >= 4.0) {
    return "Moderate competitor"
  } else {
    return "Weaker competitor"
  }
}

