import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { ReactNode } from "react"

interface DataSourceCardProps {
  icon: ReactNode
  title: string
  description: string
  status: "connected" | "not-connected"
  lastSync?: string
}

export function DataSourceCard({ icon, title, description, status, lastSync }: DataSourceCardProps) {
  return (
    <Card className="flex flex-col">
      <CardContent className="flex flex-col items-center text-center pt-6 pb-2">
        <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">{icon}</div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
        {status === "connected" ? (
          <Badge className="bg-green-500 hover:bg-green-600">Connected</Badge>
        ) : (
          <Badge variant="outline">Not Connected</Badge>
        )}
        {lastSync && <p className="text-xs text-muted-foreground mt-2">Last sync: {lastSync}</p>}
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="outline" className="w-full">
          {status === "connected" ? "Configure" : "Connect"}
        </Button>
      </CardFooter>
    </Card>
  )
}

