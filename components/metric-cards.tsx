"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus, Target, Users, BookOpen } from "lucide-react"
import { Speedometer } from "@/components/speedometer"

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: {
    value: number
    direction: "up" | "down" | "neutral"
    period?: string
  }
  icon?: React.ReactNode
  variant?: "default" | "success" | "warning" | "danger"
  className?: string
  comparison?: {
    label: string
    value: number
    isAbove: boolean
  }
  onClick?: () => void
  clickable?: boolean
}

export function MetricCard({
  title,
  value,
  subtitle,
  trend,
  icon,
  variant = "default",
  className = "",
  comparison,
  onClick,
  clickable = false,
}: MetricCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-emerald-200 dark:border-emerald-700"
      case "warning":
        return "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-700"
      case "danger":
        return "bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-800/20 border-rose-200 dark:border-rose-700"
      default:
        return "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
    }
  }

  const getTrendIcon = () => {
    switch (trend?.direction) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
      case "down":
        return <TrendingDown className="h-3 w-3 text-rose-600 dark:text-rose-400" />
      default:
        return <Minus className="h-3 w-3 text-slate-600 dark:text-slate-400" />
    }
  }

  const getTrendColor = () => {
    switch (trend?.direction) {
      case "up":
        return "text-emerald-600 dark:text-emerald-400"
      case "down":
        return "text-rose-600 dark:text-rose-400"
      default:
        return "text-slate-600 dark:text-slate-400"
    }
  }

  const cardClasses = `${getVariantStyles()} border transition-all duration-300 hover:shadow-soft hover:-translate-y-0.5 ${
    clickable ? "cursor-pointer hover:shadow-lg" : ""
  } ${className}`

  const cardContent = (
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {icon && <div className="text-slate-600 dark:text-slate-400 flex-shrink-0">{icon}</div>}
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 truncate">{title}</p>
          </div>

          <div className="mb-2">
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">{value}</p>
            {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>}
          </div>

          <div className="space-y-1">
            {trend && (
              <div className="flex items-center gap-1">
                {getTrendIcon()}
                <span className={`text-xs font-medium ${getTrendColor()}`}>{Math.abs(trend.value)}%</span>
                {trend.period && <span className="text-xs text-slate-500 dark:text-slate-400">vs {trend.period}</span>}
              </div>
            )}

            {comparison && (
              <div className="flex items-center gap-1">
                {comparison.isAbove ? (
                  <TrendingUp className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-rose-600 dark:text-rose-400" />
                )}
                <span
                  className={`text-xs font-medium ${comparison.isAbove ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
                >
                  {comparison.isAbove ? "+" : ""}
                  {comparison.value.toFixed(1)}% vs {comparison.label}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </CardContent>
  )

  return (
    <Card className={cardClasses} onClick={clickable ? onClick : undefined}>
      {cardContent}
    </Card>
  )
}

interface KPIGridProps {
  data: {
    totalStudents: number
    totalAttempts: number
    avgSuccessRate: number
    strugglingTopics: number
  }
  onStrugglingTopicsClick?: () => void
}

export function KPIGrid({ data, onStrugglingTopicsClick }: KPIGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Students"
        value={data.totalStudents}
        subtitle="Enrolled students"
        icon={<Users className="h-4 w-4" />}
        trend={{ value: 12, direction: "up", period: "last month" }}
      />

      <MetricCard
        title="Total Attempts"
        value={data.totalAttempts.toLocaleString()}
        subtitle="Questions attempted"
        icon={<Target className="h-4 w-4" />}
        trend={{ value: 8.5, direction: "up", period: "last week" }}
      />

      {/* Speedometer card with proper sizing and layout */}
      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-soft hover:-translate-y-0.5">
        <CardContent className="p-6 flex flex-col items-center justify-center min-h-[140px]">
          <Speedometer value={data.avgSuccessRate} title="Overall Success Rate" size={120} />
        </CardContent>
      </Card>

      <MetricCard
        title="Struggling Topics"
        value={data.strugglingTopics}
        subtitle="Need attention"
        variant="warning"
        icon={<BookOpen className="h-4 w-4" />}
        trend={{ value: 2, direction: "down", period: "last month" }}
        clickable={true}
        onClick={onStrugglingTopicsClick}
      />
    </div>
  )
}
