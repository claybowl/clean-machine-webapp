import { Button } from "@/components/ui/button"
import Link from "next/link"

export function PromptsCTA() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#1A365D]">Need a Custom Prompt?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Our team can help you develop custom prompts tailored to your specific business needs. Schedule a
            consultation to discuss your requirements.
          </p>
          <Button asChild className="bg-[#0076FF] hover:bg-[#0076FF]/90 text-white">
            <Link href="/contact">Schedule a Consultation</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
