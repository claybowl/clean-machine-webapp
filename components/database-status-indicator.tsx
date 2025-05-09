"use client"

import { useState, useEffect } from "react"
import { Database, AlertCircle, CheckCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function DatabaseStatusIndicator() {
  const [status, setStatus] = useState<"loading" | "connected" | "error">("loading")
  const [message, setMessage] = useState<string>("Checking database connection...")

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch("/api/db-check")
        const data = await response.json()

        if (data.status === "connected") {
          setStatus("connected")
          setMessage("Database connected")
        } else {
          setStatus("error")
          setMessage(data.message || "Database connection error")
        }
      } catch (error) {
        setStatus("error")
        setMessage("Failed to check database status")
      }
    }

    checkConnection()
  }, [])

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1.5 text-xs">
            {status === "loading" ? (
              <Database className="h-3.5 w-3.5 text-yellow-500 animate-pulse" />
            ) : status === "connected" ? (
              <CheckCircle className="h-3.5 w-3.5 text-green-500" />
            ) : (
              <AlertCircle className="h-3.5 w-3.5 text-red-500" />
            )}
            <span
              className={
                status === "connected" ? "text-green-500" : status === "error" ? "text-red-500" : "text-yellow-500"
              }
            >
              DB
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
