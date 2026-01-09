export interface ChatShortCutMessages {
  id: number
  userId: number
  projectId: number
  shortCutKey: string
  shortCutMessage: string
  isPublic: boolean
}

export interface ChatShortCutCreate {
  projectId: number
  shortCutKey: string
  shortCutMessage: string
  isPublic: boolean
}

export interface ChatShortCutUpdate {
  id: number
  projectId: number
  shortCutKey: string
  shortCutMessage: string
  isPublic: boolean
}
