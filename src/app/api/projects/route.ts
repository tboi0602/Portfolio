import { NextResponse } from "next/server";
import { getProjects } from "@/lib/data";
import { saveProjects } from "@/lib/admin-db";
import { checkAuth } from "@/lib/auth";

export async function GET() {
  const projects = getProjects();
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const projects = getProjects();

  const slug = body.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const newProject = {
    slug,
    title: body.title,
    tag: body.tag || "",
    description: body.description || "",
    longDescription: body.longDescription || "",
    status: body.status || "Development",
    problem: body.problem || "",
    solution: body.solution || "",
    techStack: body.techStack || [],
    challenges: body.challenges || [],
    lessons: body.lessons || [],
    links: {
      live: body.links?.live || "",
      github: body.links?.github || "",
    },
    featured: body.featured ?? true,
  };

  if (projects.some((p) => p.slug === slug)) {
    return NextResponse.json({ error: "Project with this title already exists" }, { status: 409 });
  }

  await saveProjects([...projects, newProject]);
  return NextResponse.json(newProject, { status: 201 });
}
