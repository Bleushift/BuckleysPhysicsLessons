"use client"

import { useState, useEffect } from "react"
import { CSVUpload } from "@/components/csv-upload"
import { GroupOverview } from "@/components/group-overview"
import { StudentList } from "@/components/student-list"
import { StudentDetail } from "@/components/student-detail"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { ModernTopicCards } from "@/components/modern-topic-cards"
import { getDashboardData } from "@/app/actions"
import type { GroupStats, StudentPerformance, TopicPerformance } from "@/lib/database"
import { TopicsView } from "@/components/topics-view"
import { TopicDetailView } from "@/components/topic-detail-view"
import { ComparativeAnalytics } from "@/components/comparative-analytics"

type View =
  | "overview"
  | "group"
  | "student"
  | "modern-topics"
  | "topics"
  | "questions"
  | "settings"
  | "topic-detail"
  | "analytics"

export default function Dashboard() {
  const [view, setView] = useState<View>("overview")
  const [selectedGroup, setSelectedGroup] = useState<string>("")
  const [selectedStudent, setSelectedStudent] = useState<string>("")
  const [selectedTopic, setSelectedTopic] = useState<string>("")
  const [data, setData] = useState<{
    groupStats: GroupStats[]
    studentPerformance: StudentPerformance[]
    topicPerformance: TopicPerformance[]
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedTopicDetail, setSelectedTopicDetail] = useState<TopicPerformance | null>(null)

  async function loadData(groupName?: string) {
    setLoading(true)
    const result = await getDashboardData(groupName)
    if (result.success) {
      setData(result.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  function handleViewChange(newView: string) {
    setView(newView as View)
    if (newView === "overview") {
      setSelectedGroup("")
      setSelectedStudent("")
      loadData()
    }
  }

  function handleGroupSelect(groupName: string) {
    setSelectedGroup(groupName)
    setView("group")
    loadData(groupName)
  }

  function handleStudentSelect(studentId: string) {
    setSelectedStudent(studentId)
    setView("student")
  }

  function handleTopicSelect(topic: string) {
    setSelectedTopic(topic)
    console.log("Selected topic:", topic)
  }

  function handleBackToOverview() {
    setView("overview")
    setSelectedGroup("")
    loadData()
  }

  function handleBackToGroup() {
    setView("group")
    setSelectedStudent("")
  }

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex">
        <SidebarNavigation currentView={view} onViewChange={handleViewChange} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-lg font-medium text-slate-700 dark:text-slate-300">Loading dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!data || data.groupStats.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex">
        <SidebarNavigation currentView={view} onViewChange={handleViewChange} />
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-md w-full animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Ultimate Physics Dashboard</h1>
              <p className="text-slate-600 dark:text-slate-400 font-medium">
                Import your Isaac Physics data to get started with comprehensive student analytics
              </p>
            </div>
            <CSVUpload onUploadComplete={() => loadData()} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex">
      <SidebarNavigation currentView={view} onViewChange={handleViewChange} />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-soft border-b border-slate-200 dark:border-slate-700">
          <div className="px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {view === "overview"
                    ? "Dashboard Overview"
                    : view === "modern-topics"
                      ? "Physics Topics"
                      : view === "group"
                        ? `Group: ${selectedGroup}`
                        : view === "student"
                          ? "Student Details"
                          : view.charAt(0).toUpperCase() + view.slice(1)}
                </h1>
              </div>
              <CSVUpload onUploadComplete={() => loadData()} />
            </div>
          </div>
        </div>

        {/* Demo Mode Banner */}
        {!process.env.DATABASE_URL && (
          <div className="bg-blue-50/80 dark:bg-blue-900/30 backdrop-blur-sm border-b border-blue-200 dark:border-blue-700">
            <div className="px-6 lg:px-8 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-blue-800 dark:text-blue-200 font-medium">
                    <strong>Demo Mode:</strong> Running with sample data.
                    <a href="/setup" className="ml-2 text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                      Set up database →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 px-6 lg:px-8 py-8 overflow-auto">
          {view === "overview" && (
            <GroupOverview
              groupStats={data.groupStats}
              studentPerformance={data.studentPerformance}
              topicPerformance={data.topicPerformance}
              onGroupSelect={handleGroupSelect}
            />
          )}

          {view === "group" && (
            <StudentList
              students={data.studentPerformance}
              groupName={selectedGroup}
              onBack={handleBackToOverview}
              onStudentSelect={handleStudentSelect}
            />
          )}

          {view === "student" && <StudentDetail studentId={selectedStudent} onBack={handleBackToGroup} />}

          {/* Modern Topic Cards View */}
          {view === "modern-topics" && <ModernTopicCards onTopicSelect={handleTopicSelect} />}

          {view === "topics" && (
            <TopicsView
              topics={data.topicPerformance}
              onBack={() => setView("overview")}
              onTopicSelect={(topic) => {
                setSelectedTopicDetail(topic)
                setView("topic-detail")
              }}
            />
          )}

          {view === "topic-detail" && selectedTopicDetail && (
            <TopicDetailView
              topic={selectedTopicDetail}
              onBack={() => {
                setSelectedTopicDetail(null)
                setView("topics")
              }}
              onStudentSelect={(studentId) => {
                setSelectedStudent(studentId)
                setView("student")
              }}
            />
          )}

          {view === "questions" && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Questions</h2>
              <p className="text-slate-600 dark:text-slate-400">Question bank coming soon...</p>
            </div>
          )}

          {view === "settings" && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Settings</h2>
              <p className="text-slate-600 dark:text-slate-400">Settings panel coming soon...</p>
            </div>
          )}

          {view === "analytics" && (
            <ComparativeAnalytics
              groupStats={data.groupStats}
              topicPerformance={data.topicPerformance}
              onBack={() => setView("overview")}
            />
          )}
        </div>
      </div>
    </div>
  )
}
