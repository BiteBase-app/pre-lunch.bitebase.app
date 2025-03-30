"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { type ScraperSource, addScraperSource } from "@/lib/scraper"

interface ScraperFormProps {
  onSubmit: (source: ScraperSource) => void
  onCancel: () => void
  initialData?: Partial<ScraperSource>
}

export function ScraperForm({ onSubmit, onCancel, initialData }: ScraperFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    url: initialData?.url || "",
    type: initialData?.type || "reviews",
    selector: initialData?.selector || "",
    frequency: initialData?.frequency || "daily",
    isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    })

    // Clear error for this field
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: "",
      })
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.url.trim()) {
      newErrors.url = "URL is required"
    } else {
      try {
        new URL(formData.url)
      } catch (e) {
        newErrors.url = "Invalid URL format"
      }
    }

    if (!formData.selector.trim()) {
      newErrors.selector = "CSS selector is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setIsSubmitting(true)

    try {
      if (initialData?.id) {
        // Update existing source
        // This would call updateScraperSource in a real implementation
        onSubmit({
          ...formData,
          id: initialData.id,
          lastRun: initialData.lastRun,
        } as ScraperSource)
      } else {
        // Add new source
        const result = await addScraperSource(formData)

        if (result.success) {
          // In a real implementation, the API would return the new source with ID
          onSubmit({
            ...formData,
            id: Date.now().toString(), // Placeholder ID
            lastRun: null,
          } as ScraperSource)
        } else {
          throw new Error(result.error || "Failed to add source")
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      // Show error message
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Yelp Reviews"
          error={errors.name}
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">URL</Label>
        <Input
          id="url"
          value={formData.url}
          onChange={(e) => handleChange("url", e.target.value)}
          placeholder="https://example.com/reviews"
          error={errors.url}
        />
        {errors.url && <p className="text-sm text-destructive">{errors.url}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Data Type</Label>
          <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
            <SelectTrigger id="type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="reviews">Customer Reviews</SelectItem>
              <SelectItem value="competitors">Competitor Data</SelectItem>
              <SelectItem value="trends">Industry Trends</SelectItem>
              <SelectItem value="prices">Ingredient Prices</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="frequency">Frequency</Label>
          <Select value={formData.frequency} onValueChange={(value) => handleChange("frequency", value)}>
            <SelectTrigger id="frequency">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="selector">CSS Selector</Label>
        <Textarea
          id="selector"
          value={formData.selector}
          onChange={(e) => handleChange("selector", e.target.value)}
          placeholder=".review-item"
          rows={3}
          error={errors.selector}
        />
        {errors.selector && <p className="text-sm text-destructive">{errors.selector}</p>}
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="isActive"
          checked={formData.isActive}
          onCheckedChange={(checked) => handleChange("isActive", checked)}
        />
        <Label htmlFor="isActive">Active</Label>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : initialData?.id ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  )
}

