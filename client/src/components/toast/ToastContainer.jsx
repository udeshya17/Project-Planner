import React from "react";
import { useUI } from "../../context/UIContext";

// changing theme toggler
const frameMap = {
  success:
    "border-emerald-500/30 bg-emerald-50 text-emerald-900 dark:border-emerald-500/70 dark:bg-emerald-500/10 dark:text-emerald-50",
  error:
    "border-red-500/30 bg-red-50 text-red-900 dark:border-red-500/70 dark:bg-red-500/10 dark:text-red-50",
  info: "border-slate-400/40 bg-slate-50 text-slate-900 dark:border-slate-500/70 dark:bg-slate-500/10 dark:text-slate-50",
};

const progressColorMap = {
  success: "bg-emerald-500",
  error: "bg-red-500",
  info: "bg-slate-400",
};

function ToastContainer() {
  const { toasts } = useUI();

  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <div className="flex w-full max-w-md flex-col gap-2">
        {toasts.map((toast) => {
          const frame = frameMap[toast.type] || frameMap.info;
          const progressColor =
            progressColorMap[toast.type] || progressColorMap.info;

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto overflow-hidden rounded-lg border px-3 py-2 text-xs shadow-lg ${frame}`}
            >
              <div className="flex items-start gap-2">
                <div className="mt-0.5 h-5 w-5 flex-shrink-0 rounded-full bg-black/5 dark:bg-white/10" />
                <div className="flex-1">
                  {toast.title && (
                    <p className="font-semibold leading-snug">{toast.title}</p>
                  )}
                  {toast.message && (
                    <p className="mt-0.5 text-[11px] leading-snug text-slate-700 dark:text-slate-100/90">
                      {toast.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-2 h-0.5 w-full overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
                <div
                  className={`h-full w-full ${progressColor} toast-progress`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ToastContainer;
