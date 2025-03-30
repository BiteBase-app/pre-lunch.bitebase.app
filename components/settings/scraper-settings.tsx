"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ScraperSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Scraper Configuration</CardTitle>
          <CardDescription>Configure global settings for the data scraper.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">General Settings</h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="maxConcurrent">Max Concurrent Jobs</Label>
                <Input id="maxConcurrent" type="number" defaultValue="3" min="1" max="10" />
                <p className="text-xs text-muted-foreground">
                  Maximum number of scraper jobs that can run simultaneously
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeout">Request Timeout (seconds)</Label>
                <Input id="timeout" type="number" defaultValue="30" min="5" max="120" />
                <p className="text-xs text-muted-foreground">
                  Maximum time to wait for a response from the target website
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="retryAttempts">Retry Attempts</Label>
                <Input id="retryAttempts" type="number" defaultValue="3" min="0" max="10" />
                <p className="text-xs text-muted-foreground">Number of times to retry a failed scraper job</p>
              </div>
            </div>

            <div className="flex items-center justify-between space-x-2 pt-2">
              <Label htmlFor="userAgent" className="flex-1">
                Custom User Agent
                <p className="text-sm font-normal text-muted-foreground">
                  Identify your scraper with a custom user agent string
                </p>
              </Label>
              <Input id="userAgent" className="w-1/2" defaultValue="BiteBase/1.0 Restaurant BI Platform" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Scheduling</h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="dailyTime">Daily Job Time</Label>
                <Input id="dailyTime" type="time" defaultValue="02:00" />
                <p className="text-xs text-muted-foreground">Time to run daily scraper jobs (UTC)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weeklyDay">Weekly Job Day</Label>
                <Select defaultValue="0">
                  <SelectTrigger id="weeklyDay">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Sunday</SelectItem>
                    <SelectItem value="1">Monday</SelectItem>
                    <SelectItem value="2">Tuesday</SelectItem>
                    <SelectItem value="3">Wednesday</SelectItem>
                    <SelectItem value="4">Thursday</SelectItem>
                    <SelectItem value="5">Friday</SelectItem>
                    <SelectItem value="6">Saturday</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Day to run weekly scraper jobs</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyDate">Monthly Job Date</Label>
                <Input id="monthlyDate" type="number" defaultValue="1" min="1" max="28" />
                <p className="text-xs text-muted-foreground">Date to run monthly scraper jobs (1-28)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="backoffStrategy">Retry Backoff Strategy</Label>
                <Select defaultValue="exponential">
                  <SelectTrigger id="backoffStrategy">
                    <SelectValue placeholder="Select strategy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed</SelectItem>
                    <SelectItem value="linear">Linear</SelectItem>
                    <SelectItem value="exponential">Exponential</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Strategy for increasing delay between retry attempts</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Advanced</h3>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="enableProxy" className="flex-1">
                Use Proxy
                <p className="text-sm font-normal text-muted-foreground">
                  Route scraper requests through a proxy server
                </p>
              </Label>
              <Switch id="enableProxy" />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="enableHeadless" className="flex-1">
                Headless Browser
                <p className="text-sm font-normal text-muted-foreground">
                  Use a headless browser for JavaScript-rendered content
                </p>
              </Label>
              <Switch id="enableHeadless" defaultChecked />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="respectRobots" className="flex-1">
                Respect robots.txt
                <p className="text-sm font-normal text-muted-foreground">Follow website crawling rules in robots.txt</p>
              </Label>
              <Switch id="respectRobots" defaultChecked />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="enableCache" className="flex-1">
                Cache Results
                <p className="text-sm font-normal text-muted-foreground">
                  Cache scraper results to reduce duplicate requests
                </p>
              </Label>
              <Switch id="enableCache" defaultChecked />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button>Save Scraper Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

