import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchProjects } from "../api/project.api";
import { useUI } from "./UIContext";
import { useAuthContext } from "./AuthContext";

const ProjectContext = createContext(null);

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useUI();
  const { user, isBootstrapping } = useAuthContext();

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setIsLoading(true);
        const data = await fetchProjects();
        if (!ignore) setProjects(data);
      } catch (err) {
        if (!ignore) {
          const status = err?.response?.status; // user not authenticated than it will show eror
          if (status === 401 || status === 403) {
            setProjects([]);
            return;
          }

          addToast({
            type: "error",
            title: "Failed to load projects",
            message: err?.response?.data?.message || err.message,
          });
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    if (!isBootstrapping && user) {
      load();
    } else if (!user) {
      setProjects([]);
    }

    return () => {
      ignore = true;
    };
  }, [user, isBootstrapping, addToast]);

  const value = {
    projects,
    setProjects,
    isLoading,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}

export function useProjectContext() {
  const ctx = useContext(ProjectContext);
  if (!ctx) {
    throw new Error("useProjectContext must be used within ProjectProvider");
  }
  return ctx;
}
