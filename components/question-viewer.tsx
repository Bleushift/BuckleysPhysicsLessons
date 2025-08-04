"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, TrendingUp, TrendingDown, Users, Target } from "lucide-react"
import type { TopicPerformance } from "@/lib/database"

interface QuestionViewerProps {
  topic: TopicPerformance
  onBack: () => void
}

interface QuestionData {
  id: string
  title: string
  difficulty: number
  success_rate: number
  attempts: number
  struggling_students: string[]
  excelling_students: string[]
  isaac_url: string
}

export function QuestionViewer({ topic, onBack }: QuestionViewerProps) {
  // Mock question data - in real app, this would come from the database
  const questions: QuestionData[] = [
    {
      id: "Q001",
      title: "Newton's First Law Application",
      difficulty: 2,
      success_rate: 35.2,
      attempts: 45,
      struggling_students: ["Alice Johnson", "Bob Smith", "Charlie Brown"],
      excelling_students: ["Diana Prince", "Edward Norton"],
      isaac_url: "https://isaacphysics.org/questions/dynamics_1",
    },
    {
      id: "Q002",
      title: "Force Diagrams and Equilibrium",
      difficulty: 3,
      success_rate: 28.7,
      attempts: 38,
      struggling_students: ["Alice Johnson", "Charlie Brown", "Fiona Green"],
      excelling_students: ["Diana Prince"],
      isaac_url: "https://isaacphysics.org/questions/dynamics_2",
    },
    {
      id: "Q003",
      title: "Calculating Net Force",
      difficulty: 1,
      success_rate: 62.1,
      attempts: 29,
      struggling_students: ["Bob Smith"],
      excelling_students: ["Diana Prince", "Edward Norton", "Fiona Green"],
      isaac_url: "https://isaacphysics.org/questions/dynamics_3",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Overview
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{topic.topic_name}</h2>
          {topic.subtopic && <p className="text-slate-600 font-medium">{topic.subtopic}</p>}
          <p className="text-sm text-slate-500">
            {topic.total_attempts} total attempts • {topic.success_rate.toFixed(1)}% success rate
          </p>
        </div>
      </div>

      {/* Questions Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {questions.map((question) => (
          <Card key={question.id} className="dashboard-card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-slate-900">{question.title}</CardTitle>
                  <CardDescription className="text-slate-600 font-medium">
                    Question ID: {question.id} • Difficulty: {question.difficulty}/5
                  </CardDescription>
                </div>
                <Badge variant={question.success_rate >= 60 ? "default" : "destructive"} className="text-xs">
                  {question.success_rate.toFixed(1)}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Isaac Physics iframe */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-slate-700">Isaac Physics Question</span>
                  <Button size="sm" variant="outline" asChild>
                    <a href={question.isaac_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Open
                    </a>
                  </Button>
                </div>
                <div className="bg-white border border-slate-200 rounded h-48 flex items-center justify-center text-slate-500">
                  <div className="text-center">
                    <div className="text-sm font-medium">Isaac Physics Question Preview</div>
                    <div className="text-xs text-slate-400 mt-1">Click "Open" to view full question</div>
                  </div>
                </div>
              </div>

              {/* Performance Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="h-4 w-4 text-slate-500" />
                    <span className="text-sm font-medium text-slate-700">Attempts</span>
                  </div>
                  <div className="text-xl font-bold text-slate-900">{question.attempts}</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="h-4 w-4 text-slate-500" />
                    <span className="text-sm font-medium text-slate-700">Struggling</span>
                  </div>
                  <div className="text-xl font-bold text-rose-600">{question.struggling_students.length}</div>
                </div>
              </div>

              {/* Student Lists */}
              <div className="grid grid-cols-2 gap-4">
                {/* Struggling Students */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1">
                    <TrendingDown className="h-3 w-3 text-rose-500" />
                    Struggling Students
                  </h4>
                  <div className="space-y-1">
                    {question.struggling_students.slice(0, 3).map((student, index) => (
                      <div
                        key={index}
                        className="text-xs bg-rose-50 text-rose-700 px-2 py-1 rounded cursor-pointer hover:bg-rose-100 transition-colors"
                      >
                        {student}
                      </div>
                    ))}
                    {question.struggling_students.length > 3 && (
                      <div className="text-xs text-slate-500">+{question.struggling_students.length - 3} more</div>
                    )}
                  </div>
                </div>

                {/* Excelling Students */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-emerald-500" />
                    Excelling Students
                  </h4>
                  <div className="space-y-1">
                    {question.excelling_students.slice(0, 3).map((student, index) => (
                      <div
                        key={index}
                        className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded cursor-pointer hover:bg-emerald-100 transition-colors"
                      >
                        {student}
                      </div>
                    ))}
                    {question.excelling_students.length > 3 && (
                      <div className="text-xs text-slate-500">+{question.excelling_students.length - 3} more</div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
