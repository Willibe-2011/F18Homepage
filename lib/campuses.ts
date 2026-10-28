export const CAMPUSES = [
  { name: "Harvard", file: "harvard-wordmark.png" },
  { name: "MIT", file: "mit-crest.svg" },
  { name: "Stanford", file: "stanford-wordmark.png" },
  { name: "Yale", file: "yale-wordmark.png" },
  { name: "Princeton", file: "princeton-wordmark.png" },
  { name: "Columbia", file: "columbia-wordmark.png" },
  { name: "UPenn", file: "upenn-wordmark.png" },
  { name: "Brown", file: "brown-wordmark.svg" },
  { name: "NYU", file: "nyu-crest.svg" },
  { name: "Berkeley", file: "berkeley-wordmark.png" },
  { name: "UCLA", file: "ucla-script.png" },
  { name: "Caltech", file: "caltech-wordmark.png" },
] as const

export type Campus = (typeof CAMPUSES)[number]

export function campusLogoPath(file: string) {
  return `/campuses/${file}`
}
