"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, AlertTriangle, Users, Target, TrendingDown } from "lucide-react"
import type { TopicPerformance } from "@/lib/database"

interface StrugglingTopicsViewProps {
  topics: TopicPerformance[]
  onBack: () => void
  onTopicSelect: (topic: TopicPerformance) => void
  onTopicDetailSelect?: (topic: TopicPerformance) => void
}

export function StrugglingTopicsView({
  topics,
  onBack,
  onTopicSelect,
  onTopicDetailSelect,
}: StrugglingTopicsViewProps) {
  const strugglingTopics = topics
    .filter((topic) => topic.success_rate < 60)
    .sort((a, b) => a.success_rate - b.success_rate)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-rose-500" />
            Struggling Topics
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            {strugglingTopics.length} topics with success rates below 60%
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card
          className="bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          onClick={() =>
            onTopicDetailSelect
              ? onTopicDetailSelect(strugglingTopics.filter((t) => t.success_rate < 40)[0])
              : onTopicSelect(strugglingTopics.filter((t) => t.success_rate < 40)[0])
          }
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-rose-700 dark:text-rose-300">Critical Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-900 dark:text-rose-100">
              {strugglingTopics.filter((t) => t.success_rate < 40).length}
            </div>
            <p className="text-xs text-rose-600 dark:text-rose-400">Below 40% success rate</p>
          </CardContent>
        </Card>

        <Card
          className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          onClick={() =>
            onTopicDetailSelect
              ? onTopicDetailSelect(strugglingTopics.filter((t) => t.success_rate >= 40 && t.success_rate < 60)[0])
              : onTopicSelect(strugglingTopics.filter((t) => t.success_rate >= 40 && t.success_rate < 60)[0])
          }
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-300">Needs Attention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900 dark:text-amber-100">
              {strugglingTopics.filter((t) => t.success_rate >= 40 && t.success_rate < 60).length}
            </div>
            <p className="text-xs text-amber-600 dark:text-amber-400">40-60% success rate</p>
          </CardContent>
        </Card>

        <Card
          className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          onClick={() =>
            onTopicDetailSelect
              ? onTopicDetailSelect(strugglingTopics.reduce((sum, topic) => sum + topic.struggling_students, 0))
              : onTopicSelect(strugglingTopics.reduce((sum, topic) => sum + topic.struggling_students, 0))
          }
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Total Students Affected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              {strugglingTopics.reduce((sum, topic) => sum + topic.struggling_students, 0)}
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400">Students struggling</p>
          </CardContent>
        </Card>
      </div>

      {/* Topics List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {strugglingTopics.map((topic, index) => (
          <Card
            key={index}
            className="cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            onClick={() => (onTopicDetailSelect ? onTopicDetailSelect(topic) : onTopicSelect(topic))}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {topic.topic_name}
                  </CardTitle>
                  {topic.subtopic && (
                    <CardDescription className="text-slate-600 dark:text-slate-400 font-medium">
                      {topic.subtopic}
                    </CardDescription>
                  )}
                </div>
                <Badge
                  variant="destructive"
                  className={`text-xs font-medium ${
                    topic.success_rate < 40
                      ? "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200"
                      : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                  }`}
                >
                  {topic.success_rate.toFixed(1)}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {/* Progress Bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      topic.success_rate < 40 ? "bg-rose-500" : "bg-amber-500"
                    }`}
                    style={{ width: `${Math.min(topic.success_rate, 100)}%` }}
                  />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {topic.total_attempts}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Attempts</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                    <div>
                      <div className="text-sm font-medium text-rose-600 dark:text-rose-400">
                        {topic.struggling_students}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Struggling</div>
                    </div>
                  </div>
                </div>

                {/* Severity Indicator */}
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-3 w-3 text-rose-500" />
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    {topic.success_rate < 40 ? "Critical - Immediate attention needed" : "Needs improvement"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {strugglingTopics.length === 0 && (
        <Card className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800">
          <CardContent className="text-center py-12">
            <div className="text-emerald-600 dark:text-emerald-400 mb-4">
              <Target className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-2">Great News!</h3>
            <p className="text-emerald-700 dark:text-emerald-300">
              No topics are currently struggling. All topics have success rates above 60%.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
