import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
        <h1 className="text-6xl font-extrabold text-indigo-500">404</h1>
        <h2 className="text-xl font-bold text-white">Page Not Found</h2>
        <p className="text-xs text-slate-400">
          The page or job listing you are looking for does not exist or has been
          moved.
        </p>
        <Link
          href="/dashboard"
          className="inline-block w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all text-sm"
        >
          Return to Dashboard
        </Link>
      </div>
    </main>
  );
}
