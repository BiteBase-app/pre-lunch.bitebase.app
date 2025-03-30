import { Activity, FileText, Map, PieChart, Settings, Users } from "lucide-react"

export function RecentActivityList() {
  const activities = [
    {
      id: 1,
      type: "project_created",
      project: "Downtown Italian Restaurant",
      timestamp: "2 days ago",
      icon: <Map className="h-4 w-4" />,
    },
    {
      id: 2,
      type: "analysis_completed",
      project: "Downtown Italian Restaurant",
      timestamp: "1 day ago",
      icon: <Activity className="h-4 w-4" />,
    },
    {
      id: 3,
      type: "report_generated",
      project: "Downtown Italian Restaurant",
      timestamp: "1 day ago",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      id: 4,
      type: "competitor_update",
      project: "Uptown Cafe Concept",
      timestamp: "3 days ago",
      icon: <Users className="h-4 w-4" />,
    },
    {
      id: 5,
      type: "settings_updated",
      project: "Suburban Steakhouse",
      timestamp: "1 week ago",
      icon: <Settings className="h-4 w-4" />,
    },
    {
      id: 6,
      type: "insights_generated",
      project: "Suburban Steakhouse",
      timestamp: "1 week ago",
      icon: <PieChart className="h-4 w-4" />,
    },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4 rounded-lg border p-3">
          <div className="mt-0.5 rounded-full bg-primary/10 p-2 text-primary">{activity.icon}</div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{getActivityTitle(activity.type)}</p>
            <p className="text-sm text-muted-foreground">{activity.project}</p>
            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function getActivityTitle(type: string): string {
  switch (type) {
    case "project_created":
      return "New project created"
    case "analysis_completed":
      return "Market analysis completed"
    case "report_generated":
      return "Report generated"
    case "competitor_update":
      return "Competitor data updated"
    case "settings_updated":
      return "Project settings updated"
    case "insights_generated":
      return "New insights generated"
    default:
      return "Activity"
  }
}

