"use client"

import type React from "react"

import { useState, useRef } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { TrendingUp, TrendingDown } from "lucide-react"

interface ZoomableTimelineProps {
  data: Array<{
    date: string
    attempts: number
    success_rate: number
    class_average?: number
  }>
  title?: string
  studentName?: string
}

export function ZoomableTimeline({ data, title, studentName }: ZoomableTimelineProps) {
  const [zoomLevel, setZoomLevel] = useState(1)
  const [panOffset, setPanOffset] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Calculate trend
  const calculateTrend = () => {
    if (data.length < 2) return { direction: "neutral", value: 0 }

    const recent = data.slice(-5) // Last 5 data points
    const earlier = data.slice(-10, -5) // Previous 5 data points

    if (recent.length === 0 || earlier.length === 0) return { direction: "neutral", value: 0 }

    const recentAvg = recent.reduce((sum, d) => sum + d.success_rate, 0) / recent.length
    const earlierAvg = earlier.reduce((sum, d) => sum + d.success_rate, 0) / earlier.length

    const change = recentAvg - earlierAvg

    return {
      direction: change > 2 ? "up" : change < -2 ? "down" : "neutral",
      value: Math.abs(change),
    }
  }

  const trend = calculateTrend()

  const handleWheel = (event: React.WheelEvent) => {
    event.preventDefault()
    const delta = event.deltaY > 0 ? 0.9 : 1.1
    setZoomLevel((prev) => Math.max(0.5, Math.min(3, prev * delta)))
  }

  // Get visible data based on zoom and pan
  const getVisibleData = () => {
    const totalPoints = data.length
    const visiblePoints = Math.floor(totalPoints / zoomLevel)
    const startIndex = Math.max(0, Math.min(totalPoints - visiblePoints, panOffset))
    const endIndex = Math.min(totalPoints, startIndex + visiblePoints)

    return data.slice(startIndex, endIndex)
  }

  const visibleData = getVisibleData()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          {title && <h3 className="text-sm font-medium text-slate-600">{title}</h3>}
          {studentName && (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-slate-500">{studentName}</span>
              {trend.direction !== "neutral" && (
                <div className="flex items-center gap-1">
                  {trend.direction === "up" ? (
                    <TrendingUp className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-rose-500" />
                  )}
                  <span
                    className={`text-xs font-medium ${trend.direction === "up" ? "text-emerald-600" : "text-rose-600"}`}
                  >
                    {trend.direction === "up" ? "+" : "-"}
                    {trend.value.toFixed(1)}%
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="text-xs text-slate-400">Scroll to zoom • Zoom: {(zoomLevel * 100).toFixed(0)}%</div>
      </div>

      <div
        ref={containerRef}
        className="relative"
        onWheel={handleWheel}
        style={{ cursor: zoomLevel > 1 ? "grab" : "default" }}
      >
        <ChartContainer
          config={{
            success_rate: {
              label: studentName || "Success Rate",
              color: "#3b82f6",
            },
            class_average: {
              label: "Class Average",
              color: "#94a3b8",
            },
            attempts: {
              label: "Attempts",
              color: "#10b981",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={visibleData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#64748b" }}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
                }}
              />
              <YAxis
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#64748b" }}
                domain={[0, 100]}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#64748b" }}
              />
              <ChartTooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-soft">
                        <p className="font-medium text-slate-900">
                          {new Date(label).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                        {payload.map((entry, index) => (
                          <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {entry.name}: {entry.value}
                            {entry.dataKey === "success_rate" || entry.dataKey === "class_average" ? "%" : ""}
                          </p>
                        ))}
                      </div>
                    )
                  }
                  return null
                }}
              />

              {/* Class average reference line */}
              {visibleData[0]?.class_average && (
                <ReferenceLine
                  yAxisId="left"
                  y={visibleData[0].class_average}
                  stroke="#94a3b8"
                  strokeDasharray="5 5"
                  label={{ value: "Class Avg", position: "topRight", fontSize: 10 }}
                />
              )}

              <Line
                yAxisId="left"
                type="monotone"
                dataKey="success_rate"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
              />

              {visibleData[0]?.class_average && (
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="class_average"
                  stroke="#94a3b8"
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  dot={false}
                />
              )}

              <Line
                yAxisId="right"
                type="monotone"
                dataKey="attempts"
                stroke="#10b981"
                strokeWidth={1}
                dot={{ fill: "#10b981", strokeWidth: 1, r: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  )
}
