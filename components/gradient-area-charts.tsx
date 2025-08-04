"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface GradientAreaChartsProps {
  data?: Array<{
    date: string
    attempts: number
    correct: number
  }>
  type?: "attempts" | "success" | "combined"
  color?: string
  onStudentSelect?: (studentId: string) => void
}

export function GradientAreaCharts({
  data = [],
  type = "combined",
  color = "#8b5cf6",
  onStudentSelect,
}: GradientAreaChartsProps) {
  // Default data if none provided
  const defaultData = [
    { date: "Jan 1", attempts: 45, correct: 32 },
    { date: "Jan 2", attempts: 52, correct: 38 },
    { date: "Jan 3", attempts: 48, correct: 35 },
    { date: "Jan 4", attempts: 61, correct: 44 },
    { date: "Jan 5", attempts: 55, correct: 40 },
    { date: "Jan 6", attempts: 58, correct: 42 },
    { date: "Jan 7", attempts: 64, correct: 46 },
    { date: "Jan 8", attempts: 59, correct: 43 },
    { date: "Jan 9", attempts: 67, correct: 48 },
    { date: "Jan 10", attempts: 62, correct: 45 },
  ]

  const chartData = data.length > 0 ? data : defaultData

  if (type === "attempts") {
    return (
      <ChartContainer
        config={{
          attempts: {
            label: "Attempts",
            color: color,
          },
        }}
        className="h-full w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="attemptsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" hide />
            <YAxis hide />
            <Area type="monotone" dataKey="attempts" stroke={color} fillOpacity={1} fill="url(#attemptsGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    )
  }

  if (type === "success") {
    const successData = chartData.map((item) => ({
      ...item,
      successRate: (item.correct / item.attempts) * 100,
    }))

    return (
      <ChartContainer
        config={{
          successRate: {
            label: "Success Rate",
            color: color,
          },
        }}
        className="h-full w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={successData}>
            <defs>
              <linearGradient id="successGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" hide />
            <YAxis hide />
            <Area type="monotone" dataKey="successRate" stroke={color} fillOpacity={1} fill="url(#successGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    )
  }

  // Combined view - default
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Question Attempts Chart */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Question Attempts Over Time</h3>
        <p className="text-sm text-muted-foreground">Daily question attempt volume</p>
        <ChartContainer
          config={{
            attempts: {
              label: "Attempts",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[200px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
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
      </div>

      {/* Accuracy Percentage Chart */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Accuracy Percentage Trends</h3>
        <p className="text-sm text-muted-foreground">Daily accuracy percentage over time</p>
        <ChartContainer
          config={{
            accuracy: {
              label: "Accuracy %",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[200px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData.map((item) => ({
                ...item,
                accuracy: (item.correct / item.attempts) * 100,
              }))}
            >
              <defs>
                <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="accuracy"
                stroke="hsl(var(--chart-2))"
                fillOpacity={1}
                fill="url(#accuracyGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  )
}

// Export alias for compatibility
export const TrendCharts = GradientAreaCharts

// Default export
export default GradientAreaCharts
