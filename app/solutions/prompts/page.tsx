import type { Metadata } from "next"
import { PromptsHero } from "@/components/prompts-hero"
import { PromptLibrary } from "@/components/prompt-library"
import { PromptsCTA } from "@/components/prompts-cta"

export const metadata: Metadata = {
  title: "AI Prompt Library | Curve AI Solutions",
  description: "Browse our collection of effective AI prompts for various business use cases.",
}

export default function PromptsPage() {
  return (
    <div className="min-h-screen">
      <PromptsHero />
      <PromptLibrary />
      <PromptsCTA />
    </div>
  )
}
