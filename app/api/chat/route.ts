import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Try to forward the request to the external API
    try {
      const response = await fetch("https://claydonjon.app.n8n.cloud/webhook-test/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: body.message }),
      })

      if (response.ok) {
        const data = await response.json()
        return NextResponse.json(data)
      }
    } catch (error) {
      console.error("External API error:", error)
      // Continue to fallback if external API fails
    }

    // Fallback response if the external API is unavailable
    // This simulates responses based on keywords in the user's message
    const userMessage = body.message.toLowerCase()
    let responseMessage = "I'm here to assist with all your premium mobile detailing needs. How may I help you today?"

    if (userMessage.includes("service area") || userMessage.includes("location") || userMessage.includes("where")) {
      responseMessage =
        "Clean Machine serves Tulsa and surrounding areas within a 25-mile radius. May I verify your address to confirm you're within our service area?"
    } else if (
      userMessage.includes("appointment") ||
      userMessage.includes("schedule") ||
      userMessage.includes("book")
    ) {
      responseMessage =
        "I'd be happy to help you schedule an appointment. We currently have availability this week on Thursday and Friday. What day works best for you?"
    } else if (userMessage.includes("price") || userMessage.includes("cost") || userMessage.includes("package")) {
      responseMessage =
        "Our premium detailing packages start at $150 for our basic service. For a full vehicle detail including interior and exterior, prices range from $225-300 depending on vehicle size. Would you like more information about a specific service?"
    } else if (userMessage.includes("payment") || userMessage.includes("pay")) {
      responseMessage =
        "We accept all major credit cards, PayPal, Venmo, and Cash App. Would you prefer to pay before or after your service is completed?"
    } else if (userMessage.includes("hello") || userMessage.includes("hi") || userMessage.includes("hey")) {
      responseMessage =
        "Hello! Welcome to Clean Machine Virtual Concierge. How may I assist you with your detailing needs today?"
    }

    return NextResponse.json({ message: responseMessage })
  } catch (error) {
    console.error("API route error:", error)
    return NextResponse.json({ error: "Failed to process your request" }, { status: 500 })
  }
}
