"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight, Download, Search } from "lucide-react"

export function DataTable() {
  const [searchQuery, setSearchQuery] = useState("")

  // Sample data
  const data = [
    { id: 1, date: "2023-03-15", revenue: "$1,245.67", customers: 42, avgOrder: "$29.66" },
    { id: 2, date: "2023-03-16", revenue: "$1,378.22", customers: 51, avgOrder: "$27.02" },
    { id: 3, date: "2023-03-17", revenue: "$1,587.45", customers: 58, avgOrder: "$27.37" },
    { id: 4, date: "2023-03-18", revenue: "$2,145.30", customers: 72, avgOrder: "$29.80" },
    { id: 5, date: "2023-03-19", revenue: "$2,367.84", customers: 81, avgOrder: "$29.23" },
    { id: 6, date: "2023-03-20", revenue: "$1,985.62", customers: 67, avgOrder: "$29.64" },
    { id: 7, date: "2023-03-21", revenue: "$1,756.45", customers: 59, avgOrder: "$29.77" },
    { id: 8, date: "2023-03-22", revenue: "$1,845.73", customers: 63, avgOrder: "$29.30" },
    { id: 9, date: "2023-03-23", revenue: "$1,967.21", customers: 68, avgOrder: "$28.93" },
    { id: 10, date: "2023-03-24", revenue: "$2,245.18", customers: 76, avgOrder: "$29.54" },
  ]

  // Filter data based on search query
  const filteredData = data.filter(
    (item) =>
      item.date.includes(searchQuery) ||
      item.revenue.includes(searchQuery) ||
      item.avgOrder.includes(searchQuery) ||
      item.customers.toString().includes(searchQuery),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search data..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 w-[200px] lg:w-[300px]"
          />
        </div>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Customers</TableHead>
              <TableHead>Avg. Order</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.revenue}</TableCell>
                <TableCell>{row.customers}</TableCell>
                <TableCell>{row.avgOrder}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2">
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous page</span>
        </Button>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next page</span>
        </Button>
      </div>
    </div>
  )
}

