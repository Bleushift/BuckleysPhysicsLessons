"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown, ChevronUp, Filter, X } from "lucide-react"

interface DashboardFiltersProps {
  selectedGroups?: string[]
  selectedTopics?: string[]
  availableGroups?: string[]
  availableTopics?: string[]
  onGroupsChange?: (groups: string[]) => void
  onTopicsChange?: (topics: string[]) => void
  onClearFilters?: () => void
}

export function DashboardFilters({
  selectedGroups = [],
  selectedTopics = [],
  availableGroups = [],
  availableTopics = [],
  onGroupsChange,
  onTopicsChange,
  onClearFilters,
}: DashboardFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleGroupToggle = (group: string) => {
    if (!onGroupsChange) return

    const newGroups = selectedGroups.includes(group)
      ? selectedGroups.filter((g) => g !== group)
      : [...selectedGroups, group]
    onGroupsChange(newGroups)
  }

  const handleTopicChange = (topic: string) => {
    if (!onTopicsChange) return

    const newTopics = selectedTopics.includes(topic)
      ? selectedTopics.filter((t) => t !== topic)
      : [...selectedTopics, topic]
    onTopicsChange(newTopics)
  }

  const handleClearAll = () => {
    if (onClearFilters) {
      onClearFilters()
    }
  }

  const totalActiveFilters = selectedGroups.length + selectedTopics.length

  return (
    <Card className="border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
      <CardContent className="p-4">
        {/* Filter Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            <span className="font-medium text-slate-900 dark:text-slate-100">Filters</span>
            {totalActiveFilters > 0 && (
              <Badge variant="secondary" className="ml-2">
                {totalActiveFilters}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {totalActiveFilters > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              >
                <X className="h-3 w-3 mr-1" />
                Clear All
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-3 w-3 mr-1" />
                  Collapse
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3 mr-1" />
                  Expand
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Active Filters Display */}
        {totalActiveFilters > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedGroups.map((group) => (
              <Badge
                key={group}
                variant="default"
                className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
              >
                {group}
                <button
                  onClick={() => handleGroupToggle(group)}
                  className="ml-1 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {selectedTopics.map((topic) => (
              <Badge
                key={topic}
                variant="default"
                className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
              >
                {topic}
                <button
                  onClick={() => handleTopicChange(topic)}
                  className="ml-1 hover:bg-green-200 dark:hover:bg-green-800 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {/* Expanded Filter Controls */}
        {isExpanded && (
          <div className="space-y-4">
            {/* Group Filters */}
            {availableGroups.length > 0 && (
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                  Class Groups
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableGroups.map((group) => (
                    <Button
                      key={group}
                      variant={selectedGroups.includes(group) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleGroupToggle(group)}
                      className={
                        selectedGroups.includes(group)
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }
                    >
                      {group}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Topic Filters */}
            {availableTopics.length > 0 && (
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                  Physics Topics
                </label>
                <Select onValueChange={handleTopicChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select topics to filter..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTopics.map((topic) => (
                      <SelectItem key={topic} value={topic}>
                        <div className="flex items-center justify-between w-full">
                          <span>{topic}</span>
                          {selectedTopics.includes(topic) && (
                            <Badge variant="secondary" className="ml-2">
                              Selected
                            </Badge>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        )}

        {/* No Filters Available Message */}
        {availableGroups.length === 0 && availableTopics.length === 0 && (
          <div className="text-center py-4 text-slate-500 dark:text-slate-400">
            <Filter className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No filter options available</p>
            <p className="text-xs">Upload data to enable filtering</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
