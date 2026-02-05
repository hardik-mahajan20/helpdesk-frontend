import { LOCAL_STORAGE_KEYS } from "../enums/storage-keys";

export function setAuthSession(token: string) {
  localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, token);
}

export function clearAuthSession() {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
}
