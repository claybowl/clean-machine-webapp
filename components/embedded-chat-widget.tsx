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
  }

  // Don't render until client-side hydration is complete
  if (!isMounted) return null

  return (
    <div className="chat-widget">
      {!isOpen ? (
        <button className="chat-toggle" onClick={toggleChat}>
          <span className="chat-icon">💬</span>
          <span>Chat with us</span>
        </button>
      ) : (
        <div className="chat-container">
          <div className="chat-header">
            <h3>Clean Machine Virtual Concierge</h3>
            <button className="close-button" onClick={toggleChat}>
              ×
            </button>
          </div>
          <iframe
            src="https://claydonjon.app.n8n.cloud/webhook/226821eb-fb06-4837-a708-36d2166f5d29/chat"
            className="chat-iframe"
            title="Clean Machine Chat"
            frameBorder="0"
            allowTransparency={true}
          />
        </div>
      )}
    </div>
  )
}

export default EmbeddedChatWidget
