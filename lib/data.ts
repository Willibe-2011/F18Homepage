export interface F18Profile {
  id: string
  slug: string
  name: string
  age: number
  location: string
  gender: "Female" | "Male" | "Non-binary" | "Prefer not to say"
  pictureUrl?: string
  profileUrl?: string
  industry: string
  project: string
  whatTheyreBuilding: string
  whyItMatters: string[]
  proofTraction: string[]
  evidence: string[]
  breakTheRecord: string
  personalArticle: string
  letterToVC?: string
  letterToUniversity?: string
  readPublish: boolean
  socialMedia?: string
  lastEditTime: string
  lookingFor: "nothing" | "vc" | "university" | "both"
}

// Industry options matching the Notion database schema
export const industries = [
  "Tech",
  "Education",
  "Healthcare",
  "Finance",
  "Media",
  "Retail",
  "Real Estate",
  "Manufacturing",
  "Hospitality",
  "Other",
] as const

// Legacy mock data kept for fallback only – production data comes from Notion
export const mockProfiles: F18Profile[] = [
  {
    id: "mohammad-parsa-parhizkar",
    slug: "mohammad-parsa-parhizkar",
    name: "Mohammad Parsa Parhizkar",
    age: 12,
    location: "Kuala Lumpur, Malaysia",
    gender: "Male",
    pictureUrl: undefined,
    profileUrl: "https://parsarohan.com/parsa/",
    industry: "Education",
    project: "Minedu AI (Minecraft education plug-in powered by Google Gemini)",
    whatTheyreBuilding:
      "Minedu AI is an AI-powered educational plug-in for Minecraft that turns the game into an interactive science classroom. It uses Google's Gemini API to power AI tutors and intelligent NPCs that answer student questions in multiple languages (English, Malay, Mandarin), provide real-time personalized feedback, and generate quizzes and check understanding inside the game loop.",
    whyItMatters: [
      "Meets learners where attention already is (in-game), reducing disengagement by design",
      "Makes complex science concepts more approachable through interactive, contextual explanations",
      "Early signal of distribution advantage: Minecraft-native workflow vs. standalone edtech apps",
    ],
    proofTraction: [
      "ITEX/WYIE 2025: Gold + Best Young Inventor Excellence Award (Primary Level); reported as beating 140+ teams from 55 schools",
      "GITEX Asia 2026: Youngest-ever speaker; demoed/represented Minedu AI on stage",
      "Reported backing/support: Google Malaysia",
      "Reported early monetization: plug-in licensing + AI training workshops",
    ],
    personalArticle: `The first time Mohammad Parsa Parhizkar realised school could feel like a game, it was not because a teacher tried to make it entertaining. It was because he was already in Minecraft, building worlds block by block, and he wondered why the same momentum never showed up when the subject switched to science. In Kuala Lumpur, like most kids, he was surrounded by lessons that asked students to sit still and absorb. Minecraft asked the opposite. It asked you to test ideas immediately. So he decided to move the classroom into the place where curiosity already lived.

That instinct became Minedu AI, an educational plug-in built inside Minecraft that turns a familiar sandbox into an interactive science classroom. The premise is simple enough to sound obvious, which is usually a signal that it hits a real nerve: students can ask questions inside the game and receive clear, structured answers, then get quizzes to check understanding, and even get feedback that adapts to what they are doing. Instead of forcing a child to leave play to go learn, it treats play as the vehicle for learning.

Parsa was still in primary school when he and his younger brother, Mohammad Rohan, began building the first version. They were not operating from a lab or a startup incubator. They learned to code the way a lot of young builders do now: with a tutor, with tutorial videos, and with the stubborn repetition that comes from not yet being trained to stop when something breaks. In an interview with Free Malaysia Today, Parsa described how the build took about two months and how the process "got bumpy at times," with repeated troubleshooting before it finally worked. When it did, he remembered the moment as physical relief: "I literally jumped out of my seat – I was so happy."

What they were trying to solve is a problem adults often underestimate: disengagement is not a character flaw, it is a design failure. Most school systems are built around a schedule and a syllabus, not around the way attention actually behaves. Minecraft, on the other hand, is built around agency. You decide what to build, you see the result, you adjust. Minedu AI tries to borrow that loop and attach it to real learning objectives.

Under the hood, the product leans on modern infrastructure that would have been inaccessible to kids even a few years ago. Multiple public profiles describe the system as powered by Google's Gemini API, and supported by Google Malaysia through access to resources and licensing. The tool is designed to work across languages too, with public coverage noting that users can ask questions in English, Malay, or Mandarin. That matters in Malaysia, where language can be a barrier to confidence. It also matters as an early sign of a founder thinking about scale, not just a school demo.

The first market test was not a pricing spreadsheet. It was whether real people cared. By mid-2025, national coverage in Malay Mail described the brothers' project as an "Intelligent Minecraft Learning Assistant" and reported that, backed by Google Malaysia, they had launched a company and begun earning income by licensing the plug-in and running AI training workshops for students. Even at that early stage, Parsa spoke about motivation in plain language, not in startup theater. "We love Minecraft and want to make learning fun, not boring," his brother Rohan said in the same coverage. Parsa added, "With AI, we can help every child learn better while enjoying the game they already love."

Public recognition followed quickly, and it came in formats that force a different kind of accountability than online praise. At ITEX 2025, their work earned a gold medal at the World Young Inventors Exhibition category and the Best Young Inventor Excellence Award (Primary Level), outshining more than a hundred participants from dozens of schools. It is the kind of milestone that does not just validate a build. It signals to adults in the ecosystem that a real product might be emerging from an unexpected place.

But the more interesting part of the story is not the trophy. It is the habit behind it. Coverage from Free Malaysia Today includes his mother describing the boys' persistence even when the system crashed or they failed several times: "They had a fire in them to see it through." Their father tied that persistence to another part of their life: competitive sports, specifically Brazilian jiu-jitsu and wrestling, where repetition and pressure are unavoidable. It is an unusually clean training ground for entrepreneurship. You show up. You lose. You train. You return.

As Minedu AI grew, the scrutiny shifted from "can kids build this?" to "can kids lead this?" That is where Parsa's story starts to matter for Founders18. The hard part for under-18 founders is rarely the first prototype. It is credibility. Adults assume young people are playing at business, and the default posture is to praise them politely while keeping real opportunity at arm's length. Parsa and Rohan have taken the opposite route: build something that works, attach it to an institution that signals trust, and keep collecting proof.

By 2025, Parsa was already being described publicly as one of Malaysia's youngest tech founders and CEOs. He and Rohan were also invited to speak at the ASEAN AI Malaysia Summit, with coverage describing them as the youngest-ever speakers at the event. Speaking slots are not just a stage. They are a test. Can you explain what you built? Can you defend it? Can you tell a room of adults what you know that they do not? Parsa stepped into that test early.

In 2026, he took on an even larger stage. Malay Mail reported that at GITEX Asia in Singapore (April 9 to 10, 2026), Mohammad Parsa bin Behran Parhizkar made history as the youngest speaker ever at the event. The story describes him presenting "Minedu AI Primary," an AI avatar tutor designed to transform science education for primary students, with real-time voice interaction and personalised pathways. Another public speaker listing for GITEX AI Asia 2026 includes "Mohammad Parsa Bin Behrang" as a co-founder of Minedu AI, placing his name directly in the event's published lineup.

The ambition behind Minedu AI is not to make homework slightly less painful. It is to reframe how learning works when the interface is playful, conversational, and immediate. That is a sharp bet, because education technology is crowded with tools that look good in demos and disappear in classrooms. The difference, if Parsa gets it right, will be distribution and habit. Minecraft already has the habit. If Minedu AI can become the layer that turns curiosity into understanding without breaking the flow, the product does not need to fight for attention. It rides attention where it already is.

The road ahead will be defined by practical constraints more than headlines. Can the system stay accurate, safe, and age-appropriate at scale? Can it align with curricula without becoming another rigid worksheet engine? Can it earn trust from schools and parents, not just from tech events? The fact that public coverage already mentions guardrails for self-harm queries is a sign that the founders are thinking about risk, not just features.

Parsa's story is a reminder that under-18 founders do not need a different category. They need a different set of gates. The traditional gates are credentials and time. The new gates are proof and momentum. He is building in the open, collecting recognition that is hard to fake, and pushing an idea that is larger than his age: that education should meet students where they already are, and that kids can build the tools that make that possible.

Founders18 exists to surface that kind of builder early. Not because youth is impressive on its own, but because shipping early changes what becomes possible later. Mohammad Parsa Parhizkar is building a bridge between play and learning, and in doing so he is also building a case for a bigger claim: success does not wait for age.`,
    evidence: [
      "Malay Mail June 2025 — https://www.malaymail.com/news/tech-gadgets/2025/06/04/malaysian-brothers-win-best-young-inventors-launch-ai-startup-with-google/179263",
      "SAYS.com — https://says.com/my/tech/kids-build-ai-minecraft-bot",
      "Free Malaysia Today July 2025 — https://www.freemalaysiatoday.com/category/leisure/2025/07/02/brothers-behind-minedu-ai-show-the-genius-of-young-msians",
      "Malay Mail April 2026 (GITEX Asia youngest speaker) — https://www.malaymail.com/news/life/2026/04/15/malaysian-brothers-achieve-four-major-titles-in-24-hours-across-global-ai-innovation-and-international-sports/216370",
    ],
    breakTheRecord:
      "Youngest-ever speaker at GITEX Asia (April 2026, Singapore); among Malaysia's youngest tech company founders/CEOs at age 12.",
    letterToVC: `At twelve years old, Mohammad Parsa Parhizkar became the youngest speaker ever to take the stage at GITEX Asia 2026 in Singapore — and he had a working AI product to demo, not a pitch deck about one.

Parsa is a 12-year-old founder in Malaysia building Minedu AI, an educational plug-in that turns Minecraft into an interactive science classroom. Co-founded with his younger brother and powered by Google's Gemini API, Minedu AI delivers in-game AI tutors and intelligent NPCs that answer student questions in English, Malay, and Mandarin, generate adaptive quizzes, and give real-time personalised feedback inside a world students already love.

The opportunity is straightforward: disengagement in K12 science is a design problem, not a content problem. Students will not sit still for a worksheet, but they will spend hours iterating in Minecraft. Minedu AI rides that existing attention loop instead of competing with it. Backed by Google Malaysia, the product has already won Gold and the Best Young Inventor Excellence Award at ITEX/WYIE 2025, outperforming more than 140 teams from 55 schools, and the team has begun earning revenue through plug-in licensing and AI training workshops. The insight that learning should meet students where their attention already lives is one only a builder working inside the game could credibly articulate.

Parsa was discovered, vetted, and is being introduced through Founders18, the globally selective platform for the world's most exceptional under-18 founders. Founders18 admits only a small fraction of applicants each cohort, and Minedu AI's mission to make rigorous learning native to the way young people already play is a direct embodiment of what Founders18 exists to back. This introduction carries Founders18's curatorial endorsement, alongside ongoing mentorship and access to the wider F18 founder network.

We would like to request a 20-minute intro call at your convenience, coordinated exclusively through Founders18. Please reply to Founders18 and we will arrange the introduction.

On behalf of Founders18,
Find them early. Inspire them always. Build the future together.`,
    letterToUniversity: `Dear Admissions Committee,

Founders18 is a globally selective platform that discovers, vets, and supports the world's most exceptional under-18 founders, admitting only a small fraction of applicants worldwide each year. It is with genuine enthusiasm that I write on behalf of Founders18 to recommend Mohammad Parsa Parhizkar, a 12-year-old founder from Malaysia whose work on Minedu AI — an AI-powered educational plug-in that turns Minecraft into an interactive science classroom — stood out among thousands of candidates we evaluated.

Minedu AI addresses a problem most education systems treat as inevitable: that student disengagement is a character flaw rather than a design failure. Parsa's response was to move the classroom into the place where curiosity already lives. Working with his younger brother, he built a plug-in that uses Google's Gemini API to power AI tutors and intelligent NPCs inside Minecraft, answering questions in multiple languages, generating adaptive quizzes, and giving real-time personalised feedback. The system was built over months of iterative debugging — not as a school assignment, but as a real product. The ambition behind it is reflected in its outcomes: Gold and the Best Young Inventor Excellence Award at ITEX/WYIE 2025, beating more than 140 teams; selection as the youngest-ever speaker at GITEX Asia 2026; and verified coverage in major Malaysian national publications.

What is most distinctive about Parsa is not what he has built, but how he thinks. He approaches engineering with the discipline of a competitive athlete — his family ties his persistence to his training in Brazilian jiu-jitsu and wrestling, where losing repeatedly is part of the curriculum. When Minedu AI's first build finally ran after weeks of failure, his next move was not celebration but iteration. He speaks publicly about his motivation in plain, unsentimental terms — that learning should meet students where they already are — and defends his ideas in front of adult audiences at international tech summits. He is a young builder who treats critique as raw material rather than as judgment.

Founders18's mission is to empower the next generation of founders to build real, world-changing ventures before adulthood, and Parsa's project is a direct embodiment of that mission. His selection into Founders18 places him in a curated peer group of the world's most promising young builders, with active mentorship, and the committee can rely on Founders18's vetting as a meaningful external signal of capability and character.

Parsa would thrive in and contribute to a rigorous academic community, particularly in education, computer science, and human-computer-interaction-adjacent fields, where the questions he is already asking — about learning, attention, and design — are the live questions of the discipline.

Should the committee wish for any further context, please contact Founders18 and we will be glad to assist.

On behalf of Founders18,
Find them early. Inspire them always. Build the future together.`,
    readPublish: false,
    socialMedia: "https://www.instagram.com/parsarohanmy/",
    lastEditTime: "April 25, 2026 12:26 PM",
    lookingFor: "both",
  },
  {
    id: "maya-chen",
    slug: "maya-chen",
    name: "Mohammad Parsa Parhizkar",
    age: 12,
    location: "Kuala Lumpur, Malaysia",
    gender: "Male",
    industry: "Education",
    profileUrl: "https://parsarohan.com/parsa/",
    socialMedia: "https://www.instagram.com/parsarohanmy/",
    project: "Minedu AI (Minecraft education plug-in powered by Google Gemini)",
    whatTheyreBuilding:
      "Minedu AI is an AI-powered educational plug-in for Minecraft that turns the game into an interactive science classroom. It uses Google's Gemini API to power AI tutors and intelligent NPCs that answer student questions in multiple languages (English, Malay, Mandarin), provide real-time personalized feedback, and generate quizzes and check understanding inside the game loop.",
    whyItMatters: [
      "Meets learners where attention already is (in-game), reducing disengagement by design",
      "Makes complex science concepts more approachable through interactive, contextual explanations",
      "Early signal of distribution advantage: Minecraft-native workflow vs. standalone edtech apps",
    ],
    proofTraction: [
      "ITEX/WYIE 2025: Gold + Best Young Inventor Excellence Award (Primary Level); reported as beating 140+ teams from 55 schools",
      "GITEX Asia 2026: Youngest-ever speaker; demoed/represented Minedu AI on stage",
      "Reported backing/support: Google Malaysia",
      "Reported early monetization: plug-in licensing + AI training workshops",
    ],
    breakTheRecord: "Youngest-ever speaker at GITEX Asia (Apr 2026, Singapore)",
    evidence: [
      "Malay Mail (Jun 2025): https://www.malaymail.com/news/tech-gadgets/2025/06/04/malaysian-brothers-win-best-young-inventors-launch-ai-startup-with-google/179263",
      "SAYS.com: https://says.com/my/tech/kids-build-ai-minecraft-bot",
      "Free Malaysia Today (Jul 2025): https://www.freemalaysiatoday.com/category/leisure/2025/07/02/brothers-behind-minedu-ai-show-the-genius-of-young-msians",
      "Malay Mail (Apr 2026): https://www.malaymail.com/news/life/2026/04/15/malaysian-brothers-achieve-four-major-titles-in-24-hours-across-global-ai-innovation-and-international-sports/216370",
    ],
    readPublish: true,
    personalArticle:
      "The first time Mohammad Parsa Parhizkar realised school could feel like a game, it was not because a teacher tried to make it entertaining. It was because he was already in Minecraft, building worlds block by block, and he wondered why the same momentum never showed up when the subject switched to science. In Kuala Lumpur, like most kids, he was surrounded by lessons that asked students to sit still and absorb. Minecraft asked the opposite. It asked you to test ideas immediately. So he decided to move the classroom into the place where curiosity already lived.\n\nThat instinct became Minedu AI, an educational plug-in built inside Minecraft that turns a familiar sandbox into an interactive science classroom. The premise is simple enough to sound obvious, which is usually a signal that it hits a real nerve: students can ask questions inside the game and receive clear, structured answers, then get quizzes to check understanding, and even get feedback that adapts to what they are doing. Instead of forcing a child to leave play to go learn, it treats play as the vehicle for learning.",
    lookingFor: "both",
    letterToVC:
      "At twelve years old, Mohammad Parsa Parhizkar became the youngest speaker ever to take the stage at GITEX Asia 2026 in Singapore — and he had a working AI product to demo, not a pitch deck about one.\n\nParsa is a 12-year-old founder in Malaysia building Minedu AI, an educational plug-in that turns Minecraft into an interactive science classroom. Co-founded with his younger brother and powered by Google's Gemini API, Minedu AI delivers in-game AI tutors and intelligent NPCs that answer student questions in English, Malay, and Mandarin, generate adaptive quizzes, and give real-time personalised feedback inside a world students already love.\n\nThe opportunity is straightforward: disengagement in K12 science is a design problem, not a content problem. Students will not sit still for a worksheet, but they will spend hours iterating in Minecraft. Minedu AI rides that existing attention loop instead of competing with it. Backed by Google Malaysia, the product has already won Gold and the Best Young Inventor Excellence Award at ITEX/WYIE 2025, outperforming more than 140 teams from 55 schools, and the team has begun earning revenue through plug-in licensing and AI training workshops.",
    letterToUniversity:
      "Founders18 is a globally selective platform that discovers, vets, and supports the world's most exceptional under-18 founders, admitting only a small fraction of applicants worldwide each year. It is with genuine enthusiasm that I write on behalf of Founders18 to recommend Mohammad Parsa Parhizkar, a 12-year-old founder from Malaysia whose work on Minedu AI — an AI-powered educational plug-in that turns Minecraft into an interactive science classroom — stood out among thousands of candidates we evaluated.\n\nMinedu AI addresses a problem most education systems treat as inevitable: that student disengagement is a character flaw rather than a design failure. Parsa's response was to move the classroom into the place where curiosity already lives. Working with his younger brother, he built a plug-in that uses Google's Gemini API to power AI tutors and intelligent NPCs inside Minecraft, answering questions in multiple languages, generating adaptive quizzes, and giving real-time personalised feedback.",
    lastEditTime: "April 25, 2026",
  },
  {
    id: "alex-rivera",
    slug: "alex-rivera",
    name: "Alex Rivera",
    age: 17,
    location: "Houston, USA",
    gender: "Male",
    industry: "Climate",
    profileUrl: "https://carboncapture.io",
    project: "Low-cost algae-based carbon capture bioreactor",
    whatTheyreBuilding:
      "Developed a low-cost carbon capture device using genetically modified algae bioreactors that absorb CO2 at 10x the rate of traditional methods.",
    whyItMatters: [
      "Makes carbon capture economically viable for small communities",
      "Uses biological processes instead of energy-intensive industrial methods",
      "Patented technology with clear path to commercialization",
    ],
    proofTraction: [
      "U.S. Patent #11,234,567 — Issued January 2026",
      "Pilot installation capturing 50 tons CO2/year",
      "Partnership discussions with 3 industrial facilities",
    ],
    breakTheRecord: "First teenager to receive a U.S. patent for carbon capture technology.",
    evidence: ["U.S. Patent #11,234,567 — Issued January 2026"],
    readPublish: true,
    personalArticle:
      "Growing up in Houston, I saw firsthand the impact of industrial pollution on my community. I spent three years in my garage lab experimenting with different approaches to carbon capture. The breakthrough came when I realized we could use genetically modified algae to absorb CO2 at 10x the rate of traditional methods. Now I am working to make this technology accessible to communities around the world.",
    lookingFor: "vc",
    letterToVC:
      "My patented technology has the potential to revolutionize carbon capture at a fraction of current costs. I am seeking funding to build pilot installations and prove scalability.",
    lastEditTime: "February 20, 2026",
  },
  {
    id: "priya-sharma",
    slug: "priya-sharma",
    name: "Priya Sharma",
    age: 14,
    location: "Mumbai, India",
    gender: "Female",
    industry: "Tech",
    profileUrl: "https://signspeak.app",
    project: "SignSpeak - Real-time sign language translator",
    whatTheyreBuilding:
      "An AI-powered mobile app that uses computer vision to translate sign language to text in real-time, bridging communication gaps for the deaf community.",
    whyItMatters: [
      "Removes communication barriers for 70 million deaf people worldwide",
      "Works offline on standard smartphones, no special hardware needed",
      "Self-taught ML approach demonstrates accessible path to AI development",
    ],
    proofTraction: [
      "1M+ downloads on App Store",
      "4.8 star rating with 50,000+ reviews",
      "Featured in Apple's accessibility showcase",
    ],
    breakTheRecord: "Youngest developer to reach 1M downloads on App Store.",
    evidence: ["App Store Analytics — Verified March 2026"],
    readPublish: false,
    personalArticle:
      "My grandmother is deaf, and I always felt frustrated that I could not communicate with her easily. I taught myself machine learning and computer vision to build SignSpeak. The app uses your phone camera to recognize sign language and converts it to text instantly. Seeing my grandmother use it to order coffee for the first time made every late night worth it.",
    lookingFor: "university",
    letterToUniversity:
      "I am looking for a school with strong computer science and accessibility programs. I want to continue developing assistive technologies and need mentorship from experienced researchers.",
    lastEditTime: "March 10, 2026",
  },
  {
    id: "kai-johnson",
    slug: "kai-johnson",
    name: "Kai Johnson",
    age: 16,
    location: "Portland, USA",
    gender: "Non-binary",
    industry: "Arts",
    profileUrl: "https://kai-johnson.art",
    project: "Hand-drawn animated short film",
    whatTheyreBuilding:
      "A hand-drawn animated short film exploring themes of identity and belonging, created entirely solo over 18 months with 14,000+ individual drawings.",
    whyItMatters: [
      "Demonstrates that independent artists can compete at the highest level",
      "Authentic storytelling about identity resonates with underrepresented audiences",
      "Proves the viability of traditional animation in the digital age",
    ],
    proofTraction: [
      "Sundance Film Festival Official Selection 2026",
      "14,000+ hand-drawn frames over 18 months",
      "Featured in Animation Magazine",
    ],
    breakTheRecord: "Youngest solo animator selected for Sundance.",
    evidence: ["Sundance Film Festival Official Selection 2026"],
    readPublish: false,
    personalArticle:
      "Animation is my way of telling stories that words cannot capture. I spent 18 months creating every frame of my short film by hand — over 14,000 drawings. The film explores themes of identity and belonging, inspired by my own journey. Being selected for Sundance felt surreal, but what matters most is that my story resonates with others who have felt different.",
    lookingFor: "nothing",
    lastEditTime: "January 5, 2026",
  },
  {
    id: "emma-zhang",
    slug: "emma-zhang",
    name: "Emma Zhang",
    age: 13,
    location: "Boston, USA",
    gender: "Female",
    industry: "Research",
    profileUrl: "https://quantumbits.org",
    project: "Novel quantum error correction using topological codes",
    whatTheyreBuilding:
      "Discovered a novel approach to quantum error correction using topological codes, enabling more stable quantum computing operations.",
    whyItMatters: [
      "Addresses one of quantum computing's biggest challenges: decoherence",
      "Collaboration with MIT researchers validates the approach",
      "Opens new research directions in topological quantum computing",
    ],
    proofTraction: [
      "Physical Review Letters, Vol. 132, February 2026",
      "Co-author with MIT quantum computing lab",
      "Presented at APS March Meeting 2026",
    ],
    breakTheRecord: "Youngest contributor to a peer-reviewed quantum computing paper.",
    evidence: ["Physical Review Letters, Vol. 132, February 2026"],
    readPublish: true,
    personalArticle:
      "I became fascinated with quantum computing after reading a book about Schrödinger cat. The idea that particles could be in multiple states at once seemed magical. I started learning everything I could about quantum mechanics and eventually noticed a pattern in error correction that no one had explored. Working with researchers at MIT, we published our findings. I believe quantum computers will change everything, and I want to be part of that revolution.",
    lookingFor: "university",
    letterToUniversity:
      "I am seeking a school with advanced physics and mathematics programs. I want to continue my research in quantum computing while getting a strong foundation in theoretical physics.",
    lastEditTime: "February 28, 2026",
  },
  {
    id: "marcus-williams",
    slug: "marcus-williams",
    name: "Marcus Williams",
    age: 17,
    location: "Atlanta, USA",
    gender: "Male",
    industry: "Business",
    profileUrl: "https://farmfresh.co",
    project: "FarmFresh - Direct farm-to-consumer marketplace",
    whatTheyreBuilding:
      "A marketplace platform connecting urban consumers directly with local farmers, cutting out middlemen and ensuring fair prices for both sides.",
    whyItMatters: [
      "Increases farmer income by 40% on average compared to wholesale",
      "Provides urban consumers access to fresher, locally-sourced produce",
      "Y Combinator backing validates the business model",
    ],
    proofTraction: [
      "Y Combinator Winter 2026 batch",
      "$2M revenue generated for small farmers in first year",
      "500+ farmers, 50,000+ customers on platform",
    ],
    breakTheRecord: "Generated $2M in revenue for small farmers in first year.",
    evidence: ["Verified by Y Combinator — Winter 2026 batch"],
    readPublish: false,
    personalArticle:
      "My grandparents have a small farm in Georgia. Every year, they struggled to sell their produce at fair prices while grocery stores charged consumers premium rates. I built FarmFresh to cut out the middlemen. Our platform now connects over 500 farmers with 50,000 customers. Watching my grandparents earn what they deserve while families get fresh, affordable food is the greatest reward.",
    lookingFor: "vc",
    letterToVC:
      "FarmFresh has proven product-market fit with strong unit economics. We are seeking Series A funding to expand to 10 new cities and onboard 2,000 additional farmers.",
    lastEditTime: "March 1, 2026",
  },
  {
    id: "sofia-kim",
    slug: "sofia-kim",
    name: "Sofia Kim",
    age: 15,
    location: "Seattle, USA",
    gender: "Female",
    industry: "Bio",
    profileUrl: "https://rapidtest.bio",
    project: "Paper-based antibiotic resistance diagnostic",
    whatTheyreBuilding:
      "A paper-based diagnostic test that detects antibiotic resistance patterns in 30 minutes instead of days, costing less than $1 per test.",
    whyItMatters: [
      "Addresses antibiotic resistance, a top global health threat",
      "Low cost makes it viable for clinics in developing countries",
      "Rapid results enable immediate treatment decisions",
    ],
    proofTraction: [
      "Intel ISEF 2026 Grand Award in Medicine",
      "Clinical trials pending with 3 hospital partners",
      "WHO consultation on global deployment",
    ],
    breakTheRecord: "Youngest winner of Intel ISEF Grand Award in Medicine.",
    evidence: ["Intel ISEF 2026 — Grand Award, Medicine Category"],
    readPublish: true,
    personalArticle:
      "When my cousin in rural Vietnam got sick, doctors prescribed antibiotics that did not work because the bacteria were resistant. By the time they found the right treatment, she had permanent complications. I knew there had to be a faster way to identify antibiotic resistance. My paper-based test can detect resistance patterns in 30 minutes instead of days, costing less than $1. I want to bring this to clinics worldwide.",
    lookingFor: "vc",
    letterToVC:
      "Antibiotic resistance is a global health crisis. My low-cost diagnostic test is ready for clinical trials. I am seeking partners to help bring this technology to underserved communities.",
    lastEditTime: "March 5, 2026",
  },
  {
    id: "leo-martinez",
    slug: "leo-martinez",
    name: "Leo Martinez",
    age: 16,
    location: "Mexico City, Mexico",
    gender: "Male",
    industry: "Sports",
    profileUrl: "https://coachleo.app",
    project: "CoachLeo - AI sports coaching platform",
    whatTheyreBuilding:
      "An AI coaching platform that analyzes gameplay footage and provides personalized training plans for young athletes who lack access to professional coaching.",
    whyItMatters: [
      "Democratizes access to professional-level coaching",
      "AI analysis provides insights previously only available to elite athletes",
      "$5M valuation validates the market opportunity",
    ],
    proofTraction: [
      "10,000+ young athletes trained",
      "$5M company valuation",
      "Featured in TechCrunch, March 2026",
    ],
    breakTheRecord: "First teen to build a sports tech company valued at $5M.",
    evidence: ["TechCrunch coverage — March 2026"],
    readPublish: false,
    personalArticle:
      "I grew up playing soccer in a small town with no access to professional coaching. I had talent but no way to develop it. So I built CoachLeo — an AI that analyzes your gameplay footage and provides personalized training plans. What started as a side project now helps 10,000 young athletes improve their game, regardless of where they live or how much money they have.",
    lookingFor: "nothing",
    lastEditTime: "February 15, 2026",
  },
  {
    id: "aria-patel",
    slug: "aria-patel",
    name: "Aria Patel",
    age: 14,
    location: "Chicago, USA",
    gender: "Female",
    industry: "Tech",
    profileUrl: "https://codebridge.org",
    project: "CodeBridge - Offline-first coding education platform",
    whatTheyreBuilding:
      "An offline-first coding education platform with physical coding kits and community learning centers, reaching students without reliable internet access.",
    whyItMatters: [
      "Reaches students excluded by internet-dependent learning platforms",
      "Physical kits enable hands-on learning without computers",
      "Partnership model scales through existing community infrastructure",
    ],
    proofTraction: [
      "50,000 students taught to code",
      "200 school and community center partnerships",
      "Featured in EdSurge, January 2026",
    ],
    breakTheRecord: "Largest free coding education platform founded by a teenager.",
    evidence: ["EdSurge Feature — January 2026"],
    readPublish: false,
    personalArticle:
      "I learned to code from free online resources because my family could not afford classes. But I noticed that many of my friends did not have computers or reliable internet at home. CodeBridge provides offline-first learning with physical coding kits and community learning centers. We have partnered with 200 schools and community centers to reach students who would otherwise never have access to computer science education.",
    lookingFor: "university",
    letterToUniversity:
      "I am looking for a school that values social impact and entrepreneurship. I want to continue scaling CodeBridge while learning from mentors who understand both technology and education.",
    lastEditTime: "January 20, 2026",
  },
  {
    id: "jordan-lee",
    slug: "jordan-lee",
    name: "Jordan Lee",
    age: 17,
    location: "Honolulu, USA",
    gender: "Male",
    industry: "Research",
    profileUrl: "https://jordanlee.science",
    project: "Deep-sea species discovery research",
    whatTheyreBuilding:
      "Identified a new species of deep-sea organism (Abyssornis profundus) during a research expedition to the Mariana Trench.",
    whyItMatters: [
      "Expands scientific knowledge of deep-sea ecosystems",
      "Demonstrates that young researchers can contribute to frontier science",
      "Published in Nature Communications validates the discovery",
    ],
    proofTraction: [
      "Nature Communications publication, April 2026",
      "New species officially named and catalogued",
      "Invited to speak at Ocean Sciences Meeting 2026",
    ],
    breakTheRecord: "Youngest person to discover a new species in the Mariana Trench.",
    evidence: ["Nature Communications, April 2026"],
    readPublish: true,
    personalArticle:
      "The ocean has always called to me. When I got the chance to join a deep-sea research expedition, I spent every moment studying the footage from our submersibles. That is when I noticed an organism that did not match any known species. Working with marine biologists, we confirmed it was indeed a new species. We named it Abyssornis profundus. This discovery reminds me how much we still do not know about our own planet.",
    lookingFor: "nothing",
    lastEditTime: "April 10, 2026",
  },
]

export function getProfileById(id: string): F18Profile | undefined {
  return mockProfiles.find((profile) => profile.id === id)
}
