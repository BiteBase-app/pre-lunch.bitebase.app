"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from "lucide-react"

export function DataUploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [dataType, setDataType] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !dataType) return

    setIsUploading(true)

    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false)
      setFile(null)
      setDataType("")
      // Show success message or handle response
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="data-type">Data Type</Label>
        <Select value={dataType} onValueChange={setDataType}>
          <SelectTrigger id="data-type">
            <SelectValue placeholder="Select data type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sales">Sales Data</SelectItem>
            <SelectItem value="inventory">Inventory Data</SelectItem>
            <SelectItem value="customer">Customer Data</SelectItem>
            <SelectItem value="menu">Menu Data</SelectItem>
            <SelectItem value="employee">Employee Data</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="file-upload">Upload File</Label>
        <div className="flex items-center gap-4">
          <Input id="file-upload" type="file" onChange={handleFileChange} className="flex-1" />
          {file && (
            <p className="text-sm text-muted-foreground">
              {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </p>
          )}
        </div>
        <p className="text-xs text-muted-foreground">Supported formats: CSV, Excel, JSON (max 10MB)</p>
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={!file || !dataType || isUploading} className="gap-2">
          {isUploading ? (
            <>Uploading...</>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Upload Data
            </>
          )}
        </Button>
        {isUploading && (
          <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-primary animate-pulse" style={{ width: "60%" }}></div>
          </div>
        )}
      </div>
    </form>
  )
}

