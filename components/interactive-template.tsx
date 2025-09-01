"use client"

import type React from "react"

import { useState, useEffect, useMemo, useCallback, memo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { dropdownData, templateConfigs } from "@/lib/template-data"
import Image from "next/image"

interface Task {
  id: string
  text: string
  completed: boolean
  priority: string
  category: string
  timeframe: string
}

interface TemplateProps {
  templateId: string
  templateName: string
  templateDescription: string
}

export const InteractiveTemplate = memo(function InteractiveTemplate({
  templateId,
  templateName,
  templateDescription,
}: TemplateProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")
  const [selectedPriority, setSelectedPriority] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedTimeframe, setSelectedTimeframe] = useState("")
  const [notes, setNotes] = useState("")
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")
  const [showSaveAnimation, setShowSaveAnimation] = useState(false)

  const templateConfig = useMemo(() => {
    return templateConfigs[templateId as keyof typeof templateConfigs]
  }, [templateId])

  const dropdownOptions = useMemo(() => {
    if (!templateConfig) {
      return {
        category: dropdownData.goalCategories,
        priority: dropdownData.priorityLevels,
        timeframe: dropdownData.timeFrames,
      }
    }

    const categoryKey = templateConfig.dropdowns.category
    return {
      category: dropdownData[categoryKey as keyof typeof dropdownData] || dropdownData.goalCategories,
      priority: dropdownData.priorityLevels,
      timeframe: dropdownData.timeFrames,
    }
  }, [templateConfig])

  const completionPercentage = useMemo(() => {
    return tasks.length > 0 ? Math.round((tasks.filter((t) => t.completed).length / tasks.length) * 100) : 0
  }, [tasks])

  const tasksByCategory = useMemo(() => {
    return tasks.reduce(
      (acc, task) => {
        if (!acc[task.category]) {
          acc[task.category] = []
        }
        acc[task.category].push(task)
        return acc
      },
      {} as Record<string, Task[]>,
    )
  }, [tasks])

  const taskStats = useMemo(() => {
    const completed = tasks.filter((t) => t.completed).length
    const remaining = tasks.length - completed
    return { total: tasks.length, completed, remaining }
  }, [tasks])

  useEffect(() => {
    const savedData = localStorage.getItem(`template-${templateId}`)

    if (savedData) {
      const parsed = JSON.parse(savedData)
      setTasks(parsed.tasks || [])
      setNotes(parsed.notes || "")
    } else if (templateConfig) {
      // Pre-populate with template's default tasks
      const defaultTasks: Task[] = []
      templateConfig.sections.forEach((section, sectionIndex) => {
        section.tasks.forEach((taskText, taskIndex) => {
          defaultTasks.push({
            id: `${sectionIndex}-${taskIndex}-${Date.now()}`,
            text: taskText,
            completed: false,
            priority: "Medium",
            category: section.title,
            timeframe: "This Week",
          })
        })
      })
      setTasks(defaultTasks)
    }
  }, [templateId, templateConfig])

  useEffect(() => {
    if (tasks.length > 0 || notes.trim()) {
      setSaveStatus("saving")
      setShowSaveAnimation(true)

      const dataToSave = { tasks, notes }

      const saveTimer = setTimeout(() => {
        try {
          localStorage.setItem(`template-${templateId}`, JSON.stringify(dataToSave))
          setSaveStatus("saved")
          setTimeout(() => {
            setShowSaveAnimation(false)
          }, 2000)
        } catch (error) {
          setSaveStatus("error")
          setTimeout(() => {
            setShowSaveAnimation(false)
          }, 3000)
        }
      }, 500) // 500ms debounce

      return () => clearTimeout(saveTimer)
    }
  }, [tasks, notes, templateId])

  const addTask = useCallback(() => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        text: newTask,
        completed: false,
        priority: selectedPriority || "Medium",
        category: selectedCategory || "General",
        timeframe: selectedTimeframe || "This Week",
      }
      setTasks((prev) => [...prev, task])
      setNewTask("")
    }
  }, [newTask, selectedPriority, selectedCategory, selectedTimeframe])

  const toggleTask = useCallback((taskId: string) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }, [])

  const deleteTask = useCallback((taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
  }, [])

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        addTask()
      }
    },
    [addTask],
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header with PlannerFlow logo */}
      <div className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <Image
                  src="/logo-black.png"
                  alt="PlannerFlow - Create. Focus. Repeat."
                  width={180}
                  height={60}
                  className="h-8 sm:h-10 w-auto"
                  priority
                />
              </div>
              <div className="hidden sm:block h-6 w-px bg-border" />
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-foreground">{templateName}</h1>
                <p className="text-sm text-muted-foreground">{templateDescription}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.history.back()}
              className="bg-primary text-primary-foreground hover:bg-white hover:text-primary cursor-pointer"
            >
              <span className="hidden sm:inline">Back to Templates</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </div>
          <div className="sm:hidden mt-3 pt-3 border-t border-border">
            <h1 className="text-lg font-semibold text-foreground">{templateName}</h1>
            <p className="text-sm text-muted-foreground">{templateDescription}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Progress Overview */}
            <Card className="border-border bg-card transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-card-foreground flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Progress Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Completion</span>
                  <span className="text-sm font-medium text-card-foreground">{completionPercentage}%</span>
                </div>
                <div className="relative">
                  <Progress value={completionPercentage} className="h-3 transition-all duration-700 ease-out" />
                  {completionPercentage > 0 && (
                    <div
                      className="absolute top-0 left-0 h-3 bg-gradient-to-r from-primary/20 to-transparent rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                  <div className="p-2 sm:p-3 rounded-lg bg-background/50 transition-all duration-300 hover:bg-background/80">
                    <div className="text-xl sm:text-2xl font-bold text-primary transition-all duration-500">
                      {taskStats.total}
                    </div>
                    <div className="text-xs text-muted-foreground">Total Tasks</div>
                  </div>
                  <div className="p-2 sm:p-3 rounded-lg bg-background/50 transition-all duration-300 hover:bg-background/80">
                    <div className="text-xl sm:text-2xl font-bold text-accent transition-all duration-500">
                      {taskStats.completed}
                    </div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
                  <div className="p-2 sm:p-3 rounded-lg bg-background/50 transition-all duration-300 hover:bg-background/80">
                    <div className="text-xl sm:text-2xl font-bold text-muted-foreground transition-all duration-500">
                      {taskStats.remaining}
                    </div>
                    <div className="text-xs text-muted-foreground">Remaining</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add New Task */}
            <Card className="border-border bg-card transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-card-foreground">Add New Task</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Enter task description..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="transition-all duration-200 focus:scale-[1.02]"
                />
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                    <SelectTrigger className="transition-all duration-200 hover:bg-muted/50">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {dropdownOptions.priority.map((priority) => (
                        <SelectItem key={priority} value={priority}>
                          {priority}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="transition-all duration-200 hover:bg-muted/50">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {dropdownOptions.category.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                    <SelectTrigger className="transition-all duration-200 hover:bg-muted/50">
                      <SelectValue placeholder="Timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      {dropdownOptions.timeframe.map((timeframe) => (
                        <SelectItem key={timeframe} value={timeframe}>
                          {timeframe}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={addTask}
                  className="w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  Add Task
                </Button>
              </CardContent>
            </Card>

            {/* Tasks List - Organized by Category */}
            {Object.keys(tasksByCategory).length === 0 ? (
              <Card className="border-border bg-card transition-all duration-300 hover:shadow-md">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="text-card-foreground">Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 sm:py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        />
                      </svg>
                    </div>
                    <p className="text-muted-foreground">Loading your template tasks...</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              Object.entries(tasksByCategory).map(([category, categoryTasks]) => (
                <TaskCategory
                  key={category}
                  category={category}
                  tasks={categoryTasks}
                  onToggleTask={toggleTask}
                  onDeleteTask={deleteTask}
                />
              ))
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Notes */}
            <Card className="border-border bg-card transition-all duration-300 hover:shadow-md">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-card-foreground">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Add your notes here..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={6}
                  className="transition-all duration-200 focus:scale-[1.02] resize-none"
                />
              </CardContent>
            </Card>

            {/* Auto-save indicator */}
            <Card
              className={`border-border bg-card transition-all duration-500 ${showSaveAnimation ? "ring-2 ring-primary/20 shadow-lg" : ""}`}
            >
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex items-center gap-3 text-sm">
                  <div className="relative">
                    <div
                      className={`w-3 h-3 rounded-full transition-all duration-500 ${
                        saveStatus === "saving"
                          ? "bg-primary animate-pulse scale-110"
                          : saveStatus === "saved"
                            ? "bg-green-500 animate-bounce"
                            : saveStatus === "error"
                              ? "bg-red-500 animate-pulse"
                              : "bg-muted"
                      }`}
                    />
                    {saveStatus === "saved" && (
                      <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500/30 animate-ping" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div
                      className={`transition-all duration-300 ${
                        saveStatus === "saving"
                          ? "text-primary font-medium"
                          : saveStatus === "saved"
                            ? "text-green-600 font-medium"
                            : saveStatus === "error"
                              ? "text-red-600 font-medium"
                              : "text-muted-foreground"
                      }`}
                    >
                      {saveStatus === "saving" && "Auto-saving your progress..."}
                      {saveStatus === "saved" && "✓ Updated successfully"}
                      {saveStatus === "error" && "⚠ Save failed"}
                      {saveStatus === "idle" && "Ready to save"}
                    </div>
                    {saveStatus === "saving" && (
                      <div className="w-full bg-muted rounded-full h-1 mt-2 overflow-hidden">
                        <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: "60%" }} />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card transition-all duration-300 hover:shadow-md lg:hidden">
              <CardContent className="pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{completionPercentage}%</div>
                  <div className="text-xs text-muted-foreground mb-3">Complete</div>
                  <div className="flex justify-center gap-4 text-xs">
                    <div>
                      <span className="font-medium text-foreground">{taskStats.completed}</span>
                      <span className="text-muted-foreground"> done</span>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">{taskStats.remaining}</span>
                      <span className="text-muted-foreground"> left</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
})

const TaskCategory = memo(function TaskCategory({
  category,
  tasks,
  onToggleTask,
  onDeleteTask,
}: {
  category: string
  tasks: Task[]
  onToggleTask: (taskId: string) => void
  onDeleteTask: (taskId: string) => void
}) {
  const completedCount = useMemo(() => tasks.filter((t) => t.completed).length, [tasks])

  return (
    <Card className="border-border bg-card transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="text-card-foreground flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent" />
          {category}
          <span className="text-sm text-muted-foreground ml-auto">
            {completedCount}/{tasks.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.map((task, index) => (
            <TaskItem key={task.id} task={task} index={index} onToggle={onToggleTask} onDelete={onDeleteTask} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
})

const TaskItem = memo(function TaskItem({
  task,
  index,
  onToggle,
  onDelete,
}: {
  task: Task
  index: number
  onToggle: (taskId: string) => void
  onDelete: (taskId: string) => void
}) {
  const handleToggle = useCallback(() => onToggle(task.id), [task.id, onToggle])
  const handleDelete = useCallback(() => onDelete(task.id), [task.id, onDelete])

  return (
    <div
      className="flex items-center gap-3 p-3 sm:p-4 rounded-lg border border-border bg-background/50 transition-all duration-300 hover:bg-background/80 hover:shadow-sm animate-in slide-in-from-top-2"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Checkbox
        checked={task.completed}
        onCheckedChange={handleToggle}
        className="transition-all duration-200 hover:scale-110"
      />
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm transition-all duration-300 ${
            task.completed ? "line-through text-muted-foreground opacity-60" : "text-card-foreground"
          }`}
        >
          {task.text}
        </p>
        <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary transition-all duration-200 hover:bg-primary/20">
            {task.priority}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground transition-all duration-200 hover:bg-muted/80">
            {task.timeframe}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggle}
          className={`transition-all duration-200 hover:scale-110 active:scale-95 ${
            task.completed
              ? "text-primary hover:bg-black hover:text-white"
              : "text-primary hover:bg-green-600 hover:text-white"
          }`}
        >
          <span className="hidden sm:inline">{task.completed ? "Undo" : "Complete"}</span>
          <svg className="w-4 h-4 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {task.completed ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
              />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            )}
          </svg>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          className="text-destructive hover:bg-destructive hover:text-white transition-all duration-200 hover:scale-110 active:scale-95"
        >
          <span className="hidden sm:inline">Delete</span>
          <svg className="w-4 h-4 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </Button>
      </div>
    </div>
  )
})
