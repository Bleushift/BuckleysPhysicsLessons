"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Atom,
  Zap,
  AlertTriangle,
  Waves,
  Hammer,
  Thermometer,
  Magnet,
  Calendar,
  Rocket,
  Battery,
  Target,
  BookOpen,
  Activity,
} from "lucide-react"

interface TopicData {
  name: string
  score: number
  assessments: number
  lastActivity: string
  icon: any
  color: string
  gradient: string
}

const topicIcons = {
  Skills: Target,
  Circuits: Zap,
  Errors: AlertTriangle,
  Quantum: Atom,
  Mechanics: Hammer,
  Waves: Waves,
  Materials: BookOpen,
  Thermal: Thermometer,
  Periodic: Calendar,
  Fields: Magnet,
  Capacitors: Battery,
  Astro: Rocket,
  Nuclear: Activity,
}

const topicColors = {
  Skills: {
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-700 dark:text-blue-300",
  },
  Circuits: {
    color: "from-yellow-500 to-orange-500",
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    text: "text-yellow-700 dark:text-yellow-300",
  },
  Errors: {
    color: "from-red-500 to-red-600",
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-700 dark:text-red-300",
  },
  Quantum: {
    color: "from-purple-500 to-purple-600",
    bg: "bg-purple-100 dark:bg-purple-900/30",
    text: "text-purple-700 dark:text-purple-300",
  },
  Mechanics: {
    color: "from-green-500 to-green-600",
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-700 dark:text-green-300",
  },
  Waves: {
    color: "from-cyan-500 to-cyan-600",
    bg: "bg-cyan-100 dark:bg-cyan-900/30",
    text: "text-cyan-700 dark:text-cyan-300",
  },
  Materials: {
    color: "from-amber-500 to-amber-600",
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-700 dark:text-amber-300",
  },
  Thermal: {
    color: "from-orange-500 to-red-500",
    bg: "bg-orange-100 dark:bg-orange-900/30",
    text: "text-orange-700 dark:text-orange-300",
  },
  Periodic: {
    color: "from-indigo-500 to-indigo-600",
    bg: "bg-indigo-100 dark:bg-indigo-900/30",
    text: "text-indigo-700 dark:text-indigo-300",
  },
  Fields: {
    color: "from-teal-500 to-teal-600",
    bg: "bg-teal-100 dark:bg-teal-900/30",
    text: "text-teal-700 dark:text-teal-300",
  },
  Capacitors: {
    color: "from-violet-500 to-violet-600",
    bg: "bg-violet-100 dark:bg-violet-900/30",
    text: "text-violet-700 dark:text-violet-300",
  },
  Astro: {
    color: "from-slate-600 to-slate-700",
    bg: "bg-slate-100 dark:bg-slate-900/30",
    text: "text-slate-700 dark:text-slate-300",
  },
  Nuclear: {
    color: "from-emerald-500 to-emerald-600",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    text: "text-emerald-700 dark:text-emerald-300",
  },
}

// Sample data based on the CSV structure
const sampleTopicData: TopicData[] = [
  {
    name: "Skills",
    score: 95,
    assessments: 24,
    lastActivity: "2 hours ago",
    icon: topicIcons.Skills,
    color: topicColors.Skills.color,
    gradient: topicColors.Skills.bg,
  },
  {
    name: "Circuits",
    score: 88,
    assessments: 18,
    lastActivity: "4 hours ago",
    icon: topicIcons.Circuits,
    color: topicColors.Circuits.color,
    gradient: topicColors.Circuits.bg,
  },
  {
    name: "Errors",
    score: 92,
    assessments: 15,
    lastActivity: "1 hour ago",
    icon: topicIcons.Errors,
    color: topicColors.Errors.color,
    gradient: topicColors.Errors.bg,
  },
  {
    name: "Quantum",
    score: 76,
    assessments: 22,
    lastActivity: "6 hours ago",
    icon: topicIcons.Quantum,
    color: topicColors.Quantum.color,
    gradient: topicColors.Quantum.bg,
  },
  {
    name: "Mechanics",
    score: 84,
    assessments: 31,
    lastActivity: "3 hours ago",
    icon: topicIcons.Mechanics,
    color: topicColors.Mechanics.color,
    gradient: topicColors.Mechanics.bg,
  },
  {
    name: "Waves",
    score: 91,
    assessments: 19,
    lastActivity: "5 hours ago",
    icon: topicIcons.Waves,
    color: topicColors.Waves.color,
    gradient: topicColors.Waves.bg,
  },
  {
    name: "Materials",
    score: 87,
    assessments: 16,
    lastActivity: "2 hours ago",
    icon: topicIcons.Materials,
    color: topicColors.Materials.color,
    gradient: topicColors.Materials.bg,
  },
  {
    name: "Thermal",
    score: 79,
    assessments: 21,
    lastActivity: "7 hours ago",
    icon: topicIcons.Thermal,
    color: topicColors.Thermal.color,
    gradient: topicColors.Thermal.bg,
  },
  {
    name: "Periodic",
    score: 93,
    assessments: 14,
    lastActivity: "1 hour ago",
    icon: topicIcons.Periodic,
    color: topicColors.Periodic.color,
    gradient: topicColors.Periodic.bg,
  },
  {
    name: "Fields",
    score: 72,
    assessments: 25,
    lastActivity: "8 hours ago",
    icon: topicIcons.Fields,
    color: topicColors.Fields.color,
    gradient: topicColors.Fields.bg,
  },
  {
    name: "Capacitors",
    score: 85,
    assessments: 17,
    lastActivity: "4 hours ago",
    icon: topicIcons.Capacitors,
    color: topicColors.Capacitors.color,
    gradient: topicColors.Capacitors.bg,
  },
  {
    name: "Astro",
    score: 68,
    assessments: 12,
    lastActivity: "12 hours ago",
    icon: topicIcons.Astro,
    color: topicColors.Astro.color,
    gradient: topicColors.Astro.bg,
  },
  {
    name: "Nuclear",
    score: 81,
    assessments: 20,
    lastActivity: "5 hours ago",
    icon: topicIcons.Nuclear,
    color: topicColors.Nuclear.color,
    gradient: topicColors.Nuclear.bg,
  },
]

interface CircularProgressProps {
  value: number
  size?: number
  strokeWidth?: number
  className?: string
}

function CircularProgress({ value, size = 80, strokeWidth = 8, className = "" }: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-slate-200 dark:text-slate-700"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-blue-500 transition-all duration-1000 ease-out"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-slate-900 dark:text-slate-100">{value}%</span>
      </div>
    </div>
  )
}

function getPerformanceBadge(score: number) {
  if (score >= 90)
    return {
      label: "Excellent",
      variant: "default" as const,
      className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    }
  if (score >= 80)
    return {
      label: "Good",
      variant: "secondary" as const,
      className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    }
  if (score >= 70)
    return {
      label: "Average",
      variant: "outline" as const,
      className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    }
  return {
    label: "Needs Attention",
    variant: "destructive" as const,
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  }
}

interface ModernTopicCardsProps {
  onTopicSelect?: (topic: string) => void
}

export function ModernTopicCards({ onTopicSelect }: ModernTopicCardsProps) {
  const [topics, setTopics] = useState<TopicData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setTopics(sampleTopicData)
      setLoading(false)
    }, 500)
  }, [])

  const totalTopics = topics.length
  const overallAverage = Math.round(topics.reduce((sum, topic) => sum + topic.score, 0) / topics.length)
  const strongTopics = topics.filter((topic) => topic.score >= 85).length

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Summary Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Topic Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                  <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                </div>
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-2">{totalTopics}</div>
            <div className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Topics</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-700 dark:text-green-300 mb-2">{overallAverage}%</div>
            <div className="text-sm font-medium text-green-600 dark:text-green-400">Overall Average</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-700 dark:text-purple-300 mb-2">{strongTopics}</div>
            <div className="text-sm font-medium text-purple-600 dark:text-purple-400">Strong Topics</div>
          </CardContent>
        </Card>
      </div>

      {/* Topic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {topics.map((topic) => {
          const Icon = topic.icon
          const badge = getPerformanceBadge(topic.score)
          const colorConfig = topicColors[topic.name as keyof typeof topicColors]

          return (
            <Card
              key={topic.name}
              className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600"
              onClick={() => onTopicSelect?.(topic.name)}
            >
              <CardContent className="p-6">
                {/* Header with Icon and Progress */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorConfig.color} flex items-center justify-center shadow-sm`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CircularProgress value={topic.score} size={60} strokeWidth={6} />
                </div>

                {/* Topic Name and Badge */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {topic.name}
                    </h3>
                    <Badge className={badge.className}>{badge.label}</Badge>
                  </div>

                  {/* Stats */}
                  <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex justify-between">
                      <span>Assessments:</span>
                      <span className="font-medium text-slate-900 dark:text-slate-100">{topic.assessments}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Activity:</span>
                      <span className="font-medium text-slate-900 dark:text-slate-100">{topic.lastActivity}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
