"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { ProfileCard } from "@/components/profile-card"
import type { F18Profile } from "@/lib/data"
import { industries } from "@/lib/data"

interface ExploreClientProps {
  profiles: F18Profile[]
}

export function ExploreClient({ profiles }: ExploreClientProps) {
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const [ageRange, setAgeRange] = useState<[number, number]>([8, 18])
  const [lookingForVC, setLookingForVC] = useState(false)
  const [lookingForUniversity, setLookingForUniversity] = useState(false)
  const [sortBy, setSortBy] = useState<"newest" | "youngest" | "az">("newest")
  const [searchQuery, setSearchQuery] = useState("")

  // Derive available industries from actual data, preserving schema order
  const availableIndustries = useMemo(() => {
    const inData = new Set(profiles.map((p) => p.industry))
    return industries.filter((i) => inData.has(i))
  }, [profiles])

  const filteredProfiles = useMemo(() => {
    let filtered = [...profiles]

    if (selectedIndustries.length > 0) {
      filtered = filtered.filter((p) => selectedIndustries.includes(p.industry))
    }

    filtered = filtered.filter(
      (p) => p.age >= ageRange[0] && p.age <= ageRange[1]
    )

    if (lookingForVC) {
      filtered = filtered.filter(
        (p) => p.lookingFor === "vc" || p.lookingFor === "both"
      )
    }

    if (lookingForUniversity) {
      filtered = filtered.filter(
        (p) => p.lookingFor === "university" || p.lookingFor === "both"
      )
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.project.toLowerCase().includes(query) ||
          p.whatTheyreBuilding.toLowerCase().includes(query) ||
          p.industry.toLowerCase().includes(query)
      )
    }

    if (sortBy === "youngest") {
      filtered.sort((a, b) => a.age - b.age)
    } else if (sortBy === "az") {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    }

    return filtered
  }, [
    profiles,
    selectedIndustries,
    ageRange,
    lookingForVC,
    lookingForUniversity,
    sortBy,
    searchQuery,
  ])

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry)
        ? prev.filter((i) => i !== industry)
        : [...prev, industry]
    )
  }

  const resetFilters = () => {
    setSelectedIndustries([])
    setAgeRange([8, 18])
    setLookingForVC(false)
    setLookingForUniversity(false)
    setSortBy("newest")
    setSearchQuery("")
  }

  return (
    <div className="mx-auto flex max-w-[1600px] gap-12 px-8 py-16 lg:px-12 lg:py-20">
      {/* Left Sidebar */}
      <aside className="sticky top-28 h-fit w-[320px] flex-shrink-0 lg:top-32">
        <h2 className="font-serif text-3xl font-bold text-foreground lg:text-4xl">
          Filter.
        </h2>

        {/* Industry */}
        <div className="mt-10">
          <h3 className="text-base font-medium text-foreground lg:text-lg">
            Industry
          </h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {availableIndustries.map((industry) => (
              <button
                key={industry}
                onClick={() => toggleIndustry(industry)}
                className={`rounded-full px-4 py-2 text-base transition-colors ${
                  selectedIndustries.includes(industry)
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>

        {/* Age Range */}
        <div className="mt-10">
          <h3 className="text-base font-medium text-foreground lg:text-lg">
            Age
          </h3>
          <div className="mt-4 flex items-center gap-4">
            <input
              type="range"
              min="8"
              max="18"
              value={ageRange[0]}
              onChange={(e) =>
                setAgeRange([parseInt(e.target.value), ageRange[1]])
              }
              className="h-3 flex-1 cursor-pointer appearance-none rounded-lg bg-secondary accent-accent"
            />
            <span className="text-base text-muted-foreground">
              {ageRange[0]} – {ageRange[1]}
            </span>
            <input
              type="range"
              min="8"
              max="18"
              value={ageRange[1]}
              onChange={(e) =>
                setAgeRange([ageRange[0], parseInt(e.target.value)])
              }
              className="h-3 flex-1 cursor-pointer appearance-none rounded-lg bg-secondary accent-accent"
            />
          </div>
        </div>

        {/* Looking For */}
        <div className="mt-10">
          <h3 className="text-base font-medium text-foreground lg:text-lg">
            Looking for
          </h3>
          <div className="mt-4 flex flex-col gap-3">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={lookingForVC}
                onChange={(e) => setLookingForVC(e.target.checked)}
                className="h-5 w-5 rounded border-border accent-accent"
              />
              <span className="text-base text-muted-foreground">
                Open to VC / Investors
              </span>
            </label>
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={lookingForUniversity}
                onChange={(e) => setLookingForUniversity(e.target.checked)}
                className="h-5 w-5 rounded border-border accent-accent"
              />
              <span className="text-base text-muted-foreground">
                Open to University Admissions
              </span>
            </label>
          </div>
        </div>

        {/* Sort By */}
        <div className="mt-10">
          <h3 className="text-base font-medium text-foreground lg:text-lg">
            Sort by
          </h3>
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "newest" | "youngest" | "az")
            }
            className="mt-4 w-full rounded-xl border border-border bg-card px-4 py-3 text-base text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          >
            <option value="newest">Newest</option>
            <option value="youngest">Youngest</option>
            <option value="az">A–Z</option>
          </select>
        </div>

        {/* Reset */}
        <button
          onClick={resetFilters}
          className="mt-10 text-base text-muted-foreground transition-colors hover:text-foreground"
        >
          Reset filters
        </button>
      </aside>

      {/* Right: Grid */}
      <div className="flex-1">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, project, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-border bg-card py-4 pl-14 pr-6 text-lg text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        {/* Result Count */}
        <p className="mt-6 text-base text-muted-foreground lg:text-lg">
          Showing {filteredProfiles.length} of {profiles.length} F18s
        </p>

        {/* Card Grid */}
        <div className="mt-8 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProfiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} size="large" />
          ))}
        </div>

        {filteredProfiles.length === 0 && (
          <div className="mt-16 text-center">
            <p className="text-xl text-muted-foreground">
              No profiles match your filters.
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 text-lg text-accent hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
