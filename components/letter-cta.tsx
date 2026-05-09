"use client"

import { useState } from "react"
import { FileText, ChevronDown, ChevronUp } from "lucide-react"
import { CopyLetterButtons } from "./copy-letter-buttons"

interface LetterCTAProps {
  type: "VC" | "University"
  text: string
  founderName: string
}

export function LetterCTA({ type, text, founderName }: LetterCTAProps) {
  const [isOpen, setIsOpen] = useState(false)

  const title = type === "VC" ? "Letter to VCs" : "Letter to Universities"
  const description = type === "VC" 
    ? `Why investors should pay attention to ${founderName} now.`
    : `Why college administrators can't afford to overlook ${founderName}.`

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex w-full flex-col items-start border border-border bg-card p-6 text-left transition-all sm:p-8 ${
          isOpen 
            ? "rounded-none border-b-0 bg-secondary/5" 
            : "rounded-none border-b-[4px] shadow-sm hover:-translate-y-1 hover:border-accent hover:shadow-md"
        }`}
      >
        <div className="mb-4 inline-flex rounded-full bg-secondary p-3 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
          <FileText className="h-6 w-6" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-foreground">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <div className="mt-6 flex items-center gap-1 font-mono text-xs font-semibold uppercase tracking-widest text-accent group-hover:underline">
          {isOpen ? "Close Letter" : "Read Letter"} 
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="flex flex-col rounded-none border border-border border-t-0 border-b-[4px] bg-card shadow-sm animate-in slide-in-from-top-2 fade-in duration-200">
          <div className="p-6 md:p-10 border-t border-border/50">
            <p className="whitespace-pre-wrap text-lg leading-[1.8] text-foreground/90 md:text-xl">
              {text}
            </p>
          </div>
          <div className="border-t border-border bg-secondary/20 p-6 md:p-8">
            <CopyLetterButtons text={text} type={type} />
          </div>
        </div>
      )}
    </div>
  )
}
