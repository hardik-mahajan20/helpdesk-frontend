import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import './RightDrawer.scss'
import { useState } from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ChatIcon from '@mui/icons-material/Chat'
import EmailIcon from '@mui/icons-material/Email'
import GroupIcon from '@mui/icons-material/Group'

export default function RightDrawer () {
  const [chatOpen, setChatOpen] = useState<boolean>(false)
  const [directOpen, setDirectOpen] = useState<boolean>(false)
  const [groupOpen, setGroupOpen] = useState<boolean>(false)

  return (
    <>
      <div className='chat-sidebar h-100 d-flex flex-column p-sm-2 p-2'>
        <div className='chat-sidebar-header d-flex align-items-center justify-content-between mb-3 pb-2'>
          <div className='title'>Chats & Messages</div>
          <IconButton color='inherit'>
            <CloseIcon />
          </IconButton>
        </div>
        <div className='sidebar-section p-2 mb-3'>
          <div
            className='section-header d-flex justify-content-between align-items-center accordion-header'
            onClick={() => setChatOpen(!chatOpen)}
          >
            <div className='section-title d-flex align-items-center'>
              <IconButton color='inherit' className='accordion-icon me-2'>
                {chatOpen ? (
                  <KeyboardArrowRightIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
              <IconButton color='inherit'>
                <ChatIcon />
              </IconButton>
              Chats
            </div>
          </div>
        </div>
        <div className='sidebar-section p-2 mb-3'>
          <div
            className='section-header d-flex justify-content-between align-items-center accordion-header'
            onClick={() => setDirectOpen(!directOpen)}
          >
            <div className='section-title d-flex align-items-center'>
              <IconButton color='inherit' className='accordion-icon me-2'>
                {directOpen ? (
                  <KeyboardArrowRightIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
              <IconButton color='inherit'>
                <EmailIcon />
              </IconButton>
              Direct Messages
            </div>
          </div>
        </div>
        <div className='sidebar-section p-2 mb-3'>
          <div
            className='section-header d-flex justify-content-between align-items-center accordion-header'
            onClick={() => setGroupOpen(!groupOpen)}
          >
            <div className='section-title d-flex align-items-center'>
              <IconButton color='inherit' className='accordion-icon me-2'>
                {groupOpen ? (
                  <KeyboardArrowRightIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
              <IconButton color='inherit'>
                <GroupIcon />
              </IconButton>
              Groups
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
