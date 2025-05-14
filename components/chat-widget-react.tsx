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

  const sendMessage = async () => {
    if (inputMessage.trim() === "") return

    // Add user message to chat
    const userMessage = {
      text: inputMessage,
      sender: "user" as const,
      timestamp: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      // Send message to n8n webhook
      const response = await fetch("https://claydonjon.app.n8n.cloud/webhook/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputMessage,
          sessionId: sessionId,
          source: "website",
          timestamp: new Date().toISOString(),
        }),
      })

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
    } catch (error) {
      console.error("Error sending message:", error)

      // Add error message to chat
      const errorMessage = {
        text: "I'm having trouble connecting right now. Please try again or call us at 918-856-5304.",
        sender: "bot" as const,
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, errorMessage])
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
