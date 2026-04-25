import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getPublishedProfiles } from "@/lib/notion"
import type { F18Profile } from "@/lib/data"
import { ExploreClient } from "./explore-client"

export const revalidate = 3600 // revalidate every hour

export default async function ExplorePage() {
  let profiles: F18Profile[] = []
  try {
    profiles = await getPublishedProfiles()
  } catch {
    profiles = []
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 lg:pt-24">
        <ExploreClient profiles={profiles} />
      </main>
      <Footer />
    </>
  )
}
