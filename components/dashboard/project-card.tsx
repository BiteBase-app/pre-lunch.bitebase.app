import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, MoreHorizontal } from "lucide-react"
import Link from "next/link"

interface ProjectCardProps {
  name: string
  location: string
  cuisine: string
  lastUpdated: string
  progress: number
}

export function ProjectCard({ name, location, cuisine, lastUpdated, progress }: ProjectCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <h3 className="font-medium leading-none">{name}</h3>
          <p className="text-sm text-muted-foreground flex items-center">
            <MapPin className="mr-1 h-3 w-3" /> {location}
          </p>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">More options</span>
        </Button>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline">{cuisine}</Badge>
          <span className="text-xs text-muted-foreground">Updated {lastUpdated}</span>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span>Analysis Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted">
            <div className="h-2 rounded-full bg-primary" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto pt-2">
        <Link href={`/dashboard/project/1`} className="w-full">
          <Button variant="outline" className="w-full">
            View Project
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

