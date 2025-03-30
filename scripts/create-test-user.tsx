"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertCircle } from "lucide-react"

export default function CreateTestUser() {
  const [isCreating, setIsCreating] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const createUser = async () => {
    setIsCreating(true)
    setResult(null)

    try {
      const response = await fetch("/api/admin/create-test-user", {
        method: "POST",
      })

      const data = await response.json()

      if (response.ok) {
        setResult({
          success: true,
          message: `Test user created successfully! Email: ${data.email}, Password: ${data.password}`,
        })
      } else {
        setResult({
          success: false,
          message: data.error || "Failed to create test user",
        })
      }
    } catch (error) {
      setResult({
        success: false,
        message: "An unexpected error occurred",
      })
      console.error("Error creating test user:", error)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create Test User</CardTitle>
        <CardDescription>
          This will create a test user with admin privileges for the Restaurant BI application.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {result && (
          <Alert className={result.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}>
            {result.success ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertTitle>{result.success ? "Success" : "Error"}</AlertTitle>
            <AlertDescription className="whitespace-pre-wrap">{result.message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={createUser} disabled={isCreating} className="w-full">
          {isCreating ? "Creating..." : "Create Test User"}
        </Button>
      </CardFooter>
    </Card>
  )
}

