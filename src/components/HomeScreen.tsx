import { CheckCircle, ChevronRight, ArrowRight } from "lucide-react";
import { STAGES, Stage } from "../data/stages";
import { Lesson } from "../types";

interface HomeScreenProps {
  lessons: Lesson[];
  completedLessons: number[];
  onSelectLesson: (id: number) => void;
}

function StageCard({
  stage,
  lessons,
  completedLessons,
  onSelectLesson,
  index,
}: {
  stage: Stage;
  lessons: Lesson[];
  completedLessons: number[];
  onSelectLesson: (id: number) => void;
  index: number;
}) {
  const stageLessons = stage.lessonIds
    .map((id) => lessons.find((l) => l.id === id))
    .filter(Boolean) as Lesson[];

  const completedCount = stageLessons.filter((l) =>
    completedLessons.includes(l.id)
  ).length;
  const totalCount = stageLessons.length;
  const isComplete = completedCount === totalCount;
  const firstIncomplete = stageLessons.find(
    (l) => !completedLessons.includes(l.id)
  );
  const ctaTarget = firstIncomplete ?? stageLessons[0];

  const stageColors = [
    { badge: "bg-indigo-600 text-white", bar: "bg-indigo-500", accent: "border-indigo-500/30" },
    { badge: "bg-sky-600 text-white",    bar: "bg-sky-500",    accent: "border-sky-500/30" },
    { badge: "bg-violet-600 text-white", bar: "bg-violet-500", accent: "border-violet-500/30" },
    { badge: "bg-emerald-600 text-white",bar: "bg-emerald-500",accent: "border-emerald-500/30" },
  ];
  const color = stageColors[index] ?? stageColors[0];

  return (
    <div
      className={`bg-slate-900/60 border-2 ${isComplete ? "border-emerald-500/30" : color.accent} rounded-xl overflow-hidden`}
    >
      {/* Stage header */}
      <div className="p-5 border-b-2 border-slate-900">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`text-[9px] font-black font-display uppercase tracking-widest px-2.5 py-1 rounded-full border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                  isComplete ? "bg-emerald-500 text-white" : color.badge
                }`}
              >
                {stage.label}
              </span>
              {isComplete && (
                <span className="text-[9px] font-bold text-emerald-400 font-mono uppercase tracking-widest">
                  Complete ✓
                </span>
              )}
            </div>
            <h2 className="text-lg font-black font-display text-white tracking-tight">
              {stage.title}
            </h2>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              {stage.description}
            </p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-xs font-bold font-display text-slate-300">
              {completedCount} / {totalCount}
            </div>
            <div className="text-[9px] text-slate-500 font-mono">lessons done</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${isComplete ? "bg-emerald-500" : color.bar}`}
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>
      </div>

      {/* Lesson rows */}
      <div className="divide-y divide-slate-900/60">
        {stageLessons.map((lesson) => {
          const isDone = completedLessons.includes(lesson.id);
          return (
            <button
              key={lesson.id}
              onClick={() => onSelectLesson(lesson.id)}
              className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-slate-800/60 transition-colors group cursor-pointer"
            >
              <div className="shrink-0">
                {isDone ? (
                  <CheckCircle size={14} className="text-emerald-400 fill-emerald-500/10" strokeWidth={2.5} />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border border-slate-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-mono uppercase text-slate-500 font-bold">
                  Lesson {lesson.id}
                </span>
                <div className={`text-xs font-bold font-display truncate ${isDone ? "text-slate-400" : "text-slate-200"}`}>
                  {lesson.title}
                </div>
              </div>
              <ChevronRight
                size={14}
                className="text-slate-600 group-hover:text-slate-300 transition-colors shrink-0"
              />
            </button>
          );
        })}
      </div>

      {/* CTA */}
      <div className="p-4 border-t-2 border-slate-900">
        <button
          onClick={() => onSelectLesson(ctaTarget.id)}
          className={`flex items-center gap-2 text-xs font-black font-display px-4 py-2.5 rounded-lg border-2 border-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer ${
            isComplete
              ? "bg-emerald-600 hover:bg-emerald-500 text-white"
              : color.badge
          }`}
        >
          <ArrowRight size={13} />
          {isComplete ? "Review Stage" : firstIncomplete ? "Continue" : "Start Stage"}
        </button>
      </div>
    </div>
  );
}

export default function HomeScreen({
  lessons,
  completedLessons,
  onSelectLesson,
}: HomeScreenProps) {
  const totalCompleted = completedLessons.filter((id) => id >= 1 && id <= 12).length;
  const totalLessons = 12;
  const overallPct = Math.round((totalCompleted / totalLessons) * 100);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 md:px-6 space-y-6">
      {/* Welcome header */}
      <div className="space-y-4">
        <div>
          <div className="text-[9px] font-mono uppercase tracking-widest text-slate-500 font-extrabold mb-1">
            MediCore HMS · Tailwind CSS Course
          </div>
          <h1 className="text-3xl md:text-4xl font-black font-display text-white tracking-tight leading-tight">
            Your Learning Path
          </h1>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            Four stages from zero Tailwind knowledge to a fully styled hospital management system. Complete each stage before moving to the next.
          </p>
        </div>

        {/* Overall progress */}
        <div className="bg-slate-900/60 border-2 border-slate-900 rounded-xl p-4 flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-300">
                Overall Progress
              </span>
              <span className="text-xs font-black font-display text-white">
                {totalCompleted} / {totalLessons} lessons
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${overallPct}%` }}
              />
            </div>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-2xl font-black font-display text-white">{overallPct}%</div>
            <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">complete</div>
          </div>
        </div>
      </div>

      {/* Stage cards */}
      <div className="space-y-4">
        {STAGES.map((stage, i) => (
          <StageCard
            key={stage.id}
            stage={stage}
            lessons={lessons}
            completedLessons={completedLessons}
            onSelectLesson={onSelectLesson}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
