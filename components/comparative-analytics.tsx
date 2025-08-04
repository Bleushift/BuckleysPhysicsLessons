"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, TrendingUp, TrendingDown, Users, Calendar, BarChart3 } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { GroupStats, TopicPerformance } from "@/lib/database"

interface ComparativeAnalyticsProps {
  groupStats: GroupStats[]
  topicPerformance: TopicPerformance[]
  onBack: () => void
}

export function ComparativeAnalytics({ groupStats, topicPerformance, onBack }: ComparativeAnalyticsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("3months")
  const [selectedGroups, setSelectedGroups] = useState<string[]>(["all"])
  const [comparisonType, setComparisonType] = useState("groups")

  // Mock historical data for different time periods
  const getHistoricalData = (period: string) => {
    const baseData = {
      "1month": [
        {
          period: "Week 1",
          "Physics A1": 68.2,
          "Physics A2": 64.5,
          "Physics B1": 71.8,
          "Physics B2": 66.1,
          "Physics Advanced": 78.9,
        },
        {
          period: "Week 2",
          "Physics A1": 70.1,
          "Physics A2": 66.2,
          "Physics B1": 73.2,
          "Physics B2": 67.8,
          "Physics Advanced": 80.1,
        },
        {
          period: "Week 3",
          "Physics A1": 71.8,
          "Physics A2": 67.1,
          "Physics B1": 74.9,
          "Physics B2": 68.9,
          "Physics Advanced": 80.8,
        },
        {
          period: "Week 4",
          "Physics A1": 72.5,
          "Physics A2": 68.1,
          "Physics B1": 75.8,
          "Physics B2": 69.4,
          "Physics Advanced": 81.2,
        },
      ],
      "3months": [
        {
          period: "Jan",
          "Physics A1": 65.2,
          "Physics A2": 61.8,
          "Physics B1": 68.9,
          "Physics B2": 63.4,
          "Physics Advanced": 75.6,
        },
        {
          period: "Feb",
          "Physics A1": 68.9,
          "Physics A2": 64.7,
          "Physics B1": 72.1,
          "Physics B2": 66.2,
          "Physics Advanced": 78.4,
        },
        {
          period: "Mar",
          "Physics A1": 72.5,
          "Physics A2": 68.1,
          "Physics B1": 75.8,
          "Physics B2": 69.4,
          "Physics Advanced": 81.2,
        },
      ],
      "6months": [
        {
          period: "Oct",
          "Physics A1": 58.4,
          "Physics A2": 55.2,
          "Physics B1": 61.7,
          "Physics B2": 57.8,
          "Physics Advanced": 69.3,
        },
        {
          period: "Nov",
          "Physics A1": 61.8,
          "Physics A2": 58.6,
          "Physics B1": 65.2,
          "Physics B2": 60.4,
          "Physics Advanced": 72.1,
        },
        {
          period: "Dec",
          "Physics A1": 63.7,
          "Physics A2": 60.1,
          "Physics B1": 66.8,
          "Physics B2": 61.9,
          "Physics Advanced": 73.8,
        },
        {
          period: "Jan",
          "Physics A1": 65.2,
          "Physics A2": 61.8,
          "Physics B1": 68.9,
          "Physics B2": 63.4,
          "Physics Advanced": 75.6,
        },
        {
          period: "Feb",
          "Physics A1": 68.9,
          "Physics A2": 64.7,
          "Physics B1": 72.1,
          "Physics B2": 66.2,
          "Physics Advanced": 78.4,
        },
        {
          period: "Mar",
          "Physics A1": 72.5,
          "Physics A2": 68.1,
          "Physics B1": 75.8,
          "Physics B2": 69.4,
          "Physics Advanced": 81.2,
        },
      ],
    }
    return baseData[period as keyof typeof baseData] || baseData["3months"]
  }

  // Topic comparison data across groups
  const getTopicComparisonData = () => {
    return [
      {
        topic: "Mechanics",
        "Physics A1": 45.2,
        "Physics A2": 43.8,
        "Physics B1": 48.1,
        "Physics B2": 44.6,
        "Physics Advanced": 52.3,
        average: 46.8,
      },
      {
        topic: "Electricity",
        "Physics A1": 36.8,
        "Physics A2": 35.2,
        "Physics B1": 40.1,
        "Physics B2": 37.9,
        "Physics Advanced": 44.7,
        average: 38.9,
      },
      {
        topic: "Waves",
        "Physics A1": 70.2,
        "Physics A2": 68.9,
        "Physics B1": 74.8,
        "Physics B2": 71.3,
        "Physics Advanced": 78.1,
        average: 72.7,
      },
      {
        topic: "Energy",
        "Physics A1": 63.4,
        "Physics A2": 61.8,
        "Physics B1": 67.2,
        "Physics B2": 64.1,
        "Physics Advanced": 71.9,
        average: 65.7,
      },
      {
        topic: "Nuclear",
        "Physics A1": 41.2,
        "Physics A2": 39.8,
        "Physics B1": 45.6,
        "Physics B2": 42.3,
        "Physics Advanced": 49.1,
        average: 43.6,
      },
    ]
  }

  // Group performance radar data
  const getRadarData = () => {
    return [
      {
        subject: "Mechanics",
        "Physics A1": 45,
        "Physics A2": 44,
        "Physics B1": 48,
        "Physics Advanced": 52,
        fullMark: 100,
      },
      {
        subject: "Electricity",
        "Physics A1": 37,
        "Physics A2": 35,
        "Physics B1": 40,
        "Physics Advanced": 45,
        fullMark: 100,
      },
      { subject: "Waves", "Physics A1": 70, "Physics A2": 69, "Physics B1": 75, "Physics Advanced": 78, fullMark: 100 },
      {
        subject: "Energy",
        "Physics A1": 63,
        "Physics A2": 62,
        "Physics B1": 67,
        "Physics Advanced": 72,
        fullMark: 100,
      },
      {
        subject: "Nuclear",
        "Physics A1": 41,
        "Physics A2": 40,
        "Physics B1": 46,
        "Physics Advanced": 49,
        fullMark: 100,
      },
      {
        subject: "Quantum",
        "Physics A1": 38,
        "Physics A2": 36,
        "Physics B1": 42,
        "Physics Advanced": 47,
        fullMark: 100,
      },
    ]
  }

  const historicalData = getHistoricalData(selectedPeriod)
  const topicComparisonData = getTopicComparisonData()
  const radarData = getRadarData()

  // Calculate trends
  const calculateTrend = (data: any[], groupName: string) => {
    if (data.length < 2) return { direction: "neutral", value: 0 }
    const latest = data[data.length - 1][groupName]
    const previous = data[data.length - 2][groupName]
    const change = latest - previous
    return {
      direction: change > 1 ? "up" : change < -1 ? "down" : "neutral",
      value: Math.abs(change),
    }
  }

  const groupColors = {
    "Physics A1": "#3b82f6",
    "Physics A2": "#8b5cf6",
    "Physics B1": "#10b981",
    "Physics B2": "#f59e0b",
    "Physics Advanced": "#ef4444",
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            Comparative Analytics
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            Performance comparison across groups and time periods
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-slate-500" />
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">1 Month</SelectItem>
                <SelectItem value="3months">3 Months</SelectItem>
                <SelectItem value="6months">6 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-slate-500" />
            <Select value={comparisonType} onValueChange={setComparisonType}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="groups">Compare Groups</SelectItem>
                <SelectItem value="topics">Compare Topics</SelectItem>
                <SelectItem value="trends">Trend Analysis</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Group Performance Summary */}
        <div className="flex gap-4">
          {groupStats.slice(0, 3).map((group) => {
            const trend = calculateTrend(historicalData, group.group_name)
            return (
              <div key={group.group_name} className="text-center">
                <div className="text-sm font-medium text-slate-600 dark:text-slate-400">{group.group_name}</div>
                <div className="flex items-center gap-1">
                  <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    {group.avg_success_rate.toFixed(1)}%
                  </span>
                  {trend.direction !== "neutral" && (
                    <div className="flex items-center">
                      {trend.direction === "up" ? (
                        <TrendingUp className="h-3 w-3 text-emerald-500" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-rose-500" />
                      )}
                      <span className={`text-xs ${trend.direction === "up" ? "text-emerald-600" : "text-rose-600"}`}>
                        {trend.value.toFixed(1)}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance Trends</TabsTrigger>
          <TabsTrigger value="topics">Topic Comparison</TabsTrigger>
          <TabsTrigger value="radar">Group Profiles</TabsTrigger>
          <TabsTrigger value="insights">Key Insights</TabsTrigger>
        </TabsList>

        {/* Performance Trends Tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Group Performance Over Time
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Success rate trends across all physics groups ({selectedPeriod})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  "Physics A1": { label: "Physics A1", color: groupColors["Physics A1"] },
                  "Physics A2": { label: "Physics A2", color: groupColors["Physics A2"] },
                  "Physics B1": { label: "Physics B1", color: groupColors["Physics B1"] },
                  "Physics B2": { label: "Physics B2", color: groupColors["Physics B2"] },
                  "Physics Advanced": { label: "Physics Advanced", color: groupColors["Physics Advanced"] },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-600" />
                    <XAxis
                      dataKey="period"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#64748b" }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#64748b" }}
                      domain={[40, 85]}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    {Object.entries(groupColors).map(([group, color]) => (
                      <Line
                        key={group}
                        type="monotone"
                        dataKey={group}
                        stroke={color}
                        strokeWidth={2}
                        dot={{ fill: color, strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Performance Comparison Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {groupStats.map((group) => {
              const trend = calculateTrend(historicalData, group.group_name)
              const isTopPerformer = group.avg_success_rate === Math.max(...groupStats.map((g) => g.avg_success_rate))
              const needsAttention = group.avg_success_rate < 65

              return (
                <Card
                  key={group.group_name}
                  className={`${
                    isTopPerformer
                      ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800"
                      : needsAttention
                        ? "bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800"
                        : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {group.group_name}
                      </CardTitle>
                      {isTopPerformer && (
                        <Badge variant="default" className="text-xs">
                          Top Performer
                        </Badge>
                      )}
                      {needsAttention && (
                        <Badge variant="destructive" className="text-xs">
                          Needs Attention
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Current Rate</span>
                        <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
                          {group.avg_success_rate.toFixed(1)}%
                        </span>
                      </div>

                      {trend.direction !== "neutral" && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Trend</span>
                          <div className="flex items-center gap-1">
                            {trend.direction === "up" ? (
                              <TrendingUp className="h-4 w-4 text-emerald-500" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-rose-500" />
                            )}
                            <span
                              className={`text-sm font-medium ${
                                trend.direction === "up" ? "text-emerald-600" : "text-rose-600"
                              }`}
                            >
                              {trend.direction === "up" ? "+" : "-"}
                              {trend.value.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-400">Students</span>
                        <span className="font-medium text-slate-700 dark:text-slate-300">{group.student_count}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-400">Attempts</span>
                        <span className="font-medium text-slate-700 dark:text-slate-300">{group.total_attempts}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Topic Comparison Tab */}
        <TabsContent value="topics" className="space-y-6">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Topic Performance by Group
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Comparing success rates across physics topics for each group
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  "Physics A1": { label: "Physics A1", color: groupColors["Physics A1"] },
                  "Physics A2": { label: "Physics A2", color: groupColors["Physics A2"] },
                  "Physics B1": { label: "Physics B1", color: groupColors["Physics B1"] },
                  "Physics B2": { label: "Physics B2", color: groupColors["Physics B2"] },
                  "Physics Advanced": { label: "Physics Advanced", color: groupColors["Physics Advanced"] },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topicComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-600" />
                    <XAxis dataKey="topic" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    {Object.entries(groupColors).map(([group, color]) => (
                      <Bar key={group} dataKey={group} fill={color} />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Topic Performance Summary */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {topicComparisonData.map((topic) => {
              const bestGroup = Object.entries(topic)
                .filter(([key]) => key !== "topic" && key !== "average")
                .reduce((a, b) => (a[1] > b[1] ? a : b))

              const worstGroup = Object.entries(topic)
                .filter(([key]) => key !== "topic" && key !== "average")
                .reduce((a, b) => (a[1] < b[1] ? a : b))

              return (
                <Card key={topic.topic} className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {topic.topic}
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">
                      Average: {topic.average.toFixed(1)}%
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-emerald-600 dark:text-emerald-400">Best: {bestGroup[0]}</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          {bestGroup[1].toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-rose-600 dark:text-rose-400">Needs Help: {worstGroup[0]}</span>
                        <span className="font-bold text-rose-600 dark:text-rose-400">{worstGroup[1].toFixed(1)}%</span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Gap: {(bestGroup[1] - worstGroup[1]).toFixed(1)}% difference
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Group Profiles Tab */}
        <TabsContent value="radar" className="space-y-6">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Group Performance Profiles
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Radar chart showing strengths and weaknesses across physics topics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  "Physics A1": { label: "Physics A1", color: groupColors["Physics A1"] },
                  "Physics A2": { label: "Physics A2", color: groupColors["Physics A2"] },
                  "Physics B1": { label: "Physics B1", color: groupColors["Physics B1"] },
                  "Physics Advanced": { label: "Physics Advanced", color: groupColors["Physics Advanced"] },
                }}
                className="h-[500px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
                    <PolarGrid stroke="#e2e8f0" className="dark:stroke-slate-600" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: "#64748b" }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: "#64748b" }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    {Object.entries(groupColors)
                      .slice(0, 4)
                      .map(([group, color]) => (
                        <Radar
                          key={group}
                          name={group}
                          dataKey={group}
                          stroke={color}
                          fill={color}
                          fillOpacity={0.1}
                          strokeWidth={2}
                        />
                      ))}
                  </RadarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Key Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Top Performers */}
            <Card className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-emerald-800 dark:text-emerald-200">Physics Advanced</h4>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">
                    Consistently highest performance (81.2%) with strong improvement trend (+2.8% this period)
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-emerald-800 dark:text-emerald-200">Physics B1</h4>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">
                    Second highest performance (75.8%) with steady growth across all topics
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Areas for Improvement */}
            <Card className="bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-rose-900 dark:text-rose-100 flex items-center gap-2">
                  <TrendingDown className="h-5 w-5" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-rose-800 dark:text-rose-200">Electricity Topics</h4>
                  <p className="text-sm text-rose-700 dark:text-rose-300">
                    Lowest performance across all groups (38.9% average). Circuits particularly challenging.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-rose-800 dark:text-rose-200">Physics A2 Group</h4>
                  <p className="text-sm text-rose-700 dark:text-rose-300">
                    Slowest improvement rate (+1.2% vs +3.1% average). May need additional support.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Trend Analysis */}
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-blue-900 dark:text-blue-100">Trend Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700 dark:text-blue-300">Overall Improvement</span>
                  <span className="font-bold text-blue-900 dark:text-blue-100">+2.4%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700 dark:text-blue-300">Best Improving Topic</span>
                  <span className="font-bold text-blue-900 dark:text-blue-100">Waves (+4.2%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700 dark:text-blue-300">Most Consistent Group</span>
                  <span className="font-bold text-blue-900 dark:text-blue-100">Physics B1</span>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-amber-900 dark:text-amber-100">
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-amber-700 dark:text-amber-300">
                  • Focus additional resources on Electricity and Nuclear Physics topics
                </div>
                <div className="text-sm text-amber-700 dark:text-amber-300">
                  • Consider peer tutoring between Physics Advanced and other groups
                </div>
                <div className="text-sm text-amber-700 dark:text-amber-300">
                  • Implement targeted interventions for Physics A2 students
                </div>
                <div className="text-sm text-amber-700 dark:text-amber-300">
                  • Leverage successful Waves teaching methods for other topics
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
