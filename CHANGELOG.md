# Changelog

All notable changes to Zerio are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Added
- **4-stage curriculum structure** (`src/data/stages.ts`) — lessons 1–12 are now grouped into four named stages: Text & Color (1–4), Layout (5–7), Polish (8–11), and Putting It All Together (12)
- **Home Screen** (`src/components/HomeScreen.tsx`) — app now opens to a course overview (id=0) instead of Lesson 1. Shows a stage card for each stage with per-stage progress bar, lesson rows, and a CTA button that links to the first incomplete lesson in the stage
- **Glossary page** (`src/components/GlossaryPage.tsx`, `src/data/glossary.ts`) — 23 Tailwind and CSS terms with plain-English definitions and example class chips. Terms are alphabetically grouped by letter heading when idle; a real-time search input collapses them into a flat filtered list. Reachable from a header button (sm+ screens) or a sidebar button (mobile only)
- **Common Mistakes section** — each of the 12 lessons now has a `commonMistakes: string[]` field. Rendered as an amber ⚠️ warning box between the interactive demo and the real-world examples; lists 3 lesson-specific pitfalls beginners typically encounter
- **Collapsible desktop sidebar** — a `ChevronLeft`/`ChevronRight` toggle button in the header header collapses the sidebar to zero width on md+ screens with a smooth CSS width animation, giving the lesson reader and playground more horizontal space. Mobile drawer behavior is unaffected
- **Drag-to-resize Playground panels** — the code editor, live preview, and challenge sections are now vertically resizable by dragging the handle bars between them. Panel sizes are stored as `flex-grow` ratios. Minimum sizes enforced: editor 10, preview 10, challenge 15
- **Sidebar stage grouping** — when the search box is empty, lessons are displayed in four labelled stage groups rather than a flat list. A "Course Overview" button at the top of the sidebar navigates to the home screen
- **Header Glossary navigation button** — a compact pill button between the brand and the progress widget navigates to the Glossary page; shows active state when id=14 is current
- Interactive visual demo section in each lesson (lessons 2–11) — appears between the concept explanation and real-world examples. Learners can toggle Tailwind classes and see them applied to a live preview before touching the freeform playground.
  - `TypographyDemo` — font size scale, weight scale, text color samples, alignment toggle
  - `SpacingDemo` — padding and margin controls with visual box preview
  - `ColorsDemo` — full Tailwind color palette as clickable swatches; applies selection to a preview card
  - `SizingDemo` — width and max-width toggles with visual track
  - `FlexboxDemo` — direction, justify-content, align-items, and gap toggles on a live flex container
  - `GridDemo` — grid-cols and gap toggles with optional col-span-2 on Cell 1
  - `BordersDemo` — border width, border color, and border-radius toggles on a preview box
  - `ShadowsDemo` — shadow scale toggle and gradient preset picker
  - `ResponsiveDemo` — breakpoint reference table and simulated viewport slider with live layout preview
  - `StatesDemo` — button state previewer for normal, hover, focus, active, and disabled
- `src/components/demos/shared.tsx` — shared `DemoWrapper`, `ToggleGroup`, `ClassChip`, and `DemoSection` primitives used across all demo components
- `src/components/LessonDemo.tsx` — lesson ID → demo component router; lessons without a demo render nothing
- Fixed right-side playground panel on desktop — the playground no longer scrolls with the lesson content; it stays pinned at full viewport height so learners always see their live output

### Changed
- **Markdown renderer upgraded to a full block-level parser** — `conceptText` now supports numbered lists (`1. `), unordered bullet lists (`- `) with two-space indented sub-items (`  - `), and multi-line paragraphs in addition to the existing `**bold**`, `` `inline code` ``, and `*italic*` inline spans. Bold regex updated to treat backtick spans as atomic so `**Font Size (\`text-*\`)**` parses correctly
- **Sidebar shows flat search results when filtering** — typing in the search box switches the sidebar from stage-grouped view to a flat "Search Results" list filtered by lesson title and short description; clearing the input returns to stage groups

### Fixed
- Drag handle upper-bound constraint formula — clicking the editor/preview drag handle was shrinking the editor panel on every click even with zero mouse movement. Root cause: the upper-bound was computed as `100 - snap.preview - snap.challenge - 10`, which equals `snap.editor - 10` when values sum to 100, making the minimum and maximum the same. Fixed to `snap.editor + snap.preview - 10` (the correct bound that leaves 10 units for the preview minimum)
- Missing `@types/react` and `@types/react-dom` dev dependencies — TypeScript was reporting JSX type errors due to absent declaration files

---

## [0.1.0] — 2026-06-27

### Added
- Initial project: React 19 + Tailwind CSS v4 + Vite + TypeScript scaffolding
- 12 Tailwind CSS lessons with learning objectives, analogy blocks, concept explanations, and real-world MediCore HMS examples
- "What's Next" roadmap page (lesson 13) covering JavaScript DOM, APIs, React, and Django modules
- Live HTML/Tailwind sandbox (`Playground.tsx`) — iframe-based editor with syntax-highlighted code input and a live preview pane
- Per-lesson challenge system with hints and a "Mark as Complete" flow
- AI-powered hint system backed by Google Gemini (`@google/genai`) via an Express server
- Lesson progress tracking persisted to `localStorage`
- Lesson search and sidebar navigation
- Mobile-responsive layout with hamburger drawer sidebar
- MediCore HMS theming throughout all examples and challenges
