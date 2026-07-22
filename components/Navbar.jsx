import Link from "next/link";

export default function Navbar({ user }) {
  const userName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.user_name ||
    user?.email;

  return (
    <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/dashboard"
          className="text-xl font-bold text-white flex items-center gap-2"
        >
          <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-sm font-black">
            JS
          </span>
          JobSearch<span className="text-indigo-400">Hub</span>
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-400 hidden sm:inline-block">
            Logged in as: <strong className="text-slate-200">{userName}</strong>
          </span>
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="text-xs py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all border border-slate-700"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
