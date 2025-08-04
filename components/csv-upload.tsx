"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, CheckCircle, XCircle, Download, Users, BookOpen } from "lucide-react"

interface CSVUploadProps {
  onUploadComplete?: (data: any) => void
}

export function CSVUpload({ onUploadComplete }: CSVUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<any>(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFileSelect(files[0])
    }
  }

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.type !== "text/csv" && !selectedFile.name.endsWith(".csv")) {
      setUploadResult({
        success: false,
        message: "Please select a CSV file",
      })
      return
    }

    setFile(selectedFile)
    setUploadResult(null)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      handleFileSelect(files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setUploadResult(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload-csv", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()
      setUploadResult(result)

      if (result.success && onUploadComplete) {
        onUploadComplete(result.data)
      }
    } catch (error) {
      setUploadResult({
        success: false,
        message: "Upload failed. Please try again.",
      })
    } finally {
      setUploading(false)
    }
  }

  const downloadSampleCSV = () => {
    const sampleData = `student_id,student_name,group_name,question_id,question_title,topic,subtopic,is_correct,time_spent,attempt_date
STU001,Alice Johnson,Physics A1,Q001,Newton's First Law,Mechanics,Forces,true,120,2024-01-15T10:30:00Z
STU001,Alice Johnson,Physics A1,Q002,Ohm's Law,Circuits,Basic Circuits,false,180,2024-01-15T10:35:00Z
STU002,Bob Smith,Physics A1,Q001,Newton's First Law,Mechanics,Forces,true,95,2024-01-15T11:00:00Z
STU002,Bob Smith,Physics A1,Q003,Wave Frequency,Waves,Properties,true,140,2024-01-15T11:05:00Z
STU003,Charlie Brown,Physics B1,Q002,Ohm's Law,Circuits,Basic Circuits,false,220,2024-01-15T14:20:00Z`

    const blob = new Blob([sampleData], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "sample_physics_data.csv"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Physics Data
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Upload your CSV file containing student performance data to get started with analytics.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-lg font-medium">
                  {file ? file.name : "Choose your physics data CSV file to upload"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Drag and drop your file here, or click to browse</p>
              </div>
              <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                Choose File
              </Button>
              <input ref={fileInputRef} type="file" accept=".csv" onChange={handleFileInputChange} className="hidden" />
            </div>
          </div>

          {/* File Info */}
          {file && (
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <Button onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          )}

          {/* Upload Progress */}
          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading and processing...</span>
                <span>Please wait</span>
              </div>
              <Progress value={undefined} className="w-full" />
            </div>
          )}

          {/* Upload Result */}
          {uploadResult && (
            <Alert className={uploadResult.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
              <div className="flex items-center gap-2">
                {uploadResult.success ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertDescription className={uploadResult.success ? "text-green-800" : "text-red-800"}>
                  {uploadResult.message}
                </AlertDescription>
              </div>
            </Alert>
          )}

          {/* Data Preview */}
          {uploadResult?.success && uploadResult.data && (
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-green-800 dark:text-green-200">
                  ✅ Data Successfully Processed
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-green-600" />
                    <div>
                      <div className="font-semibold text-green-800 dark:text-green-200">{uploadResult.data.rows}</div>
                      <div className="text-xs text-green-600 dark:text-green-400">Records processed</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-green-600" />
                    <div>
                      <div className="font-semibold text-green-800 dark:text-green-200">
                        {uploadResult.data.students?.length || 0}
                      </div>
                      <div className="text-xs text-green-600 dark:text-green-400">Students found</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-green-600" />
                    <div>
                      <div className="font-semibold text-green-800 dark:text-green-200">
                        {uploadResult.data.topics?.length || 0}
                      </div>
                      <div className="text-xs text-green-600 dark:text-green-400">Topics covered</div>
                    </div>
                  </div>
                </div>

                {/* Student Names */}
                {uploadResult.data.students && uploadResult.data.students.length > 0 && (
                  <div>
                    <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Students Found:</h4>
                    <div className="flex flex-wrap gap-1">
                      {uploadResult.data.students.slice(0, 10).map((student: string, index: number) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                        >
                          {student}
                        </Badge>
                      ))}
                      {uploadResult.data.students.length > 10 && (
                        <Badge variant="outline" className="text-xs">
                          +{uploadResult.data.students.length - 10} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Topics */}
                {uploadResult.data.topics && uploadResult.data.topics.length > 0 && (
                  <div>
                    <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Topics Found:</h4>
                    <div className="flex flex-wrap gap-1">
                      {uploadResult.data.topics.slice(0, 8).map((topic: string, index: number) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                        >
                          {topic}
                        </Badge>
                      ))}
                      {uploadResult.data.topics.length > 8 && (
                        <Badge variant="outline" className="text-xs">
                          +{uploadResult.data.topics.length - 8} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Sample CSV Download */}
          <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div>
              <p className="font-medium text-blue-900 dark:text-blue-100">Need a sample CSV format?</p>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Download our sample CSV to see the expected format
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadSampleCSV}
              className="border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent"
            >
              <Download className="h-4 w-4 mr-2" />
              Sample CSV
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
