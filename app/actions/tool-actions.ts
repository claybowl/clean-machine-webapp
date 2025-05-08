"use server"

import { sql } from "@/lib/db"

// Mock tools data (replace with actual data source later)
const mockTools = [
  { id: 1, name: "AgentPro", description: "AI Agent Development Tool" },
  { id: 2, name: "DataViz360", description: "Data Visualization Suite" },
  { id: 3, name: "TradeMasterAI", description: "Trading System Tool" },
  { id: 4, name: "n8nAI", description: "n8n Integration Tool" },
  { id: 5, name: "LowCodeAI", description: "Low-Code AI Development Tool" },
  { id: 6, name: "AntiGravityAI", description: "Anti-Gravity Framework Component" },
  { id: 7, name: "AIGovernance", description: "AI Governance and Transparency Tool" },
  { id: 8, name: "IndustryAI", description: "Specialized Industry Solution" },
]

// Get all AI tools
export async function getAllTools() {
  // Use tagged template literal syntax
  const tools = await sql`
    SELECT * FROM ai_tools 
    WHERE is_active = true 
    ORDER BY name
  `
  return tools
}

// Get tools by category (based on name patterns)
export async function getToolsByCategory() {
  const allTools = await getAllTools()

  // Define categories and their identifying keywords
  const categories = [
    {
      id: "agent-development",
      name: "AI Agent Development Tools",
      description: "Build, deploy, and manage intelligent autonomous agents for your business.",
      pattern: ["Agent", "Decision Engine"],
      color: "bg-blue-500",
      icon: "Bot",
    },
    {
      id: "data-visualization",
      name: "Data Visualization Suite",
      description: "Transform complex data into actionable insights with our advanced visualization tools.",
      pattern: ["DataLens", "VizFlow", "InsightBoard", "Narrative"],
      color: "bg-purple-500",
      icon: "BarChart",
    },
    {
      id: "trading-systems",
      name: "Trading System Tools",
      description: "Optimize trading strategies with AI-powered analysis and execution tools.",
      pattern: ["Trade", "Market", "Strategy"],
      color: "bg-green-500",
      icon: "LineChart",
    },
    {
      id: "n8n-integration",
      name: "n8n Integration Tools",
      description: "Seamlessly integrate AI capabilities into your n8n workflows.",
      pattern: ["n8n"],
      color: "bg-orange-500",
      icon: "Workflow",
    },
    {
      id: "low-code",
      name: "Low-Code AI Development Tools",
      description: "Create sophisticated AI solutions without extensive coding knowledge.",
      pattern: ["Canvas", "Composer", "AutoAI", "BusinessLogic"],
      color: "bg-teal-500",
      icon: "Code",
    },
    {
      id: "anti-gravity",
      name: "Anti-Gravity Framework Components",
      description: "Reduce business friction and accelerate processes with our proprietary framework.",
      pattern: ["Friction", "Orchestrator", "Gravity", "Accelerator"],
      color: "bg-red-500",
      icon: "Zap",
    },
    {
      id: "governance",
      name: "AI Governance and Transparency",
      description: "Ensure your AI systems are explainable, fair, and compliant with regulations.",
      pattern: ["Transparency", "Bias", "Compliance", "Trust"],
      color: "bg-indigo-500",
      icon: "Shield",
    },
    {
      id: "industry-solutions",
      name: "Specialized Industry Solutions",
      description: "Industry-specific AI solutions tailored to your unique business challenges.",
      pattern: ["Finance", "Supply", "Customer", "Healthcare"],
      color: "bg-amber-500",
      icon: "Building",
    },
  ]

  // Categorize tools
  const toolsByCategory = categories.map((category) => {
    const tools = allTools.filter((tool) => {
      return category.pattern.some((pattern) => tool.name.includes(pattern))
    })

    return {
      ...category,
      tools,
    }
  })

  return toolsByCategory
}

// Get tool by ID
export async function getToolById(id: string) {
  try {
    // Special case for 'prompts' which is a static page, not a dynamic tool
    if (id === "prompts") {
      return null
    }

    // For numeric IDs, try to fetch the tool
    const numericId = Number.parseInt(id, 10)
    if (isNaN(numericId)) {
      return null
    }

    // Simulate database query
    const tool = mockTools.find((tool) => tool.id === numericId)
    return tool || null
  } catch (error) {
    console.error("Error fetching tool by ID:", error)
    return null
  }
}

// Get recommended tools based on assessment results
export async function getRecommendedTools(assessmentId: number) {
  // Use tagged template literal syntax
  const tools = await sql`
    SELECT * FROM ai_tools 
    WHERE is_active = true 
    ORDER BY RANDOM() 
    LIMIT 3
  `

  return tools
}
