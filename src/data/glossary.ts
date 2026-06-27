export interface GlossaryTerm {
  term: string;
  definition: string;
  example?: string;
}

export const GLOSSARY: GlossaryTerm[] = [
  // B
  {
    term: "Border",
    definition: "A line drawn around the edge of an element. You control its width, color, and style.",
    example: "border, border-2, border-color-",
  },
  {
    term: "Border radius",
    definition: "How rounded the corners of an element are. A high border radius on a square makes it a circle.",
    example: "rounded, rounded-lg, rounded-full",
  },
  {
    term: "Breakpoint",
    definition: "A screen width at which your layout changes. Tailwind has five built-in breakpoints.",
    example: "sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)",
  },
  // C
  {
    term: "Cascade",
    definition: "The \"C\" in CSS. It describes how styles flow down from parent elements to children, and how conflicts between rules are resolved.",
  },
  {
    term: "Container",
    definition: "A wrapping element used to constrain content width and center it on the page.",
    example: "container, mx-auto",
  },
  // F
  {
    term: "Flexbox",
    definition: "A CSS layout system that arranges items in a row or column and gives you control over how they are spaced and aligned.",
    example: "flex, flex-row, flex-col, justify-, items-",
  },
  // G
  {
    term: "Gap",
    definition: "The space between items in a flex or grid layout, without using margin.",
    example: "gap-, gap-x-, gap-y-",
  },
  {
    term: "Grid",
    definition: "A CSS layout system that arranges items into rows and columns simultaneously, like a table but more powerful.",
    example: "grid, grid-cols-, gap-",
  },
  // I
  {
    term: "Inherit",
    definition: "When a child element automatically takes on a style from its parent. For example, if you set text color on a div, all text inside it inherits that color unless overridden.",
  },
  // M
  {
    term: "Margin",
    definition: "The space outside an element, pushing other elements away from it. Think of it like a personal bubble around a box.",
    example: "m-, mt-, mb-, ml-, mr-",
  },
  {
    term: "Mobile-first",
    definition: "A design approach where you style for small screens by default, then add styles for larger screens on top. This is how Tailwind works — unprefixed classes apply to all sizes, prefixed classes (md:, lg:) override upward.",
  },
  // O
  {
    term: "Opacity",
    definition: "How transparent an element is. 0 is fully invisible, 100 is fully visible.",
    example: "opacity-0 through opacity-100",
  },
  // P
  {
    term: "Padding",
    definition: "The space inside an element, between its border and its content. Think of it like cushioning inside a box.",
    example: "p-, pt-, pb-, pl-, pr-",
  },
  {
    term: "Property",
    definition: "In CSS, a property is what you want to style. For example, color, font-size, and margin are all properties. Tailwind class names are usually shorthand versions of the property they control.",
  },
  {
    term: "Pseudo-class",
    definition: "A CSS selector that targets an element in a specific state, like when it is hovered or focused. Tailwind handles these with prefixes.",
    example: "hover:, focus:, active:",
  },
  // R
  {
    term: "Rem",
    definition: "A unit of measurement in CSS relative to the root font size (usually 16px). Tailwind's spacing scale is based on rem. 1rem = 16px, so p-4 (1rem of padding) equals 16px.",
  },
  {
    term: "Responsive design",
    definition: "Designing a page so it looks good on all screen sizes, from mobile phones to large monitors.",
  },
  // S
  {
    term: "Shadow",
    definition: "A visual effect that makes an element appear elevated above the page.",
    example: "shadow-sm, shadow, shadow-md, shadow-lg, shadow-xl",
  },
  {
    term: "Specificity",
    definition: "A browser rule for deciding which CSS wins when two rules target the same element. Higher specificity wins. Tailwind avoids specificity conflicts by keeping all utilities at the same level.",
  },
  // U
  {
    term: "Utility class",
    definition: "A single-purpose CSS class that does exactly one thing. In Tailwind, text-center is a utility class that centers text. Instead of writing CSS yourself, you use these pre-built classes directly in your HTML.",
  },
  {
    term: "Utility-first",
    definition: "A CSS philosophy where instead of writing custom class names like .card or .header, you compose styles entirely from small single-purpose utility classes.",
  },
  // V
  {
    term: "Value",
    definition: "The specific setting you give a property. For font-size, a value might be 16px. In Tailwind, the number in text-xl is the value.",
  },
  {
    term: "Viewport",
    definition: "The visible area of the browser window. vh and vw are units relative to it.",
    example: "h-screen (100vh), w-screen (100vw)",
  },
];
