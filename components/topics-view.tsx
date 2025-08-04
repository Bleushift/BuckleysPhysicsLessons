"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
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
  Search,
  Users,
  Clock,
  TrendingUp,
  TrendingDown,
} from "lucide-react"

interface TopicData {
  name: string
  subtitle: string
  score: number
  assessments: number
  lastActivity: string
  icon: any
  color: string
  gradient: string
  attempts: number
  struggling: number
  avgTime: number
  popularity: string
  trend: "up" | "down" | "stable"
  vsGroupAvg: number
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

// Enhanced sample data with Topic Analysis style information
const sampleTopicData: TopicData[] = [
  {
    name: "Mechanics",
    subtitle: "Forces and Motion",
    score: 72.4,
    assessments: 567,
    lastActivity: "2 hours ago",
    icon: topicIcons.Mechanics,
    color: topicColors.Mechanics.color,
    gradient: topicColors.Mechanics.bg,
    attempts: 567,
    struggling: 8,
    avgTime: 3,
    popularity: "Very High",
    trend: "down",
    vsGroupAvg: -1.8,
  },
  {
    name: "Circuits",
    subtitle: "Electrical Circuits",
    score: 68.2,
    assessments: 489,
    lastActivity: "4 hours ago",
    icon: topicIcons.Circuits,
    color: topicColors.Circuits.color,
    gradient: topicColors.Circuits.bg,
    attempts: 489,
    struggling: 12,
    avgTime: 5,
    popularity: "Very High",
    trend: "down",
    vsGroupAvg: -1.9,
  },
  {
    name: "Waves",
    subtitle: "Wave Properties",
    score: 78.4,
    assessments: 445,
    lastActivity: "1 hour ago",
    icon: topicIcons.Waves,
    color: topicColors.Waves.color,
    gradient: topicColors.Waves.bg,
    attempts: 445,
    struggling: 5,
    avgTime: 2,
    popularity: "Very High",
    trend: "up",
    vsGroupAvg: 1.6,
  },
  {
    name: "Quantum",
    subtitle: "Quantum Physics",
    score: 58.8,
    assessments: 234,
    lastActivity: "6 hours ago",
    icon: topicIcons.Quantum,
    color: topicColors.Quantum.color,
    gradient: topicColors.Quantum.bg,
    attempts: 234,
    struggling: 15,
    avgTime: 7,
    popularity: "High",
    trend: "down",
    vsGroupAvg: -2.4,
  },
  {
    name: "Thermal",
    subtitle: "Heat and Temperature",
    score: 71.3,
    assessments: 356,
    lastActivity: "3 hours ago",
    icon: topicIcons.Thermal,
    color: topicColors.Thermal.color,
    gradient: topicColors.Thermal.bg,
    attempts: 356,
    struggling: 9,
    avgTime: 4,
    popularity: "High",
    trend: "up",
    vsGroupAvg: 1.2,
  },
  {
    name: "Fields",
    subtitle: "Electric and Magnetic Fields",
    score: 69.2,
    assessments: 298,
    lastActivity: "5 hours ago",
    icon: topicIcons.Fields,
    color: topicColors.Fields.color,
    gradient: topicColors.Fields.bg,
    attempts: 298,
    struggling: 11,
    avgTime: 6,
    popularity: "Medium",
    trend: "stable",
    vsGroupAvg: -0.8,
  },
]

function getPerformanceBadge(score: number) {
  if (score >= 80)
    return {
      label: "Excellent",
      variant: "default" as const,
      className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    }
  if (score >= 70)
    return {
      label: "Good",
      variant: "secondary" as const,
      className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    }
  if (score >= 60)
    return {
      label: "Needs Work",
      variant: "outline" as const,
      className: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    }
  return {
    label: "Needs Attention",
    variant: "destructive" as const,
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  }
}

interface TopicsViewProps {
  onTopicSelect?: (topic: string) => void
}

export function TopicsView({ onTopicSelect }: TopicsViewProps) {
  const [topics, setTopics] = useState<TopicData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("Most Popular")

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setTopics(sampleTopicData)
      setLoading(false)
    }, 500)
  }, [])

  const totalTopics = topics.length
  const popularTopics = topics.filter((topic) => topic.popularity === "Very High").length
  const masteredTopics = topics.filter((topic) => topic.score >= 80).length
  const strugglingTopics = topics.filter((topic) => topic.score < 60).length

  const filteredTopics = topics.filter(
    (topic) =>
      topic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.subtitle.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Summary Cards Skeleton */}
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
      {/* Summary Statistics - Topic Analysis Style */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
          <CardContent className="p-6">
            <div className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">Total Topics</div>
            <div className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-2">{totalTopics}</div>
            <div className="text-xs text-blue-600 dark:text-blue-400">Across all physics areas</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
          <CardContent className="p-6">
            <div className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1">Popular Topics</div>
            <div className="text-3xl font-bold text-purple-700 dark:text-purple-300 mb-2">{popularTopics}</div>
            <div className="text-xs text-purple-600 dark:text-purple-400">300+ attempts each</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
          <CardContent className="p-6">
            <div className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">Mastered Topics</div>
            <div className="text-3xl font-bold text-green-700 dark:text-green-300 mb-2">{masteredTopics}</div>
            <div className="text-xs text-green-600 dark:text-green-400">80%+ success rate</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-700">
          <CardContent className="p-6">
            <div className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">Struggling Topics</div>
            <div className="text-3xl font-bold text-red-700 dark:text-red-300 mb-2">{strugglingTopics}</div>
            <div className="text-xs text-red-600 dark:text-red-400">Below 60% success</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {["Most Popular", "Best Performance", "Most Difficult"].map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      {/* Topic Cards - Physics Topics Style with Topic Analysis Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTopics.map((topic) => {
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
                {/* Header with Icon and Badge - Physics Topics Style */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorConfig.color} flex items-center justify-center shadow-sm`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge className={badge.className}>{badge.label}</Badge>
                </div>

                {/* Topic Name and Subtitle */}
                <div className="space-y-1 mb-4">
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {topic.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{topic.subtitle}</p>
                </div>

                {/* Success Rate with Progress Bar */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Success Rate</span>
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {topic.score.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={topic.score} className="h-2" />
                  <div className="flex justify-between items-center text-xs">
                    <span
                      className={`flex items-center gap-1 ${topic.vsGroupAvg >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {topic.trend === "up" && <TrendingUp className="h-3 w-3" />}
                      {topic.trend === "down" && <TrendingDown className="h-3 w-3" />}
                      {topic.vsGroupAvg >= 0 ? "+" : ""}
                      {topic.vsGroupAvg.toFixed(1)}% vs group avg
                    </span>
                  </div>
                </div>

                {/* Stats Row - Topic Analysis Style */}
                <div className="grid grid-cols-3 gap-4 text-center text-xs text-slate-600 dark:text-slate-400 mb-4">
                  <div className="flex flex-col items-center">
                    <Target className="h-4 w-4 mb-1 text-slate-500" />
                    <div className="font-semibold text-slate-900 dark:text-slate-100">{topic.attempts}</div>
                    <div>Attempts</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <Users className="h-4 w-4 mb-1 text-red-500" />
                    <div className="font-semibold text-red-600 dark:text-red-400">{topic.struggling}</div>
                    <div>Struggling</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <Clock className="h-4 w-4 mb-1 text-slate-500" />
                    <div className="font-semibold text-slate-900 dark:text-slate-100">{topic.avgTime}m</div>
                    <div>Avg Time</div>
                  </div>
                </div>

                {/* Popularity and Last Activity - Physics Topics Style */}
                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400 border-t pt-3">
                  <div className="flex justify-between">
                    <span>Popularity:</span>
                    <span className="font-medium text-purple-600 dark:text-purple-400">{topic.popularity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Activity:</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">{topic.lastActivity}</span>
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
