import type { ChatWidgetProps } from '../../interfaces'
import './ChatWidget.scss'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import SendIcon from '@mui/icons-material/Send'
import ChatIcon from '@mui/icons-material/Chat'
export default function ChatWidget ({ settings }: ChatWidgetProps) {
  return (
    <>
      <div className='chat-preview-container position-relative w-100 p-3 rounded'>
        <Button className='chat-icon-button position-absolute d-flex align-items-center justify-content-center'>
          <ChatIcon />
        </Button>

        <div className='widget-wrapper position-absolute'>
          <Card className='chat-widget-card d-flex flex-column overflow-hidden'>
            <CardContent>
              <div className='cw-container d-flex flex-column'>
                <div className='cw-tab-content p-3'>
                  <div className='cw-header p-3'>
                    <h2 className='fw-bold'>
                      {settings.headerTitle
                        ? settings.headerTitle
                        : 'Hi there 👋'}
                    </h2>
                    <p className='mb-0'>
                      {settings.welcomeMessage ? settings.welcomeMessage : ''}
                    </p>
                  </div>

                  <Card className='mb-3 glass-card'>
                    <CardContent className='d-flex align-items-center'>
                      <FormControl variant='outlined' fullWidth>
                        <InputLabel htmlFor='outlined-adornment-direct-chat'>
                          Search for answers
                        </InputLabel>

                        <OutlinedInput
                          id='outlined-adornment-direct-chat'
                          type='text'
                          placeholder='Search for answers'
                          label='Search for answers'
                          endAdornment={
                            <InputAdornment position='end'>
                              <IconButton edge='end'>
                                <SearchIcon />
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </CardContent>
                  </Card>

                  <div className='d-flex gap-2'>
                    <Card className='col glass-card cursor-pointer'>
                      <CardContent className='d-flex justify-content-between align-items-center'>
                        <div>
                          <h6 className='mb-1'>New Conversation</h6>
                        </div>
                        <SendIcon />
                      </CardContent>
                    </Card>

                    <Card className='col glass-card cursor-pointer'>
                      <CardContent className='d-flex justify-content-between align-items-center'>
                        <div>
                          <h6 className='mb-0'>Your Chats</h6>
                          <small>No chats yet</small>
                        </div>
                        <ChatIcon />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
