"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, CheckCircle, Database, RefreshCw } from "lucide-react"

export default function DatabaseTestPage() {
  const [status, setStatus] = useState<"loading" | "connected" | "error">("loading")
  const [message, setMessage] = useState<string>("Testing database connection...")
  const [details, setDetails] = useState<string | null>(null)
  const [timestamp, setTimestamp] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const testConnection = async () => {
    setStatus("loading")
    setMessage("Testing database connection...")
    setDetails(null)
    setIsRefreshing(true)

    try {
      const response = await fetch("/api/db-check")
      const data = await response.json()

      if (data.status === "connected") {
        setStatus("connected")
        setMessage("Successfully connected to Neon database!")
        setTimestamp(data.timestamp)
        setDetails(null)
      } else {
        setStatus("error")
        setMessage("Failed to connect to database")
        setDetails(data.error || "Unknown error occurred")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Error testing database connection")
      setDetails(error instanceof Error ? error.message : "Unknown error occurred")
    } finally {
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    testConnection()
  }, [])

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Database Connection Test</h1>

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Neon Database Status
              </CardTitle>
              <CardDescription>Testing connection to your Neon PostgreSQL database</CardDescription>
            </div>
            {status === "loading" ? (
              <Skeleton className="h-6 w-24" />
            ) : (
              <Badge variant={status === "connected" ? "default" : "destructive"} className="text-xs py-1">
                {status === "connected" ? "CONNECTED" : "ERROR"}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              {status === "loading" ? (
                <Skeleton className="h-5 w-5 rounded-full mt-0.5" />
              ) : status === "connected" ? (
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
              )}
              <div className="flex-1">
                <h3 className="font-medium">{message}</h3>
                {status === "loading" ? (
                  <div className="mt-2 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ) : status === "connected" && timestamp ? (
                  <p className="text-sm text-muted-foreground mt-1">
                    Database server time: {new Date(timestamp).toLocaleString()}
                  </p>
                ) : details ? (
                  <p className="text-sm text-red-500 mt-1">{details}</p>
                ) : null}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={testConnection} disabled={isRefreshing} className="w-full">
            {isRefreshing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Connection
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      <div className="mt-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Database Connection Help</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Environment Variables</h3>
            <p className="text-sm text-muted-foreground">
              Make sure you have set up the <code className="bg-muted px-1 py-0.5 rounded">NEON_DATABASE_URL</code>{" "}
              environment variable in your Vercel project settings.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Neon Dashboard</h3>
            <p className="text-sm text-muted-foreground">
              Check your Neon project dashboard to ensure your database is active and the connection string is correct.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">IP Restrictions</h3>
            <p className="text-sm text-muted-foreground">
              If you have IP restrictions enabled in Neon, make sure Vercel's IP ranges are allowed.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
