"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { type ScraperSource, deleteScraperSource } from "@/lib/scraper"
import { Calendar, Clock, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ScraperSourceListProps {
  sources: ScraperSource[]
  onSelect: (source: ScraperSource) => void
  onDelete: (id: string) => void
}

export function ScraperSourceList({ sources, onSelect, onDelete }: ScraperSourceListProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [sourceToDelete, setSourceToDelete] = useState<ScraperSource | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteClick = (source: ScraperSource, e: React.MouseEvent) => {
    e.stopPropagation()
    setSourceToDelete(source)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!sourceToDelete) return

    setIsDeleting(true)
    try {
      const result = await deleteScraperSource(sourceToDelete.id)
      if (result.success) {
        onDelete(sourceToDelete.id)
      }
    } catch (error) {
      console.error("Error deleting source:", error)
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
      setSourceToDelete(null)
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "reviews":
        return "bg-blue-100 text-blue-800"
      case "competitors":
        return "bg-red-100 text-red-800"
      case "trends":
        return "bg-green-100 text-green-800"
      case "prices":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sources.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="p-6 text-center text-muted-foreground">
              No data sources configured. Add your first source to get started.
            </CardContent>
          </Card>
        ) : (
          sources.map((source) => (
            <Card
              key={source.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelect(source)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium truncate">{source.name}</h3>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => handleDeleteClick(source, e)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground truncate mb-3">{source.url}</div>

                <div className="flex items-center justify-between">
                  <Badge className={getTypeColor(source.type)}>{source.type}</Badge>

                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {source.frequency}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 text-xs">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {source.lastRun ? new Date(source.lastRun).toLocaleDateString() : "Never run"}
                  </div>

                  <Badge variant={source.isActive ? "default" : "outline"}>
                    {source.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the data source "{sourceToDelete?.name}" and all its scraped data. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

