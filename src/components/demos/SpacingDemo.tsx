import { useState } from "react";
import { DemoWrapper, DemoSection, ToggleGroup, ClassChip } from "./shared";

export default function SpacingDemo() {
  const [padding, setPadding] = useState("p-4");
  const [margin, setMargin] = useState("m-2");

  return (
    <DemoWrapper title="Spacing Live Demo">
      {/* Padding section */}
      <DemoSection label="Padding — space inside the element">
        <div className="h-44 bg-indigo-500/10 border-2 border-dashed border-indigo-500/30 rounded-xl flex items-center justify-center">
          <div
            className={`bg-indigo-600 text-white text-xs font-bold rounded flex items-center justify-center transition-all duration-300 ${padding}`}
          >
            Content
          </div>
        </div>
        <ToggleGroup
          label="Padding value"
          options={["p-1", "p-2", "p-4", "p-6", "p-8", "p-12", "p-16"]}
          active={padding}
          onChange={setPadding}
        />
        <ClassChip classes={padding} />
      </DemoSection>

      {/* Margin section */}
      <DemoSection label="Margin — space outside the element">
        <div className="bg-slate-700/40 rounded-xl p-1 overflow-auto">
          <div
            className={`bg-slate-600 border border-slate-500 text-xs text-slate-200 font-bold rounded px-3 py-1 inline-block transition-all duration-300 ${margin}`}
          >
            Element
          </div>
        </div>
        <ToggleGroup
          label="Margin value"
          options={["m-0", "m-1", "m-2", "m-4", "m-6", "m-8", "m-12"]}
          active={margin}
          onChange={setMargin}
        />
        <ClassChip classes={margin} />
      </DemoSection>
    </DemoWrapper>
  );
}
