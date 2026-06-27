import { useState } from "react";
import { DemoWrapper, DemoSection, ToggleGroup, ClassChip } from "./shared";

const FONT_SIZES = [
  "text-xs", "text-sm", "text-base", "text-lg", "text-xl",
  "text-2xl", "text-3xl", "text-4xl", "text-5xl",
];

const FONT_WEIGHTS = [
  "font-thin", "font-extralight", "font-light", "font-normal",
  "font-medium", "font-semibold", "font-bold", "font-extrabold", "font-black",
];

const TEXT_COLORS = [
  { cls: "text-white",       label: "text-white" },
  { cls: "text-slate-400",   label: "text-slate-400" },
  { cls: "text-red-400",     label: "text-red-400" },
  { cls: "text-amber-400",   label: "text-amber-400" },
  { cls: "text-emerald-400", label: "text-emerald-400" },
  { cls: "text-blue-400",    label: "text-blue-400" },
  { cls: "text-indigo-400",  label: "text-indigo-400" },
  { cls: "text-rose-400",    label: "text-rose-400" },
];

const ALIGNMENTS = ["text-left", "text-center", "text-right", "text-justify"];

export default function TypographyDemo() {
  const [align, setAlign] = useState("text-left");

  return (
    <DemoWrapper title="Typography Reference">
      {/* Font sizes */}
      <DemoSection label="Font sizes (text-xs → text-5xl)">
        <div className="overflow-x-auto">
          <div className="space-y-1 min-w-0">
            {FONT_SIZES.map((size) => (
              <div key={size} className="flex items-baseline gap-3">
                <span className="font-mono text-[9px] text-indigo-400 w-16 shrink-0">{size}</span>
                <span className={`text-white leading-tight truncate ${size}`}>Aa</span>
              </div>
            ))}
          </div>
        </div>
      </DemoSection>

      {/* Font weights */}
      <DemoSection label="Font weights">
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {FONT_WEIGHTS.map((w) => (
            <div key={w} className="flex flex-col items-center">
              <span className={`text-white text-sm ${w}`}>Aa</span>
              <span className="font-mono text-[9px] text-indigo-400 mt-0.5">{w}</span>
            </div>
          ))}
        </div>
      </DemoSection>

      {/* Text colors */}
      <DemoSection label="Text colors">
        <div className="flex flex-wrap gap-3">
          {TEXT_COLORS.map(({ cls, label }) => (
            <div key={cls} className="flex flex-col items-center">
              <span className={`text-base font-bold ${cls}`}>Aa</span>
              <span className="font-mono text-[9px] text-slate-500 mt-0.5">{label}</span>
            </div>
          ))}
        </div>
      </DemoSection>

      {/* Text alignment */}
      <DemoSection label="Text alignment">
        <ToggleGroup
          label="Alignment"
          options={ALIGNMENTS}
          active={align}
          onChange={setAlign}
        />
        <div className={`bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-300 text-xs leading-relaxed transition-all ${align}`}>
          Patient allergy alert: Penicillin. Double-check charts before administering any medication during this shift.
        </div>
        <ClassChip classes={align} />
      </DemoSection>
    </DemoWrapper>
  );
}
