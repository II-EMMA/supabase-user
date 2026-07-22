"use client";

import { useState, useEffect, useCallback } from "react";
import JobCard from "@/components/JobCard";

const SKILL_CATEGORIES = [
  {
    category: "Front-End",
    skills: ["React", "Next.js", "Vue", "Tailwind", "TypeScript", "JavaScript"],
  },
  {
    category: "Back-End",
    skills: ["Node", "Python", "API", "SQL", "DevOps"],
  },
  {
    category: "Design & Product",
    skills: ["Design", "UI", "UX", "Product"],
  },
];

export default function JobSearchClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState(["React"]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Dynamic placeholder ("holdplace") based on selected tech skills
  const holdplace =
    selectedTech.length > 0
      ? `Searching in ${selectedTech.join(", ")}... or type job title`
      : "Search job title, skill, or keyword...";

  // Toggle skill filter selection
  const toggleTech = (skill) => {
    setSelectedTech((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  // Fetch real public jobs
  const fetchLiveJobs = useCallback(async () => {
    setLoading(true);

    const query = [searchTerm, ...selectedTech].filter(Boolean).join(" ");

    try {
      const res = await fetch(
        `/api/jobs/search?q=${encodeURIComponent(query)}`,
      );
      const data = await res.json();
      if (data.jobs) {
        setJobs(data.jobs);
      }
    } catch (err) {
      console.error("Failed to load public jobs", err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedTech]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLiveJobs();
    }, 400);

    return () => clearTimeout(timer);
  }, [fetchLiveJobs]);

  return (
    /* Flex container on mobile to order items cleanly; converts back to standard Grid on lg+ */
    <div className="flex flex-col lg:grid lg:grid-cols-4 gap-8">
      {/* 
        Search Bar: 
        - Under lg: order-1 (appears at the top above skill filters)
        - On lg+: order-none (placed inside main column, original appearance)
      */}
      <div className="order-1 lg:hidden p-3 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl">
        <input
          type="text"
          placeholder={holdplace}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* 
        Sidebar Filter:
        - Under lg: order-2 (sits under the mobile search bar)
        - On lg+: original sidebar positioning
      */}
      <aside className="order-2 lg:order-none lg:col-span-1 space-y-6">
        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-3xl backdrop-blur-xl">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">
              Filter Skills
            </h3>
            {selectedTech.length > 0 && (
              <button
                onClick={() => setSelectedTech([])}
                className="text-[11px] text-indigo-400 hover:underline"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="space-y-5">
            {SKILL_CATEGORIES.map((cat) => (
              <div key={cat.category} className="space-y-2">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {cat.category}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => {
                    const isSelected = selectedTech.includes(skill);
                    return (
                      <button
                        key={skill}
                        onClick={() => toggleTech(skill)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all active:scale-95 ${
                          isSelected
                            ? "bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/30"
                            : "bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                        }`}
                      >
                        {isSelected ? "✓ " : "+ "}
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* 
        Main Results Section:
        - Under lg: order-3 (results at bottom)
        - On lg+: original 3-column span layout
      */}
      <section className="order-3 lg:order-none lg:col-span-3 space-y-6">
        {/* Search Input Bar (Visible ONLY on lg screens and above - original position) */}
        <div className="hidden lg:block p-3 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl">
          <input
            type="text"
            placeholder={holdplace}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Live Status Bar */}
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>
            {loading ? (
              <span className="text-indigo-400 animate-pulse">
                Fetching live public listings...
              </span>
            ) : (
              <>
                Showing <strong className="text-white">{jobs.length}</strong>{" "}
                live openings
              </>
            )}
          </span>
        </div>

        {/* Job Cards List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-16 bg-slate-900/30 border border-slate-800/80 rounded-3xl text-slate-400 text-sm">
              Loading open tech positions...
            </div>
          ) : jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard key={job.id} job={job} selectedTech={selectedTech} />
            ))
          ) : (
            <div className="text-center py-16 bg-slate-900/30 border border-slate-800/80 rounded-3xl text-slate-400 text-sm">
              No jobs found matching your filters.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
