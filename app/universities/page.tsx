import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CampusList } from "@/components/campus-list"
import { DatabaseAccessRequest } from "@/components/database-access-request"

const CHANNELS = [
  {
    name: "YouTube",
    job: "The library",
    body: "The films stay here. Shorts carry the question. The long video is one school, start to finish, in its own playlist. A pinned comment lines the twelve campuses up and asks what you think. That argument is what sends someone to the full video.",
    cadence: "Two or three Shorts a day. Success is a subscriber who watches the long one.",
  },
  {
    name: "Instagram",
    job: "The share",
    body: "The students who answered are on Instagram. Tag the person in the Reel and the post moves into their friends' stories. Highlights are one school each, so the trip reads as a series. The first second is the question.",
    cadence: "One or two Reels a day. Success is the student sharing it.",
  },
  {
    name: "LinkedIn",
    job: "The report",
    body: "Clips do not belong here. Schools, newsrooms, and research groups come for a number they can open and check. A post is one finding, then a short recap of a campus, then the report.",
    cadence: "Two or three posts a week. Success is a message from education or media.",
  },
]

const FACTS = [
  { value: "142", label: "Interviews on record" },
  { value: "156", label: "Rejections kept in the table" },
  { value: "343", label: "Rows, transcribed" },
]

export default function UniversitiesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20 lg:pt-24">
        <article className="mx-auto max-w-6xl px-5 pb-24 pt-14 sm:px-8 lg:pb-32 lg:pt-20">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-muted-foreground sm:text-xs">
            One question
          </p>
          <h1 className="mt-5 max-w-4xl font-serif text-4xl font-bold leading-[1.08] text-balance text-foreground sm:text-6xl">
            Is going to college still worth it?
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/90">
            Asked in person, on twelve campuses, and kept. YouTube holds the films. Instagram gets the students to pass them on. LinkedIn is where schools, newsrooms, and researchers buy the report. The same clip does not go to all three.
          </p>

          <CampusList className="mt-16 lg:mt-20" />

          <ul className="mt-16 grid grid-cols-1 gap-12 sm:mt-20 lg:mt-24 lg:grid-cols-3 lg:gap-10">
            {CHANNELS.map((channel) => (
              <li key={channel.name}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground sm:text-xs">
                  {channel.name}
                </p>
                <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-foreground">
                  {channel.job}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-foreground/90">{channel.body}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{channel.cadence}</p>
              </li>
            ))}
          </ul>

          <p className="mt-10 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Each platform has one job. Their numbers are not compared with each other.
          </p>

          <ul className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-border bg-border sm:mt-20 sm:grid-cols-3">
            {FACTS.map((fact) => (
              <li key={fact.value} className="bg-card px-6 py-8">
                <p className="font-serif text-5xl font-bold leading-none text-foreground">{fact.value}</p>
                <p className="mt-3 text-sm leading-snug text-muted-foreground sm:text-base">{fact.label}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/90">
            Same question every time. The refusals stayed in the table.
          </p>

          <div className="mt-14 sm:mt-16">
            <DatabaseAccessRequest />
            <p className="mt-6 text-sm text-muted-foreground">
              <Link href="/universities/licensing/offer" className="underline-offset-4 hover:underline">
                Full commercial writeup
              </Link>
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
