import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Avatar,
  Divider,
  Menu,
  MenuItem,
  Switch,
  IconButton
} from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, type JSX } from 'react'
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

interface menuItems_interface  {
  label: string
  icon: JSX.Element
  path: string
}
const menuItems: menuItems_interface[] = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { label: 'Inbox', icon: <InboxIcon />, path: '/inbox' },
  { label: 'Contacts', icon: <ContactsIcon />, path: '/contacts' },
  { label: 'Projects', icon: <FolderIcon />, path: '/projects' },
  { label: 'Knowledge Base', icon: <BookIcon />, path: '/knowledge-base' },
  { label: 'Reporting', icon: <AssessmentIcon />, path: '/reporting' },
  { label: 'Departments', icon: <BusinessIcon />, path: '/department' },
  { label: 'Agents', icon: <PeopleIcon />, path: '/agents' },
  { label: 'Settings', icon: <SettingsIcon />, path: '/settings' }
]

export default function LeftDrawer () {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isActive, setIsActive] = useState(true)
  const location = useLocation()

  const handleClick = (path: string) => {
    navigate(path)
  }

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item, index) => {
          const isSelected = location.pathname === item.path

          return (
            <ListItem key={index} disablePadding>
              <ListItemButton
                selected={isSelected}
                onClick={() => handleClick(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>

      <Divider />

      <Box sx={{ p: 1.5 }}>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Box display='flex' alignItems='center' gap={1}>
            <Avatar sx={{ width: 32, height: 32 }}>H</Avatar>
            <ListItemText
              primary='Harsh Kumar'
              secondary={isActive ? 'Active' : 'Inactive'}
            />
          </Box>
          <IconButton
            size='small'
            onClick={e => {
              e.stopPropagation()
              setAnchorEl(e.currentTarget)
            }}
          >
            <MoreVertIcon fontSize='small' />
          </IconButton>
        </Box>

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
      </Box>
    </Box>
  )
}
