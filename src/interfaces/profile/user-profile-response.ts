export interface UserProfileResponse {
    id: number;
    roleId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    roleName: string;
    department: string | null;
    reportsToPersonName: string | null;
    reportsToPersonEmail: string | null;
    avatarUrl: string | null;
    isActive: boolean;
    userPreferenceSettings: string;
    isTwoFactorAuthEnabled: boolean;
    isPasskeyEnabled: boolean;
  }
  