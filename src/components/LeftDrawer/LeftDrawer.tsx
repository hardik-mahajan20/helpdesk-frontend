import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Menu,
  MenuItem,
  Switch,
  IconButton
} from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState, type JSX } from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard'
import InboxIcon from '@mui/icons-material/Inbox'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ContactsIcon from '@mui/icons-material/Contacts'
import FolderIcon from '@mui/icons-material/Folder'
import BookIcon from '@mui/icons-material/Book'
import AssessmentIcon from '@mui/icons-material/Assessment'
import BusinessIcon from '@mui/icons-material/Business'
import PeopleIcon from '@mui/icons-material/People'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings'
import { clearAuthSession } from '../../utils/storage'
import { useProfileSelectionStore } from '../../services/profile-selection-service'
import type { UserProfileResponse } from '../../interfaces/profile'
import { useProjectSelectionStore } from '../../services/project-selection-service'
import './LeftDrawer.scss'
import { useThemeContext } from '../../context/ThemeContext'
import { ColorOption, LOCAL_STORAGE_KEYS, ThemeOption } from '../../enums'
interface menuItems_interface {
  label: string
  icon: JSX.Element
  path: string
  badge?: number
  active?: boolean
}

const allProjectMenuItems: menuItems_interface[] = [
  {
    label: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard',
    active: true
  },
  { label: 'Inbox', icon: <InboxIcon />, path: '/inbox', badge: 12 },
  { label: 'Contacts', icon: <ContactsIcon />, path: '/contacts' },
  { label: 'Projects', icon: <FolderIcon />, path: '/projects' },
  // { label: 'Knowledge Base', icon: <BookIcon />, path: '/knowledge-base' },
  { label: 'Reporting', icon: <AssessmentIcon />, path: '/reporting' },
  { label: 'Departments', icon: <BusinessIcon />, path: '/department' },
  { label: 'Agents', icon: <PeopleIcon />, path: '/agents' },
  { label: 'Admins', icon: <SettingsIcon />, path: '/settings' }
]

const projectSpecificMenuItems: menuItems_interface[] = [
  {
    label: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard',
    active: true
  },
  { label: 'Inbox', icon: <InboxIcon />, path: '/inbox', badge: 12 },
  { label: 'Contacts', icon: <ContactsIcon />, path: '/contacts' },
  { label: 'Knowledge Base', icon: <BookIcon />, path: '/knowledge-base' },
  { label: 'Reporting', icon: <AssessmentIcon />, path: '/reporting' },
  { label: 'Settings', icon: <SettingsIcon />, path: '/settings' }
]

export default function LeftDrawer () {
  const navigate = useNavigate()

  const selectedProjectId = useProjectSelectionStore(
    state => state.selectedProjectId
  )

  const { getProfile } = useProfileSelectionStore()

  const [profile, setProfileData] = useState<UserProfileResponse | null>(null)

  const [menuItems, setMenuItems] = useState<menuItems_interface[]>([])

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isActive, setIsActive] = useState(true)
  const location = useLocation()

  const { setMode, setColor } = useThemeContext()

  const handleClick = (path: string) => {
    navigate(path)
  }

  useEffect(() => {
    const loadProfile = async () => {
      const profile = await getProfile()

      if (!profile) return

      if (profile.userPreferenceSettings) {
        try {
          const preference = JSON.parse(profile.userPreferenceSettings)

          // Handle theme preference
          const theme = preference.theme || ThemeOption.Light
          setMode(theme)
          localStorage.setItem(LOCAL_STORAGE_KEYS.THEME_PREFERENCE, theme)

          // Handle color preference
          const color = preference.color || ColorOption.Blue
          setColor(color)
          localStorage.setItem(LOCAL_STORAGE_KEYS.COLOR_PREFERENCE, color)
        } catch (e) {
          console.error('Failed to parse user preferences:', e)
        }
      }

      let items: menuItems_interface[] = []

      if (selectedProjectId === 0) {
        if (profile.roleId === 1) {
          items = allProjectMenuItems
        } else if (profile.roleId === 2) {
          items = allProjectMenuItems.filter(item =>
            [
              'Dashboard',
              'Inbox',
              'Contacts',
              'Projects',
              'Reporting',
              'Agents',
              'Departments'
            ].includes(item.label)
          )
        } else {
          items = allProjectMenuItems.filter(item =>
            [
              'Dashboard',
              'Inbox',
              'Contacts',
              'Knowledge Base',
              'Reporting'
            ].includes(item.label)
          )
        }
      } else {
        if (profile.roleId === 1) {
          items = projectSpecificMenuItems
        } else if (profile.roleId === 2) {
          items = projectSpecificMenuItems
        } else {
          items = projectSpecificMenuItems.filter(
            item => item.label !== 'Settings'
          )
        }
      }

      setProfileData(profile)
      setMenuItems(items)
    }

    loadProfile()
  }, [selectedProjectId])

  return (
    <>
      <div className='sidebar h-100 d-flex flex-column'>
        <nav className='sidebar-nav flex-grow-1 py-4 px-0'>
          <ul className='nav-list list-unstyled p-0 m-0'>
            {menuItems.map(item => {
              const isSelected = location.pathname === item.path

              return (
                <li
                  key={item.path}
                  className={`nav-item ${isSelected ? 'active' : ''}`}
                >
                  <ListItemButton
                    selected={isSelected}
                    onClick={() => handleClick(item.path)}
                    className='nav-link d-flex align-items-center text-decoration-none position-relative'
                    disableRipple
                  >
                    <ListItemIcon className='nav-icon'>
                      {item.icon}
                    </ListItemIcon>

                    <ListItemText primary={item.label} className='nav-label' />
                    {item.label === 'Inbox' && (
                      <span
                        className={`nav-badge text-center text-white ${
                          item.label === 'Inbox' ? 'warn-badge' : ''
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </ListItemButton>
                </li>
              )
            })}
          </ul>
        </nav>

        <Divider />

        <div className='sidebar-footer'>
          <div className='user-profile d-flex align-items-center'>
            <div className='profile-avatar d-flex justify-content-center align-items-center'>
              HA
            </div>
            <div className='profile-info'>
              <div className='profile-name'>
                {profile?.firstName} {profile?.lastName}
              </div>
              <div className='profile-email'>{profile?.roleName}</div>
            </div>
            <IconButton
              size='small'
              onClick={e => {
                e.stopPropagation()
                setAnchorEl(e.currentTarget)
              }}
              className='nav-icon-button profile-menu-btn'
            >
              <MoreVertIcon fontSize='small' />
            </IconButton>
          </div>
        </div>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null)
            navigate('/profile')
          }}
        >
          <ListItemIcon>
            <PersonIcon fontSize='small' />
          </ListItemIcon>
          User Profile
        </MenuItem>

        <MenuItem>
          Active
          <Switch
            size='small'
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
            sx={{ ml: 'auto' }}
          />
        </MenuItem>

        <Divider />

        <MenuItem
          onClick={() => {
            setAnchorEl(null)
            clearAuthSession()
            navigate('/')
          }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}
