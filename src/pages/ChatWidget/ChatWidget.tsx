import type { ChatWidgetProps } from '../../interfaces'
import './ChatWidget.scss'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import {
  CardActions,
  CardHeader,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import SendIcon from '@mui/icons-material/Send'
import ChatIcon from '@mui/icons-material/Chat'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone'
import AttachmentIcon from '@mui/icons-material/Attachment'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'

interface Message {
  text: string
  isAgent: boolean
}

export default function ChatWidget ({ settings }: ChatWidgetProps) {
  const [isWidgetOpen, setIsWidgetOpen] = useState<boolean>(false)
  const handleWidgetToken = () => {
    setIsWidgetOpen(prev => !prev)
    setIsShowHome(true)
    setIsShowChat(false)
  }
  const [isShowHome, setIsShowHome] = useState<boolean>(true)
  const [isShowChat, setIsShowChat] = useState<boolean>(false)

  const [messages, setMessages] = useState<Message[]>([])
  const [userInput, setUserInput] = useState<string>('')

  const startNewConversation = () => {
    setIsShowHome(false)
    setIsShowChat(true)
    setMessages([
      {
        text: settings.welcomeMessage ?? 'Hello! How can I help you?',
        isAgent: true
      }
    ])
  }

  const sendMessage = () => {
    if (userInput) {
      setMessages(prev => [...prev, { text: userInput, isAgent: false }])

      setUserInput('')

      // Simulate agent response after 1 second
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            text: 'Thank you for your message. How can I help you today?',
            isAgent: true
          }
        ])
      }, 1000)
    }
  }

  return (
    <>
      <div className='chat-preview-container position-relative w-100 p-3 rounded'>
        <Button
          className='chat-icon-button position-absolute d-flex align-items-center justify-content-center'
          onClick={handleWidgetToken}
        >
          {isWidgetOpen ? <CloseIcon /> : <ChatIcon />}
        </Button>
        {isWidgetOpen && (
          <div className='widget-wrapper position-absolute'>
            <Card className='chat-widget-card d-flex flex-column overflow-hidden'>
              {isShowHome && (
                <div className='d-flex flex-column'>
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
                            onKeyDown={e => {
                              if (e.key === 'Enter') {
                                e.preventDefault()
                                sendMessage()
                              }
                            }}
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
                      <Card
                        className='col glass-card cursor-pointer'
                        onClick={startNewConversation}
                        role='button'
                        tabIndex={0}
                      >
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
              )}
              {isShowChat && (
                <div className='d-flex flex-column h-100'>
                  <CardHeader
                    avatar={
                      <IconButton
                        onClick={() => {
                          setIsShowChat(false)
                          setIsShowHome(true)
                        }}
                      >
                        <ArrowBackTwoToneIcon />
                      </IconButton>
                    }
                    title='Welcome to Acme Support'
                    className='chat-header'
                  />

                  <CardContent className='chat-messages d-flex flex-column gap-2 p-2 overflow-auto flex-grow-1'>
                    {messages.map((message, index) =>
                      message.isAgent ? (
                        // Agent Message
                        <div
                          key={index}
                          className='d-flex gap-2 align-items-start'
                        >
                          {settings.enablePhoto && (
                            <div className='agent-avatar d-flex align-items-center justify-content-center rounded-circle flex-shrink-0'>
                              <SupportAgentIcon className='avatar-icon' />
                            </div>
                          )}

                          <div
                            className='p-2 rounded message'
                            style={{
                              backgroundColor: settings.agentMessageBackground,
                              color: settings.agentTextColor
                            }}
                          >
                            {message.text}
                          </div>
                        </div>
                      ) : (
                        // Customer Message
                        <div
                          key={index}
                          className='p-2 rounded ms-auto message'
                          style={{
                            backgroundColor: settings.customerMessageBackground,
                            color: settings.customerTextColor
                          }}
                        >
                          {message.text}
                        </div>
                      )
                    )}
                  </CardContent>

                  <CardActions className='chat-input-container p-2'>
                    <form
                      onSubmit={e => {
                        e.preventDefault()
                        sendMessage()
                      }}
                      className='w-100'
                    >
                      <FormControl fullWidth variant='outlined'>
                        <InputLabel htmlFor='outlined-adornment-password'>
                          Type a message
                        </InputLabel>
                        <OutlinedInput
                          placeholder='Type a message'
                          value={userInput}
                          onChange={e => setUserInput(e.target.value)}
                          endAdornment={
                            <InputAdornment
                              position='end'
                              className='d-flex align-items-center gap-1'
                            >
                              <IconButton>
                                <AttachmentIcon />
                              </IconButton>
                              <IconButton onClick={sendMessage}>
                                <SendIcon />
                              </IconButton>
                            </InputAdornment>
                          }
                          label=' Type a message'
                        />
                      </FormControl>
                    </form>
                  </CardActions>
                </div>
              )}
            </Card>
          </div>
        )}
      </div>
    </>
  )
}
