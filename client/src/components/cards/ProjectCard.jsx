import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProjectDetails } from "../../api/project.api";
import { useUI } from "../../context/UIContext";

function ProjectCard({ project }) {
  const { addToast } = useUI();
  const [stats, setStats] = useState(() => {
    const completed = project.completedTasks || 0;
    const total = project.totalTasks || 0;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { completed, total, percentage };
  });

  useEffect(() => {
    let ignore = false;

    async function loadStats() {
      try {
        const data = await fetchProjectDetails(project._id);
        const tasks = data.tasks || [];
        const total = tasks.length;
        const completed = tasks.filter((t) => t.status === "completed").length;
        const percentage =
          total === 0 ? 0 : Math.round((completed / total) * 100);

        if (!ignore) {
          setStats({ completed, total, percentage });
        }
      } catch (err) {
        addToast({
          type: "error",
          title: "Could not load project progress",
          message: err?.response?.data?.message || err.message,
        });
      }
    }

    loadStats();

    return () => {
      ignore = true;
    };
  }, [project._id, addToast]);

  const { completed, total, percentage } = stats;

  return (
    <Link
      to={`/projects/${project._id}`}
      className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-brand-400/70 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60 dark:hover:bg-slate-900"
    >
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          Project
        </p>
        <h3 className="text-sm font-semibold text-slate-900 group-hover:text-brand-700 dark:text-slate-50 dark:group-hover:text-brand-50">
          {project.title}
        </h3>
        {project.description && (
          <p className="text-xs text-slate-600 line-clamp-2 dark:text-slate-400">
            {project.description}
          </p>
        )}
      </div>
      <div className="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-300">
        <div className="flex items-center justify-between">
          <span className="text-slate-500 dark:text-slate-400">
            {completed} of {total} tasks
          </span>
          <span className="font-semibold text-brand-600 dark:text-brand-300">
            {percentage}%
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-500 transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;
