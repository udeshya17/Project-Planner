import React, { useState } from "react";
import TextInput from "../../components/forms/TextInput";
import Spinner from "../../components/loader/Spinner";
import { addMember } from "../../api/project.api";
import { useUI } from "../../context/UIContext";

function AddMemberModal({ projectId, onClose, onAdded }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useUI();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Email is required");
      return;
    }
    try {
      setIsSubmitting(true);
      const project = await addMember(projectId, { email });
      onAdded(project);
      addToast({
        type: "success",
        title: "Member added",
        message: `${email} added to project`,
      });
      onClose();
    } catch (err) {
      const message =
        err?.response?.data?.message || "Could not add this member";
      setError(message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm">
      <div className="glass-panel w-full max-w-md rounded-2xl p-5 shadow-2xl">
        <header className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            Invite collaborator
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
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="teammate@example.com"
            error={error}
          />
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
              <span>Invite</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMemberModal;
