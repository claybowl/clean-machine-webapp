import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SolutionsCTA() {
  return (
    <div className="bg-[#F8FAFC] py-24">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#1A365D] mb-4">Ready to Transform Your Business with AI?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Start with our AI Readiness Assessment to discover which solutions are right for your business.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-[#0076FF] hover:bg-[#0076FF]/90 text-white">
              <Link href="/assessments/new">Take the Assessment</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Schedule a Consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
