import { ScraperDashboard } from "@/components/scraper/scraper-dashboard"
import { getScraperSources } from "@/lib/scraper"

export default async function ScraperPage() {
  const scraperSources = await getScraperSources()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Data Scraper</h1>
      <p className="text-muted-foreground">Configure and manage automated data collection from external sources.</p>

      <ScraperDashboard initialSources={scraperSources} />
    </div>
  )
}

