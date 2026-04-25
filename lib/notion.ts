import type { F18Profile } from "./data"

export interface NotionLatestEntry {
  id: string
  title: string
  createdTimeLabel: string
  notionPageUrl: string | null
  fields: { name: string; value: string }[]
}

const NOTION_API_KEY = process.env.NOTION_API_KEY!
const DATABASE_ID = process.env.NOTION_DATABASE_ID!
/** Stats snapshot database: latest row shown on the home page (override via env). */
const STATS_DATABASE_ID =
  process.env.NOTION_LATEST_DATABASE_ID ?? "34d9166f-d9fd-80f2-ab0e-ce8e5bed0915"
const NOTION_VERSION = "2022-06-28"

export interface F18Stats {
  totalCandidates: number
  countriesCount: number
  industriesCount: number
  avgAge: number
  snapshotDate: string | null
}

const notionHeaders = {
  Authorization: `Bearer ${NOTION_API_KEY}`,
  "Notion-Version": NOTION_VERSION,
  "Content-Type": "application/json",
}

// Convert a name to URL-safe slug
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

/** Notion accepts dashed UUIDs; normalize 32-char hex from share links. */
export function normalizeNotionId(id: string): string {
  const raw = id.replace(/-/g, "")
  if (raw.length !== 32 || !/^[a-f0-9]+$/i.test(raw)) return id
  return `${raw.slice(0, 8)}-${raw.slice(8, 12)}-${raw.slice(12, 16)}-${raw.slice(16, 20)}-${raw.slice(20)}`
}

// Concatenate Notion rich_text array to plain string
function richTextToString(richText: any[]): string {
  if (!Array.isArray(richText)) return ""
  return richText.map((t: any) => t.plain_text ?? "").join("")
}

// Read a text or title property as plain string
function getTextProp(props: Record<string, any>, key: string): string {
  const prop = props[key]
  if (!prop) return ""
  if (prop.type === "rich_text") return richTextToString(prop.rich_text ?? [])
  if (prop.type === "title") return richTextToString(prop.title ?? [])
  return ""
}

// Clean Notion <br> tags to proper newlines for multi-paragraph text
function cleanHtmlBreaks(text: string): string {
  return text.replace(/<br><br>/g, "\n\n").replace(/<br>/g, "\n")
}

// Parse a newline-separated text field into a string array
function parseLines(text: string): string[] {
  if (!text) return []
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
}

// Parse the pipe-separated Evidence field into individual entries
function parseEvidence(rawText: string): string[] {
  if (!rawText) return []
  return rawText
    .split(/\s*\\?\|\s*/)
    .map((part) => part.trim())
    .filter(Boolean)
}

// Derive lookingFor from presence of VC / University letters
function deriveLookingFor(
  letterToVC: string | undefined,
  letterToUniversity: string | undefined
): F18Profile["lookingFor"] {
  if (letterToVC && letterToUniversity) return "both"
  if (letterToVC) return "vc"
  if (letterToUniversity) return "university"
  return "nothing"
}

// Format ISO date to readable string
function formatDate(iso: string | undefined): string {
  if (!iso) return ""
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

function formatDateTime(iso: string | undefined): string {
  if (!iso) return ""
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

function propertyToDisplayString(prop: any): string {
  if (!prop || !prop.type) return ""
  switch (prop.type) {
    case "title":
      return richTextToString(prop.title ?? [])
    case "rich_text":
      return cleanHtmlBreaks(richTextToString(prop.rich_text ?? []))
    case "number":
      return prop.number != null && prop.number !== "" ? String(prop.number) : ""
    case "select":
      return prop.select?.name ?? ""
    case "multi_select":
      return (prop.multi_select ?? []).map((s: { name?: string }) => s.name).filter(Boolean).join(", ")
    case "date": {
      const d = prop.date
      if (!d) return ""
      const end = d.end ? ` → ${d.end}` : ""
      return `${d.start ?? ""}${end}`
    }
    case "checkbox":
      return prop.checkbox ? "Yes" : "No"
    case "url":
      return prop.url ?? ""
    case "email":
      return prop.email ?? ""
    case "phone_number":
      return prop.phone_number ?? ""
    case "status":
      return prop.status?.name ?? ""
    case "created_time":
      return formatDateTime(prop.created_time)
    case "last_edited_time":
      return formatDateTime(prop.last_edited_time)
    case "people":
      return (prop.people ?? [])
        .map((p: { name?: string }) => p.name)
        .filter(Boolean)
        .join(", ")
    case "relation":
      return `${(prop.relation ?? []).length} linked page(s)`
    case "files":
      return (prop.files ?? [])
        .map((f: { name?: string; file?: { url?: string }; external?: { url?: string } }) => {
          return f.name ?? f.file?.url ?? f.external?.url ?? ""
        })
        .filter(Boolean)
        .join(", ")
    case "formula": {
      const f = prop.formula
      if (!f) return ""
      if (f.type === "string") return f.string ?? ""
      if (f.type === "number" && f.number != null) return String(f.number)
      if (f.type === "boolean") return f.boolean ? "Yes" : "No"
      if (f.type === "date" && f.date?.start) return f.date.start
      return ""
    }
    default:
      return ""
  }
}

function notionPageToLatestEntry(page: any): NotionLatestEntry {
  const props = (page.properties ?? {}) as Record<string, any>
  let title = ""
  const fields: { name: string; value: string }[] = []

  for (const [name, prop] of Object.entries(props)) {
    const value = propertyToDisplayString(prop)
    if (prop?.type === "title") {
      title = value || title
      continue
    }
    if (value.trim()) fields.push({ name, value: value.trim() })
  }

  const created = page.created_time as string | undefined
  return {
    id: page.id,
    title: title || "Untitled",
    createdTimeLabel: formatDateTime(created) || "—",
    notionPageUrl: typeof page.url === "string" ? page.url : null,
    fields: fields.slice(0, 12),
  }
}

// Map a raw Notion page object (properties only) to F18Profile
function notionPageToProfile(page: any): F18Profile {
  const props = page.properties as Record<string, any>

  const name = richTextToString(props.Name?.title ?? [])
  const letterToVC = cleanHtmlBreaks(getTextProp(props, "Letter to VC")) || undefined
  const letterToUniversity =
    cleanHtmlBreaks(getTextProp(props, "Letter to AD")) || undefined
  const personalArticle = cleanHtmlBreaks(getTextProp(props, "Personal Article"))

  // Project short name: from the new "Project" property, fallback to first
  // clause of "Project Description" if the field is still empty
  const projectField = getTextProp(props, "Project")
  const projectDescription = getTextProp(props, "Project Description")
  const project =
    projectField ||
    projectDescription.split(/(?<=[.—–])\s/)[0].replace(/[.—–]\s*$/, "").trim() ||
    name

  // WhyItMatters and ProofTraction are newline-separated text fields
  const whyItMatters = parseLines(getTextProp(props, "WhyItMatters"))
  const proofTraction = parseLines(getTextProp(props, "ProofTraction"))

  return {
    id: page.id as string,
    slug: slugify(name),
    name,
    age: props.Age?.number ?? 0, // 0 means "not provided" — SpotlightCard handles this
    location: getTextProp(props, "Address"),
    gender: (props.Gender?.select?.name ?? "Prefer not to say") as F18Profile["gender"],
    pictureUrl: props.PictureURL?.url ?? undefined,
    profileUrl: props.Profile?.url ?? undefined,
    industry: props.Industry?.select?.name ?? "Other",
    project,
    whatTheyreBuilding: projectDescription,
    whyItMatters,
    proofTraction,
    evidence: parseEvidence(getTextProp(props, "Evidence")),
    breakTheRecord: getTextProp(props, "BreakTheRecord"),
    personalArticle,
    letterToVC,
    letterToUniversity,
    readPublish: props.ReadPublish?.checkbox ?? false,
    socialMedia: props["Social Media"]?.url ?? undefined,
    lastEditTime: formatDate(props["last edit time"]?.last_edited_time),
    lookingFor: deriveLookingFor(letterToVC, letterToUniversity),
  }
}

// Query the database for published profiles, handling pagination
async function queryDatabase(startCursor?: string): Promise<any> {
  const body: any = {
    filter: {
      property: "ReadPublish",
      checkbox: { equals: true },
    },
    sorts: [{ property: "Created time", direction: "descending" }],
    page_size: 100,
  }
  if (startCursor) body.start_cursor = startCursor

  const res = await fetch(
    `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
    {
      method: "POST",
      headers: notionHeaders,
      body: JSON.stringify(body),
      next: { revalidate: 3600 },
    }
  )

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Notion API error ${res.status}: ${err}`)
  }

  return res.json()
}

// Fetch all published profiles (ReadPublish = true), sorted newest first
export async function getPublishedProfiles(): Promise<F18Profile[]> {
  const data = await queryDatabase()
  const pages: any[] = data.results ?? []

  // Paginate if needed
  let hasMore = data.has_more
  let cursor = data.next_cursor
  while (hasMore && cursor) {
    const more = await queryDatabase(cursor)
    pages.push(...(more.results ?? []))
    hasMore = more.has_more
    cursor = more.next_cursor
  }

  return pages
    .filter((page: any) => page.object === "page")
    .map((page: any) => notionPageToProfile(page))
}

// Fetch a single published profile by URL slug (derived from Name field)
// All content comes from database properties — no page body blocks needed
export async function getProfileBySlug(slug: string): Promise<F18Profile | null> {
  const data = await queryDatabase()
  const pages: any[] = data.results ?? []

  const targetPage = pages.find((page: any) => {
    if (page.object !== "page") return false
    const name = richTextToString(page.properties?.Name?.title ?? [])
    return slugify(name) === slug
  })

  if (!targetPage) return null
  return notionPageToProfile(targetPage)
}

// Fetch all slugs of published profiles (for generateStaticParams)
export async function getAllPublishedSlugs(): Promise<string[]> {
  const data = await queryDatabase()
  const pages: any[] = data.results ?? []

  return pages
    .filter((page: any) => page.object === "page")
    .map((page: any) => {
      const name = richTextToString(page.properties?.Name?.title ?? [])
      return slugify(name)
    })
}

/**
 * Fetch the latest stats snapshot from the configured database.
 * `cache: 'no-store'` ensures every request sees the most recently created row.
 */
export async function getF18Stats(): Promise<F18Stats | null> {
  if (!NOTION_API_KEY) return null
  const dbId = normalizeNotionId(STATS_DATABASE_ID)

  const res = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
    method: "POST",
    headers: notionHeaders,
    body: JSON.stringify({
      sorts: [{ timestamp: "created_time", direction: "descending" }],
      page_size: 1,
    }),
    cache: "no-store",
  })

  if (!res.ok) {
    const err = await res.text()
    console.error(`Notion stats DB query ${res.status}:`, err)
    return null
  }

  const data = await res.json()
  const page = (data.results ?? []).find((r: any) => r.object === "page")
  if (!page) return null

  const p = page.properties as Record<string, any>
  return {
    totalCandidates: p.TotalCandidates?.number ?? 0,
    countriesCount: p.CountriesCount?.number ?? 0,
    industriesCount: p.IndustriesCount?.number ?? 0,
    avgAge: p.AvgAge?.number ?? 0,
    snapshotDate: p.SnapshotDate?.date?.start ?? null,
  }
}
