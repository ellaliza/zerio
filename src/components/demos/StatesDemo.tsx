import { useState } from "react";
import { DemoWrapper, DemoSection, ClassChip, ACTIVE_BTN, INACTIVE_BTN } from "./shared";

type StateKey = "normal" | "hover" | "focus" | "active" | "disabled";

const STATES: { key: StateKey; label: string; cls: string; chip: string }[] = [
  {
    key: "normal",
    label: "Normal",
    cls: "bg-indigo-600 border-2 border-indigo-500 text-white rounded-lg px-5 py-2.5 text-sm font-bold",
    chip: "bg-indigo-600",
  },
  {
    key: "hover",
    label: "hover:",
    cls: "bg-indigo-500 border-2 border-indigo-400 text-white rounded-lg px-5 py-2.5 text-sm font-bold",
    chip: "hover:bg-indigo-500 hover:border-indigo-400",
  },
  {
    key: "focus",
    label: "focus:",
    cls: "bg-indigo-600 border-2 border-indigo-400 text-white rounded-lg px-5 py-2.5 text-sm font-bold ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-900",
    chip: "focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2",
  },
  {
    key: "active",
    label: "active:",
    cls: "bg-indigo-800 border-2 border-indigo-700 text-white rounded-lg px-5 py-2.5 text-sm font-bold translate-y-px",
    chip: "active:bg-indigo-800 active:translate-y-px",
  },
  {
    key: "disabled",
    label: "disabled:",
    cls: "bg-slate-700 border-2 border-slate-600 text-slate-400 rounded-lg px-5 py-2.5 text-sm font-bold opacity-60 cursor-not-allowed",
    chip: "disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-slate-700",
  },
];

export default function StatesDemo() {
  const [preview, setPreview] = useState<StateKey>("normal");

  const active = STATES.find((s) => s.key === preview)!;

  return (
    <DemoWrapper title="Interaction States Demo">
      {/* State toggle */}
      <DemoSection label="Select a state to preview">
        <div className="flex flex-wrap gap-1.5">
          {STATES.map((s) => (
            <button
              key={s.key}
              onClick={() => setPreview(s.key)}
              className={s.key === preview ? ACTIVE_BTN : INACTIVE_BTN}
            >
              {s.label}
            </button>
          ))}
        </div>
      </DemoSection>

      {/* Button preview */}
      <DemoSection label="Button preview">
        <div className="flex justify-center py-6 bg-slate-900 rounded-xl border border-slate-800">
          <div role="button" className={`transition-all duration-150 ${active.cls}`}>
            Schedule Surgery
          </div>
        </div>
      </DemoSection>

      {/* Class chip */}
      <DemoSection label="State classes applied">
        <ClassChip classes={active.chip} />
      </DemoSection>

      {/* Explanation */}
      <p className="text-[10px] text-slate-500 leading-relaxed">
        In real code, these classes are written with their state prefix (e.g.{" "}
        <span className="font-mono text-amber-400">hover:bg-indigo-500</span>) and activate automatically when the
        user interacts with the element. The preview above simulates each visual state manually.
      </p>
    </DemoWrapper>
  );
}
