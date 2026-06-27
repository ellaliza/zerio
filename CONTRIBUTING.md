# Contributing to Zerio

Thanks for your interest in improving Zerio. This guide covers everything you need to get set up and make a meaningful contribution.

---

## What is Zerio?

Zerio is a Tailwind CSS learning platform for beginner developers who are actively building a hospital management system called MediCore HMS. The target learner knows basic HTML but has never used a CSS framework. Every example, challenge, and demo in the codebase is framed around that context — please keep new contributions consistent with it.

---

## Prerequisites

- Node.js 18+
- npm 9+
- A Google Gemini API key (only needed if you're working on the AI hint feature)

---

## Local Setup

```bash
git clone https://github.com/ellaliza/zerio.git
cd zerio
npm install
```

Create a `.env` file:

```
GEMINI_API_KEY=your_key_here
```

Start the dev server:

```bash
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

Run the TypeScript check before opening a PR:

```bash
npm run lint
```

---

## Project Structure

```
src/
├── App.tsx               # Layout, navigation, state — the main orchestrator
├── types.ts              # Lesson, LessonExample, LessonChallenge interfaces
├── data/
│   └── lessons.ts        # All lesson content lives here
└── components/
    ├── Playground.tsx     # Iframe-based live sandbox
    ├── LessonDemo.tsx     # Maps lessonId → demo component
    └── demos/
        ├── shared.tsx     # DemoWrapper, ToggleGroup, ClassChip, DemoSection
        └── *Demo.tsx      # One file per lesson (lessons 2–11)
```

---

## How to Edit a Lesson

All lesson content is in `src/data/lessons.ts`. Each lesson is an object with these fields:

| Field | Type | Purpose |
|-------|------|---------|
| `id` | number | Matches the lesson number; also used to route to the correct demo |
| `title` | string | Lesson heading |
| `shortDescription` | string | One-line summary shown in the sidebar |
| `learningObjectives` | string[] | Bullet points shown at the top of the lesson |
| `analogyTitle` | string | Title of the opening analogy block |
| `analogyText` | string | Plain text — the analogy paragraph |
| `conceptText` | string | Supports `**bold**`, `` `code` ``, and `*italic*` markdown |
| `examples` | LessonExample[] | Each has `title`, `code` (HTML string), and `explanation` (string[]) |
| `playgroundPrompt` | string | Suggestion text shown above the sandbox |
| `challenge` | LessonChallenge | `title`, `description`, `startingCode`, `solutionHint` |

Keep examples and challenges in the MediCore HMS context (patient cards, doctor dashboards, clinical badges, etc.).

---

## How to Add a Visual Demo

Each lesson 2–11 has an interactive demo component. To add or replace a demo:

**1. Create the component** at `src/components/demos/XxxDemo.tsx`:

```tsx
import { useState } from "react";
import { DemoWrapper, DemoSection, ToggleGroup, ClassChip } from "./shared";

export default function XxxDemo() {
  const [active, setActive] = useState("some-class");

  return (
    <DemoWrapper title="Xxx Live Demo">
      <DemoSection label="Preview">
        <div className={active}>...</div>
      </DemoSection>
      <ToggleGroup
        label="Options"
        options={["option-a", "option-b", "option-c"]}
        active={active}
        onChange={setActive}
      />
      <DemoSection label="Active class">
        <ClassChip classes={active} />
      </DemoSection>
    </DemoWrapper>
  );
}
```

**2. Register it** in `src/components/LessonDemo.tsx`:

```ts
import XxxDemo from "./demos/XxxDemo";

const DEMO_MAP: Record<number, React.ComponentType> = {
  // ...existing entries
  N: XxxDemo,
};
```

### Tailwind v4 class safety rule

Tailwind v4 statically scans source files at build time. **Never assemble class names from string fragments** at runtime (e.g., `` `bg-${color}-${shade}` `` — these get purged). Every class that must be applied must appear as a complete literal string in source. For dynamic colors, use inline `style={{ backgroundColor: hex }}` with a static hex lookup map and display the class name as a string label only. See `ColorsDemo.tsx` for the reference implementation.

---

## Code Style

- **No comments** unless the reason is non-obvious (a hidden constraint, a workaround, a surprising invariant). Never describe what the code does.
- **No new abstractions** unless the same pattern appears in 3+ places. Prefer three similar lines over a premature helper.
- **No unused fallbacks or error handling** for scenarios that can't happen in this codebase.
- **Tailwind classes only** — no inline styles except where Tailwind v4 purge safety requires dynamic color values (see above).
- Keep demo components self-contained with local `useState`. No shared demo state.

---

## Pull Request Checklist

- [ ] `npm run lint` passes with no new errors
- [ ] New lesson content follows MediCore HMS framing
- [ ] New demo components use `DemoWrapper`, `ToggleGroup`, and `ClassChip` from `shared.tsx`
- [ ] No dynamically assembled Tailwind class strings (purge safety)
- [ ] No new dependencies added without discussion
- [ ] `CHANGELOG.md` updated under `[Unreleased]`

---

## License

By contributing, you agree that your changes will be licensed under the project's [MIT License](LICENSE).
