"use client"

import { Card, CardContent } from "@/components/ui/card"

interface ImprovedSpeedometerProps {
  value: number
  title: string
  subtitle?: string
  showStats?: boolean
  stats?: Array<{ label: string; value: string | number }>
  className?: string
}

export function ImprovedSpeedometer({
  value,
  title,
  subtitle,
  showStats = false,
  stats = [],
  className = "",
}: ImprovedSpeedometerProps) {
  // Ensure value is between 0 and 100
  const clampedValue = Math.max(0, Math.min(100, value))

  // Create segments for the speedometer (40 segments for smooth gradient)
  const totalSegments = 40
  const activeSegments = Math.round((clampedValue / 100) * totalSegments)

  const segments = []
  for (let i = 0; i < totalSegments; i++) {
    const angle = (i / totalSegments) * 180 - 90 // -90 to 90 degrees
    const isActive = i < activeSegments

    // Color gradient from purple to red
    let color = "#374151" // Default inactive color
    if (isActive) {
      const progress = i / totalSegments
      if (progress < 0.33) {
        // Purple to blue
        color = `hsl(${270 - progress * 60}, 70%, 60%)`
      } else if (progress < 0.66) {
        // Blue to orange
        color = `hsl(${210 - (progress - 0.33) * 180}, 70%, 60%)`
      } else {
        // Orange to red
        color = `hsl(${30 - (progress - 0.66) * 30}, 70%, 60%)`
      }
    }

    segments.push(
      <div
        key={i}
        className="absolute w-1 h-8 origin-bottom"
        style={{
          backgroundColor: color,
          transform: `rotate(${angle}deg) translateY(-80px)`,
          borderRadius: "2px",
        }}
      />,
    )
  }

  return (
    <Card className={`bg-slate-800 text-white ${className}`}>
      <CardContent className="p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
        </div>

        {/* Speedometer */}
        <div className="relative flex justify-center items-center mb-6">
          <div className="relative w-40 h-20 overflow-hidden">
            {/* Segments */}
            <div className="absolute inset-0 flex justify-center items-end">{segments}</div>

            {/* Center value */}
            <div className="absolute inset-0 flex items-end justify-center pb-2">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{Math.round(clampedValue)}%</div>
                <div className="text-xs text-slate-400">Completed Tickets</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        {showStats && stats.length > 0 && (
          <div className="grid grid-cols-3 gap-4 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
