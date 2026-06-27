import { useState } from "react";
import { Search } from "lucide-react";
import { GLOSSARY, GlossaryTerm } from "../data/glossary";

function TermCard({ term }: { term: GlossaryTerm }) {
  return (
    <div className="bg-slate-900/60 border-2 border-slate-900 rounded-xl p-4 space-y-2">
      <div className="flex items-start gap-3 flex-wrap">
        <span className="text-sm font-black font-display text-white">{term.term}</span>
        {term.example && (
          <code className="text-[10px] font-mono bg-slate-800 text-amber-300 px-2 py-0.5 rounded border border-slate-700 leading-relaxed">
            {term.example}
          </code>
        )}
      </div>
      <p className="text-xs text-slate-300 leading-relaxed">{term.definition}</p>
    </div>
  );
}

export default function GlossaryPage() {
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();

  const filtered = query
    ? GLOSSARY.filter(
        (t) =>
          t.term.toLowerCase().includes(query) ||
          t.definition.toLowerCase().includes(query)
      )
    : null;

  // Group by first letter when not searching
  const grouped = new Map<string, GlossaryTerm[]>();
  if (!filtered) {
    for (const term of GLOSSARY) {
      const letter = term.term[0].toUpperCase();
      if (!grouped.has(letter)) grouped.set(letter, []);
      grouped.get(letter)!.push(term);
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 md:px-6 space-y-6">
      {/* Header */}
      <div>
        <div className="text-[9px] font-mono uppercase tracking-widest text-slate-500 font-extrabold mb-1">
          Reference
        </div>
        <h1 className="text-3xl md:text-4xl font-black font-display text-white tracking-tight leading-tight">
          Tailwind Glossary
        </h1>
        <p className="text-sm text-slate-400 mt-2 leading-relaxed">
          Plain-English definitions for every CSS and Tailwind concept used in this course.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-3 text-slate-500" size={14} />
        <input
          type="text"
          placeholder="Search terms and definitions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-900 border-2 border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
        />
      </div>

      {/* Results */}
      {filtered ? (
        filtered.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-8">
            No terms match &ldquo;{search}&rdquo;
          </p>
        ) : (
          <div className="space-y-3">
            {filtered.map((term) => (
              <TermCard key={term.term} term={term} />
            ))}
          </div>
        )
      ) : (
        <div className="space-y-8">
          {[...grouped.entries()].map(([letter, terms]) => (
            <div key={letter}>
              <div className="text-[10px] font-black font-display uppercase tracking-widest text-indigo-400 border-b-2 border-slate-900 pb-2 mb-3">
                {letter}
              </div>
              <div className="space-y-3">
                {terms.map((term) => (
                  <TermCard key={term.term} term={term} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
