import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchProjects } from "../api/project.api";
import { useUI } from "./UIContext";
import { useAuthContext } from "./AuthContext";
import { getSocketClient } from "../utils/socket";

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

      const socket = getSocketClient();
      if (socket) {
        socket.off("project:created");
        socket.off("project:added");
        socket.off("project:deleted");

        socket.on("project:created", (project) => {
          setProjects((prev) => {
            const exists = prev.some((p) => p._id === project._id);
            return exists ? prev : [project, ...prev];
          });
        });

        socket.on("project:added", (project) => {
          setProjects((prev) => {
            const exists = prev.some((p) => p._id === project._id);
            return exists ? prev : [project, ...prev];
          });
        });

        socket.on("project:deleted", ({ projectId }) => {
          setProjects((prev) => prev.filter((p) => p._id !== projectId));
        });
      }
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
