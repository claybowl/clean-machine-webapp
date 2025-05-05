import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SkyBackground } from "@/components/sky-background"
import { Check, Calendar, ArrowRight, Users, Zap, Database, Bot, LineChart } from "lucide-react"

export const metadata = {
  title: "About Curve AI Solutions",
  description: "Learn about our mission to transform businesses with AI agent infrastructure solutions.",
}

export default function AboutPage() {
  // Team members
  const teamMembers = [
    {
      name: "Clayton Christian",
      role: "Founder & CTO",
      bio: "Machine Learning Engineering diploma holder with extreme creativity and dedication to development. AI visionary with extensive experience in building agent-based systems and trading infrastructure.",
      image: "/images/clayton_christian.png",
    },
    {
      name: "Austin Belcheff",
      role: "Founder & CEO",
      bio: "Business graduate from Oklahoma State University and a creative force driving innovation within the company.",
      image: "/images/austin_belcheff.png",
    },
  ]

  // Core values
  const coreValues = [
    {
      title: "Innovation",
      description: "We constantly push the boundaries of what's possible with AI agent technology.",
      icon: <Zap className="h-6 w-6 text-[#0076FF]" />,
    },
    {
      title: "Accessibility",
      description: "We make advanced AI solutions accessible to businesses of all sizes.",
      icon: <Users className="h-6 w-6 text-[#0076FF]" />,
    },
    {
      title: "Transparency",
      description: "We believe in transparent, data-driven solutions with clear insights and measurable results.",
      icon: <Database className="h-6 w-6 text-[#0076FF]" />,
    },
    {
      title: "Excellence",
      description: "We strive for excellence in every aspect of our products and services.",
      icon: <Check className="h-6 w-6 text-[#0076FF]" />,
    },
  ]

  // Key milestones from the roadmap
  const keyMilestones = [
    {
      date: "February 28, 2025",
      title: "Databases Complete",
      description: "Core database infrastructure with bot_metric table implementation",
    },
    {
      date: "March 29, 2025",
      title: "AiGent® System Launch",
      description: "Release of our proprietary AI agent orchestration system",
    },
    {
      date: "April 11, 2025",
      title: "Lead Supervisor Orchestration Agent",
      description: "Deployment of our advanced AI orchestration capabilities",
    },
    {
      date: "April 24, 2025",
      title: "Industry Expansion",
      description: "Onboarding of new clients and industry partners",
    },
    {
      date: "May 9, 2025",
      title: "AiPex Launch",
      description: "Official launch of our AI Platform Exchange",
    },
    {
      date: "June 28, 2025",
      title: "Curve AI Official Launch",
      description: "Full public launch with stock market integration and real money accounts",
    },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <SkyBackground className="w-full py-16 md:py-24 bg-gradient-to-b from-[#1A365D] to-[#0076FF]">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white mb-6">
              About Curve AI Solutions
            </h1>
            <p className="max-w-[800px] mx-auto text-gray-100 md:text-xl mb-8">
              We're building the future of AI agent infrastructure to help businesses break away with no resistance
            </p>
          </div>
        </div>
      </SkyBackground>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1A365D] mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg mx-auto">
              <p>
                Curve AI Solutions was founded with a clear vision: to create AI agent infrastructure that transforms
                how businesses operate. We recognized that while large enterprises had access to sophisticated AI
                solutions, small and medium-sized businesses were being left behind in the AI revolution.
              </p>
              <p>
                Our journey began with a simple question: "How can we make advanced AI accessible to businesses of all
                sizes?" The answer was to build a comprehensive suite of AI agent tools that could be easily deployed,
                managed, and scaled without requiring extensive technical expertise or massive budgets.
              </p>
              <p>
                Today, we're on track to launch our groundbreaking AiGent® System in March 2025, followed by our AI
                Platform Exchange (AiPex) in May 2025. These solutions will empower businesses to orchestrate AI agents,
                manage databases efficiently, and access a marketplace of specialized AI solutions tailored to their
                specific needs.
              </p>
              <p>
                Based in Tulsa, Oklahoma, we're proud to be part of the growing tech ecosystem in the heartland of
                America, bringing cutting-edge AI solutions to businesses across the country and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold text-[#1A365D] mb-12 text-center">Our Products</h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <Card className="border-2 border-[#0076FF]/10 hover:border-[#0076FF] transition-all">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-[#0076FF]/10 flex items-center justify-center mb-4">
                  <Bot className="h-6 w-6 text-[#0076FF]" />
                </div>
                <CardTitle className="text-2xl">AiGent® System</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Our proprietary AI orchestration platform that includes databases, agent crew management, and a
                  message bus for seamless communication between AI components.
                </p>
                <h4 className="font-bold text-[#1A365D] mb-2">Key Features:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-[#0076FF] flex-shrink-0 mt-0.5 mr-2" />
                    <span>Lead Supervisor Orchestration Agent</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-[#0076FF] flex-shrink-0 mt-0.5 mr-2" />
                    <span>Agent Crew Management</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-[#0076FF] flex-shrink-0 mt-0.5 mr-2" />
                    <span>Message Bus for Inter-Agent Communication</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-[#0076FF] flex-shrink-0 mt-0.5 mr-2" />
                    <span>Advanced Database Integration</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Launch Date: March 29, 2025</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#0076FF]/10 hover:border-[#0076FF] transition-all">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-[#0076FF]/10 flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 text-[#0076FF]" />
                </div>
                <CardTitle className="text-2xl">AiPex Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Our AI Platform Exchange (AiPex) connects businesses with specialized AI solutions, creating a
                  marketplace for industry-specific tools and capabilities.
                </p>
                <h4 className="font-bold text-[#1A365D] mb-2">Key Features:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-[#0076FF] flex-shrink-0 mt-0.5 mr-2" />
                    <span>AI Solution Marketplace</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-[#0076FF] flex-shrink-0 mt-0.5 mr-2" />
                    <span>Real Money Trial Accounts</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-[#0076FF] flex-shrink-0 mt-0.5 mr-2" />
                    <span>Industry-Specific AI Tools</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-[#0076FF] flex-shrink-0 mt-0.5 mr-2" />
                    <span>Stock Market Integration</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Launch Date: May 9, 2025</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold text-[#1A365D] mb-12 text-center">Meet Our Team</h2>

          <div className="flex flex-wrap justify-center gap-16 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center max-w-xs">
                <div className="mb-4 relative mx-auto w-48 h-48 rounded-full overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#1A365D]">{member.name}</h3>
                <p className="text-[#0076FF] font-medium mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold text-[#1A365D] mb-12 text-center">Our Core Values</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {coreValues.map((value, index) => (
              <Card key={index} className="border-0 bg-white shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#0076FF]/10 flex items-center justify-center mx-auto mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#1A365D] mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold text-[#1A365D] mb-12 text-center">Our Roadmap</h2>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {keyMilestones.map((milestone, index) => (
                <div key={index} className="relative pl-8 sm:pl-32 py-4">
                  <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-12 before:h-full before:px-px before:bg-gray-300 before:ml-0.5 before:top-6 before:bottom-0">
                    <div className="absolute left-0 sm:left-10 top-6 flex items-center justify-center w-5 h-5 rounded-full bg-[#0076FF] border-4 border-white text-white">
                      <Calendar className="w-3 h-3" />
                    </div>
                    <div className="font-bold text-lg text-[#0076FF] w-32 hidden sm:block">{milestone.date}</div>
                    <div>
                      <div className="sm:hidden font-bold text-lg text-[#0076FF] mb-1">{milestone.date}</div>
                      <div className="text-xl font-bold text-gray-900">{milestone.title}</div>
                      <div className="text-gray-600">{milestone.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <SkyBackground className="py-16 bg-gradient-to-b from-[#1A365D] to-[#0076FF] text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">Join Our Journey</h2>
            <p className="mb-8 text-xl text-gray-100">
              Support our mission to transform businesses with AI agent infrastructure
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-[#FF7F00] hover:bg-[#FF7F00]/90 text-white" asChild>
                <Link href="/fundraising">
                  Support Our Campaign
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 text-white hover:bg-white/20 border-white/20"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </SkyBackground>
    </main>
  )
}
