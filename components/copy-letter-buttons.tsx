"use client"

import { useState } from "react"
import { Copy, FileText, Check } from "lucide-react"

export function CopyLetterButtons({ text, type }: { text: string; type: "VC" | "University" }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const handlePDF = () => {
    // Placeholder for PDF generation
    alert(`PDF generation for ${type} letter coming soon!`)
  }

  return (
    <div className="mt-4 flex items-center gap-3">
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-2 rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? "Copied!" : "Copy"}
      </button>
      <button
        onClick={handlePDF}
        className="inline-flex items-center gap-2 rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
      >
        <FileText className="h-3.5 w-3.5" />
        PDF
      </button>
    </div>
  )
}
