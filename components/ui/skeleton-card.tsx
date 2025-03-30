import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface SkeletonCardProps {
  withHeader?: boolean
  withFooter?: boolean
  lines?: number
}

export function SkeletonCard({ withHeader = true, withFooter = false, lines = 3 }: SkeletonCardProps) {
  return (
    <Card>
      {withHeader && (
        <CardHeader className="space-y-2">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-4 w-4/5" />
        </CardHeader>
      )}
      <CardContent className="space-y-2">
        {Array(lines)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className={`h-4 w-${Math.floor(Math.random() * 40) + 60}%`} />
          ))}
      </CardContent>
      {withFooter && (
        <CardFooter>
          <Skeleton className="h-10 w-28" />
        </CardFooter>
      )}
    </Card>
  )
}

