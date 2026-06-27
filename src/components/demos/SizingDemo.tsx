import { useState } from "react";
import { DemoWrapper, DemoSection, ToggleGroup, ClassChip } from "./shared";

export default function SizingDemo() {
  const [widthClass, setWidthClass] = useState("w-1/2");
  const [maxWClass, setMaxWClass] = useState("max-w-sm");

  return (
    <DemoWrapper title="Sizing Live Demo">
      {/* Width demo */}
      <DemoSection label="Width — how wide the element grows">
        <div className="w-full bg-slate-700/20 border border-slate-700 rounded-xl h-14 overflow-hidden relative">
          <div
            className={`h-full bg-indigo-500/80 rounded-lg flex items-center justify-center text-white text-xs font-bold transition-all duration-300 ${widthClass}`}
          >
            {widthClass}
          </div>
        </div>
        <ToggleGroup
          label="Width class"
          options={["w-1/4", "w-1/3", "w-1/2", "w-2/3", "w-3/4", "w-full", "w-auto"]}
          active={widthClass}
          onChange={setWidthClass}
        />
        <ClassChip classes={widthClass} />
      </DemoSection>

      {/* Max-width demo */}
      <DemoSection label="Max-width — caps how wide it can grow">
        <div className="w-full bg-slate-700/20 border border-slate-700 rounded-xl p-2">
          <div
            className={`mx-auto bg-indigo-900/60 border border-indigo-700 rounded-xl p-3 text-center text-xs text-indigo-300 font-bold transition-all duration-300 ${maxWClass}`}
          >
            This element is capped at {maxWClass}
          </div>
        </div>
        <ToggleGroup
          label="Max-width class"
          options={["max-w-xs", "max-w-sm", "max-w-md", "max-w-lg", "max-w-xl", "max-w-full"]}
          active={maxWClass}
          onChange={setMaxWClass}
        />
        <ClassChip classes={maxWClass} />
      </DemoSection>
    </DemoWrapper>
  );
}
