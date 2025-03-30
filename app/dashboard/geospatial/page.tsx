import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { GeospatialDashboard } from "@/components/geospatial/geospatial-dashboard"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export default function GeospatialPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Geospatial Analytics"
        text="Analyze restaurant and competitor locations, customer density, and traffic patterns."
      />

      <Alert className="mb-4">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Demo Mode</AlertTitle>
        <AlertDescription>
          This dashboard is using simulated data. In a production environment, it would connect to your MotherDuck
          database.
        </AlertDescription>
      </Alert>

      <GeospatialDashboard restaurantId={1} />
    </DashboardShell>
  )
}

