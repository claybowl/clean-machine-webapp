import { StreamingTextResponse } from "ai"
import type { Message } from "ai/rsc"
import { grok } from "@ai-sdk/grok"
import { generateText } from "ai"

// Define the AI model configuration
const model = grok("grok-1")

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { messages } = await req.json()

    // Generate a response using the AI SDK
    const { text } = await generateText({
      model,
      prompt: buildPrompt(messages),
      temperature: 0.7,
      maxTokens: 1000,
    })

    // Return the response as a streaming text response
    return new StreamingTextResponse(
      new ReadableStream({
        async start(controller) {
          controller.enqueue(new TextEncoder().encode(text))
          controller.close()
        },
      }),
    )
  } catch (error) {
    console.error("AI chat error:", error)
    return new Response(
      JSON.stringify({
        error: "There was an error processing your request",
        details: error instanceof Error ? error.message : String(error),
      }),
      { status: 500 },
    )
  }
}

// Helper function to build a prompt from the message history
function buildPrompt(messages: Message[]) {
  return (
    messages
      .map((message) => {
        if (message.role === "user") {
          return `User: ${message.content}`
        } else if (message.role === "assistant") {
          return `Assistant: ${message.content}`
        }
        return ""
      })
      .join("\n\n") + "\n\nAssistant:"
  )
}
