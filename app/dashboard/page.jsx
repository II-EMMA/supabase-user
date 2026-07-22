import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import JobSearchClient from "@/components/JobSearchClient";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  // Fetch all jobs from Supabase database
  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });

  // Fallback demo jobs if database is currently empty
  const defaultJobs = jobs?.length
    ? jobs
    : [
        {
          id: "1",
          title: "Frontend Developer (Next.js)",
          company: "TechCorp",
          location: "Remote",
          type: "Full-time",
          tags: ["React", "Next.js", "Tailwind", "TypeScript"],
          description:
            "Building high-performance modern web apps using Next.js App Router and Tailwind CSS.",
        },
        {
          id: "2",
          title: "Full Stack Engineer",
          company: "StartupX",
          location: "Cairo, Egypt (Hybrid)",
          type: "Full-time",
          tags: ["React", "Node.js", "Supabase", "PostgreSQL"],
          description:
            "Design and deploy scalable APIs and responsive real-time frontends.",
        },
        {
          id: "3",
          title: "UI Engineer & Design System",
          company: "DesignHub",
          location: "Remote",
          type: "Contract",
          tags: ["Tailwind", "React", "Figma"],
          description:
            "Craft beautiful accessible UI components and maintain our design systems.",
        },
      ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar user={user} />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <JobSearchClient initialJobs={defaultJobs} />
      </main>
    </div>
  );
}
