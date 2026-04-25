import type { F18Profile } from "./data"

const NOTION_API_KEY = process.env.NOTION_API_KEY!
const DATABASE_ID = process.env.NOTION_DATABASE_ID!
const NOTION_VERSION = "2022-06-28"

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

// Map a raw Notion page object (properties only) to F18Profile
function notionPageToProfile(page: any): F18Profile {
  const props = page.properties as Record<string, any>

  const name = richTextToString(props.Name?.title ?? [])
  const letterToVC = cleanHtmlBreaks(getTextProp(props, "Letter to VC")) || undefined
  const letterToUniversity =
    cleanHtmlBreaks(getTextProp(props, "Letter to 大学招生办")) || undefined
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
    id: slugify(name),
    name,
    age: props.Age?.number ?? 0,
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
