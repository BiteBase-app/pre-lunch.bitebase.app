import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function SocialMediaAnalysisTable() {
  const socialData = [
    {
      platform: "Instagram",
      relevance: 92,
      audience: "Young Professionals, Food Enthusiasts",
      contentType: "Visual content, Stories, Reels",
      postFrequency: "4-5 posts per week, daily stories",
      engagementRate: "High",
      costEffectiveness: "High",
      priority: "Primary",
    },
    {
      platform: "Facebook",
      relevance: 78,
      audience: "Local Residents, Families, Business Customers",
      contentType: "Events, Community posts, Menu highlights",
      postFrequency: "2-3 posts per week",
      engagementRate: "Medium",
      costEffectiveness: "Medium",
      priority: "Secondary",
    },
    {
      platform: "TikTok",
      relevance: 65,
      audience: "Students, Young Professionals",
      contentType: "Behind-the-scenes, Quick recipes, Trends",
      postFrequency: "2-3 posts per week",
      engagementRate: "High",
      costEffectiveness: "Medium",
      priority: "Secondary",
    },
    {
      platform: "Twitter",
      relevance: 45,
      audience: "Business Customers, Food Enthusiasts",
      contentType: "Quick updates, Local news, Promotions",
      postFrequency: "3-4 posts per week",
      engagementRate: "Low",
      costEffectiveness: "Medium",
      priority: "Tertiary",
    },
    {
      platform: "LinkedIn",
      relevance: 35,
      audience: "Business Customers, Professionals",
      contentType: "Business updates, Catering services",
      postFrequency: "1-2 posts per week",
      engagementRate: "Low",
      costEffectiveness: "Low",
      priority: "Tertiary",
    },
  ]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Platform</TableHead>
            <TableHead>Relevance</TableHead>
            <TableHead className="hidden md:table-cell">Audience</TableHead>
            <TableHead className="hidden lg:table-cell">Content Type</TableHead>
            <TableHead className="hidden xl:table-cell">Post Frequency</TableHead>
            <TableHead>Priority</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {socialData.map((platform) => (
            <TableRow key={platform.platform}>
              <TableCell className="font-medium">{platform.platform}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress value={platform.relevance} className="w-20" />
                  <span className="text-sm">{platform.relevance}%</span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell text-xs">{platform.audience}</TableCell>
              <TableCell className="hidden lg:table-cell text-xs">{platform.contentType}</TableCell>
              <TableCell className="hidden xl:table-cell text-xs">{platform.postFrequency}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    platform.priority === "Primary"
                      ? "default"
                      : platform.priority === "Secondary"
                        ? "outline"
                        : "secondary"
                  }
                >
                  {platform.priority}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

