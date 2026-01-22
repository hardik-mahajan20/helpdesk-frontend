import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode
} from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import type { ThemeContextType } from '../interfaces/theme'

const ThemeCtx = createContext<ThemeContextType | undefined>(undefined)

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark')
  const [color, setColor] = useState<'blue' | 'green' | 'purple' | 'orange'>(
    'blue'
  )

  // MUI theme
  const paletteColors = {
    blue: { light: '#1976d2', dark: '#90caf9', accent: '#3f51b5' },
    green: { light: '#388e3c', dark: '#81c784', accent: '#009688' },
    purple: { light: '#7b1fa2', dark: '#ce93d8', accent: '#673ab7' },
    orange: { light: '#f57c00', dark: '#ffb74d', accent: '#ff5722' }
  }

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main:
          mode === 'light'
            ? paletteColors[color].light
            : paletteColors[color].dark
      },
      secondary: { main: paletteColors[color].accent },
      error: { main: '#f44336' }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontWeight: 500,
            textTransform: 'none',
            borderRadius: 6
          }
        }
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: '50%',
            width: 36,
            height: 36
          }
        }
      },
      MuiTextField: {
        defaultProps: {
          size: 'small'
        }
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            minHeight: 48
          }
        }
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            display: 'none'
          }
        }
      },
      MuiTablePagination: {
        styleOverrides: {
          root: {
            fontSize: '14px',
            backgroundColor: 'var(--background-color)'
          },
          selectLabel: {
            margin: '0 16px'
          }
        }
      },
      MuiSnackbarContent: {
        styleOverrides: {
          root: {
            padding: '15px 10px',
            backgroundColor: 'transparent'
          }
        }
      },
      MuiMenu: {
        styleOverrides: {
          list: {
            padding: 0
          }
        }
      }
    }
  })

  // Add theme classes to body
  useEffect(() => {
    const body = document.body
    // Remove old theme classes
    body.classList.remove(
      'theme-light',
      'theme-dark',
      'color-blue',
      'color-green',
      'color-purple',
      'color-orange'
    )
    // Add current theme classes
    body.classList.add(`theme-${mode}`, `color-${color}`)
  }, [mode, color])

  return (
    <ThemeCtx.Provider value={{ mode, setMode, color, setColor }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeCtx.Provider>
  )
}

export const useThemeContext = () => useContext(ThemeCtx)
