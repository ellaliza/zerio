import { Lesson } from "../types";

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "What is Tailwind and How Does It Work?",
    shortDescription: "Understand the utility-first CSS revolution and how classes map directly to CSS properties.",
    learningObjectives: [
      "Explain the 'utility-first' CSS philosophy and why it differs from traditional CSS.",
      "Identify how Tailwind utility classes map directly to core CSS properties.",
      "Understand why styling elements in HTML without a separate CSS file speeds up development."
    ],
    analogyTitle: "The LEGO Blocks of CSS",
    analogyText: "Traditional CSS is like baking custom bricks from raw clay every single time you want to build a room. If you need a blue 2x4 block, you mix blue dye, mold the clay, fire it in a kiln, and wait. Tailwind CSS is like having a massive, pre-sorted box of LEGO blocks. If you need a blue, rounded piece, you just grab the 'bg-blue-500' and 'rounded' blocks from the box and snap them directly onto your HTML element! You build instantly, and you never have to leave your HTML file.",
    conceptText: `In traditional web development, styling an element requires a multi-step workflow:
1. Write your HTML structure (e.g., \`<div class="patient-card">...</div>\`).
2. Open a separate \`styles.css\` file.
3. Write a selector targeting that class (\`.patient-card\`).
4. Write individual CSS properties like \`background-color\`, \`padding\`, and \`border-radius\`.
5. Switch back and forth to see if the styles worked.

**Tailwind CSS replaces this entire flow with a 'Utility-First' philosophy.** 

Instead of writing custom CSS rules in a separate stylesheet, Tailwind provides hundreds of single-purpose classes (utilities) that you apply directly in your HTML. For example, to center text, you use the class \`text-center\`. Under the hood, Tailwind maps this class to the standard CSS rule: \`text-align: center;\`.

Because these classes are pre-built, you don't write *any* custom CSS. You style your entire application purely by combining utility classes right inside your HTML. This eliminates the 'naming struggle' (trying to figure out if an element should be called \`profile-container-inner\` or \`profile-wrapper\`) and keeps your project incredibly lightweight, as Tailwind automatically removes any classes you don't use during the build process.`,
    examples: [
      {
        title: "A Basic MediCore HMS Alert Banner",
        code: `<div class="bg-blue-100 text-blue-800 p-4 rounded">
  <strong>Notice:</strong> Shift handover starts in 15 minutes.
</div>`,
        explanation: [
          "bg-blue-100 sets a soft, light blue background color (background-color: rgb(219 234 254)).",
          "text-blue-800 styles the text with a deep blue shade for high legibility (color: rgb(30 58 138)).",
          "p-4 adds 1rem (16px) of padding inside all sides of the box (padding: 1rem).",
          "rounded clips the corners slightly with a standard border radius (border-radius: 0.25rem)."
        ]
      },
      {
        title: "A Minimal Patient Checklist Item",
        code: `<span class="bg-slate-200 text-slate-700 font-bold px-2 py-1 rounded-full text-xs">
  ID: 1048-A
</span>`,
        explanation: [
          "bg-slate-200 sets a neutral gray background.",
          "text-slate-700 applies a readable dark gray text color.",
          "font-bold applies a bold weight (font-weight: 700).",
          "px-2 sets horizontal padding (left and right) to 0.5rem (8px).",
          "py-1 sets vertical padding (top and bottom) to 0.25rem (4px).",
          "rounded-full rounds the corners fully, turning the element into a pill shape.",
          "text-xs scales the font size down to 0.75rem (12px) for a compact badge look."
        ]
      }
    ],
    playgroundPrompt: "Try editing the alert box above inside the Playground! Change the background color to green by replacing 'bg-blue-100' with 'bg-green-100', and replace 'text-blue-800' with 'text-green-800' to create a success notification.",
    challenge: {
      title: "The Emergency Room Badge",
      description: "Create a simple status badge for the 'Emergency Room' in MediCore HMS. It needs to have a soft gray background, dark bold text, small text size, and fully rounded (capsule) corners with small padding.",
      startingCode: `<!-- Create your Emergency Room badge below! -->
<span class="change-me-classes">
  Emergency Room
</span>`,
      solutionHint: "Combine the utilities: bg-slate-100 (or bg-gray-100), text-slate-700, font-bold, text-xs, px-3, py-1, and rounded-full."
    }
  },
  {
    id: 2,
    title: "Typography",
    shortDescription: "Master control over font sizes, weights, alignments, and text colors to establish hierarchy.",
    learningObjectives: [
      "Understand Tailwind's sizing scale for fonts from 'xs' to '9xl'.",
      "Control text thickness (font weights) and alignment.",
      "Apply semantic color classes to make medical text legible and accessible."
    ],
    analogyTitle: "The Eye Chart in the Clinic",
    analogyText: "Think of your typography like a clinical Snellen eye chart. The giant letter at the top immediately captures attention, while the tiny lines below contain detailed information. In web design, if everything is the same size and weight, the user's eye wanders aimlessly. Tailwind's typography utilities act as your lens, letting you size, weigh, and color text so clinicians can read the most critical vitals first and the minor details second.",
    conceptText: `Typography is the backbone of any application, and in a clinical setting like MediCore HMS, clarity is a matter of safety. Tailwind structures typography using highly intuitive class prefixes:

1. **Font Size (\`text-*\`)**: Scales from \`text-xs\` (0.75rem) to \`text-9xl\` (8rem). The standard body font is \`text-base\` (1rem / 16px).
2. **Font Weight (\`font-*\`)**: Adjusts font thickness. Common weights are \`font-light\`, \`font-normal\` (default), \`font-medium\`, \`font-semibold\`, and \`font-bold\`.
3. **Text Color (\`text-{color}-{shade}\`)**: Applies colors from Tailwind's built-in palette (e.g., \`text-slate-900\` for headers, \`text-slate-500\` for secondary descriptions).
4. **Text Alignment (\`text-*\`)**: Moves text horizontal alignment. Utilities include \`text-left\`, \`text-center\`, \`text-right\`, and \`text-justify\`.
5. **Line Height / Leading (\`leading-*\`)**: Controls line-height (the spacing between lines of wrapped text), such as \`leading-tight\`, \`leading-normal\`, or \`leading-loose\`.`,
    examples: [
      {
        title: "A Main Dashboard Greeting",
        code: `<div class="text-left">
  <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome back, Dr. Vance</h1>
  <p class="text-sm text-slate-500 font-medium">Internal Medicine • Shift B</p>
</div>`,
        explanation: [
          "text-3xl makes the heading stand out with a large font size (1.875rem / 30px).",
          "font-extrabold applies a heavy, commanding weight (font-weight: 800).",
          "text-slate-900 colors the headline with a near-black charcoal gray for absolute high contrast.",
          "tracking-tight slightly reduces letter spacing, making large headings look cohesive and modern.",
          "text-sm scales the subtitle down to 0.875rem (14px).",
          "text-slate-500 sets a muted gray tone to signal that this info is secondary."
        ]
      },
      {
        title: "A Warning Patient Status Message",
        code: `<p class="text-center text-sm font-semibold text-amber-700 leading-snug">
  Patient allergy alert: Penicillin. Double-check charts before administering medication.
</p>`,
        explanation: [
          "text-center centers the paragraph horizontally.",
          "font-semibold gives the warning a distinct, intermediate bolding.",
          "text-amber-700 colors the text in a warnings-oriented amber-brown for clear visual caution.",
          "leading-snug tightens up the spacing between wrapped lines, ideal for alert cards."
        ]
      }
    ],
    playgroundPrompt: "Try pasting the Dashboard Greeting into the playground and changing the name to your own. Next, try changing 'text-3xl' to 'text-5xl' to see how large the text gets, and try toggling alignment by swapping 'text-left' with 'text-center'!",
    challenge: {
      title: "Patient Medical Chart Header",
      description: "Build a typography-focused header block for a patient file. The patient's name ('Eleanor Vance') should be very prominent and charcoal dark, their medical record number ('MRN: #294-819') should use a clean monospaced font in a small muted gray style, and a red alert note ('CRITICAL: Severe Asthma') should sit below them in bold red letters.",
      startingCode: `<div class="text-left">
  <!-- 1. Patient Name: Large, charcoal dark, bold -->
  <h2>Eleanor Vance</h2>
  
  <!-- 2. MRN Number: Small, muted, monospace font (hint: use font-mono) -->
  <p>MRN: #294-819</p>
  
  <!-- 3. Alert Note: Small, bold, vibrant red -->
  <p>CRITICAL: Severe Asthma</p>
</div>`,
      solutionHint: "For Eleanor, use 'text-2xl font-bold text-slate-900'. For the MRN, use 'text-xs font-mono text-slate-500 mt-0.5'. For the alert, use 'text-xs font-bold text-red-600 mt-2'."
    }
  },
  {
    id: 3,
    title: "Spacing (Margin and Padding)",
    shortDescription: "Learn Margin vs. Padding and how to read Tailwind's elegant numerical spacing scale.",
    learningObjectives: [
      "Distinguish between Margin (outside space) and Padding (inside space).",
      "Understand the Tailwind spacing scale where 1 unit = 4px (0.25rem).",
      "Apply directional spacing (x-axis, y-axis, and single edges)."
    ],
    analogyTitle: "The Invisible Cushion and the Shield",
    analogyText: "Imagine a physical hospital bed. The mattress has thick foam padding. This padding (inside) is what keeps the patient comfortable inside the bed, preventing them from pressing directly against the wooden frame. This is **Padding** (p-). Around the bed, nurses leave an empty buffer zone (margin) so they can walk, push carts, and access equipment without bumping into other furniture. This empty outer buffer is the **Margin** (m-). Padding cushions inside the border; Margin shields outside the border.",
    conceptText: `Tailwind handles spacing (padding and margin) with an incredibly consistent, proportional numeric scale. Instead of typing random values like \`13px\` or \`27px\`, you use values from a standard mathematical scale.

**How the Spacing Scale Translates:**
- \`1\` unit in Tailwind represents \`0.25rem\`, which translates to **4px** on standard screens.
- Therefore:
  - \`p-1\` = 4px
  - \`p-2\` = 8px
  - \`p-4\` = 16px (1rem — the standard baseline)
  - \`p-8\` = 32px (2rem)
  - \`p-16\` = 64px (4rem)

**Directional Prefixes:**
You can apply margin (\`m\`) or padding (\`p\`) to all sides, or specify directions:
- **All sides**: \`p-4\`, \`m-6\`
- **Horizontal (X-axis, Left & Right)**: \`px-4\`, \`mx-2\`
- **Vertical (Y-axis, Top & Bottom)**: \`py-3\`, \`my-4\`
- **Single sides**: 
  - Top: \`pt-2\`, \`mt-8\`
  - Bottom: \`pb-4\`, \`mb-2\`
  - Left: \`pl-6\`, \`ml-3\`
  - Right: \`pr-1\`, \`mr-10\``,
    examples: [
      {
        title: "A Form Card Container",
        code: `<div class="p-6 m-4 bg-slate-100 rounded-xl">
  <p class="text-sm font-semibold text-slate-700">Patient Intake Notes</p>
</div>`,
        explanation: [
          "p-6 applies 1.5rem (24px) of padding inside all four sides of the container, pushing the text away from the edges.",
          "m-4 adds 1rem (16px) of empty margin space around the outside of the container, ensuring it doesn't touch other elements in the layout.",
          "rounded-xl applies an extra-large corner rounding to the gray card."
        ]
      },
      {
        title: "A Pill-Shaped Action Button",
        code: `<button class="px-5 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-lg">
  Check In Patient
</button>`,
        explanation: [
          "px-5 adds 1.25rem (20px) of padding on the left and right, making the button wide and easy to click.",
          "py-2.5 adds 0.625rem (10px) of padding on the top and bottom, giving the button a balanced height.",
          "bg-blue-600 sets a professional medical blue color.",
          "rounded-lg shapes the button with comfortable, modern rounded corners."
        ]
      }
    ],
    playgroundPrompt: "Paste the Action Button into the playground. Notice how the button looks perfectly proportioned. Try changing 'px-5 py-2.5' to a square layout like 'p-8' to see how the cushioning dramatically shifts. Next, add a margin utility like 'mt-12' to push it down from the top of the screen!",
    challenge: {
      title: "Clinical Notes Card Cushioning",
      description: "You are styling a card that holds doctor notes. Currently, the text is tightly squished against the edges of the box, making it hard to read. Give the card spacious, professional cushioning on all sides, and add a small top margin to push it away from the header above.",
      startingCode: `<!-- Header Above -->
<div class="text-xs font-bold text-slate-400">SESSION NOTES</div>

<!-- Notes Card (Give this padding and margin!) -->
<div class="change-me-classes bg-amber-50 rounded-lg">
  <p class="text-sm text-slate-800 font-serif leading-relaxed">
    Patient reports mild discomfort in left knee after completing physical therapy exercises. Vital signs stable. Recommended icing twice daily.
  </p>
</div>`,
      solutionHint: "Add a class list of 'p-5 mt-3' or 'p-6 mt-4' to the notes card div to give it beautiful internal breathing room and push it away from the 'SESSION NOTES' header."
    }
  },
  {
    id: 4,
    title: "Colors",
    shortDescription: "Explore Tailwind's massive semantic color palette and learn how to use background, border, text, and transparency values.",
    learningObjectives: [
      "Navigate the Tailwind color palette spanning shades 50 (lightest) to 950 (darkest).",
      "Colorize backgrounds, text, and borders consistently.",
      "Utilize alpha transparency modifiers to create modern overlay tints."
    ],
    analogyTitle: "The Hospital Triage System",
    analogyText: "In an emergency department, colors signify priority levels instantly: Red means life-critical, Amber means urgent, Green means stable. In UI design, color is your primary semantic signaling tool. Tailwind provides a highly structured color cabinet. Each color (like blue, red, or emerald) comes in ten numbered shades from 50 (light pastel wash) to 950 (ultra-deep shade), meaning you always have the perfect matching tone for text, backgrounds, and borders without guessing hex codes.",
    conceptText: `Tailwind's color system is universally praised for its professional default palettes. Colors are categorized by names (such as \`slate\`, \`zinc\`, \`red\`, \`amber\`, \`emerald\`, \`blue\`, \`indigo\`) and are mapped to numbers representing weight/darkness:
- **50**: Ultra-light, pastel tints (perfect for card backgrounds)
- **100 - 200**: Light backgrounds and subtle border colors
- **300 - 400**: Borders or light secondary text
- **500**: The 'primary' base hue (vibrant)
- **600 - 700**: Standard text colors, or buttons that need high contrast
- **800 - 900**: Rich, heavy dark shades for headings and main layouts
- **950**: Deep midnight shades (almost black)

**The Tailwind Color Utility Family:**
- **Text Color**: \`text-{color}-{shade}\` (e.g., \`text-indigo-600\`)
- **Background Color**: \`bg-{color}-{shade}\` (e.g., \`bg-slate-50\`)
- **Border Color**: \`border-{color}-{shade}\` (e.g., \`border-slate-200\`)

**Transparency Modifiers:**
You can append an opacity percentage to any color using a slash (\`/\`). For instance, \`bg-red-500/10\` creates a red background with exactly 10% opacity, which makes a fantastic, soft red alert background!`,
    examples: [
      {
        title: "A Critical Allergy Alert Box",
        code: `<div class="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
  <p class="font-bold text-sm">Penicillin Allergy</p>
</div>`,
        explanation: [
          "bg-red-50 applies a very soft, eye-safe pastel pink/red background so the user isn't blinded.",
          "border border-red-200 wraps the card in a subtle, solid light red border, defining its shape.",
          "text-red-800 applies a heavy, readable dark crimson to the text, ensuring it passes accessibility contrast checks.",
          "p-4 and rounded-lg provide padding and curved corners."
        ]
      },
      {
        title: "An Active Status Indicator (using Transparency)",
        code: `<div class="flex items-center gap-2">
  <span class="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
  <span class="text-xs font-semibold text-emerald-800 bg-emerald-500/10 px-2 py-0.5 rounded">
    On Duty
  </span>
</div>`,
        explanation: [
          "bg-emerald-500 sets a vibrant, pure green dot indicator.",
          "bg-emerald-500/10 sets a beautiful green background highlight with exactly 10% opacity behind the text.",
          "text-emerald-800 colors the text in a highly readable deep forest green.",
          "px-2, py-0.5, and rounded size and shape the pill badge."
        ]
      }
    ],
    playgroundPrompt: "Try creating a 'Pending Status' badge in the playground. Use the color amber! Change the background to 10% opacity amber and set the text color to a high-contrast amber shade. Try swapping out shades between 500 and 950 to see how contrast ratios change.",
    challenge: {
      title: "The Triage Level Badges",
      description: "MediCore HMS categorizes patients into three triage levels: Stable, Urgent, and Immediate. Build a vertical stacked list of three simple pills. The first ('Stable') should use emerald (green), the second ('Urgent') should use amber (yellow/orange), and the third ('Immediate') should use rose (vibrant pink/red). Make each pill have a 10% opacity background of that color, a solid matching 200-shade border, and an 800-shade text color.",
      startingCode: `<div class="flex flex-col gap-2 max-w-xs">
  <!-- 1. STABLE Badge (Emerald) -->
  <div class="change-me-stable border p-2 text-center rounded text-xs font-bold">
    Stable
  </div>
  
  <!-- 2. URGENT Badge (Amber) -->
  <div class="change-me-urgent border p-2 text-center rounded text-xs font-bold">
    Urgent
  </div>
  
  <!-- 3. IMMEDIATE Badge (Rose) -->
  <div class="change-me-immediate border p-2 text-center rounded text-xs font-bold">
    Immediate
  </div>
</div>`,
      solutionHint: "For Stable: 'bg-emerald-500/10 border-emerald-200 text-emerald-800'. For Urgent: 'bg-amber-500/10 border-amber-200 text-amber-800'. For Immediate: 'bg-rose-500/10 border-rose-200 text-rose-800'."
    }
  },
  {
    id: 5,
    title: "Sizing (Width and Height)",
    shortDescription: "Learn how to control the size of layouts, cards, buttons, and responsive boxes.",
    learningObjectives: [
      "Understand fixed width and height sizing units.",
      "Implement fluid percentage widths and viewport height calculations.",
      "Control maximum widths to enforce readability bounds on desktop."
    ],
    analogyTitle: "The Cardboard Shipping Boxes",
    analogyText: "Sizing in web design is like selecting shipping boxes. If you use a giant box to ship a single medicine bottle, it looks empty and wastes space. If you try to stuff an entire medical record binder into an envelope, it tears. Sizing utilities are your box sizes. Some boxes are exact dimensions (e.g., small 48px square boxes for profile icons), some are fluid boxes that fill whatever space is available (like a bag that expands to fit a shelf), and some are absolute limiters that prevent your cards from stretching into ridiculously wide, unreadable banners on giant monitors.",
    conceptText: `Sizing elements ensures that your layout fits its content perfectly across all devices. Tailwind provides comprehensive width (\`w-\`) and height (\`h-\`) utilities based on three main philosophies:

1. **Fixed Sizes**: Uses the same mathematical scale as Spacing. Each unit is \`0.25rem\` (\`4px\`).
   - \`w-8 h-8\` = \`32px\` by \`32px\` (perfect for a small circular doctor avatar).
   - \`w-64\` = \`16rem\` (\`256px\`).

2. **Fluid Sizes (Percentages & Fractions)**: Scales elements relative to their parent container.
   - \`w-1/2\` = 50% width
   - \`w-1/3\` = 33.3% width
   - \`w-2/3\` = 66.6% width
   - \`w-full\` = 100% width (expands to fill the entire horizontal space)

3. **Viewport Sizes**: Sizes elements relative to the size of the browser window.
   - \`w-screen\` = 100vw (the full width of the user's screen)
   - \`h-screen\` = 100vh (the full height of the user's screen)

4. **Limits (Max and Min)**: Essential for responsive containers.
   - \`max-w-md\`, \`max-w-xl\`, \`max-w-6xl\` restrain a container from growing too wide, keeping paragraphs easy to read on massive desktop screens.`,
    examples: [
      {
        title: "A Circular Doctor Avatar Icon",
        code: `<img class="w-12 h-12 rounded-full border-2 border-slate-200 object-cover" 
     src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150" 
     alt="Doctor Portrait" referrerPolicy="no-referrer">`,
        explanation: [
          "w-12 sets a precise width of 3rem (48px).",
          "h-12 sets a matching height of 3rem (48px), creating a perfect square.",
          "rounded-full cuts the square into a perfect circle.",
          "object-cover ensures the image is scaled proportionally without getting squashed or stretched.",
          "border-2 border-slate-200 frames the profile photo in a professional thin gray border."
        ]
      },
      {
        title: "A Standard Patient Summary Card",
        code: `<div class="w-full max-w-sm bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
  <h3 class="font-bold text-slate-800">Bed 12 Assignment</h3>
  <p class="text-sm text-slate-500 mt-1">Occupant: Samuel Jackson</p>
</div>`,
        explanation: [
          "w-full makes the card fluid, telling it to expand and occupy 100% of the horizontal space on mobile phones.",
          "max-w-sm acts as an absolute ceiling, stating: 'Do not grow wider than 24rem (384px) even if the screen is huge.'",
          "p-5 and rounded-xl style the inside padding and corners."
        ]
      }
    ],
    playgroundPrompt: "Paste the Avatar Icon code into the playground. Try changing 'w-12 h-12' to 'w-24 h-24' and then 'w-32 h-32' to see how the image stays perfectly sharp and circular. Next, wrap a card in 'w-64' vs 'w-full' to see how it respects limits!",
    challenge: {
      title: "Doctor Profile Avatar Container",
      description: "Build a doctor profile card wrapper. The wrapper container should never grow wider than 'max-w-sm' so that it doesn't stretch awkwardly. Inside it, place a profile placeholder box (a simple gray div) that is exactly a square size of 64px ('w-16 h-16') and is fully circular.",
      startingCode: `<!-- Profile Card Wrapper (Prevent it from stretching past max-w-sm) -->
<div class="w-full change-me-card bg-slate-50 border border-slate-200 p-6 rounded-xl">
  
  <!-- Avatar Placeholder (Make it a 64px square, circular, with a centered letter 'D') -->
  <div class="change-me-avatar bg-indigo-600 text-white font-bold text-lg flex items-center justify-center">
    D
  </div>
  
  <h4 class="font-bold text-slate-800 mt-4 text-base">Dr. Julian Bashir</h4>
  <p class="text-xs text-slate-500">Chief of Medicine • Starfleet Medical</p>
</div>`,
      solutionHint: "For the card, append 'max-w-sm' to the class list. For the avatar placeholder, add the classes 'w-16 h-16 rounded-full' to make it a perfect, clean circular avatar bubble."
    }
  },
  {
    id: 6,
    title: "Flexbox (Layout Engine Part 1)",
    shortDescription: "Align, distribute, and space items horizontally or vertically with the most powerful layout tool in CSS.",
    learningObjectives: [
      "Understand how 'flex' initializes a flexbox container.",
      "Control container flow directions (row vs. column).",
      "Align items vertically and distribute space horizontally with 'items-' and 'justify-' classes."
    ],
    analogyTitle: "The Clinical Conveyor Belt",
    analogyText: "Imagine a medical conveyor belt where patient files are placed. If the conveyor belt is a row, items sit side-by-side. If it's a column, items stack top-to-bottom. You have a laser controller: you can center all the folders perfectly on the belt (\`items-center\`), push them all to the start (\`justify-start\`), or space them out evenly so some touch the extreme left and right walls (\`justify-between\`). Best of all, you have a spacer dial (\`gap-\`) that sets an exact distance between every single item without manual measurement.",
    conceptText: `Flexbox is the ultimate layout weapon in Tailwind. Most UI layouts are simply rows or columns of items aligned in various configurations. Applying the utility class \`flex\` to a container turns it into a Flexbox context.

**Key Flexbox Utilities:**

1. **Direction (\`flex-*\`)**:
   - \`flex-row\` (default): Places items horizontally side-by-side.
   - \`flex-col\`: Stacks items vertically top-to-bottom.

2. **Horizontal Distribution (\`justify-*\`)**:
   - \`justify-start\`: Clumps items at the left.
   - \`justify-end\`: Clumps items at the right.
   - \`justify-center\`: Centers all items in the middle.
   - \`justify-between\`: Distributes space evenly. The first item touches the start, the last item touches the end, and spacing fills the middle (perfect for headers!).

3. **Vertical Alignment (\`items-*\`)**:
   - \`items-center\`: Centers items vertically. Indispensable for aligning text with avatars or icons so they sit on the same invisible midline.
   - \`items-start\`: Aligns items to the top.
   - \`items-end\`: Aligns items to the bottom.

4. **Spaced Gaps (\`gap-*\`)**:
   - Instead of applying margins to individual children, use \`gap-{size}\` (using the same proportional scale: e.g., \`gap-4\` is 16px) on the parent container. This automatically injects perfect, equal spaces between all child elements.`,
    examples: [
      {
        title: "A Clinic Header Navigation Bar",
        code: `<header class="flex items-center justify-between p-4 bg-slate-900 text-white rounded-lg">
  <div class="flex items-center gap-2">
    <span class="w-4 h-4 rounded-full bg-blue-500"></span>
    <span class="font-bold tracking-tight text-sm">MediCore HMS</span>
  </div>
  <span class="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">Dr. Mercer (On Call)</span>
</header>`,
        explanation: [
          "flex establishes a Flexbox container for the header, converting its direct children (logo div and doctor name span) into flex items.",
          "items-center aligns both elements vertically on the absolute horizontal midline.",
          "justify-between pushes the logo div to the far left and the doctor name badge to the far right, utilizing all available width.",
          "flex items-center gap-2 inside the logo div establishes a secondary nested row layout, spacing the blue circular icon and 'MediCore HMS' text by exactly 0.5rem (8px)."
        ]
      },
      {
        title: "A Stacked Vital Signs Report Card",
        code: `<div class="flex flex-col gap-2.5 p-4 bg-slate-50 border border-slate-200 rounded-lg w-full max-w-xs">
  <div class="flex justify-between items-center border-b border-slate-100 pb-1.5">
    <span class="text-xs font-semibold text-slate-500">Heart Rate</span>
    <span class="text-xs font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">Critical</span>
  </div>
  <div class="text-2xl font-black text-slate-800">142 <span class="text-sm font-medium text-slate-400">BPM</span></div>
</div>`,
        explanation: [
          "flex flex-col stacks the header row and the large vital readout vertically.",
          "gap-2.5 injects 10px of space vertically between the header and the readout.",
          "flex justify-between items-center on the first inner div structures a classic side-by-side row showing the vital name on the left and the critical tag on the right, aligned on a clean midline."
        ]
      }
    ],
    playgroundPrompt: "Try editing the Vital Signs Card in the playground! Change the main container direction from 'flex-col' to 'flex-row' to see how the elements instantly snap side-by-side. Observe how using Flexbox allows you to change layouts with a single keyword!",
    challenge: {
      title: "Quick Actions Toolbar",
      description: "You are building a toolbar row for Dr. Mercer's patient index screen. It must layout horizontally, align elements on the vertical center, and distribute elements so the 'Quick Filters' text and buttons are separated. The main 'toolbar' container should push its elements apart with space between. Use a gap of 4 (16px) to space inner buttons.",
      startingCode: `<div class="change-me-toolbar bg-white border border-slate-200 p-4 rounded-lg">
  <!-- Left Side: Section Title -->
  <div class="text-sm font-bold text-slate-700">
    Patient Quick Filter
  </div>
  
  <!-- Right Side: Action Buttons Group -->
  <div class="change-me-buttons">
    <button class="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded">All Patients</button>
    <button class="bg-slate-50 text-slate-600 text-xs font-bold px-3 py-1.5 rounded">Discharged</button>
  </div>
</div>`,
      solutionHint: "Make the main container flex-row, justify-between, and items-center with 'flex items-center justify-between'. Make the button container a horizontal flex row with a gap: 'flex items-center gap-2'."
    }
  },
  {
    id: 7,
    title: "Grid (Layout Engine Part 2)",
    shortDescription: "Build multi-column grid systems and asymmetrical dashboard layouts with ease.",
    learningObjectives: [
      "Define multi-column grid structures using grid-cols-*.",
      "Span items across multiple rows or columns with col-span-*.",
      "Control card dashboard alignments and cell distributions."
    ],
    analogyTitle: "The Bento Box of Dashboards",
    analogyText: "While Flexbox is like a linear assembly line (best for single rows or single columns), CSS Grid is like a wooden Bento Box or a clinical medicine organizer cabinet. It defines a rigid, highly structured set of rows and columns. You can specify: 'I want a grid with exactly 3 columns.' Once defined, any card you drop inside automatically files into its compartment, aligning perfectly. If you have an extra-large folder, you can tell it to span across 2 or 3 compartments (\`col-span-2\`), creating rich, highly professional asymmetrical layouts.",
    conceptText: `Grid is the first choice for building heavy application layouts, dashboard grids, or multi-field forms. While Flexbox organizes items in a single dimension, Grid organizes items in two dimensions (columns and rows simultaneously).

**Core Grid Utilities:**

1. **Initialize Grid**: Apply \`grid\` to the container.
2. **Define Columns (\`grid-cols-*\`)**:
   - \`grid-cols-1\`: A single full-width column (useful for stacked mobile layouts).
   - \`grid-cols-2\`: Splits the space into 2 equal columns.
   - \`grid-cols-3\`: Splits the space into 3 equal columns.
   - Up to \`grid-cols-12\` for highly customizable layouts.

3. **Gaps (\`gap-*\`)**: Works exactly like Flexbox gap, placing identical vertical and horizontal alleys between all grid cells.

4. **Column Spanning (\`col-span-*\`)**:
   Apply these classes to **individual children** inside the grid container to stretch them:
   - \`col-span-2\`: Tells an element to stretch across 2 grid cells.
   - \`col-span-3\`: Tells an element to stretch across 3 grid cells.
   - \`col-span-full\`: Stretches the item to span the entire width of the grid, regardless of column count.`,
    examples: [
      {
        title: "A 3-Column Dashboard Statistics Grid",
        code: `<div class="grid grid-cols-3 gap-4">
  <div class="bg-blue-50 p-4 rounded-xl border border-blue-100">
    <p class="text-xs text-blue-600 font-bold">Total Admissions</p>
    <p class="text-xl font-black text-blue-900 mt-1">1,482</p>
  </div>
  <div class="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
    <p class="text-xs text-emerald-600 font-bold">Available Beds</p>
    <p class="text-xl font-black text-emerald-900 mt-1">42</p>
  </div>
  <div class="bg-purple-50 p-4 rounded-xl border border-purple-100">
    <p class="text-xs text-purple-600 font-bold">Discharges Today</p>
    <p class="text-xl font-black text-purple-900 mt-1">18</p>
  </div>
</div>`,
        explanation: [
          "grid turns the outer container into a grid layout.",
          "grid-cols-3 divides the container into three columns of equal width.",
          "gap-4 separates the three cards with 1rem (16px) spacing horizontally and vertically.",
          "Each child div forms a neat cell in the dashboard."
        ]
      },
      {
        title: "An Asymmetrical Quick Summary View",
        code: `<div class="grid grid-cols-3 gap-3">
  <div class="col-span-2 bg-slate-900 text-white p-5 rounded-lg">
    <h3 class="font-bold text-sm text-blue-400">Primary Surgeon Overview</h3>
    <p class="text-lg font-bold mt-2">Dr. Sarah Martinez, MD</p>
    <p class="text-xs text-slate-400 mt-1">Chief of Neurosurgery • 14 Operations Scheduled This Week</p>
  </div>
  <div class="bg-slate-100 p-5 rounded-lg text-center flex flex-col justify-center">
    <p class="text-xs text-slate-500 font-semibold">Active Cases</p>
    <p class="text-3xl font-black text-slate-800 mt-1">4</p>
  </div>
</div>`,
        explanation: [
          "grid-cols-3 establishes 3 equal-width column tracks.",
          "col-span-2 on the first card tells it to stretch and occupy two of those three column tracks, spanning 66.6% of the width.",
          "The second card (Active Cases) automatically fills the remaining 1 column track, occupying 33.3% of the width."
        ]
      }
    ],
    playgroundPrompt: "Try editing the Asymmetrical Quick Summary grid inside the playground! Toggle the columns configuration by changing 'grid-cols-3' to 'grid-cols-4' and see how the layout updates. When you add a column, does the second card shrink? Observe how Grid handles proportions!",
    challenge: {
      title: "The Patient Vitals Grid",
      description: "Design a dashboard grid showing three patient vitals cards in MediCore HMS. The vitals are 'Heart Rate', 'Blood Pressure', and 'Blood Oxygen'. Build a grid container that divides them into three columns. Give the cards individual light styling (or custom borders) and space them with a gap of 4 (16px). Make sure the Heart Rate card spans 2 columns so it has extra wide visibility.",
      startingCode: `<div class="change-me-grid">
  <!-- Vital 1: Heart Rate (Make this span 2 columns!) -->
  <div class="change-me-span bg-red-50 p-4 rounded-xl border border-red-100">
    <span class="text-xs font-bold text-red-600">Heart Rate</span>
    <h3 class="text-2xl font-black text-red-900 mt-2">78 BPM</h3>
  </div>
  
  <!-- Vital 2: Blood Pressure (Default 1 column) -->
  <div class="bg-blue-50 p-4 rounded-xl border border-blue-100">
    <span class="text-xs font-bold text-blue-600">Blood Pressure</span>
    <h3 class="text-2xl font-black text-blue-900 mt-2">120/80</h3>
  </div>
  
  <!-- Vital 3: Blood Oxygen (Default 1 column) -->
  <div class="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
    <span class="text-xs font-bold text-emerald-600">SpO2 (Oxygen)</span>
    <h3 class="text-2xl font-black text-emerald-900 mt-2">99%</h3>
  </div>
</div>`,
      solutionHint: "For the main container, apply 'grid grid-cols-3 gap-4'. For the Heart Rate container, append the class 'col-span-2' to make it span double-width."
    }
  },
  {
    id: 8,
    title: "Borders and Rounded Corners",
    shortDescription: "Frame, structure, and shape elements using precise border width, border color, and rounding sizes.",
    learningObjectives: [
      "Add solid borders and define border thickness values.",
      "Apply semantic colors to borders to establish clinical states.",
      "Understand standard border radius classes from 'sm' to 'full'."
    ],
    analogyTitle: "The Sterile Medical Container",
    analogyText: "In a laboratory, different test tubes have distinct outer frames. Some are glass with clean, clear edges. Some have colored rings on top to identify hazardous substances. Some caps are sharp-edged squares, while others are soft, rounded caps to prevent needle tears. Borders and rounded utilities are your packaging mechanics. They let you wrap input boxes, status widgets, and critical allergy cards in distinct boxes that look clean, clean, and safe.",
    conceptText: `Borders and rounded corners are the primary structural framing tools. They define where one component ends and another begins, converting messy layouts into distinct, organized boxes.

**1. Border Width (\`border-*\`)**:
- Apply \`border\` to add a 1px solid border around the element.
- To increase thickness, use \`border-2\`, \`border-4\`, or \`border-8\`.
- To apply a border to a single edge only, use directions: \`border-t\` (top), \`border-b\` (bottom), \`border-l\` (left), or \`border-r\` (right).

**2. Border Color (\`border-*\`)**:
- Matches the standard color cabinet: \`border-slate-200\` (default soft border), \`border-red-300\` for warnings, \`border-emerald-300\` for stable signals.

**3. Rounded Corners (\`rounded-*\`)**:
- Adjusts the border-radius (corner curving).
- \`rounded-sm\` (subtle 2px rounding - great for checkboxes)
- \`rounded-md\` (standard 6px rounding)
- \`rounded-lg\` (comfortable 8px rounding - modern card default)
- \`rounded-xl\` (smooth 12px rounding - premium dashboard widgets)
- \`rounded-full\` (curved fully, converting squares into circles, and buttons into pills).`,
    examples: [
      {
        title: "A Clinical Input Field",
        code: `<div class="max-w-xs">
  <label class="block text-xs font-bold text-slate-500 mb-1">PATIENT ID</label>
  <input type="text" 
         class="w-full bg-white border border-slate-300 text-slate-800 text-sm p-2.5 rounded-lg font-mono focus:outline-none focus:border-indigo-600" 
         placeholder="e.g. 509-A" />
</div>`,
        explanation: [
          "border applies a standard 1px solid border border around the input.",
          "border-slate-300 defines a neutral gray outline color, signaling the field is ready for editing.",
          "rounded-lg curves the sharp edges with an 8px radius for a comfortable, clean appearance.",
          "font-mono formats the numeric patient code in monospaced characters for medical readability."
        ]
      },
      {
        title: "A Side-Border Alert Banner",
        code: `<div class="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded-r-lg">
  <p class="text-xs font-bold text-indigo-800">DRUG DISPENSARY NOTICE</p>
  <p class="text-xs text-indigo-600 mt-1">Controlled substance logging is mandatory for this shift.</p>
</div>`,
        explanation: [
          "border-l-4 applies a thick, solid 4px accent border purely on the left vertical edge.",
          "border-indigo-600 colors that left stripe with a vibrant professional indigo hue.",
          "rounded-r-lg applies corner curving strictly to the right edges (top-right and bottom-right), while keeping the left edge flush with the thick accent stripe."
        ]
      }
    ],
    playgroundPrompt: "Paste the Side-Border Alert Banner into the playground. Try swapping the thick left border to the right side by replacing 'border-l-4' with 'border-r-4' and 'rounded-r-lg' with 'rounded-l-lg'. Notice how simple classes let you remodel component anatomy!",
    challenge: {
      title: "Patient Intake Form Input",
      description: "You are building a clean input field for a clinician to enter a patient's insurance ID. Build a label and a text input. Give the input a light gray border with thickness of 2, a medium rounded shape, soft placeholder text, and set its background color to a crisp off-white.",
      startingCode: `<div class="max-w-xs">
  <label class="block text-xs font-bold text-slate-500 mb-1">Insurance Provider ID</label>
  <input type="text" 
         class="change-me-input p-2 w-full text-sm focus:outline-none" 
         placeholder="e.g. BCBS-92841" />
</div>`,
      solutionHint: "Apply the classes 'border-2 border-slate-200 rounded-md bg-slate-50 text-slate-800' to the input element."
    }
  },
  {
    id: 9,
    title: "Shadows and Backgrounds",
    shortDescription: "Elevate your layouts into 3D space with soft shadows and construct stunning visual gradients.",
    learningObjectives: [
      "Understand the 'Z-axis' (elevation/depth) using shadows.",
      "Apply shadows ranging from 'sm' to '2xl' to separate UI layers.",
      "Build medical portal banners using dual-color background gradients."
    ],
    analogyTitle: "The Clinic Desk Organizer",
    analogyText: "Imagine a physical medical desk. Loose patient sticky notes sit flat on the wooden surface. These have no height. A stack of paper charts sits 1 inch high, casting a tiny, soft shadow. A heavy metal tablet stands elevated on a desk holder, casting a wide, deep shadow on the desk. This shadow tells your brain instantly that the tablet is closer to your hands and sits 'above' the papers. Sizing your box shadows (\`shadow-*\`) is how you recreate this physical elevation in web interfaces, signaling what is active, clickable, or modal.",
    conceptText: `Shadows and gradients are the primary tools used to build modern, high-fidelity visual interfaces that feel polished rather than flat.

**1. Elevation & Depth (\`shadow-*\`)**:
Shadows create depth along the Z-axis, helping users distinguish floating cards or modal popups from flat background canvases.
- \`shadow-sm\`: A tiny, tight shadow (best for small alerts or stable badges).
- \`shadow\`: Standard, elegant card shadow.
- \`shadow-md\`: Soft, slightly dispersed shadow (the modern dashboard default).
- \`shadow-lg\` & \`shadow-xl\`: Wide, luxurious floating shadows (best for modal dialogs or dropdown menus).
- \`shadow-2xl\`: Heavy, highly dispersed shadow signaling peak elevation.

**2. Gradients basics (\`bg-gradient-to-*\`)**:
Gradients replace flat background colors with premium color blends.
- **Direction**: Specify direction using \`bg-gradient-to-r\` (right), \`bg-gradient-to-l\` (left), \`bg-gradient-to-b\` (bottom), etc.
- **Colors**: Map the start and end colors using \`from-{color}-{shade}\` and \`to-{color}-{shade}\`.
- Example: \`bg-gradient-to-r from-blue-500 to-indigo-600\` creates a smooth, professional rightwards blend from bright medical blue to royal indigo.`,
    examples: [
      {
        title: "A Premium Floating Action Dialog Card",
        code: `<div class="w-full max-w-sm bg-white p-6 rounded-2xl border border-slate-100 shadow-xl">
  <span class="text-xs font-bold text-indigo-600 tracking-wider">MODAL ACTION</span>
  <h3 class="text-lg font-bold text-slate-800 mt-2">Admit New Patient</h3>
  <p class="text-xs text-slate-500 mt-1">Initialize medical record onboarding workflow.</p>
</div>`,
        explanation: [
          "shadow-xl applies a deep, soft shadow underneath the card, creating a striking 3D illusion that the card is 'floating' above the main portal dashboard.",
          "rounded-2xl curves the card with a luxurious 1rem (16px) radius, reinforcing the high-end app aesthetic.",
          "border border-slate-100 provides a subtle perimeter outline so the white card doesn't bleed into light background layouts."
        ]
      },
      {
        title: "A MediCore Welcome Hero Panel",
        code: `<div class="w-full max-w-md bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-6 rounded-xl shadow-md">
  <h2 class="text-xl font-bold">Good morning, Dr. Mercer</h2>
  <p class="text-xs text-indigo-100 mt-1.5 leading-relaxed">
    You have 8 patients scheduled for surgery consultations today. Your clinical dashboard is fully up to date.
  </p>
</div>`,
        explanation: [
          "bg-gradient-to-r initializes a linear color gradient stretching left-to-right.",
          "from-indigo-600 sets the starting color on the left to deep clinical indigo.",
          "to-blue-500 sets the terminating color on the right to bright medical blue.",
          "shadow-md adds a moderate elevation shadow underneath, ensuring the hero panel stands out."
        ]
      }
    ],
    playgroundPrompt: "Paste the Welcome Hero Panel into the playground! Let's experiment with colors. Try changing the gradient direction to top-to-bottom by replacing 'bg-gradient-to-r' with 'bg-gradient-to-b', and swap the colors to 'from-emerald-600 to-teal-500' to create a gorgeous surgical success banner!",
    challenge: {
      title: "The MediCore Shift Welcome Card",
      description: "You want to design a beautiful, elevated portal card that welcomes nurse managers when they log into MediCore HMS. Create a card with a top-to-bottom gradient running from violet (shade 600) to indigo (shade-700). Give it a comfortable white text color, rounded-xl corners, and a luxury 'shadow-lg' shadow to make it feel beautifully crafted.",
      startingCode: `<div class="change-me-welcome text-white p-6">
  <h3 class="text-lg font-bold">MediCore Shift Hub</h3>
  <p class="text-xs text-indigo-100 mt-2">
    Active Shift: Nurse Managers Group A. System status operational.
  </p>
</div>`,
      solutionHint: "Apply the classes 'bg-gradient-to-b from-violet-600 to-indigo-700 rounded-xl shadow-lg' to the welcome card container."
    }
  },
  {
    id: 10,
    title: "Responsive Design",
    shortDescription: "Learn the mobile-first strategy and use breakpoint prefixes to build layouts that adapt perfectly to phones, tablets, and desktop screens.",
    learningObjectives: [
      "Understand the 'mobile-first' styling philosophy.",
      "Apply the standard Tailwind breakpoints: sm:, md:, and lg:.",
      "Build a responsive component that adapts size, spacing, and grid layouts on resize."
    ],
    analogyTitle: "The Folding Examination Divider",
    analogyText: "Imagine a folding medical divider wall in a clinic ward. In a small exam room, you keep the divider completely folded and stacked up against the wall (single-column mobile vertical layout). When you move to a massive open clinical wing, you unfold the screens side-by-side to partition the room into multiple, functional doctor stations (horizontal desktop layout). Tailwind's responsive prefixes (`md:`, `lg:`) act as your folding joints, telling elements: 'By default on tiny screens, look like this. But once the room expands past a certain width, unfold and layout like that.'",
    conceptText: `Responsive web design ensures your medical portal works flawlessly whether a doctor views it on a compact hand-held mobile smartphone during patient rounds, or on a giant wide-screen desktop monitor in the radiology lab.

**The Mobile-First Rule:**
Tailwind operates on a **mobile-first** philosophy. This means that **any class you write without a prefix applies to all screens, from mobile up.** You only write prefixes when you want to override those classes once the screen expands past a certain size (breakpoint).

**Tailwind's Key Breakpoints:**
- **Default (no prefix)**: Screens from **0px to 640px** (Mobile phones).
- \`sm:\`: Triggered at **640px** (Large phones & small tablets).
- \`md:\`: Triggered at **768px** (Standard tablets & small laptops).
- \`lg:\`: Triggered at **1024px** (Standard desktops).
- \`xl:\`: Triggered at **1280px** (Wide desktop monitors).

**How to Write Responsive Code:**
You declare a responsive style simply by prepending the breakpoint prefix to the utility class. For example:
- \`w-full md:w-1/2\`: 'Width is 100% on mobile. But once the screen reaches tablet size (768px) and larger, set the width to exactly 50%.'
- \`grid-cols-1 md:grid-cols-3\`: 'Our grid has a single stacked column on mobile. On tablets and desktops, it automatically splits into three columns.'`,
    examples: [
      {
        title: "A Fluid Responsive Layout Container",
        code: `<div class="w-full md:max-w-md lg:max-w-2xl bg-white p-6 border border-slate-200 rounded-xl mx-auto shadow-sm">
  <h3 class="font-bold text-slate-800 text-base md:text-xl">Patient Directory Index</h3>
  <p class="text-xs text-slate-500 mt-1">Showing 124 active clinic cases.</p>
</div>`,
        explanation: [
          "w-full tells the container to occupy full horizontal space on mobile phones.",
          "md:max-w-md tells the container to cap its width at 28rem (448px) once the screen reaches tablet dimensions (768px).",
          "lg:max-w-2xl increases the width limit to 42rem (672px) once viewed on larger desktop monitors (1024px).",
          "text-base md:text-xl sizes the heading smaller (1rem) on mobile to save vertical space, but scales it up to a large heading (1.25rem) on tablet screens and above."
        ]
      },
      {
        title: "A Grid that Adapts to Screen Size",
        code: `<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 text-center text-sm font-bold text-slate-700">Card 1</div>
  <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 text-center text-sm font-bold text-slate-700">Card 2</div>
  <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 text-center text-sm font-bold text-slate-700">Card 3</div>
</div>`,
        explanation: [
          "grid-cols-1 sets a single stacked vertical column layout on mobile.",
          "sm:grid-cols-2 splits the space into 2 columns on large phones or small tablets (640px+).",
          "md:grid-cols-3 expands the columns to 3 on standard tablet screens and above (768px+), dynamically aligning the elements horizontally."
        ]
      }
    ],
    playgroundPrompt: "Paste the Grid Code into the playground! Shrink and widen your preview container in the playground workspace. Watch the cards instantly stack on top of each other when small, and split into side-by-side columns as the width increases. This is the magic of media breakpoints!",
    challenge: {
      title: "Responsive Patient Directory Row",
      description: "You are building a patient directory row. On mobile, we only have room for the patient name ('Sarah Connor') and vital badge. But on tablet screens and above ('md:'), we want to reveal details by showing a horizontal flex layout with email and department names. Start by making the main container flex-col by default on mobile, but override it to flex-row and items-center on 'md:' screens.",
      startingCode: `<div class="change-me-container bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex gap-4">
  <!-- Patient Summary (Always Visible) -->
  <div class="flex items-center gap-3 w-full">
    <div class="w-10 h-10 bg-indigo-100 text-indigo-700 font-bold rounded-full flex items-center justify-center text-sm">
      SC
    </div>
    <div>
      <h4 class="font-bold text-slate-800 text-sm">Sarah Connor</h4>
      <span class="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full font-bold">Priority Red</span>
    </div>
  </div>
  
  <!-- Secondary Details (Stacked on mobile, but should sit side-by-side with Patient Summary on md: screens) -->
  <div class="change-me-details border-t border-slate-100 pt-3 md:border-t-0 md:pt-0 w-full flex flex-col md:flex-row md:items-center md:justify-end gap-3 text-xs text-slate-500">
    <p>sarah.c@medical.hms</p>
    <p class="font-semibold text-slate-700">Department: Trauma Unit</p>
  </div>
</div>`,
      solutionHint: "For the main container, use the classes 'flex flex-col md:flex-row md:items-center md:justify-between p-4'. This overrides the stacked vertical column with a horizontal row once we cross the md: threshold!"
    }
  },
  {
    id: 11,
    title: "States and Interactivity",
    shortDescription: "Bring your interface to life by styling states like Hover, Focus, and Active directly in your HTML.",
    learningObjectives: [
      "Understand standard user interaction states: hover:, focus:, and active:.",
      "Style clickable elements to provide responsive visual feedback.",
      "Integrate transition properties to create smooth visual animations."
    ],
    analogyTitle: "The Clickable Medical Button",
    analogyText: "Think of a tactile physical machine in the surgery room. When your finger hovers over a button, the button's backlight glows slightly to tell you: 'Yes, you are hovering over a valid control.' When you push the button, it physically depresses, and clicks down (\`active:\`), giving mechanical feedback. When a text field is selected, a green bezel lights up around it, saying 'Type here' (\`focus:\`). These are interaction cues. Tailwind states let you program these glowing bezels and mechanical clicks directly into your HTML.",
    conceptText: `Static pages feel dead and cheap. High-quality interfaces are highly tactile, responding immediately to mouse hovers, keyboard tabs, and finger taps. Tailwind implements states using simple colon-based prefixes:

1. **Hover (\`hover:*\`)**: Styles applied when the user's mouse cursor is hovering over the element (e.g., \`hover:bg-indigo-700\`).
2. **Focus (\`focus:*\`)**: Styles applied when an element (like an input or button) is selected or tabbed into (e.g., \`focus:ring-2 focus:ring-indigo-500\`).
3. **Active (\`active:*\`)**: Styles applied *during* the physical click or tap (e.g., \`active:scale-95\` shrinks the button slightly when pressed, making it feel organic!).
4. **Disabled (\`disabled:*\`)**: Styles applied when a button has the \`disabled\` attribute, turning it grey and inert (e.g., \`disabled:opacity-50\`).

**The Transition Catalyst (\`transition-*\` & \`duration-*\`)**:
By default, color changes snap instantly. To make hover animations look creamy and smooth, apply the utility class \`transition-all\` (which enables transition animations) paired with a speed like \`duration-200\` (the transition takes 200 milliseconds to complete).`,
    examples: [
      {
        title: "A Highly Interactive Patient Admission Button",
        code: `<button class="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-98 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-white text-sm font-semibold rounded-lg shadow transition-all duration-150 cursor-pointer">
  Schedule Surgery
</button>`,
        explanation: [
          "bg-indigo-600 sets the baseline button color to bright royal indigo.",
          "hover:bg-indigo-700 darkens the background color slightly when a clinician hovers their mouse, signaling clickability.",
          "active:scale-98 micro-shrinks the button to 98% size during the millisecond of the physical mouse click, mimicking a real mechanical depression.",
          "focus:ring-2 focus:ring-indigo-500 wraps the button in a glowing, thick accessibility outline if a user tabs to it using their keyboard.",
          "transition-all duration-150 smooths the color changes, eliminating jarring color jumps."
        ]
      },
      {
        title: "A Tactile Diagnostic List Item",
        code: `<div class="p-4 bg-white border border-slate-200 rounded-lg hover:border-slate-400 hover:shadow-md transition-all duration-200 cursor-pointer flex justify-between items-center">
  <span class="text-sm font-bold text-slate-800">CT Scan Report</span>
  <span class="text-xs text-indigo-600 font-semibold group-hover:underline">View File &rarr;</span>
</div>`,
        explanation: [
          "hover:border-slate-400 darkens the outline of the report container on hover.",
          "hover:shadow-md adds a soft outer elevation glow as if the record is rising up towards the cursor.",
          "cursor-pointer changes the standard cursor arrow into a hand pointer."
        ]
      }
    ],
    playgroundPrompt: "Paste the Admission Button into the playground! Hover your cursor over it and click down. See how the smooth transition, slight color shift, and organic scale compression make it feel like a real physical appliance. Try changing 'duration-150' to 'duration-1000' (one full second) to see how slow the shift becomes!",
    challenge: {
      title: "Interactive Appointment Booking Button",
      description: "Customize a booking button for the scheduling dashboard. The button should have a emerald-600 (green) background by default. On hover, it should change to a darker green (emerald-700). On click (active), it should compress slightly in scale (scale-95). Make sure to include transition properties so it morphs smoothly over 150ms.",
      startingCode: `<button class="change-me-btn text-white text-xs font-bold px-4 py-2 rounded-lg shadow">
  Book Consultation
</button>`,
      solutionHint: "Combine the utilities: 'bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all duration-150 shadow' to create the ultimate organic interaction state."
    }
  },
  {
    id: 12,
    title: "Putting It All Together",
    shortDescription: "Unite everything you've learned to construct a complete, high-fidelity MediCore Patient Summary Card from scratch.",
    learningObjectives: [
      "Combine typography, spacing, colors, sizing, borders, grids, and shadows into a single cohesive layout.",
      "Implement layered nested layouts with horizontal and vertical alignments.",
      "Understand how to build real-world, high-fidelity UI components."
    ],
    analogyTitle: "The Master Surgery",
    analogyText: "You are no longer practicing single procedures. You have mastered preparing the anesthesia (colors), arranging the scalpels (spacing), calibrating the instruments (sizing), and checking the monitors (responsive views). Now, you are stepping into the clinical theater to perform a complete operation. You are going to assemble all these individual components together into a single, high-fidelity, production-ready Patient Profile Card that doctors will actually use inside MediCore HMS.",
    conceptText: `In this final lesson, we assemble all the components we have reviewed:
- **Lesson 1-4**: Visuals, fonts, padding, margins, colors, and borders.
- **Lesson 5-7**: Width, height, Flexbox, and Grid layout skeletons.
- **Lesson 8-11**: Rounded corners, elevation shadows, adaptive breakpoints, and user state hovers.

By layering these elements systematically, you can design stunning UI widgets from simple blocks. In this lesson, we will build a beautiful, full-stack aesthetic **MediCore Patient Summary Card** that tracks essential medical vitals, triage severity, assigned beds, and doctor actions inside a single, pristine panel.`,
    examples: [
      {
        title: "The MediCore Patient Card (The Ultimate Component)",
        code: `<div class="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
  <!-- Top Accent Color Bar (Shorthand showing triage severity) -->
  <div class="h-1.5 bg-gradient-to-r from-red-500 to-amber-500"></div>
  
  <div class="p-6">
    <!-- Header: Avatar + Patient Details + Action Badge -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-11 h-11 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-700 border border-slate-200">
          AH
        </div>
        <div>
          <h4 class="font-bold text-slate-800 text-sm">Arthur Pendragon</h4>
          <p class="text-[11px] text-slate-500 font-mono">ID: #904-B • Male • 38 Yrs</p>
        </div>
      </div>
      <span class="text-[10px] font-extrabold bg-red-50 text-red-700 px-2 py-1 rounded-full border border-red-200 uppercase tracking-wider">
        Emergency
      </span>
    </div>
    
    <!-- Spacing divider -->
    <hr class="border-slate-100 my-4" />
    
    <!-- Vitals readouts (2x2 Grid) -->
    <div class="grid grid-cols-2 gap-3">
      <div class="p-3 bg-slate-50 border border-slate-100 rounded-xl">
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Temp</p>
        <p class="text-sm font-bold text-slate-700 mt-0.5">98.6°F <span class="text-[10px] font-semibold text-emerald-600">Stable</span></p>
      </div>
      <div class="p-3 bg-slate-50 border border-slate-100 rounded-xl">
        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Heart Rate</p>
        <p class="text-sm font-bold text-slate-700 mt-0.5">102 BPM <span class="text-[10px] font-semibold text-amber-500">Elevated</span></p>
      </div>
    </div>
    
    <!-- Bottom Action Button Group -->
    <div class="flex gap-2 mt-5">
      <button class="flex-1 bg-slate-100 hover:bg-slate-200 active:scale-98 text-slate-700 font-semibold text-xs py-2 rounded-lg transition-all cursor-pointer">
        View Chart
      </button>
      <button class="flex-1 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-semibold text-xs py-2 rounded-lg shadow transition-all cursor-pointer">
        Admit Patient
      </button>
    </div>
  </div>
</div>`,
        explanation: [
          "overflow-hidden on the main card container ensures the top 6px linear gradient sits perfectly flush against the rounded corners.",
          "flex items-center gap-3 neatly packs the circular patient avatar placeholder 'AH' next to their text metadata details, maintaining perfect vertical midline alignment.",
          "grid grid-cols-2 gap-3 places the Temp and Heart Rate cards side-by-side with identical gutters.",
          "flex gap-2 in the button group distributes the Action buttons across the card width, allowing them to expand and share equal proportions using 'flex-1'."
        ]
      }
    ],
    playgroundPrompt: "Paste the complete Patient Card into the playground! Read the classes carefully and see how they blend together to construct a beautiful component. Try modifying the patient details, changing the triage badge color from red to emerald, and adding a third card to the grid container!",
    challenge: {
      title: "The MediCore Patient Dashboard File",
      description: "You have completed your training! Now, assemble your final capstone component. Build a Patient Summary Card for Dr. Mercer's dashboard. It should contain: a clean white card border with rounded corners, a soft shadow, a patient header with an avatar bubble, an emergency warning triage label, a small vital readout block, and an interactive 'Check In' button that shifts on hover. Bring all 11 skills together to construct this masterpiece!",
      startingCode: `<!-- Assemble your final, high-fidelity MediCore Patient Card below! -->
<div class="change-me-master-card max-w-sm">
  <!-- Card Header -->
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <!-- Circle Avatar -->
      <div class="bg-indigo-100 text-indigo-800 font-bold flex items-center justify-center rounded-full w-10 h-10">
        MC
      </div>
      <!-- Patient Meta -->
      <div>
        <h4 class="font-bold text-slate-800 text-sm">Michael Corleone</h4>
        <p class="text-xs text-slate-500">ID: #405-A • 42 Yrs</p>
      </div>
    </div>
    <!-- Priority Badge -->
    <span class="text-xs font-bold text-red-700 px-2 py-0.5 rounded-full">
      Critical
    </span>
  </div>

  <!-- Space gap -->
  <div class="my-4 border-b border-slate-100"></div>

  <!-- Medical Vital Display Box -->
  <div class="p-3 rounded-lg">
    <span class="text-[10px] font-bold text-slate-400">HEART RATE</span>
    <p class="text-lg font-bold text-slate-800">112 BPM</p>
  </div>

  <!-- Action Button -->
  <button class="w-full mt-4 text-white text-xs font-bold py-2 rounded-lg transition-all">
    Check In Patient
  </button>
</div>`,
      solutionHint: "For the master card, add 'bg-white border border-slate-200 p-5 rounded-2xl shadow-md'. For the Priority Badge, use 'bg-red-50 text-red-700 border border-red-200'. For the vital display box, use 'bg-slate-50 border border-slate-100'. For the button, use 'bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow'."
    }
  }
];

export const whatIsNextContent = {
  title: "What's Next in the Zerio Curriculum?",
  subtitle: "You've mastered styling. Now let's explore how we turn these gorgeous static pages into living, breathing web systems.",
  modules: [
    {
      title: "Module 1: JavaScript & DOM Interactions",
      description: "Learn how to use Vanilla JavaScript to catch button clicks, read form inputs, and make your MediCore patient list filterable in real-time.",
      skills: ["Event Listeners", "DOM Manipulation", "Template Literals", "Local Storage Cache"],
      icon: "Code"
    },
    {
      title: "Module 2: Dynamic API Integrations & Fetch",
      description: "Connect your front-end layout to live hospital servers! Learn how to make HTTP requests using fetch() to load patient files and register intake logs.",
      skills: ["REST APIs", "Async/Await", "JSON Parsing", "Error Handlers"],
      icon: "Globe"
    },
    {
      title: "Module 3: Full-Stack React Architecture",
      description: "Consolidate your Tailwind skills into reusable React components. Break your MediCore layout into modular files and use state hooks for complex interactions.",
      skills: ["React State & Props", "Component Reusability", "Custom Hooks", "Router Transitions"],
      icon: "Layers"
    },
    {
      title: "Module 4: Django backend & DB Storage",
      description: "Build robust backends to store thousands of patient charts securely. Program Python REST APIs and model structured relational databases.",
      skills: ["Python Django", "Relational Database Models", "Secure User Auth", "API Endpoint Control"],
      icon: "Database"
    }
  ]
};
