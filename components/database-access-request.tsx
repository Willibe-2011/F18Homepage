"use client"

import { useState } from "react"

const NOTICE =
  "Enter your email. It is sent to will@hao.com.co, Founder18's email. You get a look at the database."

export function DatabaseAccessRequest() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [error, setError] = useState("")

  const ready = /\S+@\S+\.\S+/.test(email.trim())

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!ready || status === "sending") return

    setStatus("sending")
    setError("")

    try {
      const res = await fetch("/api/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          purpose: "Look at the database",
        }),
      })

      const data = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        throw new Error(data.error || "Could not send.")
      }

      setStatus("sent")
    } catch (err) {
      setStatus("error")
      setError(err instanceof Error ? err.message : "Could not send. Try again.")
    }
  }

  if (status === "sent") {
    return (
      <p className="max-w-xl text-lg leading-relaxed text-foreground">
        Your email was sent to will@hao.com.co, Founder18&apos;s email. You get a look at the database.
      </p>
    )
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex w-full items-center justify-center border border-foreground bg-foreground px-6 py-3.5 text-lg font-semibold text-background transition-colors hover:bg-foreground/90 sm:w-auto sm:px-8"
      >
        Look at the database
      </button>
    )
  }

  return (
    <form onSubmit={handleSend} className="w-full max-w-xl space-y-5 text-left">
      <p className="text-lg leading-relaxed text-foreground">{NOTICE}</p>
      <label className="block">
        <span className="text-base font-semibold text-foreground">Your email</span>
        <input
          type="email"
          name="email"
          required
          autoFocus
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === "error") setStatus("idle")
          }}
          placeholder="you@company.com"
          className="mt-2 w-full border border-border bg-background px-4 py-3 text-lg text-foreground outline-none ring-foreground/20 placeholder:text-muted-foreground focus:ring-2"
        />
      </label>

      {error ? <p className="text-base text-destructive">{error}</p> : null}

      <button
        type="submit"
        disabled={!ready || status === "sending"}
        className="inline-flex w-full items-center justify-center border border-foreground bg-foreground px-6 py-3.5 text-lg font-semibold text-background transition-colors hover:bg-foreground/90 disabled:opacity-60 sm:w-auto sm:px-8"
      >
        {status === "sending" ? "Sending…" : "Send"}
      </button>
    </form>
  )
}
