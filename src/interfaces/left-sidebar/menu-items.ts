import type { JSX } from "react"

export interface MenuItems {
  label: string
  icon: JSX.Element
  path: string
  badge?: number
  active?: boolean
}
