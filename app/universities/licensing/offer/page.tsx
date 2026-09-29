import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const STATS = [
  { label: "Trip / schools", value: "17 days, 12 Top 30 schools" },
  { label: "Structured records", value: "343 rows, 100% transcribed" },
  { label: "Approaches", value: "298 cold opens" },
  { label: "Accepted / rejected", value: "142 / 156 (47.7% success)" },
]

const VIDEO_SPECS = [
  {
    label: "Where it was shot",
    body: "Main quads, student centers, and library entrances across 12 campuses — real grounds, natural light, real students walking through frame.",
  },
  {
    label: "Who is on camera",
    body: "Strangers stopped on the spot: undergrads, graduate students, faculty and staff. 116 recorded majors across 105 different fields.",
  },
  {
    label: "Length",
    body: "About 5 minutes per formal interview (recruitment + consent kept inside a 7-minute window).",
  },
  {
    label: "What was asked",
    body: "The exact same three questions every time — so all 142 interviews can be compared side by side or cut into compilations.",
  },
  {
    label: "Language & sound",
    body: "English, live ambient audio. Wind, hesitation, people reversing themselves mid-sentence — none of that was cleaned out.",
  },
  {
    label: "How it was shot",
    body: "Single camera, handheld, on-location audio. Not a studio. Not staged.",
  },
  {
    label: "Rights",
    body: "Verbal consent captured on site for each person, with consent status logged. Available for commercial use.",
  },
  {
    label: "Ready cutdowns",
    body: "Each interview includes a marked 20–40 second high-density beat — ready to become an ad clip.",
  },
]

const DATA_FIELDS = [
  {
    label: "ID / school / name / major",
    body: "Every row uniquely locatable.",
  },
  {
    label: "Three-question transcripts",
    body: "Each question stored in its own raw transcript column — not a summary, not a rewrite.",
  },
  {
    label: "Is university worth it?",
    body: "Yes / No / Depends already coded.",
  },
  {
    label: "Habits & advice libraries",
    body: "Habits and advice mentioned in each interview linked to two separate theme tables — reverse-searchable (e.g. who mentioned waking early).",
  },
  {
    label: "Approach outcome",
    body: "Accepted / Rejected auto-coded. All 156 rejections stay in the same table, with IDs.",
  },
  {
    label: "Instagram / email",
    body: "Interviewee contacts for follow-up and second-pass verification.",
  },
]

const USE_CASES = [
  {
    title: "Paid social clips",
    body: "Pull the marked 20–40 second cuts from 142 interviews and ship them as ads. Twelve campuses as rotating backdrops — one account can post for a month without repeating locations. Opening three seconds, ready-made: “A 14-year-old got rejected 156 times on campus. His database is public.” No actors. No locations to rent. No staging. When comments doubt it, send the database link.",
  },
  {
    title: "Landing pages & enrollment packets",
    body: "Put a read-only database link on the page. Competitors can write case studies. They cannot write “click in and check it yourself.”",
    quote:
      "Our method backed a real research project completed independently by a 14-year-old: 17 days, 12 U.S. Top 30 campuses, 298 cold approaches, 156 rejections, 343 structured rows you can audit line by line. The database is open for inspection.",
  },
  {
    title: "Parent briefings & live enrollment",
    body: "Parents only really ask one thing: can my kid do this? Let them ask me. I can join by video or in person, bilingual in Spanish and English, and walk through how the project was built — including what 156 rejections felt like. Screen-share the database live. Let a parent pick a random row and play the original clip. Peer voice converts faster than yours.",
  },
  {
    title: "Ready-made lesson content",
    body: "The three-question transcripts plus the habits and advice libraries are already a class outline. “105 majors tell teenagers which three habits to build” — one session. “Why MIT says university is worth it 88.9% of the time, and Berkeley only 33.3%” — one session. Every claim has source video. None of it is invented.",
  },
  {
    title: "Have your students copy the system",
    body: "The full database structure and SOP can be handed to your cohort. Your course stops at “we listened” and starts ending with “we submitted an auditable output.” Next enrollment cycle, you use your own students’ cases — you no longer need to borrow mine.",
  },
]

export default function UniversitiesLicensingOfferPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20 lg:pt-24">
        <div className="mx-auto max-w-[1400px] px-5 pb-24 pt-12 sm:px-8 lg:px-12 lg:pb-32 lg:pt-16">
          {/* Lead */}
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-lg font-semibold text-foreground">
              Commercial licensing
            </p>
            <h1 className="mt-5 text-lg font-semibold leading-snug text-balance text-foreground sm:mt-6">
              You sell the dream. Borrow the proof.
            </h1>

            <div className="mx-auto mt-8 max-w-3xl space-y-5 text-left text-lg leading-[1.8] text-foreground/90 md:mt-10 md:space-y-6 md:text-center">
              <p>
                You run AI courses, founder camps, or growth programs. Every ad, livestream, and parent briefing answers the same question:{" "}
                <strong className="font-semibold text-foreground">after this, what can they actually make?</strong>
              </p>
              <p>
                You do not lack students. You do not lack instructors. You lack{" "}
                <strong className="font-semibold text-foreground">an answer the other side can verify themselves.</strong>
              </p>
              <p>
                I am 14. In 17 days I finished a real research project and left behind{" "}
                <strong className="font-semibold text-foreground">343 rows of data you can check line by line.</strong>{" "}
                That evidence can be licensed to you.
              </p>
            </div>
          </div>

          {/* 01 */}
          <section className="mt-20 border-t border-border pt-14 md:mt-28 md:pt-20">
            <h2 className="mx-auto max-w-3xl text-center text-lg font-semibold leading-snug text-foreground">
              Three assets. None of them answer the question.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-[1.8] text-foreground/90">
              Testimonials can be bought. Famous teachers prove <em>you</em> are impressive — not that your students will be. Admission outcomes blur whether the course did the work or the family&apos;s resources did.
            </p>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-[1.8] text-foreground/90">
              What you are missing is a real sample:{" "}
              <strong className="font-semibold text-foreground">
                process visible, data inspectable, the person willing to appear on camera.
              </strong>
            </p>
          </section>

          {/* 02 */}
          <section className="mt-20 border-t border-border pt-14 md:mt-28 md:pt-20">
            <h2 className="mx-auto max-w-3xl text-center text-lg font-semibold leading-snug text-foreground">
              A 14-year-old. Twelve campuses. No institution behind him.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-[1.8] text-foreground/90">
              A high-school student, bilingual in Spanish and English. On twelve U.S. Top 30 campuses he stopped strangers, asked the same three questions, filmed everything, transcribed it, and logged every row. No institutional endorsement. No parents doing the work.
            </p>

            <div className="mx-auto mt-10 max-w-4xl grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
              {STATS.map((stat) => (
                <div key={stat.label} className="bg-card p-6 sm:p-8">
                  <p className="text-lg font-semibold text-foreground">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-lg font-semibold text-foreground">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-[1.8] text-foreground/90">
              All 156 rejections were kept. A project built for packaging would not keep a 52% failure record.
            </p>
          </section>

          {/* 03 */}
          <section className="mt-20 border-t border-border pt-14 md:mt-28 md:pt-20">
            <h2 className="mx-auto max-w-3xl text-center text-lg font-semibold leading-snug text-foreground">
              Video
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-[1.8] text-foreground/90">
              <strong className="font-semibold text-foreground">142 completed on-camera interviews</strong>
              — each its own file, attached to the matching database row. Open the row, open the video. Not a separate dump folder.
            </p>

            <div className="mx-auto mt-10 max-w-3xl space-y-8">
              {VIDEO_SPECS.map((item) => (
                <div key={item.label} className="grid gap-2 border-b border-border pb-6 last:border-b-0 last:pb-0 md:grid-cols-[220px_1fr] md:gap-8">
                  <p className="pt-0.5 text-lg font-semibold text-foreground md:pt-1">
                    {item.label}
                  </p>
                  <p className="text-lg leading-[1.8] text-foreground/90">{item.body}</p>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-10 max-w-3xl border border-border bg-secondary/30 p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-foreground">
                You cannot stage this.
              </h3>
              <p className="mt-4 text-lg leading-[1.8] text-foreground/90">
                Twelve different campuses as sets. Real student accents and awkward pauses. A 14-year-old holding the frame. Any clip you cut can be traced back on the spot to its full original video and verbatim transcript.
              </p>
            </div>

            <h3 className="mt-16 text-lg font-semibold text-foreground">
              The data behind every video
            </h3>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-[1.8] text-foreground/90">
              These are not loose files. Every clip is tagged. Processing completion:{" "}
              <strong className="font-semibold text-foreground">100%.</strong>
            </p>

            <div className="mx-auto mt-10 max-w-3xl space-y-8">
              {DATA_FIELDS.map((item) => (
                <div key={item.label} className="grid gap-2 border-b border-border pb-6 last:border-b-0 last:pb-0 md:grid-cols-[240px_1fr] md:gap-8">
                  <p className="pt-0.5 text-lg font-semibold text-foreground md:pt-1">
                    {item.label}
                  </p>
                  <p className="text-lg leading-[1.8] text-foreground/90">{item.body}</p>
                </div>
              ))}
            </div>

            <h3 className="mt-16 text-lg font-semibold text-foreground">
              Already finished deliverables
            </h3>
            <ul className="mx-auto mt-6 max-w-3xl space-y-4 text-lg leading-[1.8] text-foreground/90">
              <li>
                <strong className="font-semibold text-foreground">A full postmortem</strong> — per-school success rates, deep-interview density, daily output, all calculated.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Yes / Depends / No distribution</strong> — of 129 clear answers: Yes 65.9%, Depends 33.3%, No 0.8%. School gaps are extreme (MIT 88.9% Yes, UC Berkeley 33.3%).
              </li>
              <li>
                <strong className="font-semibold text-foreground">Spanish & English quote bank</strong> — lines pulled from transcripts, ready for posters and slides.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Method SOP</strong> — topic → question design → approach scripts → shooting rhythm → transcription → database → analysis, including attribution for all 156 rejections.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Database template</strong> — the whole structure, ready to copy.
              </li>
            </ul>
          </section>

          {/* 04 */}
          <section className="mt-20 border-t border-border pt-14 md:mt-28 md:pt-20">
            <h2 className="mx-auto max-w-3xl text-center text-lg font-semibold leading-snug text-foreground">
              You are not buying footage. You are buying conviction.
            </h2>

            <div className="mx-auto mt-12 max-w-3xl space-y-14">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  1 · It invites you to disprove it
                </h3>
                <p className="mx-auto mt-4 max-w-3xl text-lg leading-[1.8] text-foreground/90">
                  Most marketing says “trust me.” This one says{" "}
                  <strong className="font-semibold text-foreground">“check it yourself.”</strong> Any row leads to original video and transcript. Only something that survives a random audit deserves to be called evidence. Parents are not talked into belief — they click, watch, and convince themselves.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  2 · The failures stayed in
                </h3>
                <p className="mx-auto mt-4 max-w-3xl text-lg leading-[1.8] text-foreground/90">
                  One hundred fifty-six rejection records sit in the same table as the 142 successes. Nothing deleted. That is the hardest part to fake:{" "}
                  <strong className="font-semibold text-foreground">
                    nobody invents a 52% failure rate for themselves.
                  </strong>{" "}
                  Once parents see that column, their doubt about every other number drops.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  3 · There is no second copy on the market
                </h3>
                <div className="mx-auto mt-6 max-w-4xl overflow-x-auto border border-border">
                  <table className="w-full min-w-[640px] text-left text-lg">
                    <thead className="border-b border-border bg-secondary/50">
                      <tr>
                        <th className="px-4 py-3 text-lg font-semibold text-foreground sm:px-5">
                          Who
                        </th>
                        <th className="px-4 py-3 text-lg font-semibold text-foreground sm:px-5">
                          What they have
                        </th>
                        <th className="px-4 py-3 text-lg font-semibold text-foreground sm:px-5">
                          What they lack
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Surveys / reports", "Scale and statistics", "No video, no face speaking"],
                        ["Street-interview creators", "Video and emotion", "Inconsistent questions, no database, no side-by-side analysis"],
                        ["Institution student cases", "A story", "Unauditable — and family resources are unclear"],
                        ["This package", "Video + identical questions + structured database", "—"],
                      ].map(([who, have, lack]) => (
                        <tr key={who} className="border-b border-border last:border-b-0">
                          <td className="px-4 py-4 align-top font-semibold text-foreground sm:px-5">{who}</td>
                          <td className="px-4 py-4 align-top text-foreground/90 sm:px-5">{have}</td>
                          <td className="px-4 py-4 align-top text-muted-foreground sm:px-5">{lack}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mx-auto mt-6 max-w-3xl text-lg leading-[1.8] text-foreground/90">
                  Same questions. Same method. Twelve top schools. One hundred five majors. This is a sample you can analyze — not a handful of cute street clips.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  4 · The person speaking is 14
                </h3>
                <p className="mx-auto mt-4 max-w-3xl text-lg leading-[1.8] text-foreground/90">
                  The last parental defense is always:{" "}
                  <strong className="font-semibold text-foreground">“My kid is too young / they can’t.”</strong>{" "}
                  Adult case studies never get past that sentence. A 14-year-old with no institutional backing, rejected 156 times on foreign campuses, makes that sentence harder to say.
                </p>
                <div className="mt-6 border border-border bg-card p-6 sm:p-8">
                  <p className="text-lg leading-[1.8] text-foreground/90">
                    <strong className="font-semibold text-foreground">Time-sensitive.</strong>{" "}
                    This leverage only holds this year. Next year I am 15 — and the same dataset is just “a high-school project.”
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 05 */}
          <section className="mt-20 border-t border-border pt-14 md:mt-28 md:pt-20">
            <h2 className="mx-auto max-w-3xl text-center text-lg font-semibold leading-snug text-foreground">
              Five ways this becomes your enrollment engine.
            </h2>

            <div className="mx-auto mt-12 max-w-3xl space-y-12">
              {USE_CASES.map((item, index) => (
                <div key={item.title}>
                  <h3 className="text-lg font-semibold text-foreground">
                    {index + 1} · {item.title}
                  </h3>
                  <p className="mt-4 text-lg leading-[1.8] text-foreground/90">{item.body}</p>
                  {"quote" in item && item.quote ? (
                    <p className="mt-4 text-lg leading-[1.8] text-foreground/90">
                      {item.quote}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-20 border-t border-border pt-14 md:mt-28 md:pt-20">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-4">
              <Link
                href="/universities/licensing"
                className="inline-flex items-center justify-center border border-border px-6 py-3.5 text-lg font-semibold text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground sm:px-8"
              >
                Back to the licensing page
              </Link>
            </div>
            <p className="mx-auto mt-6 max-w-3xl text-center text-lg text-muted-foreground">
              Contact:{" "}
              <a href="mailto:will@hao.com.co" className="text-accent underline-offset-4 hover:underline">
                will@hao.com.co
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
