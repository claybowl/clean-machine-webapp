"use client"

import { useState, useEffect, useRef } from "react"
import "../app/embedded-chat-widget.css"

const N8nChatWidget = () => {
  const [isMounted, setIsMounted] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Handle client-side rendering
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Initialize chat when component mounts
  useEffect(() => {
    if (!isMounted || !chatContainerRef.current) return

    // Create a unique session ID for this user
    const sessionId =
      localStorage.getItem("chatSessionId") || `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    localStorage.setItem("chatSessionId", sessionId)

    // Create a container for the chat
    const chatDiv = document.createElement("div")
    chatDiv.id = "n8n-chat"
    chatDiv.style.width = "100%"
    chatDiv.style.height = "100%"
    chatContainerRef.current.appendChild(chatDiv)

    // Add the script directly to the page
    const script = document.createElement("script")
    script.type = "module"
    script.innerHTML = `
      import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
      
      (async function() {
        createChat({
          container: document.getElementById('n8n-chat'),
          webhookUrl: 'https://claydonjon.app.n8n.cloud/webhook/226821eb-fb06-4837-a708-36d2166f5d29/chat',
          showWelcomeScreen: false,
          loadPreviousSession: true,
          metadata: {
            sessionId: '${sessionId}',
            source: 'website-embedded'
          },
          webhookConfig: {
            headers: {
              'Content-Type': 'application/json',
              'X-Instance-Id': '8c08960281fec3eb21c544b4fc1d6b5273296017f5675aeb883b0925a2e2f800'
            }
          },
          allowFileUploads: false,
          i18n: {
            en: {}
          },
          initialMessages: [
            "👋 Welcome to the Clean Machine Tulsa AI Assistant!",
            "I'm your automated car detailing assistant. How can I help you today?"
          ]
        });
      })();
    `

    // Add the CSS
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css"
    document.head.appendChild(link)

    // Add the script
    document.body.appendChild(script)

    // Cleanup function
    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script)
      }
      if (link && link.parentNode) {
        link.parentNode.removeChild(link)
      }
    }
  }, [isMounted])

  // Don't render until client-side hydration is complete
  if (!isMounted) return null

  return (
    <div className="chat-widget-container" ref={chatContainerRef}>
      {/* The n8n chat will be initialized here and will show its own button */}
    </div>
  )
}

export default N8nChatWidget
