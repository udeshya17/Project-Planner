import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useUI } from "../../context/UIContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useUI();
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";
  const isDark = theme === "dark";

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to={user ? "/" : "/login"} className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-brand-500 text-sm font-semibold text-white">
            PP
          </span>
          <span className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Project Planner
          </span>
        </Link>
        <div className="flex items-center gap-3 text-xs">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center gap-1 rounded-full border border-slate-300/80 bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-800 shadow-sm hover:border-brand-400 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-brand-100"
          >
            <span
              className={`relative inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border border-slate-400/70 bg-slate-100 dark:border-slate-600 dark:bg-slate-900`}
            >
              <span
                className={`inline-block h-2 w-2 rounded-full transition-colors ${
                  isDark ? "bg-yellow-300" : "bg-slate-800"
                }`}
              />
            </span>
            <span>{isDark ? "Dark" : "Light"}</span>
          </button>
          {user ? (
            <>
              <span className="hidden text-slate-500 dark:text-slate-300 sm:inline">
                {user.name || user.email}
              </span>
              <button
                type="button"
                onClick={logout}
                className="rounded-md border border-slate-300 px-3 py-1 text-xs font-medium text-slate-800 hover:border-brand-400 hover:text-brand-700 dark:border-slate-700 dark:text-slate-200 dark:hover:text-brand-100"
              >
                Log out
              </button>
            </>
          ) : (
            !isAuthPage && (
              <div className="flex items-center gap-3 text-xs">
                <Link
                  to="/login"
                  className="rounded-md px-3 py-1 font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="rounded-md bg-brand-500 px-3 py-1 font-medium text-white hover:bg-brand-400"
                >
                  Sign up
                </Link>
              </div>
            )
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
