"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { submitAssessment } from "@/app/actions/assessment-actions"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

interface Question {
  id: number
  question_text: string
  category: string
  weight: number
}

interface AssessmentFormProps {
  questions: Question[]
  userId: number
}

export function AssessmentForm({ questions, userId }: AssessmentFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeCategory, setActiveCategory] = useState("")
  const [progress, setProgress] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})

  // Group questions by category
  const questionsByCategory: Record<string, Question[]> = {}
  const categories: string[] = []

  questions.forEach((question) => {
    if (!questionsByCategory[question.category]) {
      questionsByCategory[question.category] = []
      categories.push(question.category)
    }
    questionsByCategory[question.category].push(question)
  })

  // Set initial active category
  if (categories.length > 0 && activeCategory === "") {
    setActiveCategory(categories[0])
  }

  const handleSubmit = async (formData: FormData) => {
    try {
      setIsSubmitting(true)
      await submitAssessment(formData)
    } catch (error) {
      console.error("Error submitting assessment:", error)
      toast({
        title: "Error",
        description: "There was a problem submitting your assessment. Please try again.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))

    // Calculate progress
    const totalQuestions = questions.length
    const answeredQuestions = Object.keys(answers).length + (answers[questionId] ? 0 : 1)
    setProgress(Math.round((answeredQuestions / totalQuestions) * 100))
  }

  return (
    <form action={handleSubmit} className="space-y-8">
      <input type="hidden" name="userId" value={userId} />

      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1">
          <Progress value={progress} className="h-2" />
        </div>
        <div className="text-sm font-medium">{progress}% Complete</div>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mb-8">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="text-xs md:text-sm">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <Card className="border-2 border-[#0076FF]/10">
              <CardHeader className="bg-gradient-to-r from-[#0076FF]/10 to-transparent">
                <CardTitle className="text-xl text-[#1A365D]">{category}</CardTitle>
                <CardDescription>
                  Please answer all questions in this section to the best of your ability.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {questionsByCategory[category].map((question) => (
                  <div key={question.id} className="space-y-2">
                    <label htmlFor={`question_${question.id}`} className="block font-medium text-[#1A365D]">
                      {question.question_text}
                    </label>
                    <Textarea
                      id={`question_${question.id}`}
                      name={`question_${question.id}`}
                      placeholder="Your answer"
                      className="min-h-[100px]"
                      required
                      value={answers[question.id] || ""}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            const currentIndex = categories.indexOf(activeCategory)
            if (currentIndex > 0) {
              setActiveCategory(categories[currentIndex - 1])
            }
          }}
          disabled={categories.indexOf(activeCategory) === 0}
        >
          Previous Section
        </Button>

        {categories.indexOf(activeCategory) < categories.length - 1 ? (
          <Button
            type="button"
            onClick={() => {
              const currentIndex = categories.indexOf(activeCategory)
              if (currentIndex < categories.length - 1) {
                setActiveCategory(categories[currentIndex + 1])
              }
            }}
          >
            Next Section
          </Button>
        ) : (
          <Button type="submit" className="bg-[#0076FF] hover:bg-[#0076FF]/90 text-white" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Assessment"}
          </Button>
        )}
      </div>
    </form>
  )
}
