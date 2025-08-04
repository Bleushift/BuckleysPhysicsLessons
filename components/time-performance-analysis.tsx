"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, TrendingUp, TrendingDown, Target } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface TimePerformanceAnalysisProps {
  groupName?: string
  topicName?: string
}

export function TimePerformanceAnalysis({ groupName, topicName }: TimePerformanceAnalysisProps) {
  const [timeRange, setTimeRange] = useState("30days")
  const [granularity, setGranularity] = useState("daily")

  // Mock time-based performance data
  const getTimeData = () => {
    const baseData = {
      "7days": [
        { date: "Mon", attempts: 45, success_rate: 68.9, avg_time: 185, active_students: 18 },
        { date: "Tue", attempts: 52, success_rate: 71.2, avg_time: 178, active_students: 22 },
        { date: "Wed", attempts: 38, success_rate: 69.4, avg_time: 192, active_students: 16 },
        { date: "Thu", attempts: 61, success_rate: 73.8, avg_time: 171, active_students: 24 },
        { date: "Fri", attempts: 47, success_rate: 70.6, avg_time: 183, active_students: 19 },
        { date: "Sat", attempts: 23, success_rate: 65.2, avg_time: 201, active_students: 12 },
        { date: "Sun", attempts: 31, success_rate: 67.7, avg_time: 195, active_students: 15 },
      ],
      "30days": Array.from({ length: 30 }, (_, i) => ({
        date: `Day ${i + 1}`,
        attempts: Math.floor(Math.random() * 40) + 30,
        success_rate: Math.random() * 20 + 60,
        avg_time: Math.floor(Math.random() * 60) + 150,
        active_students: Math.floor(Math.random() * 15) + 10,
      })),
      "90days": Array.from({ length: 90 }, (_, i) => ({
        date: `Day ${i + 1}`,
        attempts: Math.floor(Math.random() * 50) + 25,
        success_rate: Math.random() * 25 + 55,
        avg_time: Math.floor(Math.random() * 80) + 140,
        active_students: Math.floor(Math.random() * 20) + 8,
      })),
    }
    return baseData[timeRange as keyof typeof baseData] || baseData["30days"]
  }

  const timeData = getTimeData()

  // Calculate performance metrics
  const calculateMetrics = () => {
    const totalAttempts = timeData.reduce((sum, day) => sum + day.attempts, 0)
    const avgSuccessRate = timeData.reduce((sum, day) => sum + day.success_rate, 0) / timeData.length
    const avgTime = timeData.reduce((sum, day) => sum + day.avg_time, 0) / timeData.length
    const peakDay = timeData.reduce((max, day) => (day.attempts > max.attempts ? day : max))

    // Calculate trend
    const firstHalf = timeData.slice(0, Math.floor(timeData.length / 2))
    const secondHalf = timeData.slice(Math.floor(timeData.length / 2))
    const firstHalfAvg = firstHalf.reduce((sum, day) => sum + day.success_rate, 0) / firstHalf.length
    const secondHalfAvg = secondHalf.reduce((sum, day) => sum + day.success_rate, 0) / secondHalf.length
    const trend = secondHalfAvg - firstHalfAvg

    return {
      totalAttempts,
      avgSuccessRate,
      avgTime,
      peakDay,
      trend,
    }
  }

  const metrics = calculateMetrics()

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-slate-500" />
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">7 Days</SelectItem>
              <SelectItem value="30days">30 Days</SelectItem>
              <SelectItem value="90days">90 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-slate-500" />
          <Select value={granularity} onValueChange={setGranularity}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hourly">Hourly</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Total Attempts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              {metrics.totalAttempts.toLocaleString()}
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400">Over {timeRange}</p>
          </CardContent>
        </Card>

        <Card className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Avg Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
              {metrics.avgSuccessRate.toFixed(1)}%
            </div>
            <div className="flex items-center gap-1 mt-1">
              {metrics.trend > 0 ? (
                <TrendingUp className="h-3 w-3 text-emerald-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-rose-500" />
              )}
              <span className={`text-xs ${metrics.trend > 0 ? "text-emerald-600" : "text-rose-600"}`}>
                {metrics.trend > 0 ? "+" : ""}
                {metrics.trend.toFixed(1)}%
              </span>
            </div>
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
              {Math.round(metrics.avgTime / 60)}m
            </div>
            <p className="text-xs text-amber-600 dark:text-amber-400">Per attempt</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Peak Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">{metrics.peakDay.attempts}</div>
            <p className="text-xs text-purple-600 dark:text-purple-400">On {metrics.peakDay.date}</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Over Time Chart */}
      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Performance Trends Over Time
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            Success rate and attempt volume trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              success_rate: { label: "Success Rate (%)", color: "#10b981" },
              attempts: { label: "Attempts", color: "#3b82f6" },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-600" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="success_rate"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 3 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="attempts"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Activity Heatmap */}
      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Activity Distribution
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            Student engagement patterns over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              active_students: { label: "Active Students", color: "#8b5cf6" },
              avg_time: { label: "Avg Time (min)", color: "#f59e0b" },
            }}
            className="h-[250px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-600" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="active_students"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorStudents)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
