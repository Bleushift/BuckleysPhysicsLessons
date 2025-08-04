"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface SpeedometerProps {
  value: number
  title?: string
  size?: number
  className?: string
}

export function Speedometer({ value, title, size = 160, className = "" }: SpeedometerProps) {
  // Clamp value between 0 and 100
  const clampedValue = Math.max(0, Math.min(100, value))

  // Create data for the speedometer (semi-circle)
  // The filled portion should represent the actual percentage
  const filledValue = clampedValue
  const emptyValue = 100 - clampedValue

  const data = [
    { name: "filled", value: filledValue, color: getColor(clampedValue) },
    { name: "empty", value: emptyValue, color: "#e5e7eb" },
  ]

  function getColor(val: number) {
    if (val >= 80) return "#10b981" // Green
    if (val >= 60) return "#f59e0b" // Amber/Orange
    if (val >= 40) return "#f97316" // Orange
    return "#ef4444" // Red
  }

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {title && <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 text-center">{title}</h3>}

      <div className="relative" style={{ width: size, height: size * 0.6 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="85%"
              startAngle={180}
              endAngle={0}
              innerRadius={size * 0.35}
              outerRadius={size * 0.45}
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Value display */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          style={{ top: "15%" }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">{clampedValue.toFixed(1)}%</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Success Rate</div>
          </div>
        </div>

        {/* Scale markers */}
        <div className="absolute inset-0 pointer-events-none">
          {[0, 25, 50, 75, 100].map((mark) => {
            const angle = (mark / 100) * 180 - 90
            const radius = size * 0.28
            const x = 50 + radius * Math.cos((angle * Math.PI) / 180)
            const y = 85 + radius * Math.sin((angle * Math.PI) / 180)

            return (
              <div
                key={mark}
                className="absolute text-xs text-slate-400 dark:text-slate-500 font-medium"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {mark}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
