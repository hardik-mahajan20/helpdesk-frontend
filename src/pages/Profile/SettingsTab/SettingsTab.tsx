import {
  Button,
  Card,
  CardActions,
  CardContent,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import PaletteIcon from '@mui/icons-material/Palette'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import clsx from 'clsx'
import './SettingsTab.scss'
import InfoIcon from '@mui/icons-material/Info'
import { useProfileSelectionStore } from '../../../services/profile-selection-service'
import { useThemeContext } from '../../../context/ThemeContext'
import { updateUserPreferences } from '../../../services/profile-service'
import { ColorOption, ThemeOption } from '../../../enums'

export default function SettingsTab () {
  const { mode, color, setThemeAndColor, setMode, setColor } = useThemeContext()

  const themeOptions = useMemo(
    () => [
      { value: ThemeOption.Light, label: 'Light Theme' },
      { value: ThemeOption.Dark, label: 'Dark Theme' }
    ],
    []
  )

  const colorOptions = useMemo(
    () => [
      { value: ColorOption.Blue, label: 'Blue' },
      { value: ColorOption.Green, label: 'Green' },
      { value: ColorOption.Purple, label: 'Purple' },
      { value: ColorOption.Orange, label: 'Orange' }
    ],
    []
  )

  const [activeSetting, setActiveSetting] = useState<'appearance' | 'language'>(
    'appearance'
  )

  const [currentTheme, setCurrentTheme] = useState<ThemeOption>()
  const [pendingTheme, setPendingTheme] = useState<ThemeOption>()

  const [currentColor, setCurrentColor] = useState<ColorOption>()
  const [pendingColor, setPendingColor] = useState<ColorOption>()

  const { profile } = useProfileSelectionStore()

  const getPreferences = () => {
    const preferences = profile?.userPreferenceSettings
      ? JSON.parse(profile.userPreferenceSettings)
      : {}

    return {
      theme: (preferences.theme || mode) as ThemeOption,
      color: (preferences.color || color) as ColorOption
    }
  }

  useEffect(() => {
    if (!profile) return

    const { theme, color } = getPreferences()

    setCurrentTheme(theme)
    setPendingTheme(theme)

    setCurrentColor(color)
    setPendingColor(color)

    setThemeAndColor(theme, color)
  }, [profile])

  const cancelTheme = () => {
    const { theme, color } = getPreferences()

    setCurrentTheme(theme)
    setPendingTheme(theme)

    setCurrentColor(color)
    setPendingColor(color)

    setThemeAndColor(theme, color)
  }

  const switchTheme = (theme: ThemeOption) => {
    setPendingTheme(theme)
    setMode(theme)
  }

  const switchColor = (color: ColorOption) => {
    setPendingColor(color)
    setColor(color)
  }

  const saveThemeAndColor = async () => {
    ;(
      await updateUserPreferences({
        preferences: {
          theme: mode as ThemeOption,
          color: color as ColorOption
        }
      })
    ).data
  }

  return (
    <div className='tab-content settings-tab py-3 py-sm-4 px-0'>
      <div className='settings-layout d-flex flex-column flex-md-row gap-3'>
        <div className='settings-sidebar'>
          <ListItemButton
            selected={activeSetting === 'appearance'}
            onClick={() => setActiveSetting('appearance')}
          >
            <ListItemIcon>
              <PaletteIcon />
            </ListItemIcon>
            <ListItemText primary='Appearance' />
          </ListItemButton>
        </div>

        <div className='settings-content'>
          <Card className='section-card mb-0 d-flex'>
            <div className='d-flex flex-column flex-grow-1'>
              <CardContent className='flex-grow-1'>
                {activeSetting === 'appearance' && (
                  <div className='settings-section flex-grow-1'>
                    <h3 className='fs-4'>Appearance</h3>
                    <p className='section-description'>
                      Customize your interface theme and appearance
                    </p>

                    <div className='theme-section'>
                      <h4>Theme Mode</h4>

                      <div className='theme-options'>
                        {themeOptions.map(theme => (
                          <div
                            key={theme.value}
                            className={clsx('theme-option', theme.value, {
                              selected: pendingTheme === theme.value
                            })}
                            onClick={() => switchTheme(theme.value)}
                            title={theme.label}
                          >
                            <div className='d-flex flex-column align-items-center justify-content-center h-100'>
                              {theme.value === ThemeOption.Light ? (
                                <LightModeIcon className='mb-1' />
                              ) : (
                                <DarkModeIcon className='mb-1' />
                              )}
                              <span className='theme-label'>{theme.label}</span>
                            </div>

                            {pendingTheme === theme.value && (
                              <TaskAltIcon className='check-icon' />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className='color-section'>
                      <h4>Primary Color</h4>

                      <div className='color-options'>
                        {colorOptions.map(color => (
                          <div
                            key={color.value}
                            className={clsx('color-option', color.value, {
                              selected: pendingColor === color.value
                            })}
                            onClick={() => switchColor(color.value)}
                            title={color.label}
                          >
                            {pendingColor === color.value && <TaskAltIcon />}
                          </div>
                        ))}
                      </div>
                    </div>

                    {(pendingTheme !== currentTheme ||
                      pendingColor !== currentColor) && (
                      <div className='alert alert-info mt-3' role='alert'>
                        <InfoIcon />
                        <span>Preview active - click Save to apply</span>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
              <CardActions className='d-flex justify-content-end gap-3 p-3'>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={saveThemeAndColor}
                >
                  Save Changes
                </Button>
                <Button
                  variant='outlined'
                  color='primary'
                  onClick={cancelTheme}
                >
                  Cancel
                </Button>
              </CardActions>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
