"use server"

import { importCSVData, type CSVRow } from "@/lib/csv-import"
import {
  getGroupStats,
  getStudentPerformance,
  getTopicPerformance,
  getStudentDetailedPerformance,
} from "@/lib/database"

export async function uploadCSV(formData: FormData) {
  try {
    const file = formData.get("csvFile") as File
    if (!file) {
      return { success: false, message: "No file uploaded" }
    }

    const text = await file.text()
    const lines = text.split("\n").filter((line) => line.trim())
    const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))

    const csvData: CSVRow[] = lines
      .slice(1)
      .map((line) => {
        const values = line.split(",").map((v) => v.trim().replace(/"/g, ""))
        return {
          student_id: values[0] || "",
          student_name: values[1] || "",
          group_name: values[2] || "",
          question_id: values[3] || "",
          question_title: values[4] || "",
          topic: values[5] || "",
          subtopic: values[6] || "",
          attempt_number: Number.parseInt(values[7]) || 1,
          is_correct: values[8]?.toLowerCase() === "true",
          is_complete: values[9]?.toLowerCase() === "true",
          time_spent: Number.parseInt(values[10]) || 0,
          attempted_at: values[11] || new Date().toISOString(),
        }
      })
      .filter((row) => row.student_id && row.question_id)

    return await importCSVData(csvData)
  } catch (error) {
    console.error("Upload error:", error)
    return { success: false, message: "Failed to process CSV file" }
  }
}

export async function getDashboardData(groupName?: string) {
  try {
    const [groupStats, studentPerformance, topicPerformance] = await Promise.all([
      getGroupStats(),
      getStudentPerformance(groupName),
      getTopicPerformance(groupName),
    ])

    return {
      success: true,
      data: {
        groupStats,
        studentPerformance,
        topicPerformance,
      },
    }
  } catch (error) {
    console.error("Dashboard data error:", error)
    return { success: false, message: "Failed to load dashboard data" }
  }
}

export async function getStudentDetails(studentId: string) {
  try {
    const data = await getStudentDetailedPerformance(studentId)
    return { success: true, data }
  } catch (error) {
    console.error("Student details error:", error)
    return { success: false, message: "Failed to load student details" }
  }
}

export async function getGroupPerformance() {
  try {
    const groupStats = await getGroupStats()
    const studentPerformance = await getStudentPerformance()
    const topicPerformance = await getTopicPerformance()

    // Mock trend data for groups
    const groupsWithTrends = groupStats.map((group) => ({
      name: group.group_name,
      currentScore: group.avg_score,
      previousScore: group.avg_score - (Math.random() * 10 - 5), // Random change
      trend: Math.random() > 0.5 ? "up" : "down",
      students: group.student_count,
      successRate: group.success_rate * 100,
      totalAttempts: group.total_attempts,
    }))

    return {
      success: true,
      data: {
        groups: groupsWithTrends,
        topicPerformance,
        studentPerformance,
      },
    }
  } catch (error) {
    console.error("Error fetching group performance:", error)
    return {
      success: false,
      error: "Failed to fetch group performance data",
    }
  }
}

export async function getQuestionDetails() {
  try {
    // Mock question data with students who got questions wrong
    const mockQuestions = [
      {
        question_id: "Q001",
        question_title: "Calculate the force required to accelerate a 5kg mass at 2m/s²",
        topic: "Mechanics",
        subtopic: "Forces and Motion",
        total_attempts: 45,
        success_rate: 67.8,
        students_incorrect: [
          {
            student_id: "STU002",
            name: "Bob Smith",
            group_name: "Physics A1",
            attempts: 3,
            last_attempt: "2024-01-15T14:20:00Z",
          },
          {
            student_id: "STU005",
            name: "Edward Norton",
            group_name: "Physics A1",
            attempts: 2,
            last_attempt: "2024-01-13T11:30:00Z",
          },
          {
            student_id: "STU009",
            name: "Ian Thompson",
            group_name: "Physics A2",
            attempts: 4,
            last_attempt: "2024-01-14T16:30:00Z",
          },
        ],
      },
      {
        question_id: "Q002",
        question_title: "What is the wavelength of a wave with frequency 50Hz and speed 340m/s?",
        topic: "Waves",
        subtopic: "Wave Properties",
        total_attempts: 38,
        success_rate: 78.9,
        students_incorrect: [
          {
            student_id: "STU007",
            name: "George Wilson",
            group_name: "Physics A2",
            attempts: 2,
            last_attempt: "2024-01-14T15:20:00Z",
          },
          {
            student_id: "STU019",
            name: "Samuel Johnson",
            group_name: "Physics B2",
            attempts: 1,
            last_attempt: "2024-01-13T16:10:00Z",
          },
        ],
      },
      {
        question_id: "Q003",
        question_title: "Calculate the resistance in a circuit with voltage 12V and current 3A",
        topic: "Circuits",
        subtopic: "Electrical Circuits",
        total_attempts: 52,
        success_rate: 65.4,
        students_incorrect: [
          {
            student_id: "STU005",
            name: "Edward Norton",
            group_name: "Physics A1",
            attempts: 3,
            last_attempt: "2024-01-13T11:30:00Z",
          },
          {
            student_id: "STU009",
            name: "Ian Thompson",
            group_name: "Physics A2",
            attempts: 2,
            last_attempt: "2024-01-14T16:30:00Z",
          },
          {
            student_id: "STU016",
            name: "Priya Singh",
            group_name: "Physics B2",
            attempts: 4,
            last_attempt: "2024-01-15T12:30:00Z",
          },
          {
            student_id: "STU019",
            name: "Samuel Johnson",
            group_name: "Physics B2",
            attempts: 2,
            last_attempt: "2024-01-13T16:10:00Z",
          },
        ],
      },
      {
        question_id: "Q004",
        question_title: "Explain the photoelectric effect and calculate the maximum kinetic energy",
        topic: "Quantum",
        subtopic: "Quantum Physics",
        total_attempts: 29,
        success_rate: 48.3,
        students_incorrect: [
          {
            student_id: "STU002",
            name: "Bob Smith",
            group_name: "Physics A1",
            attempts: 4,
            last_attempt: "2024-01-14T14:20:00Z",
          },
          {
            student_id: "STU005",
            name: "Edward Norton",
            group_name: "Physics A1",
            attempts: 3,
            last_attempt: "2024-01-13T11:30:00Z",
          },
          {
            student_id: "STU007",
            name: "George Wilson",
            group_name: "Physics A2",
            attempts: 2,
            last_attempt: "2024-01-14T15:20:00Z",
          },
          {
            student_id: "STU009",
            name: "Ian Thompson",
            group_name: "Physics A2",
            attempts: 5,
            last_attempt: "2024-01-14T16:30:00Z",
          },
          {
            student_id: "STU016",
            name: "Priya Singh",
            group_name: "Physics B2",
            attempts: 3,
            last_attempt: "2024-01-15T12:30:00Z",
          },
          {
            student_id: "STU019",
            name: "Samuel Johnson",
            group_name: "Physics B2",
            attempts: 2,
            last_attempt: "2024-01-13T16:10:00Z",
          },
        ],
      },
      {
        question_id: "Q005",
        question_title: "Calculate the heat capacity of a material given mass, temperature change, and energy",
        topic: "Thermal",
        subtopic: "Heat and Temperature",
        total_attempts: 41,
        success_rate: 73.2,
        students_incorrect: [
          {
            student_id: "STU009",
            name: "Ian Thompson",
            group_name: "Physics A2",
            attempts: 2,
            last_attempt: "2024-01-14T16:30:00Z",
          },
          {
            student_id: "STU017",
            name: "Quinn Roberts",
            group_name: "Physics B2",
            attempts: 1,
            last_attempt: "2024-01-14T14:45:00Z",
          },
          {
            student_id: "STU019",
            name: "Samuel Johnson",
            group_name: "Physics B2",
            attempts: 3,
            last_attempt: "2024-01-13T16:10:00Z",
          },
        ],
      },
    ]

    return {
      success: true,
      data: mockQuestions,
    }
  } catch (error) {
    console.error("Error fetching question details:", error)
    return {
      success: false,
      error: "Failed to fetch question details",
    }
  }
}
