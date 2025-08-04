"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { Users, TrendingUp, Target, Award, AlertTriangle, Eye, ChevronRight } from "lucide-react"

interface GroupOverviewProps {
  students?: any[]
  groups?: any[]
  topics?: any[]
  recentActivity?: any[]
  onStudentSelect?: (studentId: string) => void
  onGroupSelect?: (groupId: string) => void
  onTopicSelect?: (topicId: string) => void
}

export function GroupOverview({
  students = [],
  groups = [],
  topics = [],
  recentActivity = [],
  onStudentSelect,
  onGroupSelect,
  onTopicSelect,
}: GroupOverviewProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 500)
  }, [])

  // Mock data for demonstration
  const totalStudents = 115
  const activeStudents = 106
  const totalAttempts = 6657
  const successRate = 73.4

  // Sample data for charts
  const questionAttemptsData = [
    { date: "Jan 1", attempts: 45, classAvg: 42 },
    { date: "Jan 2", attempts: 52, classAvg: 48 },
    { date: "Jan 3", attempts: 48, classAvg: 45 },
    { date: "Jan 4", attempts: 61, classAvg: 55 },
    { date: "Jan 5", attempts: 55, classAvg: 52 },
    { date: "Jan 6", attempts: 67, classAvg: 58 },
    { date: "Jan 7", attempts: 59, classAvg: 56 },
    { date: "Jan 8", attempts: 73, classAvg: 65 },
    { date: "Jan 9", attempts: 69, classAvg: 62 },
    { date: "Jan 10", attempts: 78, classAvg: 68 },
  ]

  const successRateData = [
    { date: "Jan 1", rate: 71.2, classAvg: 69.5 },
    { date: "Jan 2", rate: 73.8, classAvg: 71.2 },
    { date: "Jan 3", rate: 72.1, classAvg: 70.8 },
    { date: "Jan 4", rate: 75.4, classAvg: 73.1 },
    { date: "Jan 5", rate: 74.2, classAvg: 72.6 },
    { date: "Jan 6", rate: 76.8, classAvg: 74.3 },
    { date: "Jan 7", rate: 75.1, classAvg: 73.8 },
    { date: "Jan 8", rate: 77.9, classAvg: 75.2 },
    { date: "Jan 9", rate: 76.3, classAvg: 74.7 },
    { date: "Jan 10", rate: 78.5, classAvg: 76.1 },
  ]

  // Mock class groups data
  const classGroups = [
    { name: "Physics A1", students: 28, avgScore: 78.2, trend: "up", color: "blue" },
    { name: "Physics A2", students: 26, avgScore: 74.8, trend: "up", color: "green" },
    { name: "Physics B1", students: 31, avgScore: 71.3, trend: "down", color: "orange" },
    { name: "Physics B2", students: 30, avgScore: 69.7, trend: "stable", color: "purple" },
  ]

  // Mock struggling topics
  const strugglingTopics = [
    { name: "Quantum Mechanics", score: 45.2, students: 23, trend: "down" },
    { name: "Electromagnetic Fields", score: 52.8, students: 18, trend: "down" },
    { name: "Nuclear Physics", score: 58.1, students: 15, trend: "stable" },
  ]

  // Mock top students
  const topStudents = [
    { name: "Alice Johnson", group: "Physics A1", score: 94.2, trend: "up" },
    { name: "Charlie Brown", group: "Physics A2", score: 91.8, trend: "up" },
    { name: "Diana Prince", group: "Physics B1", score: 89.5, trend: "stable" },
    { name: "Edward Norton", group: "Physics A1", score: 87.3, trend: "up" },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        {/* KPI Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Students</p>
                <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{totalStudents}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Active Students</p>
                <p className="text-3xl font-bold text-green-700 dark:text-green-300">{activeStudents}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Total Attempts</p>
                <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">
                  {totalAttempts.toLocaleString()}
                </p>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Success Rate</p>
                <p className="text-3xl font-bold text-orange-700 dark:text-orange-300">{successRate}%</p>
              </div>
              <Award className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Question Attempts Chart */}
        <Card className="bg-slate-900 dark:bg-slate-800 text-white">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white text-lg">Question Attempts</CardTitle>
                <p className="text-slate-400 text-sm">Daily question attempts across all students</p>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">+12.3%</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <div className="text-2xl font-bold text-white">256</div>
              <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                <Eye className="h-3 w-3 mr-1" />
                Last 30 Days
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                attempts: {
                  label: "Attempts",
                  color: "#8b5cf6",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={questionAttemptsData}>
                  <defs>
                    <linearGradient id="attemptsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <Area
                    type="monotone"
                    dataKey="attempts"
                    stroke="#8b5cf6"
                    fillOpacity={1}
                    fill="url(#attemptsGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Success Rate Trend Chart */}
        <Card className="bg-slate-900 dark:bg-slate-800 text-white">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white text-lg">Success Rate Trend</CardTitle>
                <p className="text-slate-400 text-sm">Overall percentage correct over time</p>
              </div>
              <div className="flex items-center gap-2 text-red-400">
                <TrendingUp className="h-4 w-4 rotate-180" />
                <span className="text-sm font-medium">-2.1%</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <div className="text-2xl font-bold text-white">74.0%</div>
              <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                <Eye className="h-3 w-3 mr-1" />
                Last 30 Days
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                rate: {
                  label: "Success Rate",
                  color: "#f59e0b",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={successRateData}>
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 4, fill: "#f59e0b" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Class Groups */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Class Groups
            </CardTitle>
            <p className="text-sm text-muted-foreground">Performance by class group</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {classGroups.map((group) => (
                <div
                  key={group.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
                  onClick={() => onGroupSelect?.(group.name)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full bg-${group.color}-500`}></div>
                    <div>
                      <div className="font-medium">{group.name}</div>
                      <div className="text-sm text-muted-foreground">{group.students} students</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{group.avgScore}%</span>
                    {group.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                    {group.trend === "down" && <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />}
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Topics Needing Attention */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Topics Needing Attention
            </CardTitle>
            <p className="text-sm text-muted-foreground">Areas where students are struggling</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {strugglingTopics.map((topic, index) => (
                <div
                  key={topic.name}
                  className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 cursor-pointer hover:shadow-sm transition-all"
                  onClick={() => onTopicSelect?.(topic.name)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="destructive" className="text-xs">
                      Rank #{index + 1}
                    </Badge>
                    <span className="font-bold text-red-600 dark:text-red-400">{topic.score}%</span>
                  </div>
                  <div className="font-medium text-red-900 dark:text-red-100 mb-1">{topic.name}</div>
                  <div className="text-sm text-red-600 dark:text-red-400">{topic.students} students struggling</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Students */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              Top Students
            </CardTitle>
            <p className="text-sm text-muted-foreground">Highest performing students</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topStudents.map((student, index) => (
                <div
                  key={student.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 cursor-pointer hover:shadow-sm transition-all"
                  onClick={() => onStudentSelect?.(student.name)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">
                      #{index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-green-900 dark:text-green-100">{student.name}</div>
                      <div className="text-sm text-green-600 dark:text-green-400">{student.group}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-green-600 dark:text-green-400">{student.score}%</span>
                    {student.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
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
