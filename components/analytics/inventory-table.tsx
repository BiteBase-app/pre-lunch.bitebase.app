"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface InventoryItem {
  id: string
  name: string
  category: string
  stock_quantity: number
  unit: string
  reorder_point: number
  cost_per_unit: number
  supplier: string
  status: "In Stock" | "Low Stock" | "Out of Stock"
}

interface InventoryTableProps {
  restaurantId: number
}

export function InventoryTable({ restaurantId }: InventoryTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/inventory?restaurantId=${restaurantId}`)

        if (!response.ok) {
          throw new Error("Failed to fetch inventory data")
        }

        const data = await response.json()
        setInventoryData(data)
      } catch (err) {
        console.error("Error fetching inventory data:", err)
        setError("Failed to load inventory data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchInventoryData()
  }, [restaurantId])

  // Filter inventory items based on search term
  const filteredItems = inventoryData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-500 hover:bg-green-600"
      case "Low Stock":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "Out of Stock":
        return "bg-red-500 hover:bg-red-600"
      default:
        return ""
    }
  }

  if (isLoading) {
    return <InventoryTableSkeleton />
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search inventory..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">Filter</Button>
        <Button>Add Item</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Reorder Point</TableHead>
              <TableHead className="text-right">Cost</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  No inventory items found
                </TableCell>
              </TableRow>
            ) : (
              filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="text-right">
                    {item.stock_quantity} {item.unit}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.reorder_point} {item.unit}
                  </TableCell>
                  <TableCell className="text-right">${item.cost_per_unit.toFixed(2)}</TableCell>
                  <TableCell>{item.supplier}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function InventoryTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>

      <div className="rounded-md border">
        <div className="p-4">
          <div className="space-y-3">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
} 