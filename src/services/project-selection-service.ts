import { create } from 'zustand'
import type { ProjectSelectionStore, UserProjectGet } from '../interfaces'
import { HTTP_METHOD } from '../enums'
import { httpRequest } from '../api'

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
      return httpRequest<UserProjectGet[]>(
        'projects/users-projects',
        HTTP_METHOD.GET
      )
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
