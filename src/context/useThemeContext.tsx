import { useContext } from 'react'
import { ThemeCtx } from './ThemeContext'

export const useThemeContext = () => useContext(ThemeCtx)