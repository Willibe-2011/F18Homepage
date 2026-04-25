/**
 * Server-side utility to extract the OG / Twitter preview image from a URL.
 * Results are cached by Next.js fetch for 24 h so repeated renders stay fast.
 */
export async function fetchOgImage(url: string): Promise<string | null> {
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 6000)

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; F18Bot/1.0; +https://f18.vc)",
        Accept: "text/html",
      },
      // Next.js extended fetch options — cache 24 h per URL
      next: { revalidate: 86400 },
    })

    clearTimeout(timer)
    if (!res.ok) return null

    // Only read the first 20 KB — the <head> is always there
    const reader = res.body?.getReader()
    if (!reader) return null
    const chunks: Uint8Array[] = []
    let total = 0
    while (total < 20_000) {
      const { done, value } = await reader.read()
      if (done || !value) break
      chunks.push(value)
      total += value.length
    }
    reader.cancel()

    const html = new TextDecoder().decode(
      chunks.reduce((acc, c) => {
        const merged = new Uint8Array(acc.length + c.length)
        merged.set(acc)
        merged.set(c, acc.length)
        return merged
      }, new Uint8Array()),
    )

    // Match og:image in both attribute orderings
    const patterns = [
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
      /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i,
    ]

    for (const re of patterns) {
      const m = html.match(re)
      if (m?.[1]) return m[1]
    }

    return null
  } catch {
    return null
  }
}
