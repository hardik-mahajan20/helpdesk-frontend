import { create } from 'zustand'
import type { ProfileSelectionStore } from '../interfaces'
import type { UserProfileResponse } from '../interfaces/profile'
import { httpRequest } from '../api'
import { HTTP_METHOD } from '../enums'

export const useProfileSelectionStore = create<ProfileSelectionStore>(
  (set, get) => ({
    profile: null,

    getProfile: async (): Promise<UserProfileResponse | null> => {
      let result = await httpRequest<UserProfileResponse>(
        'profile/profile-details',
        HTTP_METHOD.GET
      )
      set({ profile: result })
      return result
    },
    getCurrentUserId : () => {
      const profile = get().profile
      return profile ? profile.id : 0
    }
  })
)
