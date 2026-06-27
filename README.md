# Zerio

A structured, interactive Tailwind CSS learning platform built for beginner developers who are actively building a real hospital management system — **MediCore HMS**.

Learners already know basic HTML structure but have never touched a CSS framework. Zerio takes them from zero to confident with Tailwind v4 through 12 progressive lessons, each with a live visual demo, a sandbox playground, and a hands-on challenge scoped to the MediCore context.

---

## Features

- **12 progressive lessons** — from utility-first philosophy through typography, spacing, color, sizing, flexbox, grid, borders, shadows, responsive design, interaction states, and a capstone
- **Interactive visual demos** — each lesson has a guided in-lesson demo where learners toggle Tailwind classes and see changes before writing any code themselves
- **Live HTML/Tailwind sandbox** — a fixed right-side playground (always visible on desktop) where learners write and preview HTML in real time
- **Per-lesson challenges** — scoped exercises with hints to cement each concept
- **AI-powered hint system** — backed by Google Gemini to give contextual nudges without giving away answers
- **Progress tracking** — completion state saved to `localStorage`; visible in the sidebar
- **MediCore HMS context** — every example and challenge is framed around a hospital management system, giving beginners a real project to mentally anchor new concepts to

---

## Lessons

| # | Title |
|---|-------|
| 1 | What is Tailwind and How Does It Work? |
| 2 | Typography |
| 3 | Spacing (Margin and Padding) |
| 4 | Colors |
| 5 | Sizing (Width and Height) |
| 6 | Flexbox — Layout Engine Part 1 |
| 7 | Grid — Layout Engine Part 2 |
| 8 | Borders and Rounded Corners |
| 9 | Shadows and Backgrounds |
| 10 | Responsive Design |
| 11 | States and Interactivity |
| 12 | Putting It All Together |

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm 9 or later
- A Google Gemini API key (for the AI hint feature)

### Setup

```bash
git clone https://github.com/ellaliza/zerio.git
cd zerio
npm install
```

Create a `.env` file in the project root:

```
GEMINI_API_KEY=your_api_key_here
```

### Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
zerio/
├── src/
│   ├── App.tsx                     # Main layout, lesson navigation, state management
│   ├── types.ts                    # TypeScript interfaces (Lesson, LessonExample, LessonChallenge)
│   ├── data/
│   │   └── lessons.ts              # All 12 lessons — content, examples, challenges
│   └── components/
│       ├── Playground.tsx          # Live HTML/Tailwind sandbox (iframe-based)
│       ├── LessonDemo.tsx          # Routes lessonId → interactive demo component
│       └── demos/
│           ├── shared.tsx          # DemoWrapper, ToggleGroup, ClassChip primitives
│           ├── TypographyDemo.tsx
│           ├── SpacingDemo.tsx
│           ├── ColorsDemo.tsx
│           ├── SizingDemo.tsx
│           ├── FlexboxDemo.tsx
│           ├── GridDemo.tsx
│           ├── BordersDemo.tsx
│           ├── ShadowsDemo.tsx
│           ├── ResponsiveDemo.tsx
│           └── StatesDemo.tsx
├── .env                            # GEMINI_API_KEY (not committed)
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI framework | React 19 |
| Styling | Tailwind CSS v4 |
| Build tool | Vite 6 |
| Language | TypeScript 5 |
| AI hints | Google Gemini (`@google/genai`) |
| API server | Express 4 |
| Icons | Lucide React |
| Animation | Motion |

---

## License

MIT — see [LICENSE](LICENSE).
