"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, Table, Code, File } from "lucide-react"
import {
  exportToPDF,
  exportToCSV,
  exportToJSON,
  exportToTXT,
  canExportFormat,
  getAvailableExportFormats,
  type TemplateData,
  type ExportOptions,
} from "@/lib/export-utils"

interface ExportDialogProps {
  templateName: string
  templateData: TemplateData
  userPlan: string
  children: React.ReactNode
}

const formatIcons = {
  pdf: FileText,
  csv: Table,
  json: Code,
  txt: File,
}

const formatLabels = {
  pdf: "PDF Document",
  csv: "CSV Spreadsheet",
  json: "JSON Data",
  txt: "Text File",
}

const formatDescriptions = {
  pdf: "Professional document with formatting",
  csv: "Spreadsheet-compatible data",
  json: "Structured data format",
  txt: "Simple text format",
}

export function ExportDialog({ templateName, templateData, userPlan, children }: ExportDialogProps) {
  const [selectedFormat, setSelectedFormat] = useState<string>("")
  const [includeCompleted, setIncludeCompleted] = useState(true)
  const [includeNotes, setIncludeNotes] = useState(true)
  const [groupByCategory, setGroupByCategory] = useState(true)
  const [isExporting, setIsExporting] = useState(false)

  const availableFormats = getAvailableExportFormats(userPlan)

  const handleExport = async () => {
    if (!selectedFormat || !canExportFormat(userPlan, selectedFormat)) return

    setIsExporting(true)

    const options: ExportOptions = {
      format: selectedFormat as any,
      includeCompleted,
      includeNotes,
      groupByCategory,
    }

    try {
      switch (selectedFormat) {
        case "pdf":
          exportToPDF(templateName, templateData, options)
          break
        case "csv":
          exportToCSV(templateName, templateData, options)
          break
        case "json":
          exportToJSON(templateName, templateData, options)
          break
        case "txt":
          exportToTXT(templateName, templateData, options)
          break
      }
    } catch (error) {
      console.error("Export failed:", error)
    } finally {
      setIsExporting(false)
    }
  }

  if (availableFormats.length === 0) {
    return null // Don't show export button for free plan
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Template
          </DialogTitle>
          <DialogDescription>Export your template data in various formats based on your plan.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Format Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Export Format</Label>
            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger>
                <SelectValue placeholder="Choose export format" />
              </SelectTrigger>
              <SelectContent>
                {availableFormats.map((format) => {
                  const Icon = formatIcons[format as keyof typeof formatIcons]
                  return (
                    <SelectItem key={format} value={format}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <div>
                          <div className="font-medium">{formatLabels[format as keyof typeof formatLabels]}</div>
                          <div className="text-xs text-muted-foreground">
                            {formatDescriptions[format as keyof typeof formatDescriptions]}
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Export Options */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Export Options</Label>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="includeCompleted" checked={includeCompleted} onCheckedChange={setIncludeCompleted} />
                <Label htmlFor="includeCompleted" className="text-sm">
                  Include completed tasks
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="includeNotes" checked={includeNotes} onCheckedChange={setIncludeNotes} />
                <Label htmlFor="includeNotes" className="text-sm">
                  Include notes
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="groupByCategory" checked={groupByCategory} onCheckedChange={setGroupByCategory} />
                <Label htmlFor="groupByCategory" className="text-sm">
                  Group tasks by category
                </Label>
              </div>
            </div>
          </div>

          {/* Export Summary */}
          <div className="p-3 bg-muted/50 rounded-lg text-sm">
            <div className="font-medium mb-1">Export Summary:</div>
            <div className="text-muted-foreground space-y-1">
              <div>• {templateData.tasks.length} total tasks</div>
              <div>• {templateData.tasks.filter((t) => t.completed).length} completed tasks</div>
              {templateData.notes.trim() && <div>• Notes included</div>}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button onClick={handleExport} disabled={!selectedFormat || isExporting} className="flex-1">
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
