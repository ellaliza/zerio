import { useState } from "react";
import { DemoWrapper, DemoSection, ClassChip } from "./shared";

// Static hex map — safe for Tailwind v4 (no dynamic class assembly)
const COLOR_HEX: Record<string, Record<number, string>> = {
  slate:   { 100:"#f1f5f9",200:"#e2e8f0",300:"#cbd5e1",400:"#94a3b8",500:"#64748b",600:"#475569",700:"#334155",800:"#1e293b",900:"#0f172a" },
  red:     { 100:"#fee2e2",200:"#fecaca",300:"#fca5a5",400:"#f87171",500:"#ef4444",600:"#dc2626",700:"#b91c1c",800:"#991b1b",900:"#7f1d1d" },
  orange:  { 100:"#ffedd5",200:"#fed7aa",300:"#fdba74",400:"#fb923c",500:"#f97316",600:"#ea580c",700:"#c2410c",800:"#9a3412",900:"#7c2d12" },
  amber:   { 100:"#fef3c7",200:"#fde68a",300:"#fcd34d",400:"#fbbf24",500:"#f59e0b",600:"#d97706",700:"#b45309",800:"#92400e",900:"#78350f" },
  yellow:  { 100:"#fef9c3",200:"#fef08a",300:"#fde047",400:"#facc15",500:"#eab308",600:"#ca8a04",700:"#a16207",800:"#854d0e",900:"#713f12" },
  lime:    { 100:"#ecfccb",200:"#d9f99d",300:"#bef264",400:"#a3e635",500:"#84cc16",600:"#65a30d",700:"#4d7c0f",800:"#3f6212",900:"#365314" },
  green:   { 100:"#dcfce7",200:"#bbf7d0",300:"#86efac",400:"#4ade80",500:"#22c55e",600:"#16a34a",700:"#15803d",800:"#166534",900:"#14532d" },
  emerald: { 100:"#d1fae5",200:"#a7f3d0",300:"#6ee7b7",400:"#34d399",500:"#10b981",600:"#059669",700:"#047857",800:"#065f46",900:"#064e3b" },
  teal:    { 100:"#ccfbf1",200:"#99f6e4",300:"#5eead4",400:"#2dd4bf",500:"#14b8a6",600:"#0d9488",700:"#0f766e",800:"#115e59",900:"#134e4a" },
  cyan:    { 100:"#cffafe",200:"#a5f3fc",300:"#67e8f9",400:"#22d3ee",500:"#06b6d4",600:"#0891b2",700:"#0e7490",800:"#155e75",900:"#164e63" },
  sky:     { 100:"#e0f2fe",200:"#bae6fd",300:"#7dd3fc",400:"#38bdf8",500:"#0ea5e9",600:"#0284c7",700:"#0369a1",800:"#075985",900:"#0c4a6e" },
  blue:    { 100:"#dbeafe",200:"#bfdbfe",300:"#93c5fd",400:"#60a5fa",500:"#3b82f6",600:"#2563eb",700:"#1d4ed8",800:"#1e40af",900:"#1e3a8a" },
  indigo:  { 100:"#e0e7ff",200:"#c7d2fe",300:"#a5b4fc",400:"#818cf8",500:"#6366f1",600:"#4f46e5",700:"#4338ca",800:"#3730a3",900:"#312e81" },
  violet:  { 100:"#ede9fe",200:"#ddd6fe",300:"#c4b5fd",400:"#a78bfa",500:"#8b5cf6",600:"#7c3aed",700:"#6d28d9",800:"#5b21b6",900:"#4c1d95" },
  purple:  { 100:"#f3e8ff",200:"#e9d5ff",300:"#d8b4fe",400:"#c084fc",500:"#a855f7",600:"#9333ea",700:"#7e22ce",800:"#6b21a8",900:"#581c87" },
  fuchsia: { 100:"#fce7f3",200:"#fbcfe8",300:"#f9a8d4",400:"#f472b6",500:"#ec4899",600:"#db2777",700:"#be185d",800:"#9d174d",900:"#831843" },
  pink:    { 100:"#fce7f3",200:"#fbcfe8",300:"#f9a8d4",400:"#f472b6",500:"#ec4899",600:"#db2777",700:"#be185d",800:"#9d174d",900:"#831843" },
  rose:    { 100:"#ffe4e6",200:"#fecdd3",300:"#fda4af",400:"#fb7185",500:"#f43f5e",600:"#e11d48",700:"#be123c",800:"#9f1239",900:"#881337" },
};

const FAMILIES = Object.keys(COLOR_HEX);
const SHADES = [100, 200, 300, 400, 500, 600, 700, 800, 900];

// Text color samples as fully static class strings (safe for Tailwind v4)
const TEXT_SAMPLES = [
  { cls: "text-slate-200",   label: "text-slate-200" },
  { cls: "text-red-400",     label: "text-red-400" },
  { cls: "text-amber-400",   label: "text-amber-400" },
  { cls: "text-emerald-400", label: "text-emerald-400" },
  { cls: "text-blue-400",    label: "text-blue-400" },
  { cls: "text-indigo-400",  label: "text-indigo-400" },
  { cls: "text-violet-400",  label: "text-violet-400" },
  { cls: "text-pink-400",    label: "text-pink-400" },
];

export default function ColorsDemo() {
  const [bgHex, setBgHex] = useState("#6366f1");
  const [bgLabel, setBgLabel] = useState("bg-indigo-500");
  const [textCls, setTextCls] = useState("text-white");

  function handleSwatchClick(family: string, shade: number) {
    setBgHex(COLOR_HEX[family][shade]);
    setBgLabel(`bg-${family}-${shade}`);
  }

  return (
    <DemoWrapper title="Color Palette Explorer">
      {/* Background palette */}
      <DemoSection label="Click a swatch to apply it as a background">
        <div className="overflow-x-auto pb-1">
          <div className="space-y-1 min-w-max">
            {FAMILIES.map((family) => (
              <div key={family} className="flex items-center gap-1">
                <span className="text-[9px] text-slate-500 w-14 shrink-0 font-mono">{family}</span>
                {SHADES.map((shade) => (
                  <button
                    key={shade}
                    title={`bg-${family}-${shade}`}
                    onClick={() => handleSwatchClick(family, shade)}
                    style={{ backgroundColor: COLOR_HEX[family][shade] }}
                    className="w-5 h-5 rounded cursor-pointer hover:scale-125 transition-transform border border-white/10 shrink-0"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </DemoSection>

      {/* Preview card */}
      <DemoSection label="Preview card">
        <div
          className="rounded-xl p-4 border border-white/10 transition-all duration-200"
          style={{ backgroundColor: bgHex }}
        >
          <p className={`text-sm font-bold ${textCls}`}>Patient: Eleanor Vance</p>
          <p className={`text-xs mt-1 opacity-80 ${textCls}`}>Ward B • Bed 12 • Stable</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-2 items-center">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Text color:</span>
          {["text-white", "text-slate-900", "text-slate-200", "text-amber-300"].map((cls) => (
            <button
              key={cls}
              onClick={() => setTextCls(cls)}
              className={`text-xs font-mono px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                textCls === cls
                  ? "bg-indigo-600 border-indigo-500 text-white"
                  : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {cls}
            </button>
          ))}
        </div>
        <ClassChip classes={`${bgLabel} ${textCls}`} />
      </DemoSection>
    </DemoWrapper>
  );
}
