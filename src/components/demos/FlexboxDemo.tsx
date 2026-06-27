import { useState } from "react";
import { DemoWrapper, DemoSection, ToggleGroup, ClassChip } from "./shared";

export default function FlexboxDemo() {
  const [direction, setDirection] = useState("flex-row");
  const [justify, setJustify] = useState("justify-start");
  const [align, setAlign] = useState("items-center");
  const [gap, setGap] = useState("gap-4");

  const containerClass = `flex ${direction} ${justify} ${align} ${gap}`;

  return (
    <DemoWrapper title="Flexbox Live Cheatsheet">
      {/* Preview */}
      <DemoSection label="Preview">
        <div
          className={`h-36 bg-slate-900 border-2 border-slate-700 rounded-xl p-3 overflow-hidden transition-all duration-200 ${containerClass}`}
        >
          <div className="w-16 h-10 bg-indigo-600 text-white text-[10px] font-bold rounded flex items-center justify-center shrink-0">
            Box 1
          </div>
          <div className="w-20 h-14 bg-indigo-500 text-white text-[10px] font-bold rounded flex items-center justify-center shrink-0">
            Box 2
          </div>
          <div className="w-12 h-8 bg-indigo-400 text-white text-[10px] font-bold rounded flex items-center justify-center shrink-0">
            Box 3
          </div>
        </div>
      </DemoSection>

      {/* Controls */}
      <ToggleGroup
        label="Direction"
        options={["flex-row", "flex-col"]}
        active={direction}
        onChange={setDirection}
      />
      <ToggleGroup
        label="Justify Content"
        options={["justify-start", "justify-center", "justify-end", "justify-between", "justify-around", "justify-evenly"]}
        active={justify}
        onChange={setJustify}
      />
      <ToggleGroup
        label="Align Items"
        options={["items-start", "items-center", "items-end", "items-stretch"]}
        active={align}
        onChange={setAlign}
      />
      <ToggleGroup
        label="Gap"
        options={["gap-0", "gap-2", "gap-4", "gap-8"]}
        active={gap}
        onChange={setGap}
      />

      {/* Active class display */}
      <DemoSection label="Active classes">
        <ClassChip classes={`flex ${direction} ${justify} ${align} ${gap}`} />
      </DemoSection>
    </DemoWrapper>
  );
}
