"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ArrowLeft, TrendingUp, TrendingDown, Target, BookOpen, AlertTriangle } from "lucide-react"
import { getStudentDetails } from "@/app/actions"

interface StudentDetailProps {
  studentId: string
  onBack: () => void
}

export function StudentDetail({ studentId, onBack }: StudentDetailProps) {
  const [studentData, setStudentData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStudentData()
  }, [studentId])

  const loadStudentData = async () => {
    setLoading(true)
    try {
      const result = await getStudentDetails(studentId)
      if (result.success) {
        setStudentData(result.data)
      }
    } catch (error) {
      console.error("Failed to load student data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading student details...</p>
        </div>
      </div>
    )
  }

  if (!studentData) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Student data not found</p>
        <Button onClick={onBack} className="mt-4">
          Go Back
        </Button>
      </div>
    )
  }

  // Mock activity timeline data
  const activityData = [
    { date: "Jan 1", attempts: 5, correct: 3 },
    { date: "Jan 2", attempts: 8, correct: 6 },
    { date: "Jan 3", attempts: 6, correct: 4 },
    { date: "Jan 4", attempts: 9, correct: 7 },
    { date: "Jan 5", attempts: 7, correct: 5 },
    { date: "Jan 6", attempts: 11, correct: 8 },
    { date: "Jan 7", attempts: 6, correct: 4 },
  ]

  // Mock topic performance data
  const topicPerformance = [
    { topic: "Mechanics", score: 85, attempts: 45, trend: "up" },
    { topic: "Thermal", score: 78, attempts: 32, trend: "up" },
    { topic: "Waves", score: 72, attempts: 28, trend: "stable" },
    { topic: "Materials", score: 68, attempts: 24, trend: "down" },
    { topic: "Circuits", score: 82, attempts: 38, trend: "up" },
    { topic: "Fields", score: 65, attempts: 22, trend: "down" },
    { topic: "Quantum", score: 45, attempts: 18, trend: "down" },
    { topic: "Nuclear", score: 52, attempts: 15, trend: "stable" },
  ]

  // Mock struggling topics
  const strugglingTopics = [
    { topic: "Quantum Mechanics", score: 45, questions: 8, lastAttempt: "2 days ago" },
    { topic: "Nuclear Physics", score: 52, questions: 6, lastAttempt: "1 day ago" },
    { topic: "Electromagnetic Fields", score: 65, questions: 12, lastAttempt: "3 hours ago" },
  ]

  const totalAttempts = studentData.totalAttempts || 247
  const successRate = studentData.successRate || 68
  const topicsCovered = 8
  const strugglingAreas = strugglingTopics.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{studentData.name}</h1>
          <p className="text-muted-foreground">
            {studentData.group} • Student ID: {studentId}
          </p>
        </div>
      </div>

      {/* Color-Coded Stats Cards - 4 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Attempts - Blue */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                  <Target className="h-4 w-4 text-white" />
                </div>
                <div className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Attempts</div>
              </div>
            </div>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{totalAttempts}</div>
            <div className="text-xs text-blue-600 dark:text-blue-400">Questions attempted</div>
          </CardContent>
        </Card>

        {/* Success Rate - Green/Red based on performance */}
        <Card
          className={`bg-gradient-to-br ${
            successRate >= 70
              ? "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700"
              : "from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700"
          }`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-lg ${
                    successRate >= 70 ? "bg-green-500" : "bg-orange-500"
                  } flex items-center justify-center`}
                >
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <div
                  className={`text-sm font-medium ${
                    successRate >= 70 ? "text-green-700 dark:text-green-300" : "text-orange-700 dark:text-orange-300"
                  }`}
                >
                  Success Rate
                </div>
              </div>
            </div>
            <div
              className={`text-2xl font-bold ${
                successRate >= 70 ? "text-green-900 dark:text-green-100" : "text-orange-900 dark:text-orange-100"
              }`}
            >
              {successRate}%
            </div>
            <div
              className={`text-xs ${
                successRate >= 70 ? "text-green-600 dark:text-green-400" : "text-orange-600 dark:text-orange-400"
              }`}
            >
              Overall performance
            </div>
          </CardContent>
        </Card>

        {/* Topics Covered - Purple */}
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                <div className="text-sm font-medium text-purple-700 dark:text-purple-300">Topics Covered</div>
              </div>
            </div>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">{topicsCovered}</div>
            <div className="text-xs text-purple-600 dark:text-purple-400">Different topics</div>
          </CardContent>
        </Card>

        {/* Struggling Areas - Red/Green based on count */}
        <Card
          className={`bg-gradient-to-br ${
            strugglingAreas > 0
              ? "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-700"
              : "from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-emerald-200 dark:border-emerald-700"
          }`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-lg ${
                    strugglingAreas > 0 ? "bg-red-500" : "bg-emerald-500"
                  } flex items-center justify-center`}
                >
                  <AlertTriangle className="h-4 w-4 text-white" />
                </div>
                <div
                  className={`text-sm font-medium ${
                    strugglingAreas > 0 ? "text-red-700 dark:text-red-300" : "text-emerald-700 dark:text-emerald-300"
                  }`}
                >
                  Struggling Areas
                </div>
              </div>
            </div>
            <div
              className={`text-2xl font-bold ${
                strugglingAreas > 0 ? "text-red-900 dark:text-red-100" : "text-emerald-900 dark:text-emerald-100"
              }`}
            >
              {strugglingAreas}
            </div>
            <div
              className={`text-xs ${
                strugglingAreas > 0 ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"
              }`}
            >
              {strugglingAreas > 0 ? "Need attention" : "All good!"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content - Side by Side Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Timeline - Takes 2/3 of the width */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline (Last 30 Days)</CardTitle>
              <p className="text-sm text-muted-foreground">Daily attempts with class average comparison</p>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  attempts: {
                    label: "Attempts",
                    color: "hsl(var(--chart-1))",
                  },
                  correct: {
                    label: "Correct",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activityData}>
                    <defs>
                      <linearGradient id="attemptsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="attempts"
                      stroke="hsl(var(--chart-1))"
                      fillOpacity={1}
                      fill="url(#attemptsGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Topic Performance - Takes 1/3 of the width */}
        <div className="lg:col-span-1">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Topic Performance</CardTitle>
              <p className="text-sm text-muted-foreground">Performance across physics topics</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[300px] overflow-y-auto">
                {topicPerformance.map((topic) => (
                  <div key={topic.topic} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{topic.topic}</span>
                        {topic.trend === "up" && <TrendingUp className="h-3 w-3 text-green-600" />}
                        {topic.trend === "down" && <TrendingDown className="h-3 w-3 text-red-600" />}
                      </div>
                      <span className="text-sm font-bold">{topic.score}%</span>
                    </div>
                    <Progress value={topic.score} className="h-2" />
                    <div className="text-xs text-muted-foreground">{topic.attempts} attempts</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Struggling Topics - Full Width */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-red-600" />
            Topics Needing Attention
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Areas where the student is struggling and needs additional support
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {strugglingTopics.map((topic, index) => (
              <div
                key={topic.topic}
                className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800"
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="destructive" className="text-xs">
                    Rank #{index + 1}
                  </Badge>
                  <span className="text-lg font-bold text-red-600 dark:text-red-400">{topic.score}%</span>
                </div>
                <h3 className="font-semibold text-red-900 dark:text-red-100 mb-1">{topic.topic}</h3>
                <div className="text-sm text-red-600 dark:text-red-400 space-y-1">
                  <div>{topic.questions} questions attempted</div>
                  <div>Last attempt: {topic.lastAttempt}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
