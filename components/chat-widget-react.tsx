"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<
    Array<{
      text: string
      sender: "user" | "bot"
      timestamp: string
    }>
  >([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messageContainerRef = useRef<HTMLDivElement>(null)
  const [sessionId, setSessionId] = useState("")
  const [isMounted, setIsMounted] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  // Generate a session ID when the component mounts
  useEffect(() => {
    setIsMounted(true)
    setSessionId(`user-${Math.random().toString(36).substring(2, 15)}`)

    // Add a welcome message when the chat is first opened
    setMessages([
      {
        text: "Hi! I'm your Clean Machine virtual concierge. How can I help you today?",
        sender: "bot",
        timestamp: new Date().toISOString(),
      },
    ])
  }, [])

  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight
    }
  }, [messages])

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Function to get fallback responses for common queries
  const getFallbackResponse = (message: string): string | null => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("how much")) {
      return "Our premium detailing packages start at $150 for our basic service. For a full vehicle detail including interior and exterior, prices range from $225-300 depending on vehicle size."
    }

    if (lowerMessage.includes("appointment") || lowerMessage.includes("schedule") || lowerMessage.includes("book")) {
      return "I'd be happy to help you schedule an appointment. We currently have availability this week. You can call us at 918-856-5304 or I can take your information here."
    }

    if (lowerMessage.includes("location") || lowerMessage.includes("address") || lowerMessage.includes("where")) {
      return "Clean Machine is a mobile detailing service. We come to your location in Tulsa and surrounding areas within a 25-mile radius."
    }

    if (lowerMessage.includes("service") || lowerMessage.includes("offer") || lowerMessage.includes("do you")) {
      return "We offer a range of premium detailing services including full interior/exterior details, ceramic coatings, paint correction, headlight restoration, and maintenance packages."
    }

    return null
  }

  const sendMessage = async () => {
    if (inputMessage.trim() === "") return

    // Add user message to chat
    const userMessage = {
      text: inputMessage,
      sender: "user" as const,
      timestamp: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, userMessage])

    const userMessageText = inputMessage.trim()
    setInputMessage("")
    setIsLoading(true)

    // Check for fallback responses first
    const fallbackResponse = getFallbackResponse(userMessageText)
    if (fallbackResponse) {
      // Simulate a delay for a more natural conversation flow
      setTimeout(() => {
        const botMessage = {
          text: fallbackResponse,
          sender: "bot" as const,
          timestamp: new Date().toISOString(),
        }
        setMessages((prev) => [...prev, botMessage])
        setIsLoading(false)
      }, 1000)
      return
    }

    try {
      // Create a controller to handle timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

      // Send message to n8n webhook
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessageText,
          sessionId: sessionId,
          source: "website",
          timestamp: new Date().toISOString(),
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()

      // Add bot response to chat
      const botMessage = {
        text: data.response || data.message || "I'm processing your request...",
        sender: "bot" as const,
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, botMessage])
      setRetryCount(0) // Reset retry count on success
    } catch (error) {
      console.error("Error sending message:", error)

      // Increment retry count
      const newRetryCount = retryCount + 1
      setRetryCount(newRetryCount)

      // Add error message to chat
      let errorMessage = "I'm having trouble connecting right now. Please try again or call us at 918-856-5304."

      // If we've tried multiple times, give a more specific message
      if (newRetryCount >= 2) {
        errorMessage =
          "I'm still having trouble connecting to our systems. For immediate assistance, please call us at 918-856-5304 or email contact@cleanmachinemobile.com."
      }

      const botMessage = {
        text: errorMessage,
        sender: "bot" as const,
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, botMessage])
    } finally {
      setIsLoading(false)
    }
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
          <div className="message-container" ref={messageContainerRef}>
            {messages.map((message, index) => (
              <div key={index} className={cn("message", message.sender === "user" ? "user-message" : "bot-message")}>
                <div className="message-content">{message.text}</div>
                <div className="message-timestamp">
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message bot-message">
                <div className="message-content typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>
          <div className="message-input">
            <textarea
              placeholder="Type your message..."
              value={inputMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <button className="send-button" onClick={sendMessage} disabled={isLoading || inputMessage.trim() === ""}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatWidget
