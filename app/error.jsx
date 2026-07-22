"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("App Error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
        <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto text-xl font-bold">
          !
        </div>
        <h2 className="text-xl font-bold text-white">Something went wrong</h2>
        <p className="text-xs text-slate-400">
          An unexpected system error occurred. Don&apos;t worry, your data is
          safe.
        </p>
        <button
          onClick={() => reset()}
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all text-sm"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
