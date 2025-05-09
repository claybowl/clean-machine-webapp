import { AIChatInterface } from "@/components/ai-chat-interface"

export const metadata = {
  title: "AI Assistant | Curve AI Solutions",
  description: "Chat with our AI assistant powered by Grok",
}

export default function AIAssistantPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-3xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold mb-3">Curve AI Assistant</h1>
        <p className="text-muted-foreground">
          Chat with our AI assistant powered by Grok. Ask questions about AI solutions, get recommendations, or explore
          how AI can help your business.
        </p>
      </div>

      <AIChatInterface />

      <div className="max-w-3xl mx-auto mt-8">
        <h2 className="text-xl font-semibold mb-4">Suggested Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-medium mb-2">AI Implementation</h3>
            <p className="text-sm text-muted-foreground">
              Ask about strategies for implementing AI in your business, best practices, and common pitfalls to avoid.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-medium mb-2">AI Tools & Solutions</h3>
            <p className="text-sm text-muted-foreground">
              Learn about different AI tools and solutions that can help streamline your business operations.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-medium mb-2">AI Ethics & Compliance</h3>
            <p className="text-sm text-muted-foreground">
              Explore ethical considerations and compliance requirements when implementing AI solutions.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-medium mb-2">Custom AI Solutions</h3>
            <p className="text-sm text-muted-foreground">
              Discover how custom AI solutions can be tailored to your specific business needs and challenges.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
