"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Users, Target, Clock, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react"
import type { TopicPerformance } from "@/lib/database"

interface TopicDetailViewProps {
  topic: TopicPerformance
  onBack: () => void
  onStudentSelect?: (studentId: string) => void
}

export function TopicDetailView({ topic, onBack, onStudentSelect }: TopicDetailViewProps) {
  // Mock student data for this topic - in real app would come from database
  const topicStudents = [
    {
      student_id: "STU001",
      name: "Alice Johnson",
      group: "Physics A1",
      attempts: 8,
      correct: 6,
      success_rate: 75.0,
      avg_time: 165,
      status: "good",
    },
    {
      student_id: "STU002",
      name: "Bob Smith",
      group: "Physics A1",
      attempts: 12,
      correct: 4,
      success_rate: 33.3,
      avg_time: 285,
      status: "struggling",
    },
    {
      student_id: "STU003",
      name: "Charlie Brown",
      group: "Physics A1",
      attempts: 6,
      correct: 5,
      success_rate: 83.3,
      avg_time: 145,
      status: "excellent",
    },
    {
      student_id: "STU004",
      name: "Diana Prince",
      group: "Physics A2",
      attempts: 10,
      correct: 7,
      success_rate: 70.0,
      avg_time: 175,
      status: "good",
    },
    {
      student_id: "STU005",
      name: "Edward Norton",
      group: "Physics A2",
      attempts: 15,
      correct: 5,
      success_rate: 33.3,
      avg_time: 295,
      status: "struggling",
    },
    {
      student_id: "STU006",
      name: "Fiona Green",
      group: "Physics B1",
      attempts: 9,
      correct: 8,
      success_rate: 88.9,
      avg_time: 135,
      status: "excellent",
    },
    {
      student_id: "STU007",
      name: "George Wilson",
      group: "Physics B1",
      attempts: 7,
      correct: 3,
      success_rate: 42.9,
      avg_time: 245,
      status: "struggling",
    },
    {
      student_id: "STU008",
      name: "Hannah Davis",
      group: "Physics B2",
      attempts: 11,
      correct: 8,
      success_rate: 72.7,
      avg_time: 155,
      status: "good",
    },
  ]

  const strugglingStudents = topicStudents.filter((s) => s.success_rate < 50)
  const excellentStudents = topicStudents.filter((s) => s.success_rate >= 80)
  const averageStudents = topicStudents.filter((s) => s.success_rate >= 50 && s.success_rate < 80)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-emerald-600 dark:text-emerald-400"
      case "good":
        return "text-blue-600 dark:text-blue-400"
      case "struggling":
        return "text-rose-600 dark:text-rose-400"
      default:
        return "text-slate-600 dark:text-slate-400"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "excellent":
        return { variant: "default" as const, label: "Excellent" }
      case "good":
        return { variant: "secondary" as const, label: "Good" }
      case "struggling":
        return { variant: "destructive" as const, label: "Struggling" }
      default:
        return { variant: "outline" as const, label: "Average" }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Topics
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{topic.topic_name}</h2>
          {topic.subtopic && <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">{topic.subtopic}</p>}
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Detailed performance analysis and student breakdown
          </p>
        </div>
      </div>

      {/* Topic Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Total Attempts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{topic.total_attempts}</div>
            <p className="text-xs text-blue-600 dark:text-blue-400">Across all students</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
              {topic.success_rate.toFixed(1)}%
            </div>
            {topic.group_average && (
              <p className="text-xs text-purple-600 dark:text-purple-400">
                {topic.success_rate > topic.group_average ? "+" : ""}
                {(topic.success_rate - topic.group_average).toFixed(1)}% vs group avg
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-300 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Avg Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900 dark:text-amber-100">
              {Math.round(topic.avg_time_spent / 60)}m
            </div>
            <p className="text-xs text-amber-600 dark:text-amber-400">Per attempt</p>
          </CardContent>
        </Card>

        <Card className="bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-rose-700 dark:text-rose-300 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Struggling
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-900 dark:text-rose-100">{topic.struggling_students}</div>
            <p className="text-xs text-rose-600 dark:text-rose-400">Students need help</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Distribution */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Struggling Students */}
        <Card className="bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-rose-900 dark:text-rose-100 flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-rose-600" />
              Struggling Students ({strugglingStudents.length})
            </CardTitle>
            <CardDescription className="text-rose-700 dark:text-rose-300">
              Below 50% success rate - Need immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {strugglingStudents.map((student) => (
                <div
                  key={student.student_id}
                  className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-rose-200 dark:border-rose-700 cursor-pointer hover:shadow-sm transition-all"
                  onClick={() => onStudentSelect?.(student.student_id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">{student.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{student.group}</div>
                    </div>
                    <Badge variant="destructive" className="text-xs">
                      {student.success_rate.toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                    <span>
                      {student.correct}/{student.attempts} correct
                    </span>
                    <span>{Math.round(student.avg_time / 60)}m avg</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Average Students */}
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-blue-900 dark:text-blue-100 flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Good Performance ({averageStudents.length})
            </CardTitle>
            <CardDescription className="text-blue-700 dark:text-blue-300">
              50-80% success rate - On track
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {averageStudents.slice(0, 4).map((student) => (
                <div
                  key={student.student_id}
                  className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-blue-200 dark:border-blue-700 cursor-pointer hover:shadow-sm transition-all"
                  onClick={() => onStudentSelect?.(student.student_id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">{student.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{student.group}</div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {student.success_rate.toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                    <span>
                      {student.correct}/{student.attempts} correct
                    </span>
                    <span>{Math.round(student.avg_time / 60)}m avg</span>
                  </div>
                </div>
              ))}
              {averageStudents.length > 4 && (
                <div className="text-center text-xs text-slate-500 dark:text-slate-400">
                  +{averageStudents.length - 4} more students
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Excellent Students */}
        <Card className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              Excellent Performance ({excellentStudents.length})
            </CardTitle>
            <CardDescription className="text-emerald-700 dark:text-emerald-300">
              80%+ success rate - Mastering the topic
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {excellentStudents.map((student) => (
                <div
                  key={student.student_id}
                  className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-emerald-200 dark:border-emerald-700 cursor-pointer hover:shadow-sm transition-all"
                  onClick={() => onStudentSelect?.(student.student_id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">{student.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{student.group}</div>
                    </div>
                    <Badge variant="default" className="text-xs">
                      {student.success_rate.toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                    <span>
                      {student.correct}/{student.attempts} correct
                    </span>
                    <span>{Math.round(student.avg_time / 60)}m avg</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
