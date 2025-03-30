"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, Eye, EyeOff, RefreshCw } from "lucide-react"

export function ApiSettings() {
  const [showApiKey, setShowApiKey] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [apiKey, setApiKey] = useState("sk_live_51Hb9qlKj3fUy8eLj2gkJnL8v")

  const handleRegenerateKey = async () => {
    setIsRegenerating(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate a new fake API key
    const newKey = "sk_live_" + Math.random().toString(36).substring(2, 15)
    setApiKey(newKey)
    setIsRegenerating(false)
  }

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>Manage API keys for integrating with external services.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="apiKey">BiteBase API Key</Label>
              <Badge variant="outline">Production</Badge>
            </div>
            <div className="flex">
              <Input
                id="apiKey"
                value={showApiKey ? apiKey : "•".repeat(apiKey.length)}
                readOnly
                className="font-mono"
              />
              <Button variant="ghost" size="icon" onClick={() => setShowApiKey(!showApiKey)} className="ml-2">
                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={handleCopyKey} className="ml-2">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              This key provides full access to your BiteBase account. Keep it secure!
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="openaiKey">OpenAI API Key</Label>
            <Input id="openaiKey" value="sk_•••••••••••••••••••••••••••••••" readOnly className="font-mono" />
            <p className="text-xs text-muted-foreground">
              Used for AI Insights feature.{" "}
              <a href="#" className="text-primary">
                Update in environment variables
              </a>
            </p>
          </div>

          <div className="pt-4">
            <Button variant="outline" onClick={handleRegenerateKey} disabled={isRegenerating}>
              {isRegenerating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Regenerating...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Regenerate API Key
                </>
              )}
            </Button>
            <p className="mt-2 text-xs text-muted-foreground">
              Warning: Regenerating your API key will invalidate your existing key. Any applications using the old key
              will stop working.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Webhooks</CardTitle>
          <CardDescription>Configure webhooks to receive real-time updates.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhookUrl">Webhook URL</Label>
            <Input id="webhookUrl" placeholder="https://your-app.com/webhook" />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Orders</Label>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="orderCreated" className="h-4 w-4 rounded border-gray-300" />
                <label htmlFor="orderCreated" className="text-sm">
                  Created
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="orderUpdated" className="h-4 w-4 rounded border-gray-300" />
                <label htmlFor="orderUpdated" className="text-sm">
                  Updated
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Customers</Label>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="customerCreated" className="h-4 w-4 rounded border-gray-300" />
                <label htmlFor="customerCreated" className="text-sm">
                  Created
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="customerUpdated" className="h-4 w-4 rounded border-gray-300" />
                <label htmlFor="customerUpdated" className="text-sm">
                  Updated
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Menu</Label>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="menuCreated" className="h-4 w-4 rounded border-gray-300" />
                <label htmlFor="menuCreated" className="text-sm">
                  Created
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="menuUpdated" className="h-4 w-4 rounded border-gray-300" />
                <label htmlFor="menuUpdated" className="text-sm">
                  Updated
                </label>
              </div>
            </div>
          </div>

          <Button className="mt-4">Save Webhook Settings</Button>
        </CardContent>
      </Card>
    </div>
  )
}

