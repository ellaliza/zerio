import { Zap } from "lucide-react";

export const ACTIVE_BTN =
  "bg-indigo-600 border border-indigo-500 text-white text-xs px-3 py-1.5 rounded cursor-pointer transition-colors";
export const INACTIVE_BTN =
  "bg-slate-800 border border-slate-700 text-slate-300 text-xs px-3 py-1.5 rounded hover:bg-slate-700 cursor-pointer transition-colors";

interface DemoWrapperProps {
  children: React.ReactNode;
  title?: string;
}

export function DemoWrapper({ children, title = "Interactive Demo" }: DemoWrapperProps) {
  return (
    <div className="bg-slate-800/40 border-2 border-indigo-500/20 rounded-xl p-5 space-y-5 my-4">
      <h3 className="text-sm font-extrabold text-white border-b-2 border-slate-700 pb-2 uppercase tracking-wider flex items-center gap-2">
        <Zap size={15} className="text-indigo-400" />
        {title}
      </h3>
      {children}
    </div>
  );
}

interface ToggleGroupProps {
  label: string;
  options: string[];
  active: string;
  onChange: (value: string) => void;
}

export function ToggleGroup({ label, options, active, onChange }: ToggleGroupProps) {
  return (
    <div className="space-y-1.5">
      <span className="block text-[10px] font-bold text-indigo-400 uppercase tracking-wider">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={opt === active ? ACTIVE_BTN : INACTIVE_BTN}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

interface ClassChipProps {
  classes: string | string[];
}

export function ClassChip({ classes }: ClassChipProps) {
  const display = Array.isArray(classes) ? classes.join(" ") : classes;
  return (
    <span className="font-mono text-amber-300 bg-slate-900 px-2 py-0.5 rounded text-xs border border-slate-800 break-all">
      {display}
    </span>
  );
}

export function DemoSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
      {children}
    </div>
  );
}
