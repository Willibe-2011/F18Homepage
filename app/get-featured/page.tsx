"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

type LookingFor = "nothing" | "vc" | "university" | "both"

export default function GetFeaturedPage() {
  const [lookingFor, setLookingFor] = useState<LookingFor>("nothing")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen items-center justify-center pt-16">
          <div className="mx-auto max-w-[640px] px-6 py-24 text-center">
            <h1 className="font-serif text-4xl font-bold text-foreground">
              Application received.
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              We&apos;ll review your submission and respond within 7 days.
            </p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const showVCFields = lookingFor === "vc" || lookingFor === "both"
  const showUniversityFields = lookingFor === "university" || lookingFor === "both"

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <div className="mx-auto max-w-[640px] px-6 py-24">
          {/* Header */}
          <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
            Apply to be featured.
          </h1>
          <p className="mt-4 text-muted-foreground">
            Submissions are reviewed weekly. We feature only verified work.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground"
              >
                Name <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-2 w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="Your full name"
              />
            </div>

            {/* Age */}
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-foreground"
              >
                Age <span className="text-accent">*</span>
              </label>
              <input
                type="number"
                id="age"
                name="age"
                required
                min={8}
                max={18}
                className="mt-2 w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="Your age (8-18)"
              />
            </div>

            {/* Gender */}
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-foreground"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="mt-2 w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="">Select gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="non-binary">Non-binary</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>

            {/* Picture URL */}
            <div>
              <label
                htmlFor="pictureUrl"
                className="block text-sm font-medium text-foreground"
              >
                Picture URL (optional)
              </label>
              <input
                type="url"
                id="pictureUrl"
                name="pictureUrl"
                className="mt-2 w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="https://example.com/your-photo.jpg"
              />
            </div>

            {/* Profile URL */}
            <div>
              <label
                htmlFor="profileUrl"
                className="block text-sm font-medium text-foreground"
              >
                Profile URL <span className="text-accent">*</span>
              </label>
              <input
                type="url"
                id="profileUrl"
                name="profileUrl"
                required
                className="mt-2 w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="https://your-website.com"
              />
            </div>

            {/* Industry */}
            <div>
              <label
                htmlFor="industry"
                className="block text-sm font-medium text-foreground"
              >
                Industry <span className="text-accent">*</span>
              </label>
              <select
                id="industry"
                name="industry"
                required
                className="mt-2 w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="">Select industry</option>
                <option value="education">Education</option>
                <option value="tech">Tech</option>
                <option value="bio">Bio</option>
                <option value="climate">Climate</option>
                <option value="arts">Arts</option>
                <option value="sports">Sports</option>
                <option value="research">Research</option>
                <option value="business">Business</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Project Description */}
            <div>
              <label
                htmlFor="projectDescription"
                className="block text-sm font-medium text-foreground"
              >
                Project Description <span className="text-accent">*</span>
              </label>
              <textarea
                id="projectDescription"
                name="projectDescription"
                required
                rows={4}
                className="mt-2 w-full resize-none rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="Describe what you built and its impact"
              />
            </div>

            {/* Personal Article */}
            <div>
              <label
                htmlFor="personalArticle"
                className="block text-sm font-medium text-foreground"
              >
                Personal Article <span className="text-accent">*</span>
              </label>
              <p className="mt-1 text-xs text-muted-foreground">
                Tell your story in your own words. This will be your main profile content.
              </p>
              <textarea
                id="personalArticle"
                name="personalArticle"
                required
                rows={12}
                className="mt-2 w-full resize-none rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="Share your journey, challenges, and what drives you..."
              />
            </div>

            {/* Evidence */}
            <div>
              <label
                htmlFor="evidence"
                className="block text-sm font-medium text-foreground"
              >
                Evidence <span className="text-accent">*</span>
              </label>
              <p className="mt-1 text-xs text-muted-foreground">
                One link per line. Include media coverage, publications, demos, etc.
              </p>
              <textarea
                id="evidence"
                name="evidence"
                required
                rows={4}
                className="mt-2 w-full resize-none rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="Malay Mail June 2025 — https://example.com/article&#10;TechCrunch — https://example.com/coverage"
              />
            </div>

            {/* Break the Record */}
            <div>
              <label
                htmlFor="breakTheRecord"
                className="block text-sm font-medium text-foreground"
              >
                What record did you break? <span className="text-accent">*</span>
              </label>
              <textarea
                id="breakTheRecord"
                name="breakTheRecord"
                required
                rows={2}
                className="mt-2 w-full resize-none rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="e.g., Youngest-ever speaker at GITEX Asia"
              />
            </div>

            {/* Published / Peer-reviewed */}
            <div>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  name="readPublish"
                  className="h-5 w-5 rounded border-border accent-accent"
                />
                <span className="text-sm text-foreground">
                  I have published or been peer-reviewed
                </span>
              </label>
            </div>

            {/* Social Media */}
            <div>
              <label
                htmlFor="socialMedia"
                className="block text-sm font-medium text-foreground"
              >
                Social Media (optional)
              </label>
              <input
                type="url"
                id="socialMedia"
                name="socialMedia"
                className="mt-2 w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="https://instagram.com/yourusername"
              />
            </div>

            {/* Looking For */}
            <div>
              <label className="block text-sm font-medium text-foreground">
                Are you looking for...?
              </label>
              <div className="mt-3 flex flex-col gap-3">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="radio"
                    name="lookingFor"
                    value="nothing"
                    checked={lookingFor === "nothing"}
                    onChange={() => setLookingFor("nothing")}
                    className="h-5 w-5 accent-accent"
                  />
                  <span className="text-sm text-foreground">
                    Nothing right now
                  </span>
                </label>
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="radio"
                    name="lookingFor"
                    value="vc"
                    checked={lookingFor === "vc"}
                    onChange={() => setLookingFor("vc")}
                    className="h-5 w-5 accent-accent"
                  />
                  <span className="text-sm text-foreground">
                    VC / Investor backing
                  </span>
                </label>
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="radio"
                    name="lookingFor"
                    value="university"
                    checked={lookingFor === "university"}
                    onChange={() => setLookingFor("university")}
                    className="h-5 w-5 accent-accent"
                  />
                  <span className="text-sm text-foreground">
                    University admissions
                  </span>
                </label>
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="radio"
                    name="lookingFor"
                    value="both"
                    checked={lookingFor === "both"}
                    onChange={() => setLookingFor("both")}
                    className="h-5 w-5 accent-accent"
                  />
                  <span className="text-sm text-foreground">
                    Both VC and University
                  </span>
                </label>
              </div>
            </div>

            {/* Conditional: Letter to VC */}
            {showVCFields && (
              <div>
                <label
                  htmlFor="letterToVC"
                  className="block text-sm font-medium text-foreground"
                >
                  Letter to VC / Investors <span className="text-accent">*</span>
                </label>
                <p className="mt-1 text-xs text-muted-foreground">
                  This letter will be shown to VCs who request an introduction.
                </p>
                <textarea
                  id="letterToVC"
                  name="letterToVC"
                  required={showVCFields}
                  rows={8}
                  className="mt-2 w-full resize-none rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  placeholder="Introduce yourself and your venture to potential investors..."
                />
              </div>
            )}

            {/* Conditional: Letter to University */}
            {showUniversityFields && (
              <div>
                <label
                  htmlFor="letterToUniversity"
                  className="block text-sm font-medium text-foreground"
                >
                  Letter to University Admissions <span className="text-accent">*</span>
                </label>
                <p className="mt-1 text-xs text-muted-foreground">
                  This letter will be shown to university admissions officers.
                </p>
                <textarea
                  id="letterToUniversity"
                  name="letterToUniversity"
                  required={showUniversityFields}
                  rows={8}
                  className="mt-2 w-full resize-none rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  placeholder="Share what makes you a compelling candidate for higher education..."
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full rounded-full bg-accent px-8 py-4 text-lg font-medium text-accent-foreground transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit application"}
            </button>

            {/* Privacy Note */}
            <p className="text-center text-sm text-muted-foreground">
              We&apos;ll review and respond within 7 days. Your contact info is never
              displayed publicly.
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
