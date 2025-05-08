import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const userMessage = body.message || ""

    // Use the correct webhook URL and request format
    try {
      const response = await fetch(
        "https://claydonjon.app.n8n.cloud/webhook/226821eb-fb06-4837-a708-36d2166f5d29/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Use 'prompt' instead of 'message' in the request body
          body: JSON.stringify({
            prompt: userMessage,
            history: body.history || [],
          }),
        },
      )

      if (response.ok) {
        const data = await response.json()
        return NextResponse.json(data)
      } else {
        const errorText = await response.text()
        console.error("API response error:", errorText)
        throw new Error(`API error: ${response.status} - ${errorText}`)
      }
    } catch (error) {
      console.error("External API error:", error)
      // Continue to fallback if external API fails
    }

    // Fallback response if the external API is unavailable
    const fallbackMessage = "I'm here to assist with all your premium mobile detailing needs. How may I help you today?"

    // Simple keyword-based fallback responses
    if (userMessage.toLowerCase().includes("service area") || userMessage.toLowerCase().includes("location")) {
      return NextResponse.json({
        response:
          "Clean Machine serves Tulsa and surrounding areas within a 25-mile radius. May I verify your address to confirm you're within our service area?",
      })
    } else if (userMessage.toLowerCase().includes("appointment") || userMessage.toLowerCase().includes("schedule")) {
      return NextResponse.json({
        response:
          "I'd be happy to help you schedule an appointment. We currently have availability this week on Thursday and Friday. What day works best for you?",
      })
    } else if (userMessage.toLowerCase().includes("price") || userMessage.toLowerCase().includes("cost")) {
      return NextResponse.json({
        response:
          "Our premium detailing packages start at $150 for our basic service. For a full vehicle detail including interior and exterior, prices range from $225-300 depending on vehicle size.",
      })
    }

    return NextResponse.json({ response: fallbackMessage })
  } catch (error) {
    console.error("API route error:", error)
    return NextResponse.json({ error: "Failed to process your request" }, { status: 500 })
  }
}
