"use client"

import { useState, useEffect } from "react"
import "../app/embedded-chat-widget.css"

const EmbeddedChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Handle client-side rendering
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const toggleChat = () => {
    setIsOpen(!isOpen)

    // If opening the chat, open in a new window/tab instead of an iframe
    if (!isOpen) {
      window.open(
        "https://claydonjon.app.n8n.cloud/webhook/226821eb-fb06-4837-a708-36d2166f5d29/chat",
        "CleanMachineChat",
        "width=400,height=600,resizable=yes,scrollbars=yes",
      )
      // Keep the button in its original state since we're opening in a new window
      setIsOpen(false)
    }
  }

  // Don't render until client-side hydration is complete
  if (!isMounted) return null

  return (
    <div className="chat-widget">
      <button className="chat-toggle" onClick={toggleChat}>
        <span className="chat-icon">💬</span>
        <span>Chat with us</span>
      </button>
    </div>
  )
}

export default EmbeddedChatWidget
