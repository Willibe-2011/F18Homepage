"use client"

import { useState } from "react"

export function DatabaseAccessRequest() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [purpose, setPurpose] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [error, setError] = useState("")
  const [channel, setChannel] = useState<"email" | "notion" | null>(null)

  const ready =
    email.trim().length > 0 &&
    purpose.trim().length > 0 &&
    /\S+@\S+\.\S+/.test(email.trim())

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
          purpose: purpose.trim(),
        }),
      })

      const data = (await res.json().catch(() => ({}))) as {
        error?: string
        channel?: "email" | "notion"
      }
      if (!res.ok) {
        throw new Error(data.error || "Could not send.")
      }

      setChannel(data.channel ?? "email")
      setStatus("sent")
    } catch (err) {
      setStatus("error")
      setError(err instanceof Error ? err.message : "Could not send. Try again.")
    }
  }

  if (status === "sent") {
    return (
      <div className="mx-auto w-full max-w-md border border-border bg-card p-6 text-center sm:p-8">
        <p className="text-lg font-semibold text-foreground">Request sent.</p>
        <p className="mt-3 text-lg leading-[1.8] text-foreground/80">
          {channel === "notion"
            ? "Saved to Notion. Add a Resend API key to also deliver into will@hao.com.co."
            : `I'll follow up at ${email.trim()} with the read-only link.`}
        </p>
      </div>
    )
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex w-full items-center justify-center border border-foreground bg-foreground px-6 py-3.5 text-lg font-semibold text-background transition-colors hover:bg-foreground/90 sm:w-auto sm:px-8"
      >
        Request read-only database access
      </button>
    )
  }

  return (
    <form
      onSubmit={handleSend}
      className="mx-auto w-full max-w-md space-y-4 border border-border bg-card p-5 text-left sm:p-6"
    >
      <label className="block">
        <span className="text-lg font-semibold text-foreground">Your email</span>
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

      <label className="block">
        <span className="text-lg font-semibold text-foreground">What this is for</span>
        <textarea
          name="purpose"
          required
          rows={3}
          value={purpose}
          onChange={(e) => {
            setPurpose(e.target.value)
            if (status === "error") setStatus("idle")
          }}
          placeholder="e.g. AI course enrollment / parent briefing audit"
          className="mt-2 w-full resize-y border border-border bg-background px-4 py-3 text-lg text-foreground outline-none ring-foreground/20 placeholder:text-muted-foreground focus:ring-2"
        />
      </label>

      {error ? <p className="text-center text-base text-destructive">{error}</p> : null}

      {ready ? (
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex w-full items-center justify-center border border-foreground bg-foreground px-6 py-3.5 text-lg font-semibold text-background transition-colors hover:bg-foreground/90 disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send"}
        </button>
      ) : (
        <p className="text-center text-base text-muted-foreground">
          Fill both fields to unlock Send.
        </p>
      )}
    </form>
  )
}
