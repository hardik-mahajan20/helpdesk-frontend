import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Badge,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ChatIcon from '@mui/icons-material/Chat'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { useEffect } from 'react'
import { useProjectSelectionStore } from '../../services/project-selection-service'

type HeaderProps = {
  onLeftToggle: () => void
  onRightToggle: () => void
}

export default function Header ({ onLeftToggle, onRightToggle }: HeaderProps) {
  const { selectedProjectId, projectsList, setProjectId, refreshProjects } =
    useProjectSelectionStore()

  useEffect(() => {
    refreshProjects()
  }, [refreshProjects])

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string
    console.log(value)

    setProjectId(Number(value))
  }
  return (
    <AppBar
      position='fixed'
      style={{ backgroundColor: 'white', color: 'black' }}
    >
      <Toolbar>
        <Box display='flex' flexGrow={1} alignItems='center' gap={1}>
          <Typography variant='h6'>HelpDesk</Typography>
          <IconButton color='inherit' onClick={onLeftToggle}>
            <MenuIcon />
          </IconButton>
        </Box>
        <FormControl sx={{ minWidth: 200 }} size='small'>
          <InputLabel id='project-select-label'>Select Project</InputLabel>

          <Select
            labelId='project-select-label'
            id='project-select'
            value={selectedProjectId.toString()}
            label='Select Project'
            onChange={handleChange}
          >
            {/* <MenuItem value='10'>Project 1</MenuItem>
            <MenuItem value='20'>Project 2</MenuItem>
            <MenuItem value='30'>Project 3</MenuItem> */}
            <MenuItem value='0'>All Projects</MenuItem>
            {projectsList.map(proj => (
              <MenuItem key={proj.id} value={proj.id.toString()}>
                {proj.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <IconButton color='inherit' onClick={onRightToggle}>
          <Badge badgeContent={4} color='error'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton color='inherit' onClick={onRightToggle}>
          <Badge badgeContent={4} color='error'>
            <ChatIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
