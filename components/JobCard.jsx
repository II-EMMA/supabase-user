"use client";

export default function JobCard({ job, selectedTech = [] }) {
  return (
    <div className="p-6 bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 group">
      <div className="space-y-2">
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
            {job.title}
          </h2>
          <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
            {job.type}
          </span>
        </div>

        <p className="text-xs text-slate-400 flex items-center gap-2">
          <span className="font-medium text-slate-200">{job.company}</span>
          <span>•</span>
          <span className="text-slate-400">{job.location}</span>
        </p>

        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {job.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-2">
          {job.tags.map((tag, idx) => {
            const isMatch = selectedTech.some(
              (t) => t.toLowerCase() === tag.toLowerCase(),
            );
            return (
              <span
                key={idx}
                className={`text-[11px] px-2.5 py-0.5 rounded-md border ${
                  isMatch
                    ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-300 font-medium"
                    : "bg-slate-800/80 border-slate-700/50 text-slate-400"
                }`}
              >
                {tag}
              </span>
            );
          })}
        </div>
      </div>

      <a
        href={job.redirectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all active:scale-95 shadow-md shadow-indigo-600/20 self-start md:self-center text-center"
      >
        Apply Now ↗
      </a>
    </div>
  );
}
