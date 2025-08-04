import { neon } from "@neondatabase/serverless"

// Use a fallback connection string for development if DATABASE_URL is not set
const connectionString = process.env.DATABASE_URL

let sql: any

// Enhanced mock data with multiple groups and comprehensive metrics
const mockGroupStats = [
  {
    group_name: "Physics A1",
    student_count: 24,
    total_attempts: 1247,
    avg_success_rate: 72.5,
    active_students: 22,
  },
  {
    group_name: "Physics A2",
    student_count: 26,
    total_attempts: 1398,
    avg_success_rate: 68.1,
    active_students: 24,
  },
  {
    group_name: "Physics B1",
    student_count: 22,
    total_attempts: 1156,
    avg_success_rate: 75.8,
    active_students: 20,
  },
  {
    group_name: "Physics B2",
    student_count: 25,
    total_attempts: 1289,
    avg_success_rate: 69.4,
    active_students: 23,
  },
  {
    group_name: "Physics Advanced",
    student_count: 18,
    total_attempts: 1567,
    avg_success_rate: 81.2,
    active_students: 17,
  },
]

// 20 students with realistic physics performance data
const mockStudentPerformance = [
  // Physics A1 Students
  {
    student_id: "STU001",
    name: "Alice Johnson",
    group_name: "Physics A1",
    total_attempts: 67,
    correct_attempts: 52,
    success_rate: 77.6,
    topics_attempted: 12,
    avg_time_spent: 185,
    last_activity: "2024-01-15T10:30:00Z",
  },
  {
    student_id: "STU002",
    name: "Bob Smith",
    group_name: "Physics A1",
    total_attempts: 54,
    correct_attempts: 35,
    success_rate: 64.8,
    topics_attempted: 10,
    avg_time_spent: 245,
    last_activity: "2024-01-14T14:20:00Z",
  },
  {
    student_id: "STU003",
    name: "Charlie Brown",
    group_name: "Physics A1",
    total_attempts: 72,
    correct_attempts: 58,
    success_rate: 80.6,
    topics_attempted: 13,
    avg_time_spent: 165,
    last_activity: "2024-01-15T16:45:00Z",
  },
  {
    student_id: "STU004",
    name: "Diana Prince",
    group_name: "Physics A1",
    total_attempts: 89,
    correct_attempts: 71,
    success_rate: 79.8,
    topics_attempted: 14,
    avg_time_spent: 155,
    last_activity: "2024-01-15T09:15:00Z",
  },
  {
    student_id: "STU005",
    name: "Edward Norton",
    group_name: "Physics A1",
    total_attempts: 45,
    correct_attempts: 28,
    success_rate: 62.2,
    topics_attempted: 9,
    avg_time_spent: 275,
    last_activity: "2024-01-13T11:30:00Z",
  },

  // Physics A2 Students
  {
    student_id: "STU006",
    name: "Fiona Green",
    group_name: "Physics A2",
    total_attempts: 63,
    correct_attempts: 41,
    success_rate: 65.1,
    topics_attempted: 11,
    avg_time_spent: 195,
    last_activity: "2024-01-15T13:45:00Z",
  },
  {
    student_id: "STU007",
    name: "George Wilson",
    group_name: "Physics A2",
    total_attempts: 58,
    correct_attempts: 39,
    success_rate: 67.2,
    topics_attempted: 10,
    avg_time_spent: 210,
    last_activity: "2024-01-14T15:20:00Z",
  },
  {
    student_id: "STU008",
    name: "Hannah Davis",
    group_name: "Physics A2",
    total_attempts: 71,
    correct_attempts: 48,
    success_rate: 67.6,
    topics_attempted: 12,
    avg_time_spent: 180,
    last_activity: "2024-01-15T12:10:00Z",
  },
  {
    student_id: "STU009",
    name: "Ian Thompson",
    group_name: "Physics A2",
    total_attempts: 52,
    correct_attempts: 33,
    success_rate: 63.5,
    topics_attempted: 9,
    avg_time_spent: 235,
    last_activity: "2024-01-14T16:30:00Z",
  },
  {
    student_id: "STU010",
    name: "Julia Martinez",
    group_name: "Physics A2",
    total_attempts: 66,
    correct_attempts: 47,
    success_rate: 71.2,
    topics_attempted: 11,
    avg_time_spent: 175,
    last_activity: "2024-01-15T14:25:00Z",
  },

  // Physics B1 Students
  {
    student_id: "STU011",
    name: "Kevin Lee",
    group_name: "Physics B1",
    total_attempts: 78,
    correct_attempts: 62,
    success_rate: 79.5,
    topics_attempted: 13,
    avg_time_spent: 160,
    last_activity: "2024-01-15T11:45:00Z",
  },
  {
    student_id: "STU012",
    name: "Laura White",
    group_name: "Physics B1",
    total_attempts: 69,
    correct_attempts: 53,
    success_rate: 76.8,
    topics_attempted: 12,
    avg_time_spent: 170,
    last_activity: "2024-01-15T10:15:00Z",
  },
  {
    student_id: "STU013",
    name: "Michael Chen",
    group_name: "Physics B1",
    total_attempts: 84,
    correct_attempts: 67,
    success_rate: 79.8,
    topics_attempted: 14,
    avg_time_spent: 145,
    last_activity: "2024-01-15T15:30:00Z",
  },
  {
    student_id: "STU014",
    name: "Nina Patel",
    group_name: "Physics B1",
    total_attempts: 61,
    correct_attempts: 44,
    success_rate: 72.1,
    topics_attempted: 11,
    avg_time_spent: 190,
    last_activity: "2024-01-14T13:20:00Z",
  },
  {
    student_id: "STU015",
    name: "Oliver Garcia",
    group_name: "Physics B1",
    total_attempts: 73,
    correct_attempts: 55,
    success_rate: 75.3,
    topics_attempted: 12,
    avg_time_spent: 165,
    last_activity: "2024-01-15T09:45:00Z",
  },

  // Physics B2 Students
  {
    student_id: "STU016",
    name: "Priya Singh",
    group_name: "Physics B2",
    total_attempts: 65,
    correct_attempts: 44,
    success_rate: 67.7,
    topics_attempted: 11,
    avg_time_spent: 200,
    last_activity: "2024-01-15T12:30:00Z",
  },
  {
    student_id: "STU017",
    name: "Quinn Roberts",
    group_name: "Physics B2",
    total_attempts: 59,
    correct_attempts: 41,
    success_rate: 69.5,
    topics_attempted: 10,
    avg_time_spent: 185,
    last_activity: "2024-01-14T14:45:00Z",
  },
  {
    student_id: "STU018",
    name: "Rachel Kim",
    group_name: "Physics B2",
    total_attempts: 72,
    correct_attempts: 51,
    success_rate: 70.8,
    topics_attempted: 12,
    avg_time_spent: 175,
    last_activity: "2024-01-15T11:20:00Z",
  },
  {
    student_id: "STU019",
    name: "Samuel Johnson",
    group_name: "Physics B2",
    total_attempts: 56,
    correct_attempts: 37,
    success_rate: 66.1,
    topics_attempted: 9,
    avg_time_spent: 220,
    last_activity: "2024-01-13T16:10:00Z",
  },
  {
    student_id: "STU020",
    name: "Tara Williams",
    group_name: "Physics B2",
    total_attempts: 68,
    correct_attempts: 48,
    success_rate: 70.6,
    topics_attempted: 11,
    avg_time_spent: 190,
    last_activity: "2024-01-15T13:15:00Z",
  },
]

// Updated topic performance with all specified physics topics
const mockTopicPerformance = [
  // All requested topics: Skills, Errors, Mechanics, Materials, Waves, Quantum, Circuits, Thermal, Fields, Periodic, Nuclear, Astro, Capacitor
  {
    topic_name: "Skills",
    subtopic: "Mathematical Skills",
    total_attempts: 234,
    success_rate: 81.2,
    avg_time_spent: 120,
    struggling_students: 3,
    group_average: 83.6,
  },
  {
    topic_name: "Errors",
    subtopic: "Experimental Errors",
    total_attempts: 198,
    success_rate: 77.5,
    avg_time_spent: 135,
    struggling_students: 4,
    group_average: 79.3,
  },
  {
    topic_name: "Mechanics",
    subtopic: "Forces and Motion",
    total_attempts: 567,
    success_rate: 72.4,
    avg_time_spent: 195,
    struggling_students: 8,
    group_average: 74.2,
  },
  {
    topic_name: "Materials",
    subtopic: "Properties of Materials",
    total_attempts: 334,
    success_rate: 75.6,
    avg_time_spent: 155,
    struggling_students: 6,
    group_average: 77.9,
  },
  {
    topic_name: "Waves",
    subtopic: "Wave Properties",
    total_attempts: 445,
    success_rate: 78.4,
    avg_time_spent: 145,
    struggling_students: 5,
    group_average: 76.8,
  },
  {
    topic_name: "Quantum",
    subtopic: "Quantum Physics",
    total_attempts: 423,
    success_rate: 58.8,
    avg_time_spent: 265,
    struggling_students: 18,
    group_average: 61.2,
  },
  {
    topic_name: "Circuits",
    subtopic: "Electrical Circuits",
    total_attempts: 489,
    success_rate: 68.2,
    avg_time_spent: 285,
    struggling_students: 12,
    group_average: 70.1,
  },
  {
    topic_name: "Thermal",
    subtopic: "Heat and Temperature",
    total_attempts: 398,
    success_rate: 71.3,
    avg_time_spent: 205,
    struggling_students: 9,
    group_average: 73.2,
  },
  {
    topic_name: "Fields",
    subtopic: "Electric and Magnetic Fields",
    total_attempts: 356,
    success_rate: 69.2,
    avg_time_spent: 175,
    struggling_students: 11,
    group_average: 71.8,
  },
  {
    topic_name: "Periodic",
    subtopic: "Periodic Motion",
    total_attempts: 187,
    success_rate: 70.3,
    avg_time_spent: 180,
    struggling_students: 8,
    group_average: 72.8,
  },
  {
    topic_name: "Nuclear",
    subtopic: "Nuclear Physics",
    total_attempts: 312,
    success_rate: 62.9,
    avg_time_spent: 225,
    struggling_students: 16,
    group_average: 65.7,
  },
  {
    topic_name: "Astro",
    subtopic: "Astrophysics",
    total_attempts: 267,
    success_rate: 58.8,
    avg_time_spent: 245,
    struggling_students: 18,
    group_average: 61.2,
  },
  {
    topic_name: "Capacitor",
    subtopic: "Capacitance",
    total_attempts: 289,
    success_rate: 73.5,
    avg_time_spent: 160,
    struggling_students: 7,
    group_average: 75.3,
  },
]

if (connectionString) {
  try {
    sql = neon(connectionString)
    console.log("Database connection established")
  } catch (error) {
    console.error("Database connection failed:", error)
    sql = null
  }
} else {
  console.log("No DATABASE_URL found, running in demo mode with mock data")
  sql = null
}

export interface StudentPerformance {
  student_id: string
  name: string
  group_name: string
  total_attempts: number
  correct_attempts: number
  success_rate: number
  topics_attempted: number
  avg_time_spent: number
  last_activity: string
}

export interface GroupStats {
  group_name: string
  student_count: number
  total_attempts: number
  avg_success_rate: number
  active_students: number
}

export interface TopicPerformance {
  topic_name: string
  subtopic: string | null
  total_attempts: number
  success_rate: number
  avg_time_spent: number
  struggling_students: number
  group_average?: number
}

export async function getGroupStats(): Promise<GroupStats[]> {
  if (!sql) {
    console.log("Using mock group stats data")
    return mockGroupStats
  }

  try {
    const result = await sql`
      SELECT 
        s.group_name,
        COUNT(DISTINCT s.student_id) as student_count,
        COUNT(a.id) as total_attempts,
        ROUND(AVG(CASE WHEN a.is_correct THEN 100.0 ELSE 0.0 END), 2) as avg_success_rate,
        COUNT(DISTINCT CASE WHEN a.attempted_at >= NOW() - INTERVAL '7 days' THEN s.student_id END) as active_students
      FROM students s
      LEFT JOIN attempts a ON s.student_id = a.student_id
      GROUP BY s.group_name
      ORDER BY s.group_name
    `
    return result as GroupStats[]
  } catch (error) {
    console.error("Database query failed, using mock data:", error)
    return mockGroupStats
  }
}

export async function getStudentPerformance(groupName?: string): Promise<StudentPerformance[]> {
  if (!sql) {
    console.log("Using mock student performance data")
    return groupName ? mockStudentPerformance.filter((s) => s.group_name === groupName) : mockStudentPerformance
  }

  try {
    const result = await sql`
      SELECT 
        s.student_id,
        s.name,
        s.group_name,
        COUNT(a.id) as total_attempts,
        COUNT(CASE WHEN a.is_correct THEN 1 END) as correct_attempts,
        ROUND(
          CASE 
            WHEN COUNT(a.id) > 0 
            THEN (COUNT(CASE WHEN a.is_correct THEN 1 END)::float / COUNT(a.id)) * 100 
            ELSE 0 
          END, 2
        ) as success_rate,
        COUNT(DISTINCT q.topic_id) as topics_attempted,
        ROUND(AVG(a.time_spent), 0) as avg_time_spent,
        MAX(a.attempted_at) as last_activity
      FROM students s
      LEFT JOIN attempts a ON s.student_id = a.student_id
      LEFT JOIN questions q ON a.question_id = q.question_id
      ${groupName ? sql`WHERE s.group_name = ${groupName}` : sql``}
      GROUP BY s.student_id, s.name, s.group_name
      ORDER BY success_rate DESC, total_attempts DESC
    `
    return result as StudentPerformance[]
  } catch (error) {
    console.error("Database query failed, using mock data:", error)
    return groupName ? mockStudentPerformance.filter((s) => s.group_name === groupName) : mockStudentPerformance
  }
}

export async function getTopicPerformance(groupName?: string): Promise<TopicPerformance[]> {
  if (!sql) {
    console.log("Using mock topic performance data")
    return mockTopicPerformance
  }

  try {
    const result = await sql`
      SELECT 
        t.topic_name,
        t.subtopic,
        COUNT(a.id) as total_attempts,
        ROUND(
          CASE 
            WHEN COUNT(a.id) > 0 
            THEN (COUNT(CASE WHEN a.is_correct THEN 1 END)::float / COUNT(a.id)) * 100 
            ELSE 0 
          END, 2
        ) as success_rate,
        ROUND(AVG(a.time_spent), 0) as avg_time_spent,
        COUNT(DISTINCT CASE 
          WHEN (
            SELECT COUNT(CASE WHEN a2.is_correct THEN 1 END)::float / COUNT(a2.id)
            FROM attempts a2 
            JOIN questions q2 ON a2.question_id = q2.question_id
            WHERE a2.student_id = a.student_id AND q2.topic_id = q.topic_id
          ) < 0.5 THEN a.student_id 
        END) as struggling_students
      FROM topics t
      LEFT JOIN questions q ON t.id = q.topic_id
      LEFT JOIN attempts a ON q.question_id = a.question_id
      ${groupName ? sql`LEFT JOIN students s ON a.student_id = s.student_id WHERE s.group_name = ${groupName}` : sql``}
      GROUP BY t.id, t.topic_name, t.subtopic
      HAVING COUNT(a.id) > 0
      ORDER BY success_rate ASC, total_attempts DESC
    `
    return result as TopicPerformance[]
  } catch (error) {
    console.error("Database query failed, using mock data:", error)
    return mockTopicPerformance
  }
}

export async function getStudentDetailedPerformance(studentId: string) {
  if (!sql) {
    console.log("Using mock student detailed performance data")
    const mockPerformance = [
      {
        topic_name: "Mechanics",
        subtopic: "Forces and Motion",
        attempts: 12,
        correct: 8,
        avg_time: 180,
        last_attempt: "2024-01-15T10:30:00Z",
        group_average: 74.2,
      },
      {
        topic_name: "Waves",
        subtopic: "Wave Properties",
        attempts: 8,
        correct: 6,
        avg_time: 145,
        last_attempt: "2024-01-14T14:20:00Z",
        group_average: 76.8,
      },
      {
        topic_name: "Circuits",
        subtopic: "Electrical Circuits",
        attempts: 15,
        correct: 10,
        avg_time: 285,
        last_attempt: "2024-01-13T16:45:00Z",
        group_average: 70.1,
      },
    ]

    const mockTimeline = [
      { date: "2024-01-10", attempts: 5, correct: 3, class_average: 4.2 },
      { date: "2024-01-11", attempts: 8, correct: 6, class_average: 5.1 },
      { date: "2024-01-12", attempts: 3, correct: 2, class_average: 3.8 },
      { date: "2024-01-13", attempts: 7, correct: 4, class_average: 4.5 },
      { date: "2024-01-14", attempts: 6, correct: 5, class_average: 4.9 },
      { date: "2024-01-15", attempts: 4, correct: 3, class_average: 4.1 },
    ]

    return { performance: mockPerformance, timeline: mockTimeline }
  }

  try {
    const performance = await sql`
      SELECT 
        t.topic_name,
        t.subtopic,
        COUNT(a.id) as attempts,
        COUNT(CASE WHEN a.is_correct THEN 1 END) as correct,
        ROUND(AVG(a.time_spent), 0) as avg_time,
        MAX(a.attempted_at) as last_attempt
      FROM topics t
      JOIN questions q ON t.id = q.topic_id
      JOIN attempts a ON q.question_id = a.question_id
      WHERE a.student_id = ${studentId}
      GROUP BY t.id, t.topic_name, t.subtopic
      ORDER BY t.topic_name, t.subtopic
    `

    const timeline = await sql`
      SELECT 
        DATE(a.attempted_at) as date,
        COUNT(a.id) as attempts,
        COUNT(CASE WHEN a.is_correct THEN 1 END) as correct
      FROM attempts a
      WHERE a.student_id = ${studentId}
      AND a.attempted_at >= NOW() - INTERVAL '30 days'
      GROUP BY DATE(a.attempted_at)
      ORDER BY date
    `

    return { performance, timeline }
  } catch (error) {
    console.error("Database query failed, using mock data:", error)
    const mockPerformance = [
      {
        topic_name: "Mechanics",
        subtopic: "Forces and Motion",
        attempts: 12,
        correct: 8,
        avg_time: 180,
        last_attempt: "2024-01-15T10:30:00Z",
        group_average: 74.2,
      },
    ]

    const mockTimeline = [{ date: "2024-01-15", attempts: 4, correct: 3, class_average: 4.1 }]

    return { performance: mockPerformance, timeline: mockTimeline }
  }
}
