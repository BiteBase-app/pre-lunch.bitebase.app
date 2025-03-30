import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function MarketingCalendarTable() {
  const seasons = [
    {
      name: "Launch Phase",
      months: "Months 1-3",
      campaigns: [
        {
          name: "Grand Opening",
          activities: ["Press releases", "Special promotions", "VIP preview night"],
          channels: ["Local media", "Social media", "Email", "Local partnerships"],
          priority: "Critical",
        },
        {
          name: "Loyalty Program Launch",
          activities: ["Digital sign-up incentives", "Staff training", "Promotional materials"],
          channels: ["In-store", "Social media", "Website"],
          priority: "High",
        },
      ],
    },
    {
      name: "Spring",
      months: "Months 4-6",
      campaigns: [
        {
          name: "Taste of Italian Spring",
          activities: ["Seasonal menu launch", "Spring-themed decor", "Special events"],
          channels: ["Instagram", "Email marketing", "In-store"],
          priority: "High",
        },
        {
          name: "Business Lunch Promotion",
          activities: ["Corporate package discounts", "Quick service guarantee", "Meeting space promotion"],
          channels: ["LinkedIn", "Local business partnerships", "Direct outreach"],
          priority: "Medium",
        },
      ],
    },
    {
      name: "Summer",
      months: "Months 7-9",
      campaigns: [
        {
          name: "Italian Summer Nights",
          activities: ["Extended evening hours", "Summer menu specials", "Patio experience"],
          channels: ["Instagram", "Facebook", "Local event listings"],
          priority: "High",
        },
        {
          name: "Coffee Tasting Series",
          activities: ["Weekly tasting events", "Bean origin education", "Brewing technique demos"],
          channels: ["Social media", "Email", "In-store signage"],
          priority: "Medium",
        },
      ],
    },
    {
      name: "Fall/Winter",
      months: "Months 10-12",
      campaigns: [
        {
          name: "Autumn in Italy",
          activities: ["Seasonal ingredients", "Warm drink specials", "Comfort food menu"],
          channels: ["Instagram", "Email", "In-store"],
          priority: "High",
        },
        {
          name: "Holiday Gift Program",
          activities: ["Gift card promotion", "Holiday catering packages", "Branded merchandise"],
          channels: ["Social media", "Email", "Local ads", "In-store"],
          priority: "Critical",
        },
      ],
    },
  ]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Season</TableHead>
            <TableHead>Campaign</TableHead>
            <TableHead className="hidden md:table-cell">Activities</TableHead>
            <TableHead className="hidden lg:table-cell">Channels</TableHead>
            <TableHead>Priority</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {seasons.map((season) => (
            <>
              <TableRow key={season.name} className="bg-muted/50">
                <TableCell colSpan={5} className="font-medium">
                  {season.name} ({season.months})
                </TableCell>
              </TableRow>
              {season.campaigns.map((campaign) => (
                <TableRow key={campaign.name}>
                  <TableCell></TableCell>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <ul className="list-disc list-inside text-xs">
                      {campaign.activities.map((activity, i) => (
                        <li key={i}>{activity}</li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {campaign.channels.map((channel, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {channel}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        campaign.priority === "Critical"
                          ? "destructive"
                          : campaign.priority === "High"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {campaign.priority}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

