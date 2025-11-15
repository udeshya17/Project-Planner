import { useProjectContext } from "../context/ProjectContext";

export function useProjects() {
  return useProjectContext();
}
