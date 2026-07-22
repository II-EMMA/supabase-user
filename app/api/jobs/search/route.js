import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").toLowerCase().trim();

  try {
    // Public jobs API - No authentication / No API key required
    const res = await fetch("https://remoteok.com/api", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
      next: { revalidate: 600 }, // Cache for 10 minutes
    });

    if (!res.ok) {
      throw new Error(`Public API returned status ${res.status}`);
    }

    const rawData = await res.json();

    // The first item in RemoteOK response is metadata, so filter it out
    const listings = Array.isArray(rawData)
      ? rawData.filter((item) => item.id && item.position)
      : [];

    // Filter jobs based on search terms / skills selected
    const searchTerms = q.split(" ").filter(Boolean);

    const filtered = listings.filter((item) => {
      if (searchTerms.length === 0) return true;

      const fullContent = `${item.position} ${item.company} ${
        item.description || ""
      } ${(item.tags || []).join(" ")}`.toLowerCase();

      // Check if job matches any of the query keywords
      return searchTerms.some((term) => fullContent.includes(term));
    });

    // Format fields to match your frontend components
    const formattedJobs = filtered.slice(0, 25).map((item) => {
      const skills = Array.isArray(item.tags)
        ? item.tags.slice(0, 5)
        : ["Tech", "Engineering"];

      return {
        id: item.id || item.slug,
        title: item.position || "Software Developer",
        company: item.company || "Tech Company",
        location: item.location || "Remote",
        type: "Full-time",
        description: item.description
          ? item.description.replace(/<[^>]*>?/gm, "").substring(0, 180) + "..."
          : "No detailed description provided.",
        tags: skills,
        redirectUrl: item.url || item.apply_url || "#",
      };
    });

    return NextResponse.json({
      jobs: formattedJobs,
      count: formattedJobs.length,
    });
  } catch (error) {
    console.error("Fetch jobs error:", error);
    return NextResponse.json(
      { error: "Failed to fetch live public jobs" },
      { status: 500 },
    );
  }
}
