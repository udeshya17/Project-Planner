import React from "react";
import { Link } from "react-router-dom";

function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="flex min-h-[calc(100vh-3.25rem)] items-center justify-center px-4">
      <div className="grid w-full max-w-5xl gap-10 md:grid-cols-[1.1fr,1fr]">
        <section className="glass-panel relative overflow-hidden bg-gradient-to-br from-white via-white to-brand-50/70 p-8 md:p-10 dark:bg-slate-900/80 dark:bg-none">
          <div className="pointer-events-none absolute -left-24 -top-24 h-52 w-52 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-brand-400/10 blur-3xl" />
          <div className="relative space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-500/90 dark:text-brand-300">
              Collaborative project planner
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl dark:text-slate-50">
              Plan work like a real team, not a checklist.
            </h1>
            <p className="max-w-md text-sm text-slate-600 dark:text-slate-400">
              Create focused projects, assign owners, and move tasks across a
              Kanban board that always reflects your team&apos;s actual
              momentum.
            </p>
            <ul className="mt-4 grid gap-3 text-xs text-slate-600 dark:text-slate-300 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-brand-500/20 text-[10px] text-brand-200">
                  ✓
                </span>
                <span>
                  Board, detailed, and status views for every project.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-brand-500/20 text-[10px] text-brand-200">
                  ✓
                </span>
                <span>
                  Drag tasks between columns to keep status always up to date.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-brand-500/20 text-[10px] text-brand-200">
                  ✓
                </span>
                <span>
                  Smart progress indicators so you can scan work at a glance.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-brand-500/20 text-[10px] text-brand-200">
                  ✓
                </span>
                <span>
                  Invite teammates by email and collaborate in the same board.
                </span>
              </li>
            </ul>
            <p className="mt-6 text-[11px] text-slate-500 dark:text-slate-500">
              No demo content here—everything you see is built specifically for
              this project planner and wired to your API.
            </p>
          </div>
        </section>
        <section className="glass-panel flex flex-col justify-center p-6 sm:p-8">
          <header className="mb-6 space-y-2 text-left">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {subtitle}
              </p>
            )}
          </header>
          <div className="space-y-4">{children}</div>
          {footer && (
            <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
              {footer}
            </div>
          )}
          {!footer && (
            <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
              Need an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-brand-500 hover:text-brand-400 dark:text-brand-300 dark:hover:text-brand-200"
              >
                Sign up
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default AuthLayout;
