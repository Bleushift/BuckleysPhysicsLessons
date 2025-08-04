export interface CSVRow {
  student_id: string
  student_name: string
  group_name: string
  question_id: string
  question_title: string
  topic: string
  subtopic?: string
  is_correct: boolean
  time_spent: number
  attempt_date: string
  difficulty_level?: string
  question_type?: string
}

export interface FlexibleCSVData {
  [key: string]: string | number | boolean | Date
}

export interface CSVImportResult {
  success: boolean
  message: string
  data?: {
    processedRows: number
    students: string[]
    topics: string[]
    preview: CSVRow[]
  }
}

// Helper function to parse CSV line with proper quote handling
function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ""
  let inQuotes = false
  let i = 0

  while (i < line.length) {
    const char = line[i]
    const nextChar = line[i + 1]

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        current += '"'
        i += 2
      } else {
        // Toggle quote state
        inQuotes = !inQuotes
        i++
      }
    } else if (char === "," && !inQuotes) {
      // Field separator
      result.push(current.trim())
      current = ""
      i++
    } else {
      current += char
      i++
    }
  }

  result.push(current.trim())
  return result
}

// Helper function to detect data type
function detectDataType(value: string): string | number | boolean | Date {
  if (!value || value.trim() === "") return ""

  const trimmed = value.trim().toLowerCase()

  // Boolean detection
  if (["true", "false", "yes", "no", "1", "0"].includes(trimmed)) {
    return ["true", "yes", "1"].includes(trimmed)
  }

  // Number detection
  if (!isNaN(Number(trimmed)) && trimmed !== "") {
    return Number(trimmed)
  }

  // Date detection (basic patterns)
  const datePatterns = [
    /^\d{4}-\d{2}-\d{2}/, // YYYY-MM-DD
    /^\d{2}\/\d{2}\/\d{4}/, // MM/DD/YYYY
    /^\d{2}-\d{2}-\d{4}/, // MM-DD-YYYY
  ]

  for (const pattern of datePatterns) {
    if (pattern.test(trimmed)) {
      const date = new Date(trimmed)
      if (!isNaN(date.getTime())) {
        return date
      }
    }
  }

  return value.trim()
}

// Column mapping function
function mapColumnName(header: string): string {
  const normalized = header.toLowerCase().replace(/[_\s-]/g, "")

  const mappings: Record<string, string> = {
    studentid: "student_id",
    student: "student_id",
    id: "student_id",
    studentname: "student_name",
    name: "student_name",
    fullname: "student_name",
    groupname: "group_name",
    group: "group_name",
    class: "group_name",
    questionid: "question_id",
    question: "question_id",
    qid: "question_id",
    questiontitle: "question_title",
    title: "question_title",
    questiontext: "question_title",
    topic: "topic",
    subject: "topic",
    category: "topic",
    subtopic: "subtopic",
    subcategory: "subtopic",
    iscorrect: "is_correct",
    correct: "is_correct",
    success: "is_correct",
    result: "is_correct",
    timespent: "time_spent",
    time: "time_spent",
    duration: "time_spent",
    attemptdate: "attempt_date",
    date: "attempt_date",
    timestamp: "attempt_date",
    difficultylevel: "difficulty_level",
    difficulty: "difficulty_level",
    level: "difficulty_level",
    questiontype: "question_type",
    type: "question_type",
    format: "question_type",
  }

  return mappings[normalized] || header
}

export async function parseFlexibleCSV(csvContent: string): Promise<{
  headers: string[]
  data: FlexibleCSVData[]
}> {
  const lines = csvContent.trim().split("\n")
  if (lines.length < 2) {
    throw new Error("CSV must contain at least a header row and one data row")
  }

  const rawHeaders = parseCSVLine(lines[0])
  const headers = rawHeaders.map((h) => h.replace(/"/g, "").trim())

  const data: FlexibleCSVData[] = []

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    const values = parseCSVLine(line)
    const row: FlexibleCSVData = {}

    headers.forEach((header, index) => {
      const rawValue = values[index] || ""
      const cleanValue = rawValue.replace(/"/g, "").trim()
      row[header] = detectDataType(cleanValue)
    })

    // Only include rows that have some meaningful data
    if (Object.values(row).some((val) => val !== "" && val !== null && val !== undefined)) {
      data.push(row)
    }
  }

  return { headers, data }
}

export function mapToStandardFormat(flexibleData: FlexibleCSVData[], headers: string[]): CSVRow[] {
  return flexibleData
    .map((row) => {
      const mappedRow: Partial<CSVRow> = {}

      // Map each header to standard format
      headers.forEach((header) => {
        const standardKey = mapColumnName(header)
        const value = row[header]

        switch (standardKey) {
          case "student_id":
            mappedRow.student_id = String(value || "")
            break
          case "student_name":
            mappedRow.student_name = String(value || "")
            break
          case "group_name":
            mappedRow.group_name = String(value || "")
            break
          case "question_id":
            mappedRow.question_id = String(value || "")
            break
          case "question_title":
            mappedRow.question_title = String(value || "")
            break
          case "topic":
            mappedRow.topic = String(value || "")
            break
          case "subtopic":
            mappedRow.subtopic = String(value || "")
            break
          case "is_correct":
            if (typeof value === "boolean") {
              mappedRow.is_correct = value
            } else {
              const strValue = String(value).toLowerCase()
              mappedRow.is_correct = ["true", "yes", "1", "correct"].includes(strValue)
            }
            break
          case "time_spent":
            mappedRow.time_spent = typeof value === "number" ? value : Number.parseInt(String(value)) || 0
            break
          case "attempt_date":
            if (value instanceof Date) {
              mappedRow.attempt_date = value.toISOString()
            } else {
              mappedRow.attempt_date = String(value || new Date().toISOString())
            }
            break
          case "difficulty_level":
            mappedRow.difficulty_level = String(value || "")
            break
          case "question_type":
            mappedRow.question_type = String(value || "")
            break
        }
      })

      return mappedRow as CSVRow
    })
    .filter(
      (row) =>
        row.student_id &&
        row.student_name &&
        row.group_name &&
        row.question_id &&
        row.topic &&
        row.is_correct !== undefined,
    )
}

export async function parseCSV(csvContent: string): Promise<CSVImportResult> {
  try {
    const { headers, data } = await parseFlexibleCSV(csvContent)
    const standardData = mapToStandardFormat(data, headers)

    if (standardData.length === 0) {
      return {
        success: false,
        message: "No valid data rows found. Please check your CSV format and required columns.",
      }
    }

    // Extract unique students and topics
    const students = [...new Set(standardData.map((row) => row.student_name))].sort()
    const topics = [...new Set(standardData.map((row) => row.topic))].sort()

    return {
      success: true,
      message: `Successfully processed ${standardData.length} rows`,
      data: {
        processedRows: standardData.length,
        students,
        topics,
        preview: standardData.slice(0, 5),
      },
    }
  } catch (error) {
    return {
      success: false,
      message: `Failed to parse CSV: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

export async function analyzeCSVStructure(csvContent: string): Promise<{
  success: boolean
  analysis?: {
    totalRows: number
    headers: string[]
    mappedHeaders: Record<string, string>
    sampleData: FlexibleCSVData[]
    suggestions: string[]
  }
  message: string
}> {
  try {
    const { headers, data } = await parseFlexibleCSV(csvContent)

    const mappedHeaders: Record<string, string> = {}
    headers.forEach((header) => {
      mappedHeaders[header] = mapColumnName(header)
    })

    const suggestions: string[] = []
    const requiredFields = ["student_id", "student_name", "group_name", "question_id", "topic", "is_correct"]
    const mappedValues = Object.values(mappedHeaders)

    requiredFields.forEach((field) => {
      if (!mappedValues.includes(field)) {
        suggestions.push(`Missing required field: ${field}`)
      }
    })

    if (suggestions.length === 0) {
      suggestions.push("CSV structure looks good! All required fields are present.")
    }

    return {
      success: true,
      analysis: {
        totalRows: data.length,
        headers,
        mappedHeaders,
        sampleData: data.slice(0, 3),
        suggestions,
      },
      message: "CSV analysis completed successfully",
    }
  } catch (error) {
    return {
      success: false,
      message: `Analysis failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

export async function importCSVData(csvContent: string): Promise<CSVImportResult> {
  try {
    // For demo purposes, we'll just parse and validate the CSV
    // In a real application, this would insert data into a database
    const result = await parseCSV(csvContent)

    if (!result.success) {
      return result
    }

    // Simulate database operations
    console.log("Demo Mode: CSV data parsed successfully")
    console.log(`Students found: ${result.data?.students.join(", ")}`)
    console.log(`Topics found: ${result.data?.topics.join(", ")}`)

    return {
      success: true,
      message: `Successfully imported ${result.data?.processedRows} records from CSV`,
      data: result.data,
    }
  } catch (error) {
    return {
      success: false,
      message: `Import failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}
