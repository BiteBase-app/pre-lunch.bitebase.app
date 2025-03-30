import { LocationMap } from "@/components/locations/location-map"
import { getLocationData } from "@/lib/database"

export default async function LocationsPage() {
  const locations = await getLocationData()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Locations</h1>
      <LocationMap locations={locations} />
    </div>
  )
}

