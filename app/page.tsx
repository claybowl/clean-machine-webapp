import Link from "next/link"
import { ArrowRight, BarChart2, Database, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom-card"
import DataVisualization from "@/components/data-visualization"
import { AssessmentCTA } from "@/components/assessment-cta"
import { SolutionsShowcase } from "@/components/solutions-showcase"

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-[#0A1929] via-[#1A365D] to-[#0076FF]">
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Takeoff with Curve AI Solutions
                </h1>
                <p className="max-w-[600px] text-gray-200 md:text-xl">
                  The Anti-Gravity for business. Breakaway with no resistance.
                </p>
              </div>
              <p className="max-w-[600px] text-gray-200 md:text-xl">
                We build AI agent systems that transform how businesses interact with data, creating frictionless
                operations and intelligent decision-making processes.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="bg-[#FF7F00] hover:bg-[#FF7F00]/90 text-white">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 text-white hover:bg-white/20 border-white/20"
                >
                  Explore Solutions
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <DataVisualization />
            </div>
          </div>
        </div>
        <div className="absolute inset-0">
          {/* Original grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>

          {/* Fluffy white clouds */}
          <div
            className="floating-cloud"
            style={{
              top: "-10%",
              left: "15%",
              width: "120px",
              height: "80px",
              animationDelay: "0s",
              animationDuration: "7s",
            }}
          ></div>
          <div
            className="floating-cloud"
            style={{
              top: "-15%",
              left: "35%",
              width: "180px",
              height: "100px",
              animationDelay: "1.5s",
              animationDuration: "9s",
            }}
          ></div>
          <div
            className="floating-cloud"
            style={{
              top: "-20%",
              left: "60%",
              width: "200px",
              height: "120px",
              animationDelay: "3s",
              animationDuration: "6s",
            }}
          ></div>
          <div
            className="floating-cloud"
            style={{
              top: "-10%",
              left: "75%",
              width: "150px",
              height: "90px",
              animationDelay: "4.5s",
              animationDuration: "8s",
            }}
          ></div>
          <div
            className="floating-cloud"
            style={{
              top: "-15%",
              left: "25%",
              width: "220px",
              height: "130px",
              animationDelay: "6s",
              animationDuration: "7.5s",
            }}
          ></div>
          <div
            className="floating-cloud"
            style={{
              top: "-20%",
              left: "50%",
              width: "160px",
              height: "100px",
              animationDelay: "1s",
              animationDuration: "8.5s",
            }}
          ></div>
          <div
            className="floating-cloud"
            style={{
              top: "-15%",
              left: "85%",
              width: "190px",
              height: "110px",
              animationDelay: "3.5s",
              animationDuration: "7s",
            }}
          ></div>
        </div>
      </section>

      {/* Assessment CTA */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-[#F8F9FA]">
        <div className="container px-4 md:px-6 mx-auto">
          <AssessmentCTA />
        </div>
      </section>

      {/* Solutions Showcase */}
      <SolutionsShowcase />

      {/* Client Success Stories */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-[#F8F9FA]">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#1A365D]">
                Client Success Stories
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Real results from our AI solutions
              </p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-[#1A365D]">42% Increase in Efficiency</CardTitle>
                <CardDescription>Financial Services Company</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  "Wow, Clayton! Really an amazingly thorough outline. I can't wait to see everything implemented as we
                  progress. Thank you for the excellent work and timely update!"
                </p>
                <div className="mt-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#1A365D] flex items-center justify-center text-white font-bold">
                    JD
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-gray-500">CTO, Financial Services Inc.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-[#1A365D]">3.5x ROI in First Year</CardTitle>
                <CardDescription>E-commerce Platform</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  "The trading system infrastructure provided by Curve AI delivered a 3.5x return on our investment
                  within the first year of implementation."
                </p>
                <div className="mt-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#7928CA] flex items-center justify-center text-white font-bold">
                    JS
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium">Jane Smith</p>
                    <p className="text-xs text-gray-500">CEO, E-commerce Platform</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-[#1A365D]">68% Reduction in Errors</CardTitle>
                <CardDescription>Manufacturing Company</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  "By implementing Curve AI's tools, we've seen a 68% reduction in data processing errors and
                  significantly improved our decision-making process."
                </p>
                <div className="mt-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#FF7F00] flex items-center justify-center text-white font-bold">
                    RJ
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium">Robert Johnson</p>
                    <p className="text-xs text-gray-500">COO, Manufacturing Co.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#1A365D]">
                About Curve AI
              </h2>
              <p className="text-gray-500 md:text-xl/relaxed">
                We build AI agent systems that transform how businesses interact with data, creating frictionless
                operations and intelligent decision-making processes.
              </p>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#1A365D]">Our Philosophy</h3>
                <p className="text-gray-500">
                  Above all else show the data. We believe in transparent, data-driven solutions that provide clear
                  insights and measurable results.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#1A365D]">Our Approach</h3>
                <p className="text-gray-500">
                  We follow Agile methodologies and DevOps practices to ensure rapid, iterative development and
                  continuous improvement of our AI solutions.
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-[#0076FF]/10 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-[#0076FF]" />
                  </div>
                  <CardTitle className="text-lg text-[#1A365D]">Expert Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Our team consists of AI specialists, data scientists, and software engineers with decades of
                    combined experience.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-[#0076FF]/10 flex items-center justify-center mb-4">
                    <Database className="w-6 h-6 text-[#0076FF]" />
                  </div>
                  <CardTitle className="text-lg text-[#1A365D]">Technology Stack</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    We leverage cutting-edge technologies including OpenAI, Google Generative AI, and custom ML models.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-[#0076FF]/10 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-[#0076FF]" />
                  </div>
                  <CardTitle className="text-lg text-[#1A365D]">Rapid Deployment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Our Docker-based infrastructure ensures consistent, reliable deployment of AI solutions.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-[#0076FF]/10 flex items-center justify-center mb-4">
                    <BarChart2 className="w-6 h-6 text-[#0076FF]" />
                  </div>
                  <CardTitle className="text-lg text-[#1A365D]">Data-Driven</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    We prioritize data visualization and transparency in all our solutions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-[#1A365D]">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Ready to Reduce Business Friction?
              </h2>
              <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Take the first step towards intelligent, data-driven operations.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="bg-[#FF7F00] hover:bg-[#FF7F00]/90 text-white">
                Start Your Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20 border-white/20">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-[#343A40] text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Curve AI Solutions</h3>
              <p className="text-sm text-gray-300">The Anti-Gravity for business. Breakaway with no resistance.</p>
              <p className="text-sm text-gray-300">Tulsa, Oklahoma</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Solutions</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    AI Agent Solutions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Trading System Infrastructure
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    AI Tools Deployment
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Client Success Stories
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-300">© 2025 Curve AI Solutions. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <Link href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">GitHub</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
