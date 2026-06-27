import { useState } from "react";
import { DemoWrapper, DemoSection, ClassChip } from "./shared";

const BREAKPOINTS = [
  { prefix: "default", px: 0,    label: "0px+" },
  { prefix: "sm:",     px: 640,  label: "640px+" },
  { prefix: "md:",     px: 768,  label: "768px+" },
  { prefix: "lg:",     px: 1024, label: "1024px+" },
  { prefix: "xl:",     px: 1280, label: "1280px+" },
];

function getActiveBreakpoint(width: number) {
  let active = BREAKPOINTS[0];
  for (const bp of BREAKPOINTS) {
    if (width >= bp.px) active = bp;
  }
  return active;
}

function getLayoutClass(width: number) {
  if (width >= 768) return "grid grid-cols-3 gap-2";
  if (width >= 640) return "grid grid-cols-2 gap-2";
  return "flex flex-col gap-2";
}

export default function ResponsiveDemo() {
  const [simWidth, setSimWidth] = useState(768);

  const activeBp = getActiveBreakpoint(simWidth);
  const layoutClass = getLayoutClass(simWidth);

  return (
    <DemoWrapper title="Responsive Breakpoints Demo">
      {/* Breakpoint reference table */}
      <DemoSection label="Tailwind breakpoint scale">
        <div className="rounded-lg overflow-hidden border border-slate-700">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-900 text-slate-400">
                <th className="text-left px-3 py-2 font-bold">Prefix</th>
                <th className="text-left px-3 py-2 font-bold">Min-width</th>
                <th className="text-left px-3 py-2 font-bold">Example</th>
              </tr>
            </thead>
            <tbody>
              {BREAKPOINTS.map((bp) => {
                const isActive = bp.prefix === activeBp.prefix;
                return (
                  <tr
                    key={bp.prefix}
                    className={`border-t border-slate-800 transition-colors ${
                      isActive ? "bg-indigo-600/20 text-indigo-300" : "text-slate-400"
                    }`}
                  >
                    <td className="px-3 py-2 font-mono font-bold">{bp.prefix || "(none)"}</td>
                    <td className="px-3 py-2">{bp.label}</td>
                    <td className="px-3 py-2 font-mono text-[10px]">
                      {bp.prefix ? `${bp.prefix}grid-cols-3` : "grid-cols-1"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </DemoSection>

      {/* Slider */}
      <DemoSection label={`Simulated viewport: ${simWidth}px — ${activeBp.prefix || "default"} active`}>
        <input
          type="range"
          min={320}
          max={1280}
          value={simWidth}
          onChange={(e) => setSimWidth(Number(e.target.value))}
          className="w-full accent-indigo-500"
        />
        <div className="flex justify-between text-[9px] text-slate-500 font-mono mt-0.5">
          <span>320px</span>
          <span>640px</span>
          <span>768px</span>
          <span>1024px</span>
          <span>1280px</span>
        </div>
      </DemoSection>

      {/* Simulated layout preview */}
      <DemoSection label="Layout changes as viewport grows">
        <div className={`transition-all duration-200 ${layoutClass}`}>
          {["Card A", "Card B", "Card C"].map((label) => (
            <div
              key={label}
              className="bg-slate-700 rounded-lg p-3 text-xs text-slate-300 text-center font-bold"
            >
              {label}
            </div>
          ))}
        </div>
        <ClassChip classes={layoutClass} />
      </DemoSection>
    </DemoWrapper>
  );
}
