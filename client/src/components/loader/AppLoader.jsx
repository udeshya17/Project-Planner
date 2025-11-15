import React from "react";

function AppLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100 dark:bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 animate-[spin_6s_linear_infinite] rounded-2xl border-2 border-dashed border-brand-500/30" />
          <div className="absolute inset-2 animate-[ping_2.4s_ease-out_infinite] rounded-2xl bg-brand-500/10" />
          <div className="relative flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg">
            <span className="text-sm font-semibold text-white">PP</span>
          </div>
        </div>
        <div className="space-y-1 text-center">
          <p className="text-xs font-medium tracking-wide text-slate-200">
            Loading your workspace
          </p>
          <p className="text-[11px] text-slate-400">
            Fetching projects and keeping things in sync.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AppLoader;
