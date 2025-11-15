import React, { useState } from "react";
import TextInput from "../../components/forms/TextInput";
import Spinner from "../../components/loader/Spinner";

function AddTaskModal({ onClose, onCreate }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "todo",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!form.title.trim()) nextErrors.title = "Title is required";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      await onCreate(form);
      onClose();
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm">
      <div className="glass-panel w-full max-w-md rounded-2xl p-5 shadow-2xl">
        <header className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            Create task
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-sm text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </header>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInput
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Create marketing materials"
            error={errors.title}
          />
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
            <span>Description</span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500"
              placeholder="Optional context for this task"
            />
          </label>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
            <span>Status</span>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              <option value="todo">To do</option>
              <option value="in_progress">In progress</option>
              <option value="completed">Completed</option>
            </select>
          </label>
          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-md bg-brand-500 px-3 py-2 text-xs font-medium text-white hover:bg-brand-400 disabled:cursor-not-allowed disabled:bg-brand-500/70"
            >
              {isSubmitting && <Spinner />}
              <span>Create task</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTaskModal;
