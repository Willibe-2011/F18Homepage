import { NextResponse } from "next/server"
import { Resend } from "resend"

const DEST = "will@hao.com.co"
const NOTION_API_KEY = process.env.NOTION_API_KEY
const NOTION_VERSION = "2022-06-28"
/** Parent page for licensing access-request notes (Top30 Uni Project). */
const REQUESTS_PARENT_PAGE_ID = "3da9166f-d9fd-802d-91b4-dae193ff1c8f"

async function saveToNotion(email: string, purpose: string) {
  if (!NOTION_API_KEY) return false

  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${NOTION_API_KEY}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { page_id: REQUESTS_PARENT_PAGE_ID },
      properties: {
        title: {
          title: [
            {
              type: "text",
              text: { content: `DB access request — ${email}` },
            },
          ],
        },
      },
      children: [
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: `Email: ${email}\nWhat for: ${purpose}\nSubmitted: ${new Date().toISOString()}`,
                },
              },
            ],
          },
        },
      ],
    }),
  })

  if (!res.ok) {
    console.error("Notion save failed:", await res.text())
    return false
  }
  return true
}

async function sendWithResend(email: string, purpose: string) {
  const key = process.env.RESEND_API_KEY
  if (!key) return { sent: false as const, reason: "missing_key" as const }

  const resend = new Resend(key)
  const from = process.env.RESEND_FROM ?? "F18 Licensing <onboarding@resend.dev>"

  const { error } = await resend.emails.send({
    from,
    to: [DEST],
    replyTo: email,
    subject: "Request read-only database access",
    text: `Someone requested read-only database access.\n\nEmail: ${email}\nWhat for: ${purpose}\n`,
  })

  if (error) {
    console.error("Resend error:", error)
    return { sent: false as const, reason: "resend_error" as const }
  }
  return { sent: true as const }
}

export async function POST(request: Request) {
  let body: { email?: string; purpose?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }

  const email = body.email?.trim() ?? ""
  const purpose = body.purpose?.trim() ?? ""

  if (!email || !purpose || !/\S+@\S+\.\S+/.test(email)) {
    return NextResponse.json({ error: "Email and purpose are required." }, { status: 400 })
  }

  const mail = await sendWithResend(email, purpose)
  const notionOk = await saveToNotion(email, purpose)

  if (mail.sent) {
    return NextResponse.json({ ok: true, channel: "email" })
  }

  // Resend not configured / failed — Notion note still counts as received so the form works.
  if (notionOk) {
    return NextResponse.json({ ok: true, channel: "notion" })
  }

  return NextResponse.json(
    {
      error:
        mail.reason === "missing_key"
          ? "Email delivery is not configured yet. Add RESEND_API_KEY to .env.local."
          : "Could not send. Try again.",
    },
    { status: 502 },
  )
}
