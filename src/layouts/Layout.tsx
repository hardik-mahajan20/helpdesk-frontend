import { Box, Drawer, Toolbar } from '@mui/material'
import { useState } from 'react'
import Header from '../components/Header'
import LeftDrawer from '../components/LeftDrawer'
import RightDrawer from '../components/RightDrawer'
import { Outlet } from 'react-router-dom'

const drawerWidth = 240

export default function Layout () {
  const [leftOpen, setLeftOpen] = useState(true)
  const [rightOpen, setRightOpen] = useState(false)

  return (
    <Box display='flex' flexDirection='column' height='100vh'>
      <Header
        onLeftToggle={() => setLeftOpen(prev => !prev)}
        onRightToggle={() => setRightOpen(true)}
      />
      <Toolbar />

      <Box display='flex' flexGrow={1} overflow='hidden'>
        <Drawer
          variant='persistent'
          open={leftOpen}
          sx={{
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              mt: '66px',
              height: 'calc(100% - 66px)',
              boxSizing: 'border-box'
            }
          }}
        >
          <LeftDrawer />
        </Drawer>

        <Box
          component='main'
          sx={{
            flexGrow: 1,
            p: 2,
            bgcolor: '#f5f5f5',
            transition: theme => theme.transitions.create('margin', {}),
            marginLeft: leftOpen ? `${drawerWidth}px` : 0
          }}
        >
          <Outlet />
        </Box>

        <Drawer
          variant='temporary'
          anchor='right'
          open={rightOpen}
          onClose={() => setRightOpen(false)}
          ModalProps={{ keepMounted: true }}
          slotProps={{
            paper: {
              sx: {
                mt: '66px',
                height: 'calc(100% - 66px)'
              }
            }
          }}
        >
          <RightDrawer />
        </Drawer>
      </Box>
    </Box>
  )
}
