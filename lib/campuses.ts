export const CAMPUSES = [
  { name: "Harvard", file: "harvard-crest.svg" },
  { name: "MIT", file: "mit-crest.svg" },
  { name: "Stanford", file: "stanford-crest.svg" },
  { name: "Yale", file: "yale-crest.svg" },
  { name: "Princeton", file: "princeton-crest.svg" },
  { name: "Columbia", file: "columbia-crest.svg" },
  { name: "UPenn", file: "upenn-crest.svg" },
  { name: "Brown", file: "brown-crest.svg" },
  { name: "NYU", file: "nyu-crest.svg" },
  { name: "Berkeley", file: "berkeley-crest.svg" },
  { name: "UCLA", file: "ucla-crest.svg" },
  { name: "Caltech", file: "caltech-crest.png" },
] as const

export type Campus = (typeof CAMPUSES)[number]

export function campusLogoPath(file: string) {
  return `/campuses/${file}`
}
