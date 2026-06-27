import React, { useState, useEffect } from "react";
import { 
  BookOpen, 
  CheckCircle, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  Code, 
  Sparkles, 
  Award, 
  ArrowRight,
  Lightbulb,
  Search,
  Menu,
  X,
  Globe,
  Layers,
  Database,
  ExternalLink,
  MessageSquare,
  Play
} from "lucide-react";
import { lessons, whatIsNextContent } from "./data/lessons";
import { STAGES } from "./data/stages";
import Playground from "./components/Playground";
import LessonDemo from "./components/LessonDemo";
import HomeScreen from "./components/HomeScreen";
import GlossaryPage from "./components/GlossaryPage";
import { Lesson } from "./types";

function renderMarkdown(text: string) {
  // Matches **bold** (content may include `code` spans with * inside), `code`, *italic*
  const INLINE_RE = /(\*\*(?:[^*`]|`[^`]*`)+\*\*|`[^`]+`|\*[^*`\n]+\*)/;

  function renderInline(str: string): (string | React.ReactElement | (string | React.ReactElement)[])[] {
    return str.split(INLINE_RE).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4)
        return <strong key={i} className="text-white font-semibold">{renderInline(part.slice(2, -2))}</strong>;
      if (part.startsWith('`') && part.endsWith('`') && part.length > 2)
        return <code key={i} className="bg-slate-800 text-amber-300 px-1 rounded text-[0.9em] font-mono">{part.slice(1, -1)}</code>;
      if (part.startsWith('*') && part.endsWith('*') && part.length > 2)
        return <em key={i}>{part.slice(1, -1)}</em>;
      return part;
    });
  }

  const lines = text.split('\n');
  const nodes: React.ReactElement[] = [];
  let key = 0;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Empty line — block separator
    if (line.trim() === '') { i++; continue; }

    // Numbered list
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i]))
        items.push(lines[i++].replace(/^\d+\.\s+/, ''));
      nodes.push(
        <ol key={key++} className="space-y-2">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-2">
              <span className="text-indigo-400 font-bold shrink-0 w-4 tabular-nums">{j + 1}.</span>
              <span className="flex-1">{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Unordered list (with optional indented sub-items starting with "  - ")
    if (line.startsWith('- ')) {
      const items: Array<{ text: string; sub: string[] }> = [];
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('  - '))) {
        if (lines[i].startsWith('  - '))
          items[items.length - 1]?.sub.push(lines[i].slice(4));
        else
          items.push({ text: lines[i].slice(2), sub: [] });
        i++;
      }
      nodes.push(
        <ul key={key++} className="space-y-1.5">
          {items.map((item, j) => (
            <li key={j}>
              <div className="flex items-start gap-2">
                <span className="text-indigo-400 shrink-0 mt-0.5 select-none">•</span>
                <span>{renderInline(item.text)}</span>
              </div>
              {item.sub.length > 0 && (
                <ul className="ml-5 mt-1 space-y-1">
                  {item.sub.map((sub, k) => (
                    <li key={k} className="flex items-start gap-2">
                      <span className="text-slate-500 shrink-0 select-none">–</span>
                      <span className="text-slate-300">{renderInline(sub)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Paragraph — accumulate consecutive non-list, non-empty lines
    const pLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].startsWith('- ') &&
      !/^\d+\.\s/.test(lines[i])
    ) pLines.push(lines[i++]);

    if (pLines.length > 0)
      nodes.push(<p key={key++} className="leading-relaxed">{renderInline(pLines.join(' '))}</p>);
  }

  return nodes;
}

export default function App() {
  const [currentLessonId, setCurrentLessonId] = useState<number>(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [playgroundCode, setPlaygroundCode] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [isSandboxSyncMode, setIsSandboxSyncMode] = useState<boolean>(true);

  // Initialize completed lessons from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("zerio_completed_lessons");
      if (saved) {
        setCompletedLessons(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to read progress from localStorage", e);
    }
  }, []);

  // Sync active lesson starting playground content
  const activeLesson = lessons.find((l) => l.id === currentLessonId) || lessons[0];

  useEffect(() => {
    // If we're on a valid lesson and sandbox synchronization is allowed, load Example #1
    if (activeLesson && isSandboxSyncMode) {
      setPlaygroundCode(activeLesson.examples[0]?.code || "");
    }
  }, [currentLessonId, activeLesson, isSandboxSyncMode]);

  const handleSelectLesson = (id: number) => {
    setCurrentLessonId(id);
    setIsSandboxSyncMode(true);
    setMobileMenuOpen(false);
  };

  const handleMarkComplete = () => {
    if (!completedLessons.includes(currentLessonId)) {
      const updated = [...completedLessons, currentLessonId];
      setCompletedLessons(updated);
      localStorage.setItem("zerio_completed_lessons", JSON.stringify(updated));
    }
  };

  const handleResetProgress = () => {
    if (window.confirm("Are you sure you want to reset all course progress?")) {
      setCompletedLessons([]);
      localStorage.removeItem("zerio_completed_lessons");
      setCurrentLessonId(0);
      setIsSandboxSyncMode(true);
    }
  };

  const handleLoadExampleToSandbox = (exampleCode: string) => {
    setIsSandboxSyncMode(false);
    setPlaygroundCode(exampleCode);
    const playgroundEl = document.getElementById("playground-panel");
    if (playgroundEl) {
      playgroundEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNextLesson = () => {
    if (currentLessonId < 13) {
      setCurrentLessonId(currentLessonId + 1);
      setIsSandboxSyncMode(true);
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonId > 1) {
      setCurrentLessonId(currentLessonId - 1);
      setIsSandboxSyncMode(true);
    }
  };

  // Filter lessons based on search query
  const filteredLessons = lessons.filter(
    (l) =>
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const overallProgressPercentage = Math.round((completedLessons.length / lessons.length) * 100);

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-[#090d16] flex flex-col font-sans text-slate-100 antialiased selection:bg-indigo-500/40 selection:text-indigo-200">
      
      {/* Brand Header */}
      <header className="sticky top-0 z-40 bg-slate-950 border-b-3 border-slate-900 px-4 md:px-6 py-4 flex items-center justify-between shadow-[0_4px_20px_0_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-3">
          {/* Mobile Hamburger Menu */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-900 border-2 border-transparent hover:border-slate-800 rounded-lg transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Desktop Sidebar Toggle */}
          <button
            id="desktop-sidebar-toggle"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg border-2 border-slate-900 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            {sidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
          
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black tracking-tight text-white font-display">
              ZERIO
            </span>
            <div className="h-5 w-0.5 bg-slate-800 hidden sm:block"></div>
            <span className="text-xs font-extrabold font-display bg-indigo-600 border-2 border-slate-900 text-white px-3 py-1 rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] tracking-wide hidden sm:block">
              Tailwind CSS Fundamentals
            </span>
          </div>
        </div>

        {/* Glossary Nav Button */}
        <button
          onClick={() => setCurrentLessonId(14)}
          className={`text-[10px] font-bold font-display border-2 px-3 py-1.5 rounded transition-all cursor-pointer hidden sm:flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
            currentLessonId === 14
              ? "bg-indigo-600 border-slate-900 text-white"
              : "bg-slate-900 border-slate-900 text-slate-300 hover:bg-slate-800"
          }`}
        >
          <BookOpen size={10} />
          Glossary
        </button>

        {/* Progress Tracker Widget */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end text-right hidden sm:flex">
            <span className="text-[9px] font-mono tracking-widest uppercase text-slate-400 font-extrabold">Course Progress</span>
            <span className="text-xs font-black text-slate-200 font-display">
              {completedLessons.length} / {lessons.length} Lessons ({overallProgressPercentage}%)
            </span>
          </div>
          
          {/* Circular Progress Bar */}
          <div className="relative w-9 h-9 flex items-center justify-center bg-slate-950 rounded-full border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <svg className="w-7 h-7 transform -rotate-90">
              <circle
                cx="14"
                cy="14"
                r="11"
                className="stroke-slate-900"
                strokeWidth="2.5"
                fill="transparent"
              />
              <circle
                cx="14"
                cy="14"
                r="11"
                className="stroke-emerald-400 transition-all duration-500"
                strokeWidth="2.5"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 11}
                strokeDashoffset={2 * Math.PI * 11 * (1 - completedLessons.length / lessons.length)}
              />
            </svg>
            <span className="absolute text-[10px] font-black font-display text-white">
              {completedLessons.length}
            </span>
          </div>

          <button 
            id="btn-reset-progress"
            onClick={handleResetProgress}
            className="text-[10px] font-bold text-rose-300 font-display border-2 border-slate-900 px-3 py-1.5 bg-slate-900 hover:bg-rose-950/40 rounded transition-all cursor-pointer flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
            title="Reset Course Progress"
          >
            <RotateCcw size={10} strokeWidth={2.5} />
            Reset
          </button>
        </div>
      </header>

      {/* Main Sandbox Workspace Layout */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 relative">
        
        {/* Navigation Sidebar (Drawer on mobile, sticky on desktop) */}
        <aside
          id="sidebar-navigation"
          className={`absolute md:relative inset-y-0 left-0 w-72 border-r-3 bg-slate-950 border-slate-900 flex flex-col z-30 transition-all duration-300 ease-in-out md:translate-x-0 ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } ${
            sidebarCollapsed ? "md:w-0 md:border-r-0 md:overflow-hidden" : ""
          }`}
        >
          {/* Quick Filter Search Box */}
          <div className="p-4 border-b border-slate-900 shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-500" size={14} />
              <input
                id="sidebar-search-input"
                type="text"
                placeholder="Search lessons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border-2 border-slate-900 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-300 font-display placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Sidebar Navigation List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-850">

            {/* Home button */}
            <button
              id="sidebar-home"
              onClick={() => { handleSelectLesson(0); }}
              className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all border-2 cursor-pointer mb-2 ${
                currentLessonId === 0
                  ? "bg-indigo-600 border-slate-900 text-white shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] translate-x-[-1px] translate-y-[-1px]"
                  : "bg-slate-900/60 border-slate-950 hover:border-slate-800 hover:bg-slate-800/50 text-slate-300"
              }`}
            >
              <ArrowRight size={14} className={currentLessonId === 0 ? "text-indigo-200" : "text-slate-500"} />
              <span className="text-xs font-black font-display">Course Overview</span>
            </button>

            {searchQuery ? (
              /* Flat filtered list when searching */
              <>
                <div className="px-2 pb-1.5 text-[9px] font-mono uppercase tracking-widest text-slate-500 font-extrabold">
                  Search Results
                </div>
                {filteredLessons.map((lesson) => {
                  const isCurrent = lesson.id === currentLessonId;
                  const isCompleted = completedLessons.includes(lesson.id);
                  return (
                    <button
                      id={`sidebar-lesson-${lesson.id}`}
                      key={lesson.id}
                      onClick={() => handleSelectLesson(lesson.id)}
                      className={`w-full text-left p-3 rounded-xl flex items-start gap-3 transition-all border-2 cursor-pointer ${
                        isCurrent
                          ? "bg-indigo-600 border-slate-900 text-white shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] translate-x-[-1px] translate-y-[-1px]"
                          : "bg-slate-900/60 border-slate-950 hover:border-slate-800 hover:bg-slate-800/50 text-slate-300"
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isCompleted ? (
                          <CheckCircle size={15} className="text-emerald-400 fill-emerald-500/10" strokeWidth={2.5} />
                        ) : (
                          <div className={`w-3.5 h-3.5 rounded-full border ${isCurrent ? "border-indigo-200" : "border-slate-700"}`} />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className={`text-[9px] font-mono uppercase font-black tracking-widest leading-none mb-1.5 ${isCurrent ? "text-indigo-200" : "text-slate-500"}`}>
                          Lesson {lesson.id}
                        </div>
                        <div className="text-xs font-bold font-display leading-tight truncate">{lesson.title}</div>
                        <div className={`text-[10px] leading-tight mt-1 truncate ${isCurrent ? "text-indigo-100/80" : "text-slate-500"}`}>
                          {lesson.shortDescription}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </>
            ) : (
              /* Stage-grouped list when not searching */
              <div className="space-y-4">
                {STAGES.map((stage) => {
                  const stageLessons = stage.lessonIds
                    .map((id) => lessons.find((l) => l.id === id))
                    .filter(Boolean) as typeof lessons;
                  return (
                    <div key={stage.id}>
                      <div className="px-2 pb-1.5 pt-1 text-[9px] font-mono uppercase tracking-widest text-slate-500 font-extrabold">
                        {stage.label} — {stage.title}
                      </div>
                      <div className="space-y-1.5">
                        {stageLessons.map((lesson) => {
                          const isCurrent = lesson.id === currentLessonId;
                          const isCompleted = completedLessons.includes(lesson.id);
                          return (
                            <button
                              id={`sidebar-lesson-${lesson.id}`}
                              key={lesson.id}
                              onClick={() => handleSelectLesson(lesson.id)}
                              className={`w-full text-left p-3 rounded-xl flex items-start gap-3 transition-all border-2 cursor-pointer ${
                                isCurrent
                                  ? "bg-indigo-600 border-slate-900 text-white shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] translate-x-[-1px] translate-y-[-1px]"
                                  : "bg-slate-900/60 border-slate-950 hover:border-slate-800 hover:bg-slate-800/50 text-slate-300"
                              }`}
                            >
                              <div className="mt-0.5 shrink-0">
                                {isCompleted ? (
                                  <CheckCircle size={15} className="text-emerald-400 fill-emerald-500/10" strokeWidth={2.5} />
                                ) : (
                                  <div className={`w-3.5 h-3.5 rounded-full border ${isCurrent ? "border-indigo-200" : "border-slate-700"}`} />
                                )}
                              </div>
                              <div className="min-w-0">
                                <div className={`text-[9px] font-mono uppercase font-black tracking-widest leading-none mb-1.5 ${isCurrent ? "text-indigo-200" : "text-slate-500"}`}>
                                  Lesson {lesson.id}
                                </div>
                                <div className="text-xs font-bold font-display leading-tight truncate">{lesson.title}</div>
                                <div className={`text-[10px] leading-tight mt-1 truncate ${isCurrent ? "text-indigo-100/80" : "text-slate-500"}`}>
                                  {lesson.shortDescription}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Bottom special links */}
            <div className="pt-4 border-t border-slate-900 mt-4 px-1 space-y-2">
              <button
                id="sidebar-whats-next"
                onClick={() => handleSelectLesson(13)}
                className={`w-full text-left p-3.5 rounded-xl flex items-center gap-3 border-2 transition-all cursor-pointer ${
                  currentLessonId === 13
                    ? "bg-emerald-600 border-slate-900 text-white shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] translate-x-[-1px] translate-y-[-1px]"
                    : "bg-slate-900/40 border-slate-950 hover:border-slate-800 hover:bg-slate-850 text-slate-400"
                }`}
              >
                <Award size={16} className="text-emerald-400 shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-black font-display text-slate-100">What's Next?</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 font-mono">Zerio Dev Roadmap</div>
                </div>
                <ChevronRight size={14} className="ml-auto text-slate-500" />
              </button>

              <button
                id="sidebar-glossary"
                onClick={() => handleSelectLesson(14)}
                className={`w-full text-left p-3.5 rounded-xl flex items-center gap-3 border-2 transition-all cursor-pointer sm:hidden ${
                  currentLessonId === 14
                    ? "bg-indigo-600 border-slate-900 text-white shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] translate-x-[-1px] translate-y-[-1px]"
                    : "bg-slate-900/40 border-slate-950 hover:border-slate-800 hover:bg-slate-850 text-slate-400"
                }`}
              >
                <BookOpen size={16} className="text-indigo-400 shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-black font-display text-slate-100">Glossary</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 font-mono">Term reference</div>
                </div>
                <ChevronRight size={14} className="ml-auto text-slate-500" />
              </button>
            </div>
          </div>
        </aside>

        {/* Backdrop for mobile menu */}
        {mobileMenuOpen && (
          <div 
            onClick={() => setMobileMenuOpen(false)} 
            className="absolute inset-0 bg-slate-950/80 z-20 md:hidden backdrop-blur-sm"
          />
        )}

        {/* Content & Workspace */}
        <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-y-auto lg:overflow-hidden">
          
          {/* Left panel: Lesson Textbook Reader */}
          <main className="flex-1 bg-[#090d16] p-4 md:p-6 lg:overflow-y-auto divide-y-2 divide-slate-900/60 scrollbar-thin">
            
            {currentLessonId === 0 ? (
              /* Home Screen — Course Overview */
              <HomeScreen
                lessons={lessons}
                completedLessons={completedLessons}
                onSelectLesson={handleSelectLesson}
              />
            ) : currentLessonId === 14 ? (
              /* Glossary Page */
              <GlossaryPage />
            ) : currentLessonId === 13 ? (
              /* What's Next Curriculum Roadmap Panel */
              <div id="whats-next-panel" className="max-w-3xl mx-auto py-4 space-y-8 animate-fade-in">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center gap-1 bg-emerald-500 text-white border-2 border-slate-950 text-xs font-bold px-4 py-1.5 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase tracking-widest font-display">
                    <Award size={12} /> Course Complete!
                  </div>
                  <h1 className="text-3xl md:text-5xl font-black font-display text-white tracking-tight leading-tight mt-2">
                    {whatIsNextContent.title}
                  </h1>
                  <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
                    {whatIsNextContent.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
                  {whatIsNextContent.modules.map((mod, i) => {
                    const icons: { [key: string]: any } = {
                      Code: <Code className="text-indigo-400 animate-pulse" />,
                      Globe: <Globe className="text-sky-400" />,
                      Layers: <Layers className="text-amber-400" />,
                      Database: <Database className="text-emerald-400" />
                    };
                    
                    return (
                      <div 
                        key={i} 
                        className="bg-slate-950 border-2 border-slate-900 p-5 rounded-xl space-y-3.5 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.2)] hover:border-indigo-500/40 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-900 rounded-lg border-2 border-slate-950">
                            {icons[mod.icon] || <Code />}
                          </div>
                          <h3 className="font-extrabold font-display text-slate-100 text-sm">{mod.title}</h3>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {mod.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {mod.skills.map((s, idx) => (
                            <span 
                              key={idx} 
                              className="text-[10px] font-mono bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-400 font-bold"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Final congrats card */}
                <div className="bg-slate-950 border-2 border-indigo-500/30 p-6 rounded-2xl text-center space-y-4 shadow-[4px_4px_0px_0px_rgba(99,102,241,0.15)]">
                  <h3 className="text-xl font-extrabold font-display text-indigo-300">Ready to build MediCore HMS?</h3>
                  <p className="text-xs md:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                    You've equipped yourself with the power of modern utility styling. Keep experimenting with layouts, spacing, and grids to craft production-ready hospital interfaces!
                  </p>
                  <button
                    onClick={() => handleSelectLesson(1)}
                    className="inline-flex items-center gap-2 bg-indigo-600 border-2 border-slate-950 hover:bg-indigo-500 text-white font-black text-xs px-5 py-3 rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <RotateCcw size={14} />
                    Review Tailwind Basics
                  </button>
                </div>
              </div>
            ) : (
              /* Active Lesson Material Panel */
              <div id="lesson-material-panel" className="max-w-3xl mx-auto space-y-6 pb-12">
                
                {/* Lesson Header */}
                <div className="space-y-3.5 py-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-white bg-indigo-600 border-2 border-slate-950 px-3 py-1 rounded shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                      Lesson {activeLesson.id} of {lessons.length}
                    </span>
                    {completedLessons.includes(activeLesson.id) && (
                      <span className="flex items-center gap-1.5 text-[10px] text-white font-bold bg-emerald-500 border-2 border-slate-950 px-3 py-1 rounded shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                        <Check size={11} strokeWidth={3} /> Completed
                      </span>
                    )}
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-black font-display text-white tracking-tight leading-tight">
                    {activeLesson.title}
                  </h1>
                  
                  <p className="text-sm md:text-base text-slate-300 leading-relaxed font-semibold">
                    {activeLesson.shortDescription}
                  </p>
                </div>

                {/* Objectives Checklist Box */}
                <div className="bg-slate-950 border-2 border-slate-900 p-5 rounded-xl space-y-3 shadow-[4px_4px_0px_0px_rgba(99,102,241,0.2)]">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-indigo-400 font-extrabold block">What you'll learn:</span>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm text-slate-200">
                    {activeLesson.learningObjectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span className="font-medium">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Intuitive Analogy Block */}
                {activeLesson.analogyTitle && (
                  <div className="border-2 border-indigo-500/30 bg-slate-950 p-5 rounded-xl space-y-2 shadow-[4px_4px_0px_0px_rgba(99,102,241,0.1)]">
                    <div className="flex items-center gap-2 text-indigo-400">
                      <BookOpen size={16} className="text-indigo-400" />
                      <h4 className="text-xs font-bold uppercase tracking-wider font-display">{activeLesson.analogyTitle}</h4>
                    </div>
                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed italic">
                      "{activeLesson.analogyText}"
                    </p>
                  </div>
                )}

                {/* Core Concept Markdown Content */}
                <div className="space-y-4 text-xs md:text-sm text-slate-300 leading-relaxed whitespace-pre-line py-4">
                  <h3 className="text-sm font-extrabold text-white border-b-2 border-slate-900 pb-2 uppercase tracking-wider font-display flex items-center gap-2">
                    <Lightbulb size={16} className="text-amber-400" /> Concept Briefing
                  </h3>
                  <div className="bg-slate-950/20 p-4 border border-slate-900 rounded-xl leading-relaxed font-sans text-slate-300 space-y-3">
                    {renderMarkdown(activeLesson.conceptText)}
                  </div>
                </div>

                {/* Interactive Visual Demo Section */}
                <LessonDemo lessonId={currentLessonId} />

                {/* Common Mistakes */}
                {activeLesson.commonMistakes?.length > 0 && (
                  <div className="bg-amber-950/30 border-2 border-amber-800/40 rounded-xl p-5 space-y-3">
                    <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider font-display flex items-center gap-2">
                      ⚠️ Common Mistakes
                    </h3>
                    <ul className="space-y-2">
                      {activeLesson.commonMistakes.map((m, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-amber-100/80 leading-relaxed">
                          <span className="text-amber-500 shrink-0 mt-0.5">•</span>
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Hands-on Interactive Examples */}
                <div className="space-y-6 pt-4">
                  <h3 className="text-sm font-extrabold text-white border-b-2 border-slate-900 pb-2 uppercase tracking-wider font-display">Real-world Examples (MediCore HMS)</h3>
                  
                  {activeLesson.examples.map((ex, index) => (
                    <div key={index} className="bg-slate-950 border-2 border-slate-900 rounded-xl overflow-hidden space-y-4 p-5 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                      
                      {/* Example Title and Loading button */}
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <h4 className="text-xs font-extrabold text-indigo-300 font-display flex items-center gap-2">
                          <span className="inline-block w-2 h-2 rounded-full bg-indigo-400"></span>
                          {ex.title}
                        </h4>
                        <button
                          onClick={() => handleLoadExampleToSandbox(ex.code)}
                          className="text-[10px] font-bold bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 border-2 border-slate-950 rounded shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Play size={8} /> Load in Sandbox
                        </button>
                      </div>

                      {/* HTML Code Box */}
                      <pre className="p-4 bg-slate-900 border-2 border-slate-950 rounded-lg text-[10px] md:text-xs font-mono text-slate-300 overflow-x-auto shadow-inner">
                        <code>{ex.code}</code>
                      </pre>

                      {/* Code Analysis Bullet Points */}
                      <div className="space-y-2.5 pt-3 border-t-2 border-slate-900/60">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 font-extrabold block">Tailwind Blueprint Analysis:</span>
                        {ex.explanation.map((line, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                            <span className="text-indigo-400 mt-1 shrink-0 text-sm">➔</span>
                            <p className="leading-relaxed">
                              <span className="font-mono text-white bg-slate-900 px-2 py-0.5 rounded text-[11px] border border-slate-900 font-bold mr-1.5">{line.split(" ")[0]}</span>
                              {line.split(" ").slice(1).join(" ")}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Playground instructions prompting */}
                <div className="bg-slate-950 border-2 border-slate-900 p-5 rounded-xl space-y-2.5 shadow-[4px_4px_0px_0px_rgba(99,102,241,0.15)]">
                  <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5 font-display">
                    <Sparkles size={13} className="text-indigo-400 animate-pulse" /> Playground Sandbox Prompt
                  </h4>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
                    {activeLesson.playgroundPrompt}
                  </p>
                </div>

                {/* Bottom navigation buttons */}
                <div className="pt-8 flex items-center justify-between border-t-2 border-slate-900 mt-6">
                  <button
                    id="btn-prev-lesson"
                    onClick={handlePrevLesson}
                    disabled={currentLessonId === 1}
                    className="flex items-center gap-1.5 px-4 py-2.5 text-xs bg-slate-950 border-2 border-slate-900 hover:bg-slate-900 rounded-lg text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer font-bold font-display shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px]"
                  >
                    <ChevronLeft size={14} /> Prev Lesson
                  </button>

                  <div className="flex gap-3">
                    {!completedLessons.includes(activeLesson.id) && (
                      <button
                        id="btn-inline-complete"
                        onClick={handleMarkComplete}
                        className="flex items-center gap-1 bg-emerald-600 border-2 border-slate-950 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] transition-all cursor-pointer"
                      >
                        <Check size={12} strokeWidth={3} />
                        Mark Completed
                      </button>
                    )}

                    <button
                      id="btn-next-lesson"
                      onClick={handleNextLesson}
                      className="flex items-center gap-1.5 px-5 py-2.5 text-xs bg-indigo-600 border-2 border-slate-950 hover:bg-indigo-500 rounded-lg text-white transition-all cursor-pointer font-bold font-display shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                    >
                      Next Lesson <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

              </div>
            )}
          </main>

          {/* Right panel: Live Code Playground Viewport */}
          {currentLessonId !== 13 && (
            <div className="w-full lg:w-[45%] shrink-0 h-[600px] lg:h-auto border-t-3 lg:border-t-0 lg:border-l-3 border-slate-900">
              <Playground
                code={playgroundCode}
                onChange={setPlaygroundCode}
                challenge={activeLesson.challenge}
                onMarkComplete={handleMarkComplete}
                isLessonCompleted={completedLessons.includes(activeLesson.id)}
              />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
