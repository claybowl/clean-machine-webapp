"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ChatPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the n8n chat URL
    window.location.href = "https://claydonjon.app.n8n.cloud/webhook/226821eb-fb06-4837-a708-36d2166f5d29/chat"
  }, [])

  return (
    <div className="container mx-auto py-12 px-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Redirecting to chat...</h1>
      <p>
        If you are not redirected automatically, please{" "}
        <a
          href="https://claydonjon.app.n8n.cloud/webhook/226821eb-fb06-4837-a708-36d2166f5d29/chat"
          className="text-blue-600 underline"
        >
          click here
        </a>
        .
      </p>
    </div>
  )
}
