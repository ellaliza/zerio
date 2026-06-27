import { useState } from "react";
import { DemoWrapper, DemoSection, ToggleGroup, ClassChip } from "./shared";

export default function BordersDemo() {
  const [borderWidth, setBorderWidth] = useState("border-2");
  const [borderColor, setBorderColor] = useState("border-indigo-500");
  const [rounded, setRounded] = useState("rounded-lg");

  return (
    <DemoWrapper title="Borders & Rounded Live Demo">
      {/* Preview */}
      <DemoSection label="Preview">
        <div className="flex justify-center py-4">
          <div
            className={`w-32 h-32 bg-slate-800 flex items-center justify-center text-xs text-slate-400 transition-all duration-200 ${borderWidth} ${borderColor} ${rounded}`}
          >
            Preview
          </div>
        </div>
      </DemoSection>

      {/* Controls */}
      <div className="space-y-4">
        <div className="space-y-1.5">
          <ToggleGroup
            label="Border Width"
            options={["border-0", "border", "border-2", "border-4", "border-8"]}
            active={borderWidth}
            onChange={setBorderWidth}
          />
          <ClassChip classes={borderWidth} />
        </div>

        <div className="space-y-1.5">
          <ToggleGroup
            label="Border Color"
            options={["border-slate-400", "border-indigo-500", "border-red-500", "border-emerald-500"]}
            active={borderColor}
            onChange={setBorderColor}
          />
          <ClassChip classes={borderColor} />
        </div>

        <div className="space-y-1.5">
          <ToggleGroup
            label="Rounded Corners"
            options={["rounded-none", "rounded-sm", "rounded-md", "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-full"]}
            active={rounded}
            onChange={setRounded}
          />
          <ClassChip classes={rounded} />
        </div>
      </div>
    </DemoWrapper>
  );
}
