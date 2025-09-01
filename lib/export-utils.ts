import { jsPDF } from "jspdf"

export interface Task {
  id: string
  text: string
  completed: boolean
  priority: string
  category: string
  timeframe: string
}

export interface TemplateData {
  tasks: Task[]
  notes: string
}

export interface ExportOptions {
  format: "pdf" | "csv" | "json" | "txt"
  includeCompleted?: boolean
  includeNotes?: boolean
  groupByCategory?: boolean
}

export const PLAN_EXPORT_LIMITS = {
  free: [],
  essential: ["pdf"],
  complete: ["pdf", "csv"],
  pro: ["pdf", "csv", "json", "txt"],
  family: ["pdf", "csv", "json", "txt"],
} as const

export function canExportFormat(plan: string, format: string): boolean {
  const allowedFormats = PLAN_EXPORT_LIMITS[plan as keyof typeof PLAN_EXPORT_LIMITS] || []
  return allowedFormats.includes(format as any)
}

export function getAvailableExportFormats(plan: string): string[] {
  return PLAN_EXPORT_LIMITS[plan as keyof typeof PLAN_EXPORT_LIMITS] || []
}

export function exportToPDF(templateName: string, data: TemplateData, options: ExportOptions = {}): void {
  const { includeCompleted = true, includeNotes = true, groupByCategory = true } = options

  const doc = new jsPDF()
  let yPosition = 30

  // Logo placeholder (you can add actual logo later)
  doc.setFillColor(223, 31, 38) // PlannerFlow red #df1f26
  doc.rect(20, 15, 4, 12, "F") // Red accent bar

  // Main header with brand styling
  doc.setFontSize(24)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(223, 31, 38) // PlannerFlow red
  doc.text("PlannerFlow", 30, 25)

  doc.setFontSize(12)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(100, 100, 100) // Gray
  doc.text("Create. Focus. Repeat.", 30, 32)

  yPosition = 45

  doc.setFontSize(20)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(27, 27, 27) // Dark gray #1b1b1b
  doc.text("Template Export", 20, yPosition)
  yPosition += 8

  doc.setFontSize(16)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(223, 31, 38) // PlannerFlow red
  doc.text(templateName, 20, yPosition)
  yPosition += 15

  doc.setFontSize(10)
  doc.setTextColor(120, 120, 120) // Light gray
  doc.text(`Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 20, yPosition)
  yPosition += 5

  // Add a subtle line separator
  doc.setDrawColor(230, 230, 230)
  doc.setLineWidth(0.5)
  doc.line(20, yPosition + 3, 190, yPosition + 3)
  yPosition += 15

  doc.setFontSize(16)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(27, 27, 27) // Dark gray
  doc.text("Tasks Overview", 20, yPosition)
  yPosition += 12

  if (groupByCategory) {
    const tasksByCategory = data.tasks.reduce(
      (acc, task) => {
        if (!includeCompleted && task.completed) return acc
        if (!acc[task.category]) acc[task.category] = []
        acc[task.category].push(task)
        return acc
      },
      {} as Record<string, Task[]>,
    )

    Object.entries(tasksByCategory).forEach(([category, tasks]) => {
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 30
      }

      doc.setFillColor(248, 248, 248) // Light gray background
      doc.rect(20, yPosition - 8, 170, 12, "F")

      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(223, 31, 38) // PlannerFlow red
      doc.text(category, 25, yPosition)
      yPosition += 12

      tasks.forEach((task, index) => {
        if (yPosition > 270) {
          doc.addPage()
          yPosition = 30
        }

        doc.setFontSize(11)
        doc.setFont("helvetica", "normal")
        doc.setTextColor(27, 27, 27) // Dark gray

        const status = task.completed ? "[x]" : "[ ]"
        const statusColor = task.completed ? [34, 197, 94] : [156, 163, 175] // Green for completed, gray for pending

        // Status indicator with color
        doc.setTextColor(statusColor[0], statusColor[1], statusColor[2])
        doc.text(status, 25, yPosition)

        // Task text
        doc.setTextColor(27, 27, 27)
        const taskText = task.text
        const lines = doc.splitTextToSize(taskText, 155)
        doc.text(lines, 35, yPosition)
        yPosition += lines.length * 5

        doc.setFontSize(9)
        doc.setTextColor(120, 120, 120) // Light gray

        // Priority with color coding
        const priorityColors = {
          High: [239, 68, 68], // Red
          Medium: [245, 158, 11], // Orange
          Low: [34, 197, 94], // Green
        }
        const priorityColor = priorityColors[task.priority as keyof typeof priorityColors] || [120, 120, 120]

        doc.setTextColor(priorityColor[0], priorityColor[1], priorityColor[2])
        doc.text(`Priority: ${task.priority}`, 35, yPosition)

        doc.setTextColor(120, 120, 120)
        doc.text(`  |  Timeframe: ${task.timeframe}`, 85, yPosition)
        yPosition += 10
      })
      yPosition += 8
    })
  } else {
    data.tasks
      .filter((task) => includeCompleted || !task.completed)
      .forEach((task) => {
        if (yPosition > 270) {
          doc.addPage()
          yPosition = 30
        }

        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        const status = task.completed ? "[x]" : "[ ]"
        const taskText = `${status} ${task.text}`

        const lines = doc.splitTextToSize(taskText, 170)
        doc.text(lines, 20, yPosition)
        yPosition += lines.length * 5

        doc.setTextColor(100)
        doc.text(`${task.category} | ${task.priority} | ${task.timeframe}`, 20, yPosition)
        doc.setTextColor(0)
        yPosition += 8
      })
  }

  if (includeNotes && data.notes.trim()) {
    if (yPosition > 200) {
      doc.addPage()
      yPosition = 30
    }

    yPosition += 15

    // Notes header with background
    doc.setFillColor(248, 248, 248)
    doc.rect(20, yPosition - 8, 170, 12, "F")

    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(27, 27, 27)
    doc.text("Notes", 25, yPosition)
    yPosition += 15

    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(60, 60, 60) // Slightly lighter than main text
    const noteLines = doc.splitTextToSize(data.notes, 170)
    doc.text(noteLines, 20, yPosition)
    yPosition += noteLines.length * 5
  }

  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)

    // Footer line
    doc.setDrawColor(230, 230, 230)
    doc.setLineWidth(0.5)
    doc.line(20, 280, 190, 280)

    // Footer text
    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.text("Generated by PlannerFlow - Create. Focus. Repeat.", 20, 285)
    doc.text(`Page ${i} of ${pageCount}`, 170, 285)
  }

  // Save the PDF
  doc.save(`${templateName.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_plannerflow_export.pdf`)
}

export function exportToCSV(templateName: string, data: TemplateData, options: ExportOptions = {}): void {
  const { includeCompleted = true } = options

  const headers = ["Task", "Status", "Priority", "Category", "Timeframe"]
  const rows = data.tasks
    .filter((task) => includeCompleted || !task.completed)
    .map((task) => [
      `"${task.text.replace(/"/g, '""')}"`,
      task.completed ? "Completed" : "Pending",
      task.priority,
      task.category,
      task.timeframe,
    ])

  const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", `${templateName.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_export.csv`)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportToJSON(templateName: string, data: TemplateData, options: ExportOptions = {}): void {
  const { includeCompleted = true } = options

  const exportData = {
    templateName,
    exportDate: new Date().toISOString(),
    tasks: data.tasks.filter((task) => includeCompleted || !task.completed),
    notes: data.notes,
    summary: {
      totalTasks: data.tasks.length,
      completedTasks: data.tasks.filter((t) => t.completed).length,
      pendingTasks: data.tasks.filter((t) => !t.completed).length,
    },
  }

  const jsonContent = JSON.stringify(exportData, null, 2)
  const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", `${templateName.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_export.json`)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportToTXT(templateName: string, data: TemplateData, options: ExportOptions = {}): void {
  const { includeCompleted = true, includeNotes = true, groupByCategory = true } = options

  let content = `${templateName}\n`
  content += `${"=".repeat(templateName.length)}\n\n`
  content += `Exported on: ${new Date().toLocaleDateString()}\n\n`

  if (groupByCategory) {
    const tasksByCategory = data.tasks.reduce(
      (acc, task) => {
        if (!includeCompleted && task.completed) return acc
        if (!acc[task.category]) acc[task.category] = []
        acc[task.category].push(task)
        return acc
      },
      {} as Record<string, Task[]>,
    )

    Object.entries(tasksByCategory).forEach(([category, tasks]) => {
      content += `${category}\n`
      content += `${"-".repeat(category.length)}\n`

      tasks.forEach((task) => {
        const status = task.completed ? "[✓]" : "[ ]"
        content += `${status} ${task.text}\n`
        content += `    Priority: ${task.priority} | Timeframe: ${task.timeframe}\n`
      })
      content += "\n"
    })
  } else {
    content += "Tasks\n-----\n"
    data.tasks
      .filter((task) => includeCompleted || !task.completed)
      .forEach((task) => {
        const status = task.completed ? "[✓]" : "[ ]"
        content += `${status} ${task.text}\n`
        content += `    Category: ${task.category} | Priority: ${task.priority} | Timeframe: ${task.timeframe}\n`
      })
  }

  if (includeNotes && data.notes.trim()) {
    content += "\nNotes\n-----\n"
    content += data.notes
  }

  const blob = new Blob([content], { type: "text/plain;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", `${templateName.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_export.txt`)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
