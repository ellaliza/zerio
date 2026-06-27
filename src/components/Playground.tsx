import { useState, useEffect, useRef } from "react";
import {
  Play,
  RotateCcw,
  Monitor,
  Smartphone,
  Tablet,
  Copy,
  Check,
  Lightbulb,
  Sparkles,
  ExternalLink
} from "lucide-react";
import { LessonChallenge } from "../types";

interface PlaygroundProps {
  code: string;
  onChange: (val: string) => void;
  challenge: LessonChallenge;
  onMarkComplete: () => void;
  isLessonCompleted: boolean;
}

export default function Playground({
  code,
  onChange,
  challenge,
  onMarkComplete,
  isLessonCompleted
}: PlaygroundProps) {
  const [copied, setCopied] = useState(false);
  const [previewMode, setPreviewMode] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const [showHint, setShowHint] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [successAnimation, setSuccessAnimation] = useState(false);

  // Resizable section state (flex-grow units, ratios — don't need to sum to 100)
  const [editorGrow,    setEditorGrow]    = useState(40);
  const [previewGrow,   setPreviewGrow]   = useState(35);
  const [challengeGrow, setChallengeGrow] = useState(25);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLoadChallenge = () => {
    onChange(challenge.startingCode);
    setShowHint(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    onChange(`<!-- Write your custom HTML & Tailwind CSS here! -->
<div class="text-center p-8 bg-white border border-slate-200 rounded-2xl shadow-sm max-w-sm mx-auto">
  <span class="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-wider">Playground</span>
  <h3 class="text-xl font-bold text-slate-800 mt-3">Welcome to Zerio!</h3>
  <p class="text-xs text-slate-500 mt-1">Modify this code or click "Load Challenge" to begin!</p>
</div>`);
  };

  const handleVerify = () => {
    setSuccessAnimation(true);
    onMarkComplete();
    setTimeout(() => setSuccessAnimation(false), 3000);
  };

  // Drag-to-resize logic
  const startDrag = (handle: 'top' | 'bottom') => (e: React.MouseEvent) => {
    e.preventDefault();
    const startY = e.clientY;
    // Capture grow values at drag start so delta is always relative to the snapshot
    const snap = { editor: editorGrow, preview: previewGrow, challenge: challengeGrow };

    const onMove = (ev: MouseEvent) => {
      const containerH = containerRef.current?.clientHeight ?? 600;
      const delta = ((ev.clientY - startY) / containerH) * 100;

      if (handle === 'top') {
        const newEditor  = Math.max(10, Math.min(snap.editor + delta, snap.editor + snap.preview - 10));
        const newPreview = Math.max(10, snap.preview - (newEditor - snap.editor));
        setEditorGrow(newEditor);
        setPreviewGrow(newPreview);
      } else {
        const newPreview   = Math.max(10, Math.min(snap.preview + delta, snap.preview + snap.challenge - 15));
        const newChallenge = Math.max(15, snap.challenge - (newPreview - snap.preview));
        setPreviewGrow(newPreview);
        setChallengeGrow(newChallenge);
      }
    };

    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  const getIframeSrcDoc = () => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          ::-webkit-scrollbar { width: 4px; height: 4px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 2px; }
          body { transition: background-color 0.2s; }
        </style>
      </head>
      <body class="bg-slate-50 p-6 min-h-screen flex items-center justify-center">
        <div class="w-full">
          ${code}
        </div>
      </body>
      </html>
    `;
  };

  useEffect(() => {
    setShowHint(false);
  }, [challenge]);

  return (
    <div id="playground-panel" className="flex flex-col h-full bg-slate-900 text-slate-100 overflow-hidden">

      {/* Tab/Header */}
      <div className="flex items-center justify-between px-4 py-3.5 bg-slate-950 border-b-2 border-slate-900 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-mono tracking-widest uppercase text-slate-300 font-black font-display">In-App Live Playground</span>
        </div>
        <div className="flex items-center bg-slate-950 rounded-lg p-0.5 border-2 border-slate-900 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
          <button
            id="preview-btn-mobile"
            onClick={() => setPreviewMode("mobile")}
            className={`p-1.5 rounded-md transition-all ${previewMode === "mobile" ? "bg-indigo-600 text-white border border-slate-900 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] font-bold" : "text-slate-400 hover:text-slate-200"}`}
            title="Mobile View (375px)"
          >
            <Smartphone size={14} />
          </button>
          <button
            id="preview-btn-tablet"
            onClick={() => setPreviewMode("tablet")}
            className={`p-1.5 rounded-md transition-all ${previewMode === "tablet" ? "bg-indigo-600 text-white border border-slate-900 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] font-bold" : "text-slate-400 hover:text-slate-200"}`}
            title="Tablet View (768px)"
          >
            <Tablet size={14} />
          </button>
          <button
            id="preview-btn-desktop"
            onClick={() => setPreviewMode("desktop")}
            className={`p-1.5 rounded-md transition-all ${previewMode === "desktop" ? "bg-indigo-600 text-white border border-slate-900 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] font-bold" : "text-slate-400 hover:text-slate-200"}`}
            title="Desktop View (100%)"
          >
            <Monitor size={14} />
          </button>
        </div>
      </div>

      {/* Resizable sections container */}
      <div ref={containerRef} className="flex flex-col flex-1 min-h-0 overflow-hidden">

        {/* Code Editor */}
        <div style={{ flex: editorGrow }} className="flex flex-col min-h-0 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-950 text-slate-400 text-[11px] border-b-2 border-slate-900 font-mono shrink-0">
            <span className="font-bold text-indigo-400">index.html</span>
            <div className="flex items-center gap-3">
              <button
                id="btn-copy-code"
                onClick={handleCopyCode}
                className="flex items-center gap-1 hover:text-slate-200 transition-colors font-bold cursor-pointer"
              >
                {copied ? <Check size={11} className="text-emerald-400 font-bold" /> : <Copy size={11} />}
                {copied ? "Copied" : "Copy"}
              </button>
              <button
                id="btn-reset-sandbox"
                onClick={handleReset}
                className="flex items-center gap-1 hover:text-slate-200 transition-colors font-bold cursor-pointer"
              >
                <RotateCcw size={11} />
                Reset
              </button>
            </div>
          </div>
          <div className="flex-1 relative font-mono text-sm leading-relaxed p-1 bg-slate-950 min-h-0">
            <div className="absolute left-0 top-0 bottom-0 w-9 bg-slate-950 text-slate-650 text-right pr-2 select-none pt-4 border-r-2 border-slate-900/60 font-bold overflow-hidden">
              {Array.from({ length: Math.max(12, code.split("\n").length) }).map((_, i) => (
                <div key={i} className="text-[11px] leading-[22px]">{i + 1}</div>
              ))}
            </div>
            <textarea
              id="playground-editor"
              value={code}
              onChange={(e) => onChange(e.target.value)}
              className="w-full h-full pl-12 pr-4 py-3 bg-transparent text-indigo-200 font-mono text-xs focus:outline-none resize-none leading-[22px]"
              spellCheck="false"
              placeholder="<!-- Insert HTML + Tailwind CSS utility classes here -->"
            />
          </div>
        </div>

        {/* Drag handle — editor / preview */}
        <div
          className="h-2 bg-slate-800 hover:bg-indigo-500/50 active:bg-indigo-500 cursor-row-resize shrink-0 flex items-center justify-center group transition-colors border-y-2 border-slate-900"
          onMouseDown={startDrag('top')}
        >
          <div className="w-10 h-px bg-slate-600 group-hover:bg-indigo-400 rounded-full transition-colors" />
        </div>

        {/* Live Preview */}
        <div style={{ flex: previewGrow }} className="flex flex-col min-h-0 bg-slate-950">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-950 text-slate-300 text-[11px] border-b-2 border-slate-900 font-mono shrink-0">
            <span className="flex items-center gap-2 font-black font-display text-white">
              <Play size={10} className="text-emerald-400 fill-emerald-400" />
              Live Preview
              <span className="text-slate-500 font-normal">({previewMode})</span>
            </span>
          </div>
          <div className="flex-1 bg-slate-900/40 p-4 flex items-center justify-center overflow-auto min-h-0">
            <div
              id="live-preview-container"
              style={{
                width: previewMode === "mobile" ? "375px" : previewMode === "tablet" ? "768px" : "100%",
                height: "100%",
                maxWidth: "100%",
                transition: "width 0.3s ease-in-out"
              }}
              className="bg-white rounded-xl shadow-2xl overflow-hidden border-3 border-slate-900 flex flex-col"
            >
              {/* Fake Browser Address Bar */}
              <div className="bg-slate-100 border-b-2 border-slate-900 px-3 py-2 flex items-center gap-2 select-none shrink-0">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 border border-slate-900"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 border border-slate-900"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-slate-900"></span>
                </div>
                <div className="flex-1 bg-white border-2 border-slate-900 rounded text-[10px] text-slate-700 font-mono px-2 py-0.5 flex items-center justify-between shadow-inner">
                  <span className="font-semibold">https://medicore-sandbox.local/vitals</span>
                  <ExternalLink size={9} className="text-slate-500" />
                </div>
              </div>
              <iframe
                id="preview-iframe"
                key={iframeKey}
                title="Tailwind Play Sandbox"
                srcDoc={getIframeSrcDoc()}
                className="w-full flex-1 border-none bg-slate-50"
                sandbox="allow-scripts"
              />
            </div>
          </div>
        </div>

        {/* Drag handle — preview / challenge */}
        <div
          className="h-2 bg-slate-800 hover:bg-indigo-500/50 active:bg-indigo-500 cursor-row-resize shrink-0 flex items-center justify-center group transition-colors border-y-2 border-slate-900"
          onMouseDown={startDrag('bottom')}
        >
          <div className="w-10 h-px bg-slate-600 group-hover:bg-indigo-400 rounded-full transition-colors" />
        </div>

        {/* Challenge Companion */}
        <div style={{ flex: challengeGrow }} className="flex flex-col min-h-0 overflow-y-auto bg-slate-950 shadow-inner">
          <div className="p-5 shrink-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-indigo-400 animate-pulse" />
                  <h4 className="text-xs font-black uppercase font-display text-white tracking-wider">Active Challenge Checklist</h4>
                </div>
                <p className="text-xs text-slate-400 mt-1.5 max-w-lg leading-relaxed">
                  {challenge.description}
                </p>
              </div>
              <button
                id="btn-load-challenge"
                onClick={handleLoadChallenge}
                className="px-3 py-1.5 text-[10px] font-black font-display bg-indigo-900 hover:bg-indigo-800 text-indigo-200 border-2 border-slate-900 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] shrink-0 transition-all cursor-pointer"
              >
                Load Challenge Code
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 pt-3.5 border-t-2 border-slate-900">
              <button
                id="btn-toggle-hint"
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-1.5 text-xs font-bold font-display text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                <Lightbulb size={13} className={showHint ? "text-amber-400 fill-amber-400/20" : ""} />
                {showHint ? "Hide Solution Hint" : "Reveal Solution Hint"}
              </button>

              <div className="flex items-center gap-2">
                {isLessonCompleted ? (
                  <span id="badge-completed" className="flex items-center gap-1.5 text-xs text-white font-black font-display bg-emerald-500 border-2 border-slate-950 px-4 py-2 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <Check size={13} strokeWidth={3} />
                    Challenge Cleared!
                  </span>
                ) : (
                  <button
                    id="btn-verify-challenge"
                    onClick={handleVerify}
                    className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 border-2 border-slate-950 text-white font-black font-display text-xs px-5 py-2 rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer relative overflow-hidden"
                  >
                    {successAnimation && (
                      <span className="absolute inset-0 bg-emerald-400/20 animate-ping rounded-lg"></span>
                    )}
                    <Check size={12} strokeWidth={3} />
                    Verify Challenge
                  </button>
                )}
              </div>
            </div>

            {showHint && (
              <div id="solution-hint-box" className="mt-4 bg-slate-900 border-2 border-slate-950 p-4 rounded-xl text-xs leading-relaxed text-amber-100 font-medium shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <span className="font-extrabold font-display text-amber-400 block mb-1">💡 Solution Hint:</span>
                {challenge.solutionHint}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
