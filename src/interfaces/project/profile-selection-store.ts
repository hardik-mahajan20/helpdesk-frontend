import type { UserProfileResponse } from '../profile'

export interface ProfileSelectionStore {
  profile: UserProfileResponse | null
  getProfile: () => Promise<UserProfileResponse | null>
}
