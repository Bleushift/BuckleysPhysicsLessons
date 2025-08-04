"use client"

import type React from "react"

import { useState, useRef } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { TrendingUp, TrendingDown, ArrowUp, ArrowDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface CorrectedTimelineProps {
  data: Array<{
    date: string
    attempts: number
    success_rate: number
    class_average?: number
  }>
  title?: string
  studentName?: string
  showClassComparison?: boolean
}

export function CorrectedTimeline({ data, title, studentName, showClassComparison = true }: CorrectedTimelineProps) {
  const [zoomLevel, setZoomLevel] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  // Calculate trend and class comparison
  const calculateMetrics = () => {
    if (data.length < 2) return { trend: { direction: "neutral", value: 0 }, classComparison: null }

    const recent = data.slice(-5)
    const earlier = data.slice(-10, -5)

    let trend = { direction: "neutral" as "up" | "down" | "neutral", value: 0 }

    if (recent.length > 0 && earlier.length > 0) {
      const recentAvg = recent.reduce((sum, d) => sum + d.attempts, 0) / recent.length
      const earlierAvg = earlier.reduce((sum, d) => sum + d.attempts, 0) / earlier.length
      const change = recentAvg - earlierAvg

      trend = {
        direction: change > 2 ? "up" : change < -2 ? "down" : "neutral",
        value: Math.abs(change),
      }
    }

    // Class comparison (using latest data point)
    const latestData = data[data.length - 1]
    let classComparison = null

    if (latestData?.class_average && showClassComparison) {
      const difference = latestData.attempts - latestData.class_average
      classComparison = {
        isAbove: difference > 0,
        difference: Math.abs(difference),
        percentage: latestData.class_average > 0 ? (difference / latestData.class_average) * 100 : 0,
      }
    }

    return { trend, classComparison }
  }

  const { trend, classComparison } = calculateMetrics()

  const handleWheel = (event: React.WheelEvent) => {
    event.preventDefault()
    const delta = event.deltaY > 0 ? 0.9 : 1.1
    setZoomLevel((prev) => Math.max(0.5, Math.min(3, prev * delta)))
  }

  const getVisibleData = () => {
    const totalPoints = data.length
    const visiblePoints = Math.floor(totalPoints / zoomLevel)
    const startIndex = Math.max(0, totalPoints - visiblePoints)
    return data.slice(startIndex)
  }

  const visibleData = getVisibleData()
  const maxValue = Math.max(...visibleData.map((d) => d.attempts)) * 1.1

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {title || "Question attempts over time"}
          </h3>
          {studentName && (
            <div className="flex items-center gap-3 mt-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">{studentName}</span>

              {/* Trend Indicator */}
              {trend.direction !== "neutral" && (
                <Badge variant={trend.direction === "up" ? "default" : "destructive"} className="text-xs">
                  {trend.direction === "up" ? (
                    <ArrowUp className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDown className="h-3 w-3 mr-1" />
                  )}
                  {trend.value.toFixed(1)} vs previous period
                </Badge>
              )}

              {/* Class Comparison Indicator */}
              {classComparison && (
                <Badge variant={classComparison.isAbove ? "default" : "secondary"} className="text-xs">
                  {classComparison.isAbove ? (
                    <TrendingUp className="h-3 w-3 mr-1 text-emerald-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1 text-rose-500" />
                  )}
                  {classComparison.isAbove ? "+" : "-"}
                  {classComparison.difference.toFixed(1)} vs class avg
                </Badge>
              )}
            </div>
          )}
        </div>
        <div className="text-xs text-slate-400 dark:text-slate-500">
          Scroll to zoom • Zoom: {(zoomLevel * 100).toFixed(0)}%
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4"
        onWheel={handleWheel}
        style={{ cursor: zoomLevel > 1 ? "grab" : "default" }}
      >
        <ChartContainer
          config={{
            attempts: {
              label: "Attempts",
              color: "#f97316",
            },
            class_average: {
              label: "Class Average",
              color: "#94a3b8",
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={visibleData} margin={{ top: 20, right: 30, left: 40, bottom: 60 }}>
              <defs>
                <linearGradient id="attemptsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-600" />

              <XAxis
                dataKey="date"
                axisLine={true}
                tickLine={true}
                tick={{ fontSize: 12, fill: "#64748b" }}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
                }}
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
              />

              <YAxis
                axisLine={true}
                tickLine={true}
                tick={{ fontSize: 12, fill: "#64748b" }}
                domain={[0, maxValue]}
                label={{
                  value: "Number of Attempts",
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle", fill: "#64748b", fontSize: "12px" },
                }}
              />

              <ChartTooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white dark:bg-slate-800 p-3 border border-slate-200 dark:border-slate-600 rounded-lg shadow-lg">
                        <p className="font-medium text-slate-900 dark:text-slate-100">
                          {new Date(label).toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                        {payload.map((entry, index) => (
                          <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {entry.name}: {entry.value}
                          </p>
                        ))}
                      </div>
                    )
                  }
                  return null
                }}
              />

              {/* Class average reference line */}
              {visibleData[0]?.class_average && showClassComparison && (
                <ReferenceLine
                  y={visibleData[0].class_average}
                  stroke="#94a3b8"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  label={{
                    value: "Class Average",
                    position: "topRight",
                    fontSize: 11,
                    fill: "#64748b",
                  }}
                />
              )}

              <Area
                type="monotone"
                dataKey="attempts"
                stroke="#f97316"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#attemptsGradient)"
                dot={{ fill: "#f97316", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#f97316", strokeWidth: 2, fill: "#fff" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  )
}
