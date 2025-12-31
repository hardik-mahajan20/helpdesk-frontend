export function setAuthSession (token: string) {
  localStorage.setItem('authToken', token)
}

export function clearAuthSession () {
  localStorage.removeItem('authToken')
}
