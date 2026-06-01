import { ProjectForm } from "@/components/admin/project-form";

export default function NewProjectPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">New Project</h1>
        <p className="text-sm text-zinc-500 mt-1">Add a new project to your portfolio</p>
      </div>
      <ProjectForm />
    </div>
  );
}
