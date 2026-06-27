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
  const [iframeKey, setIframeKey] = useState(0); // For forcing reload
  const [successAnimation, setSuccessAnimation] = useState(false);

  // Sync challenge code when requested
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
    // Show a fun success animation and trigger completion
    setSuccessAnimation(true);
    onMarkComplete();
    setTimeout(() => setSuccessAnimation(false), 3000);
  };

  // Compile iframe content
  const getIframeSrcDoc = () => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          /* Hide scrollbar for cleaner preview */
          ::-webkit-scrollbar {
            width: 4px;
            height: 4px;
          }
          ::-webkit-scrollbar-track {
            background: transparent;
          }
          ::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 2px;
          }
          body {
            transition: background-color 0.2s;
          }
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

  // Reset showHint when challenge shifts
  useEffect(() => {
    setShowHint(false);
  }, [challenge]);

  return (
    <div id="playground-panel" className="flex flex-col h-full bg-slate-900 text-slate-100 overflow-hidden">
      {/* Tab/Header */}
      <div className="flex items-center justify-between px-4 py-3.5 bg-slate-950 border-b-2 border-slate-900">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-mono tracking-widest uppercase text-slate-300 font-black font-display">In-App Live Playground</span>
        </div>
        
        {/* Responsive Preview Toggles */}
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

      {/* Split Code and Live Preview */}
      <div className="flex flex-col flex-1 min-h-0 divide-y-2 divide-slate-900">
        
        {/* Top: Code Editor */}
        <div className="flex flex-col flex-1 min-h-0 relative">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-950 text-slate-400 text-[11px] border-b-2 border-slate-900 font-mono">
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
          <div className="flex-1 relative font-mono text-sm leading-relaxed p-1 bg-slate-950">
            {/* Minimal Syntax highlighting look - Line numbers */}
            <div className="absolute left-0 top-0 bottom-0 w-9 bg-slate-950 text-slate-650 text-right pr-2 select-none pt-4 border-r-2 border-slate-900/60 font-bold">
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

        {/* Bottom: Live Render IFrame */}
        <div className="flex-1 flex flex-col bg-slate-950 min-h-0">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-950 text-slate-300 text-[11px] border-b-2 border-slate-900 font-mono">
            <span className="flex items-center gap-2 font-black font-display text-white">
              <Play size={10} className="text-emerald-400 fill-emerald-400" /> 
              Live Preview 
              <span className="text-slate-500 font-normal">({previewMode})</span>
            </span>
          </div>
          
          {/* Container simulating a browser viewport with custom size */}
          <div className="flex-1 bg-slate-900/40 p-4 flex items-center justify-center overflow-auto">
            <div 
              id="live-preview-container"
              style={{
                width: previewMode === "mobile" ? "375px" : previewMode === "tablet" ? "768px" : "100%",
                height: "100%",
                maxWidth: "100%",
                transition: "width 0.3s ease-in-out"
              }}
              className="bg-white rounded-xl shadow-2xl overflow-hidden border-3 border-slate-900 flex flex-col h-full"
            >
              {/* Fake Browser Address Bar */}
              <div className="bg-slate-100 border-b-2 border-slate-900 px-3 py-2 flex items-center gap-2 select-none">
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
                className="w-full h-full border-none bg-slate-50 flex-1"
                sandbox="allow-scripts"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Challenge Companion Drawer */}
      <div className="bg-slate-950 border-t-3 border-slate-900 p-5 shrink-0 shadow-inner">
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

        {/* Buttons & Solutions */}
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

        {/* Animated Solution Hint Drawer */}
        {showHint && (
          <div id="solution-hint-box" className="mt-4 bg-slate-900 border-2 border-slate-950 p-4 rounded-xl text-xs leading-relaxed text-amber-100 font-medium shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <span className="font-extrabold font-display text-amber-400 block mb-1">💡 Solution Hint:</span>
            {challenge.solutionHint}
          </div>
        )}
      </div>
    </div>
  );
}
