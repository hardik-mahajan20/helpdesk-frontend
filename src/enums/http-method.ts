export const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
} as const

export type HttpMethod = typeof HTTP_METHOD[keyof typeof HTTP_METHOD]
