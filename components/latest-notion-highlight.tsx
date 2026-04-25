import type { NotionLatestEntry } from "@/lib/notion"

interface LatestNotionHighlightProps {
  entry: NotionLatestEntry | null
}

export function LatestNotionHighlight({ entry }: LatestNotionHighlightProps) {
  if (!entry) return null

  const visibleFields = entry.fields.filter((f) => f.value.trim())

  return (
    <div className="mt-12 max-w-2xl rounded-2xl border border-border bg-card/80 p-8 backdrop-blur-sm">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Latest
      </p>
      <h2 className="mt-2 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
        {entry.title || "Untitled"}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">Created {entry.createdTimeLabel}</p>
      {entry.notionPageUrl ? (
        <a
          href={entry.notionPageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          Open in Notion
        </a>
      ) : null}
      {visibleFields.length > 0 ? (
        <dl className="mt-6 space-y-3 border-t border-border pt-6">
          {visibleFields.map(({ name, value }) => (
            <div key={name}>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {name}
              </dt>
              <dd className="mt-1 text-base leading-relaxed text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </div>
  )
}
