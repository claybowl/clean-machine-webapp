import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SolutionsNotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-12 text-center">
      <h1 className="text-4xl font-bold mb-4">Solution Not Found</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-md">
        We couldn't find the solution you're looking for. It may have been moved or doesn't exist.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/solutions">Browse All Solutions</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  )
}
