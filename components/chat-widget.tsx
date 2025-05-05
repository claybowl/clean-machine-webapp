"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X } from "lucide-react"

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasVisited, setHasVisited] = useState(true) // Default to true to prevent flash on hydration

  useEffect(() => {
    // Check if this is the user's first visit
    const hasUserVisitedBefore = localStorage.getItem("hasVisitedBefore")

    if (!hasUserVisitedBefore) {
      // If first visit, open the chat automatically after a short delay
      const timer = setTimeout(() => {
        setIsOpen(true)
        // Mark that the user has visited before
        localStorage.setItem("hasVisitedBefore", "true")
      }, 2000) // 2-second delay for better user experience

      setHasVisited(false)

      return () => clearTimeout(timer)
    } else {
      setHasVisited(true)
    }
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg w-[350px] sm:w-[400px] h-[500px] flex flex-col overflow-hidden border border-gray-200 animate-fade-in">
          <div className="bg-navy-dark text-ivory p-3 flex justify-between items-center">
            <h3 className="font-medium">Chat with Clean Machine</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-ivory hover:bg-navy-dark/50"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 overflow-hidden">
            <iframe
              src="https://claydonjon.app.n8n.cloud/webhook/226821eb-fb06-4837-a708-36d2166f5d29/chat"
              className="w-full h-full border-0"
              title="Clean Machine Chat"
              allow="microphone"
            />
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className={`h-14 w-14 rounded-full bg-navy-dark text-ivory hover:bg-navy-dark/90 shadow-lg flex items-center justify-center ${
            !hasVisited ? "animate-pulse" : ""
          }`}
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}
