import React, { useState } from "react";
import { useProjects } from "../../hooks/useProjects";
import Spinner from "../../components/loader/Spinner";
import ProjectCard from "../../components/cards/ProjectCard";
import CreateProjectModal from "../project/CreateProjectModal";
import { createProject } from "../../api/project.api";
import { useUI } from "../../context/UIContext";

function Dashboard() {
  const { projects, setProjects, isLoading } = useProjects();
  const { addToast } = useUI();
  const [showCreate, setShowCreate] = useState(false);

  const handleCreateProject = async (payload) => {
    const created = await createProject(payload);
    setProjects((prev) => [created, ...prev]);
    addToast({
      type: "success",
      title: "Project created",
      message: created.title,
    });
  };

  const hasProjects = projects.length > 0;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Your workspace
          </h1>
          <p className="mt-1 max-w-xl text-xs text-slate-500 dark:text-slate-400">
            Group work into projects, then break it down into small tasks you
            can drag across the board as they move forward.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center gap-2 rounded-md bg-brand-500 px-3 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-brand-400"
        >
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white/10 text-[11px] font-semibold">
            +
          </span>
          <span>New project</span>
        </button>
      </header>

      {isLoading ? (
        <div className="flex h-40 items-center justify-center">
          <Spinner size="lg" />
        </div>
      ) : !hasProjects ? (
        <div className="glass-panel flex flex-col items-center justify-center gap-3 px-6 py-12 text-center">
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
            Start with your first project
          </p>
          <p className="max-w-xs text-xs text-slate-500 dark:text-slate-400">
            Create a project for a feature, a client, or a side idea. Once
            it&apos;s created, you can add tasks and collaborators on the next
            screen.
          </p>
          <button
            type="button"
            onClick={() => setShowCreate(true)}
            className="mt-3 rounded-md bg-brand-500 px-4 py-2 text-xs font-medium text-white hover:bg-brand-400"
          >
            Create project
          </button>
        </div>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </section>
      )}

      {showCreate && (
        <CreateProjectModal
          onClose={() => setShowCreate(false)}
          onCreate={handleCreateProject}
        />
      )}
    </div>
  );
}

export default Dashboard;
