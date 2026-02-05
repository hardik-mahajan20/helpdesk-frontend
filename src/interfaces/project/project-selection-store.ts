import type { UserProjectGet } from "./user-project-get";

export interface ProjectSelectionStore {
  // STATE (signals)
  selectedProjectId: number;
  projectsList: UserProjectGet[];
  allProjectsDisabled: boolean;

  // PRIVATE-LIKE HELPERS
  getStoredProjectId: () => number;

  // PUBLIC API (methods)
  setProjectId: (id: number) => void;
  getCurrentProjectId: () => number;

  getProjectsByUserId: () => Promise<UserProjectGet[]>;
  refreshProjects: () => Promise<void>;

  // SELECTORS (computed equivalents)
  getProjectsList: () => UserProjectGet[];
  getSelectedProjectId: () => number;
  isAllProjectsDisabled: () => boolean;

  // FLAGS
  disableAllProjectsOption: () => void;
  enableAllProjectsOption: () => void;
}
