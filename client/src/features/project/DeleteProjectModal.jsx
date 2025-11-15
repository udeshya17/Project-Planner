import React, { useState } from "react";
import Spinner from "../../components/loader/Spinner";

function DeleteProjectModal({ projectTitle, onConfirm, onClose }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    if (isDeleting) return;
    try {
      setIsDeleting(true);
      await onConfirm();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm">
      <div className="glass-panel w-full max-w-sm rounded-2xl p-5 shadow-2xl">
        <header className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              Delete project
            </h2>
            <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-400">
              This will permanently delete{" "}
              <span className="font-semibold">&quot;{projectTitle}&quot;</span>{" "}
              and all of its tasks. This action cannot be undone.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close delete confirmation"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-sm text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </header>
        <div className="mt-4 flex justify-end gap-2 text-xs">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-md px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-70 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 rounded-md bg-red-500 px-3 py-2 text-xs font-medium text-white hover:bg-red-400 disabled:cursor-not-allowed disabled:bg-red-500/70"
          >
            {isDeleting && <Spinner />}
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProjectModal;
