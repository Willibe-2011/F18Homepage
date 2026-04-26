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
  const [sortBy, setSortBy] = useState<"newest" | "youngest" | "az">("newest")
  const [searchQuery, setSearchQuery] = useState("")

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
  }, [profiles, selectedIndustries, ageRange, sortBy, searchQuery])

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
    setSortBy("newest")
    setSearchQuery("")
  }

  return (
    <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
      {/*
        移动端 DOM 顺序：搜索 → Filter → 结果（flex-col）。
        lg+：两列网格，侧栏跨两行在左，右侧上行搜索、下行结果。
      */}
      <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start lg:gap-12">
        <div className="min-w-0 lg:col-start-2 lg:row-start-1">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground lg:left-5 lg:h-6 lg:w-6" />
            <input
              type="text"
              placeholder="Search by name, project, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-card py-3.5 pl-12 pr-4 text-base text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent lg:py-4 lg:pl-14 lg:pr-6 lg:text-lg"
            />
          </div>
        </div>

        <aside className="h-fit w-full shrink-0 self-start rounded-2xl border border-border bg-card/40 p-6 lg:sticky lg:top-28 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:w-[320px] lg:max-w-full lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 xl:top-32">
        <h2 className="font-serif text-3xl font-bold text-foreground lg:text-4xl">
          Filter.
        </h2>

        <div className="mt-8 lg:mt-10">
          <h3 className="text-base font-medium text-foreground lg:text-lg">Industry</h3>
          <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:mx-0 lg:mt-4 lg:flex-wrap lg:gap-3 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
            {availableIndustries.map((industry) => (
              <button
                key={industry}
                type="button"
                onClick={() => toggleIndustry(industry)}
                className={`shrink-0 rounded-full px-3 py-2 text-sm transition-colors lg:px-4 lg:py-2 lg:text-base ${
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

        <div className="mt-8 lg:mt-10">
          <h3 className="text-base font-medium text-foreground lg:text-lg">Age</h3>
          <p className="mt-2 text-sm text-muted-foreground lg:hidden">
            Drag min and max (ages {ageRange[0]}–{ageRange[1]})
          </p>
          <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-4">
            <input
              type="range"
              min="8"
              max="18"
              value={ageRange[0]}
              aria-label="Minimum age"
              onChange={(e) =>
                setAgeRange([parseInt(e.target.value, 10), ageRange[1]])
              }
              className="h-3 w-full min-w-0 cursor-pointer appearance-none rounded-lg bg-secondary accent-accent lg:flex-1"
            />
            <span className="hidden shrink-0 text-base text-muted-foreground lg:inline">
              {ageRange[0]} - {ageRange[1]}
            </span>
            <input
              type="range"
              min="8"
              max="18"
              value={ageRange[1]}
              aria-label="Maximum age"
              onChange={(e) =>
                setAgeRange([ageRange[0], parseInt(e.target.value, 10)])
              }
              className="h-3 w-full min-w-0 cursor-pointer appearance-none rounded-lg bg-secondary accent-accent lg:flex-1"
            />
          </div>
        </div>

        <div className="mt-8 lg:mt-10">
          <h3 className="text-base font-medium text-foreground lg:text-lg">Sort by</h3>
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "newest" | "youngest" | "az")
            }
            className="mt-3 w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent lg:mt-4 lg:bg-card"
          >
            <option value="newest">Newest</option>
            <option value="youngest">Youngest</option>
            <option value="az">A–Z</option>
          </select>
        </div>

        <button
          type="button"
          onClick={resetFilters}
          className="mt-8 text-sm text-muted-foreground transition-colors hover:text-foreground lg:mt-10 lg:text-base"
        >
          Reset filters
        </button>
        </aside>

        <div className="min-w-0 lg:col-start-2 lg:row-start-2">
          <p className="text-base text-muted-foreground max-lg:text-sm lg:text-lg">
            Showing {filteredProfiles.length} of {profiles.length} F18s
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:mt-8 sm:grid-cols-2 sm:gap-8 xl:grid-cols-3">
            {filteredProfiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} variant="simple" size="large" />
            ))}
          </div>

          {filteredProfiles.length === 0 && (
            <div className="mt-12 text-center lg:mt-16">
              <p className="text-lg text-muted-foreground lg:text-xl">
                No profiles match your filters.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 text-base text-accent hover:underline lg:mt-6 lg:text-lg"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
