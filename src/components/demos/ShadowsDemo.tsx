import { useState } from "react";
import { DemoWrapper, DemoSection, ToggleGroup, ClassChip, ACTIVE_BTN, INACTIVE_BTN } from "./shared";

const GRADIENTS = [
  { label: "Blue → Indigo", value: "bg-gradient-to-r from-blue-500 to-indigo-600" },
  { label: "Emerald → Teal", value: "bg-gradient-to-r from-emerald-400 to-teal-600" },
  { label: "Rose → Pink", value: "bg-gradient-to-br from-rose-500 to-pink-600" },
  { label: "Amber → Orange", value: "bg-gradient-to-r from-amber-400 to-orange-500" },
];

export default function ShadowsDemo() {
  const [shadow, setShadow] = useState("shadow-md");
  const [gradientIdx, setGradientIdx] = useState(0);

  const activeGradient = GRADIENTS[gradientIdx];

  return (
    <DemoWrapper title="Shadows & Gradients Live Demo">
      {/* Shadow preview */}
      <DemoSection label="Box Shadow — elevation depth">
        <div className="flex justify-center py-6 bg-slate-700/20 rounded-xl">
          <div
            className={`bg-white rounded-xl p-5 w-48 text-slate-700 text-xs font-semibold text-center transition-all duration-300 ${shadow}`}
          >
            <p className="font-bold text-slate-800 text-sm">Patient Card</p>
            <p className="text-slate-500 mt-1">Hover to see depth</p>
          </div>
        </div>
        <ToggleGroup
          label="Shadow class"
          options={["shadow-none", "shadow-sm", "shadow", "shadow-md", "shadow-lg", "shadow-xl", "shadow-2xl"]}
          active={shadow}
          onChange={setShadow}
        />
        <ClassChip classes={shadow} />
      </DemoSection>

      {/* Gradient preview */}
      <DemoSection label="Gradients — smooth color blends">
        <div className={`h-16 rounded-xl transition-all duration-300 ${activeGradient.value}`} />
        <div className="flex flex-wrap gap-1.5 mt-2">
          {GRADIENTS.map((g, i) => (
            <button
              key={g.label}
              onClick={() => setGradientIdx(i)}
              className={i === gradientIdx ? ACTIVE_BTN : INACTIVE_BTN}
            >
              {g.label}
            </button>
          ))}
        </div>
        <ClassChip classes={activeGradient.value} />
      </DemoSection>
    </DemoWrapper>
  );
}
