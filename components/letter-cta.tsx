"use client"

import { useState, useEffect } from "react"
import { FileText, X } from "lucide-react"
import { CopyLetterButtons } from "./copy-letter-buttons"

interface LetterCTAProps {
  type: "VC" | "University"
  text: string
  founderName: string
}

export function LetterCTA({ type, text, founderName }: LetterCTAProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const title = type === "VC" ? "Letter to VCs" : "Letter to Universities"
  const description = type === "VC" 
    ? `Why investors should pay attention to ${founderName} now.`
    : `Why college administrators can't afford to overlook ${founderName}.`

  return (
    <>
      {/* CTA Button / Card */}
      <button
        onClick={() => setIsOpen(true)}
        className="group relative flex w-full flex-col items-start rounded-none border border-border border-b-[4px] bg-card p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-accent hover:shadow-md sm:p-8"
      >
        <div className="mb-4 inline-flex rounded-full bg-secondary p-3 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
          <FileText className="h-6 w-6" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-foreground">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <div className="mt-6 font-mono text-xs font-semibold uppercase tracking-widest text-accent group-hover:underline">
          Read Letter →
        </div>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col rounded-none border border-border border-b-[4px] bg-card shadow-2xl">
            <div className="flex items-center justify-between border-b border-border p-6">
              <h3 className="font-serif text-2xl font-bold text-foreground">{title}</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="custom-scrollbar flex-1 overflow-y-auto p-6 md:p-10">
              <p className="whitespace-pre-wrap text-lg leading-[1.8] text-foreground/90 md:text-xl">
                {text}
              </p>
            </div>
            <div className="border-t border-border bg-secondary/20 p-6 md:p-8">
              <CopyLetterButtons text={text} type={type} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
