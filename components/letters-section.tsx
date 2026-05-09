"use client"

import { useState } from "react"
import { FileText, ChevronDown, ChevronUp } from "lucide-react"
import { CopyLetterButtons } from "./copy-letter-buttons"

interface LettersSectionProps {
  founderName: string
  letterToVC?: string | null
  letterToUniversity?: string | null
}

export function LettersSection({ founderName, letterToVC, letterToUniversity }: LettersSectionProps) {
  const [openLetter, setOpenLetter] = useState<"VC" | "University" | null>(null)

  const toggleLetter = (type: "VC" | "University") => {
    setOpenLetter(openLetter === type ? null : type)
  }

  const activeText = openLetter === "VC" ? letterToVC : openLetter === "University" ? letterToUniversity : null

  return (
    <section>
      <h2 className="mb-6 font-mono text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        The F18 Thesis
      </h2>
      
      <div className="grid gap-6 sm:grid-cols-2">
        {letterToVC && (
          <button
            onClick={() => toggleLetter("VC")}
            className={`group relative flex h-full w-full flex-col items-start border border-border bg-card p-6 text-left transition-all sm:p-8 ${
              openLetter === "VC"
                ? "rounded-none border-b-[4px] border-accent shadow-md bg-secondary/5"
                : "rounded-none border-b-[4px] shadow-sm hover:-translate-y-1 hover:border-accent hover:shadow-md"
            }`}
          >
            <div className={`mb-4 inline-flex rounded-full p-3 transition-colors ${openLetter === "VC" ? "bg-accent text-accent-foreground" : "bg-secondary text-accent group-hover:bg-accent group-hover:text-accent-foreground"}`}>
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-foreground">Letter to VCs</h3>
            <p className="text-sm leading-relaxed text-muted-foreground flex-1">
              Why investors should pay attention to {founderName} now.
            </p>
            <div className="mt-6 flex items-center gap-1 font-mono text-xs font-semibold uppercase tracking-widest text-accent group-hover:underline">
              {openLetter === "VC" ? "Close Letter" : "Read Letter"}
              {openLetter === "VC" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </button>
        )}
        
        {letterToUniversity && (
          <button
            onClick={() => toggleLetter("University")}
            className={`group relative flex h-full w-full flex-col items-start border border-border bg-card p-6 text-left transition-all sm:p-8 ${
              openLetter === "University"
                ? "rounded-none border-b-[4px] border-accent shadow-md bg-secondary/5"
                : "rounded-none border-b-[4px] shadow-sm hover:-translate-y-1 hover:border-accent hover:shadow-md"
            }`}
          >
            <div className={`mb-4 inline-flex rounded-full p-3 transition-colors ${openLetter === "University" ? "bg-accent text-accent-foreground" : "bg-secondary text-accent group-hover:bg-accent group-hover:text-accent-foreground"}`}>
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-foreground">Letter to Universities</h3>
            <p className="text-sm leading-relaxed text-muted-foreground flex-1">
              Why college administrators can't afford to overlook {founderName}.
            </p>
            <div className="mt-6 flex items-center gap-1 font-mono text-xs font-semibold uppercase tracking-widest text-accent group-hover:underline">
              {openLetter === "University" ? "Close Letter" : "Read Letter"}
              {openLetter === "University" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </button>
        )}
      </div>

      {openLetter && activeText && (
        <div className="mt-6 flex flex-col rounded-none border border-border border-b-[4px] bg-card shadow-sm animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="p-6 md:p-10">
            <p className="whitespace-pre-wrap text-lg leading-[1.8] text-foreground/90 md:text-xl">
              {activeText}
            </p>
          </div>
          <div className="border-t border-border bg-secondary/20 p-6 md:p-8">
            <CopyLetterButtons text={activeText} type={openLetter} />
          </div>
        </div>
      )}
    </section>
  )
}
