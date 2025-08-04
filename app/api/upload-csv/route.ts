import { type NextRequest, NextResponse } from "next/server"
import { importCSVData } from "@/lib/csv-import"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 })
    }

    // Validate file type
    if (!file.name.endsWith(".csv")) {
      return NextResponse.json({ success: false, message: "Please upload a CSV file" }, { status: 400 })
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: "File size too large. Maximum 10MB allowed." },
        { status: 400 },
      )
    }

    const csvContent = await file.text()

    // Basic CSV validation
    if (!csvContent.trim()) {
      return NextResponse.json({ success: false, message: "CSV file is empty" }, { status: 400 })
    }

    // Parse and import CSV data
    const result = await importCSVData(csvContent)

    if (!result.success) {
      return NextResponse.json({ success: false, message: result.message }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: `Successfully processed ${result.data?.processedRows || 0} rows from ${file.name}`,
      data: {
        filename: file.name,
        rows: result.data?.processedRows || 0,
        students: result.data?.students || [],
        topics: result.data?.topics || [],
        preview: result.data?.preview || [],
      },
    })
  } catch (error) {
    console.error("CSV upload error:", error)
    return NextResponse.json(
      {
        success: false,
        message: `Upload failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 500 },
    )
  }
}
