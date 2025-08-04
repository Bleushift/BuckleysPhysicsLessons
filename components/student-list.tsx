"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, TrendingUp, TrendingDown, Clock } from "lucide-react"
import type { StudentPerformance } from "@/lib/database"

interface StudentListProps {
  students: StudentPerformance[]
  groupName: string
  onBack: () => void
  onStudentSelect: (studentId: string) => void
}

export function StudentList({ students, groupName, onBack, onStudentSelect }: StudentListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredStudents = students.filter((student) => student.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const groupAverage =
    students.length > 0 ? students.reduce((sum, student) => sum + student.success_rate, 0) / students.length : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Overview
          </Button>
          <div>
            <h2 className="text-2xl font-bold">{groupName}</h2>
            <p className="text-muted-foreground">
              {students.length} students • {groupAverage.toFixed(1)}% group average
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Student Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.map((student) => {
          const isAboveAverage = student.success_rate > groupAverage
          const lastActivity = new Date(student.last_activity)
          const daysSinceActivity = Math.floor((Date.now() - lastActivity.getTime()) / (1000 * 60 * 60 * 24))

          return (
            <Card
              key={student.student_id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onStudentSelect(student.student_id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{student.name}</CardTitle>
                  {isAboveAverage ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <CardDescription>
                  {student.total_attempts} attempts • {student.topics_attempted} topics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Success Rate</span>
                    <Badge variant={student.success_rate >= 70 ? "default" : "destructive"}>
                      {student.success_rate.toFixed(1)}%
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">vs Group Average</span>
                    <span className={`text-sm font-medium ${isAboveAverage ? "text-green-600" : "text-red-600"}`}>
                      {isAboveAverage ? "+" : ""}
                      {(student.success_rate - groupAverage).toFixed(1)}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Avg Time</span>
                    <span className="text-sm text-muted-foreground">
                      {student.avg_time_spent ? `${Math.round(student.avg_time_spent / 60)}m` : "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Last Activity</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {daysSinceActivity === 0 ? "Today" : `${daysSinceActivity}d ago`}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No students found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
