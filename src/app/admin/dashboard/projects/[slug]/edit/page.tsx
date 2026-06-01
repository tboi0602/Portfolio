import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/data";
import { ProjectForm } from "@/components/admin/project-form";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">Edit Project</h1>
        <p className="text-sm text-zinc-500 mt-1">{project.title}</p>
      </div>
      <ProjectForm initial={project} />
    </div>
  );
}
