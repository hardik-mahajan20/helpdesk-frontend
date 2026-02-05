import { create } from "zustand";
import type { ApiResponse, ProfileSelectionStore } from "../interfaces";
import type { UserProfileResponse } from "../interfaces/profile";
import api from "../api/axios";

export const useProfileSelectionStore = create<ProfileSelectionStore>(
  (set, get) => ({
    profile: null,

    getProfile: async (): Promise<UserProfileResponse | null> => {
      const url = `profile/profile-details`;
      const response = await api.get<ApiResponse<UserProfileResponse>>(url);
      const result = response.data.data;
      set({ profile: result });
      return result;
    },
    getCurrentUserId: () => {
      const profile = get().profile;
      return profile ? profile.id : 0;
    },
  }),
);
