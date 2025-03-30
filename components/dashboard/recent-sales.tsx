import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const recentSales = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "$1,999.00",
    avatarSrc: "/placeholder.svg?height=32&width=32",
    avatarFallback: "OM",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "$1,499.00",
    avatarSrc: "/placeholder.svg?height=32&width=32",
    avatarFallback: "JL",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "$1,299.00",
    avatarSrc: "/placeholder.svg?height=32&width=32",
    avatarFallback: "IN",
  },
  {
    name: "William Kim",
    email: "will.kim@email.com",
    amount: "$999.00",
    avatarSrc: "/placeholder.svg?height=32&width=32",
    avatarFallback: "WK",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "$699.00",
    avatarSrc: "/placeholder.svg?height=32&width=32",
    avatarFallback: "SD",
  },
]

export function RecentSales() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>You made 5 sales this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {recentSales.map((sale, index) => (
            <div key={index} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={sale.avatarSrc} alt={sale.name} />
                <AvatarFallback>{sale.avatarFallback}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{sale.name}</p>
                <p className="text-sm text-muted-foreground">{sale.email}</p>
              </div>
              <div className="ml-auto font-medium">{sale.amount}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

