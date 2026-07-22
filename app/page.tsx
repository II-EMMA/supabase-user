import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import LoginButton from "@/components/LoginButton";

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md p-8 bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl shadow-2xl relative z-10 text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-6">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          {user ? "Authenticated" : "Developer Jobs Platform"}
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
          {user ? "Welcome Back!" : "Find Your Next Tech Role"}
        </h1>
        <p className="text-sm text-slate-400 mb-8">
          {user
            ? `Logged in as ${user.email}`
            : "Sign in with GitHub to explore tech jobs matching your skills"}
        </p>

        {user ? (
          <div className="space-y-3">
            <Link
              href="/dashboard"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 active:scale-[0.98] transition-all shadow-lg shadow-indigo-600/20 text-sm"
            >
              <span>Go to Job Search</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>

            <form action="/api/auth/signout" method="POST">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 font-medium transition-all text-sm border border-slate-700/50"
              >
                Sign Out
              </button>
            </form>
          </div>
        ) : (
          <LoginButton />
        )}

        <p className="mt-6 text-xs text-slate-500">
          Fast • Safe • Direct GitHub Integration
        </p>
      </div>
    </main>
  );
}
