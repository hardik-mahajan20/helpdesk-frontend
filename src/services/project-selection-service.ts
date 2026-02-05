import { create } from 'zustand'
import type {
  ApiResponse,
  ProjectSelectionStore,
  UserProjectGet
} from '../interfaces'
import api from '../api/axios'

const STORAGE_KEY = 'selectedProjectId'

export const useProjectSelectionStore = create<ProjectSelectionStore>(
  (set, get) => ({
    // ---- INITIAL STATE ----
    selectedProjectId: Number(localStorage.getItem(STORAGE_KEY)) || 0,
    projectsList: [],
    allProjectsDisabled: false,

    // ---- HELPERS ----
    getStoredProjectId: () => {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? Number(stored) : 0
    },

    // ---- METHODS ----
    setProjectId: id => {
      set({ selectedProjectId: id })
      localStorage.setItem(STORAGE_KEY, String(id))
    },

    getCurrentProjectId: () => get().selectedProjectId,

    getProjectsByUserId: async (): Promise<UserProjectGet[]> => {
      var result: UserProjectGet[] = (
        await api.get<ApiResponse<UserProjectGet[]>>(`projects/users-projects`)
      ).data.data
      return result
    },

    refreshProjects: async () => {
      const data = await get().getProjectsByUserId()

      if (data?.length) {
        set({ projectsList: data })

        const exists = data.some(p => p.id === get().selectedProjectId)

        if (!exists) {
          set({ selectedProjectId: 0 })
        }
      } else {
        set({ projectsList: [] })
      }
    },

    // ---- COMPUTED EQUIVALENTS ----
    getProjectsList: () => get().projectsList,

    getSelectedProjectId: () => get().selectedProjectId,

    isAllProjectsDisabled: () => get().allProjectsDisabled,

    // ---- FLAGS ----
    disableAllProjectsOption: () => set({ allProjectsDisabled: true }),

    enableAllProjectsOption: () => set({ allProjectsDisabled: false })
  })
)
