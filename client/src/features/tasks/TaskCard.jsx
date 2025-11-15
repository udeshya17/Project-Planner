import React from "react";

function TaskCard({ task, onDelete }) {
  return (
    <div className="group rounded-lg border border-slate-200 bg-white p-3 text-xs shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
      <p className="font-medium text-slate-900 dark:text-slate-50">
        {task.title}
      </p>
      {task.description && (
        <p className="mt-1 line-clamp-2 text-[11px] text-slate-600 dark:text-slate-400">
          {task.description}
        </p>
      )}
      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-500">
        <span>Task</span>
        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(task)}
            className="rounded px-1.5 py-0.5 text-[10px] text-slate-500 opacity-0 transition group-hover:opacity-100 hover:bg-slate-100 hover:text-red-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-red-300"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
