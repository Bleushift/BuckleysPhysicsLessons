"use client"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Settings, LogOut, Sun, Moon, Home, Users, BookOpen, Target, TrendingUp, Atom } from "lucide-react"

interface SidebarNavigationProps {
  currentView: string
  onViewChange: (view: string) => void
}

export function SidebarNavigation({ currentView, onViewChange }: SidebarNavigationProps) {
  const { theme, setTheme } = useTheme()

  const navigationItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "modern-topics", label: "Physics Topics", icon: Atom },
    { id: "students", label: "Students", icon: Users },
    { id: "topics", label: "Topic Analysis", icon: BookOpen },
    { id: "questions", label: "Questions", icon: Target },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
  ]

  return (
    <div className="w-64 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="font-bold text-lg text-slate-900 dark:text-slate-100">Physics Dashboard</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = currentView === item.id

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                isActive
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-2">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-full justify-start gap-3 text-slate-600 dark:text-slate-400"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </Button>

        {/* Settings */}
        <button
          onClick={() => onViewChange("settings")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </button>

        {/* Log out */}
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200">
          <LogOut className="h-5 w-5" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  )
}
