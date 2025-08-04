"use client"

import {
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Treemap,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const COLORS = {
  primary: "#3b82f6",
  secondary: "#8b5cf6",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  info: "#06b6d4",
  muted: "#6b7280",
}

interface DonutChartProps {
  data: Array<{ name: string; value: number; color?: string }>
  title?: string
  centerText?: string
  showLegend?: boolean
}

export function DonutChart({ data, title, centerText, showLegend = true }: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="relative w-full">
      {title && <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-4">{title}</h3>}

      <div className="relative">
        <ChartContainer config={{}} className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color || Object.values(COLORS)[index % Object.values(COLORS).length]}
                  />
                ))}
              </Pie>
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload[0]) {
                    const data = payload[0].payload
                    const percentage = ((data.value / total) * 100).toFixed(1)
                    return (
                      <div className="bg-white dark:bg-slate-800 p-3 border border-slate-200 dark:border-slate-600 rounded-lg shadow-soft">
                        <p className="font-medium text-slate-900 dark:text-slate-100">{data.name}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {data.value} ({percentage}%)
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Center text - positioned absolutely to avoid overlap */}
        {centerText && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{centerText}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Total</div>
            </div>
          </div>
        )}
      </div>

      {/* Legend below the chart */}
      {showLegend && (
        <div className="mt-4 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color || Object.values(COLORS)[index % Object.values(COLORS).length] }}
                />
                <span className="text-slate-600 dark:text-slate-400 font-medium">{item.name}</span>
              </div>
              <span className="font-semibold text-slate-900 dark:text-slate-100">{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

interface GradientAreaChartProps {
  data: Array<{ name: string; value: number; secondary?: number }>
  title?: string
  gradientFrom?: string
  gradientTo?: string
}

export function GradientAreaChart({
  data,
  title,
  gradientFrom = "#3b82f6",
  gradientTo = "#8b5cf6",
}: GradientAreaChartProps) {
  return (
    <div className="w-full">
      {title && <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-4">{title}</h3>}
      <ChartContainer
        config={{
          value: { label: "Value", color: gradientFrom },
          secondary: { label: "Secondary", color: gradientTo },
        }}
        className="h-[250px] w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={gradientFrom} stopOpacity={0.3} />
                <stop offset="95%" stopColor={gradientFrom} stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="colorSecondary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={gradientTo} stopOpacity={0.3} />
                <stop offset="95%" stopColor={gradientTo} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={gradientFrom}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
            {data[0]?.secondary !== undefined && (
              <Area
                type="monotone"
                dataKey="secondary"
                stroke={gradientTo}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorSecondary)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}

interface RadarChartProps {
  data: Array<{ subject: string; A: number; B?: number; fullMark: number }>
  title?: string
}

export function StudentRadarChart({ data, title }: RadarChartProps) {
  return (
    <div className="w-full">
      {title && <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-4">{title}</h3>}
      <ChartContainer
        config={{
          A: { label: "Student", color: COLORS.primary },
          B: { label: "Class Average", color: COLORS.secondary },
        }}
        className="h-[300px] w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#64748b" }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: "#64748b" }} />
            <Radar
              name="Student"
              dataKey="A"
              stroke={COLORS.primary}
              fill={COLORS.primary}
              fillOpacity={0.2}
              strokeWidth={2}
            />
            {data[0]?.B !== undefined && (
              <Radar
                name="Class Average"
                dataKey="B"
                stroke={COLORS.secondary}
                fill={COLORS.secondary}
                fillOpacity={0.1}
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            )}
            <ChartTooltip content={<ChartTooltipContent />} />
          </RadarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}

interface TreemapChartProps {
  data: Array<{ name: string; size: number; color?: string }>
  title?: string
}

export function TreemapChart({ data, title }: TreemapChartProps) {
  return (
    <div className="w-full">
      {title && <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-4">{title}</h3>}
      <ChartContainer config={{}} className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={data}
            dataKey="size"
            aspectRatio={4 / 3}
            stroke="#fff"
            strokeWidth={2}
            content={({ root, depth, x, y, width, height, index, payload, colors }) => {
              return (
                <g>
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    style={{
                      fill: payload?.color || COLORS.primary,
                      fillOpacity: depth < 2 ? 0.8 : 0.6,
                    }}
                  />
                  {width > 50 && height > 25 && (
                    <text
                      x={x + width / 2}
                      y={y + height / 2}
                      textAnchor="middle"
                      fill="#fff"
                      fontSize={Math.min(width / 8, height / 3, 12)}
                      fontWeight="600"
                      dominantBaseline="middle"
                    >
                      {payload?.name}
                    </text>
                  )}
                  {width > 70 && height > 40 && (
                    <text
                      x={x + width / 2}
                      y={y + height / 2 + 15}
                      textAnchor="middle"
                      fill="#fff"
                      fontSize={Math.min(width / 12, height / 5, 10)}
                      opacity={0.8}
                      dominantBaseline="middle"
                    >
                      {payload?.size} attempts
                    </text>
                  )}
                </g>
              )
            }}
          />
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
