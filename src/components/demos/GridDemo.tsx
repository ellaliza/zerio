import { useState } from "react";
import { DemoWrapper, DemoSection, ToggleGroup, ClassChip, ACTIVE_BTN, INACTIVE_BTN } from "./shared";

export default function GridDemo() {
  const [cols, setCols] = useState("grid-cols-3");
  const [gap, setGap] = useState("gap-4");
  const [spanTwo, setSpanTwo] = useState(false);

  const cells = ["Cell 1", "Cell 2", "Cell 3", "Cell 4", "Cell 5", "Cell 6"];

  return (
    <DemoWrapper title="Grid Live Cheatsheet">
      {/* Preview */}
      <DemoSection label="Preview">
        <div className={`grid ${cols} ${gap}`}>
          {cells.map((label, i) => (
            <div
              key={label}
              className={`bg-slate-700 border border-slate-600 rounded-lg p-3 text-xs text-center text-slate-300 font-bold transition-all duration-200 ${
                i === 0 && spanTwo ? "col-span-2 bg-indigo-900/60 border-indigo-700 text-indigo-300" : ""
              }`}
            >
              {label}
            </div>
          ))}
        </div>
      </DemoSection>

      {/* Controls */}
      <ToggleGroup
        label="Grid Columns"
        options={["grid-cols-1", "grid-cols-2", "grid-cols-3", "grid-cols-4", "grid-cols-5", "grid-cols-6"]}
        active={cols}
        onChange={setCols}
      />
      <ToggleGroup
        label="Gap"
        options={["gap-2", "gap-4", "gap-8"]}
        active={gap}
        onChange={setGap}
      />

      <DemoSection label="Cell 1 span">
        <button
          onClick={() => setSpanTwo((v) => !v)}
          className={spanTwo ? ACTIVE_BTN : INACTIVE_BTN}
        >
          {spanTwo ? "col-span-2 ✓ (on Cell 1)" : "col-span-2 (off)"}
        </button>
      </DemoSection>

      {/* Active classes */}
      <DemoSection label="Active classes">
        <ClassChip classes={`grid ${cols} ${gap}${spanTwo ? " | Cell 1: col-span-2" : ""}`} />
      </DemoSection>
    </DemoWrapper>
  );
}
