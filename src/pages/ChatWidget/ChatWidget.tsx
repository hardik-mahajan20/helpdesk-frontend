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
import { useMemo, useState, type CSSProperties } from 'react'
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

  const handleWidgetToken = () => {
    setIsWidgetOpen(prev => !prev)
    setIsShowHome(true)
    setIsShowChat(false)
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

  const lightenColor = (hex: string, percent: number): string => {
    hex = hex.replace(/^#/, '')

    if (hex.length === 3) {
      hex = hex
        .split('')
        .map(c => c + c)
        .join('')
    }

    const num = parseInt(hex, 16)

    let r = (num >> 16) & 0xff
    let g = (num >> 8) & 0xff
    let b = num & 0xff

    r = Math.round(r + (255 - r) * (percent / 100))
    g = Math.round(g + (255 - g) * (percent / 100))
    b = Math.round(b + (255 - b) * (percent / 100))

    return `rgb(${r}, ${g}, ${b})`
  }

  const darkenColor = (hex: string, percent: number): string => {
    hex = hex.replace(/^#/, '')

    if (hex.length === 3) {
      hex = hex
        .split('')
        .map(c => c + c)
        .join('')
    }

    const num = parseInt(hex, 16)

    let r = (num >> 16) & 0xff
    let g = (num >> 8) & 0xff
    let b = num & 0xff

    r = Math.round(r * (1 - percent / 100))
    g = Math.round(g * (1 - percent / 100))
    b = Math.round(b * (1 - percent / 100))

    return `rgb(${r}, ${g}, ${b})`
  }

  const getTabGradient = (): string => {
    const base = settings?.headerBackground || '#00a859'
    const lighter = lightenColor(base, 30)
    const darker = darkenColor(base, 50)

    return `radial-gradient(
      circle at 100% 100%,
      ${lighter} 0%,
      ${base} 40%,
      ${darker} 90%
    )`
  }

  const widgetPositionStyle = useMemo<CSSProperties>(() => {
    const pos = settings.chatPosition
    const style: React.CSSProperties = {
      position: 'absolute',
      zIndex: 10
    }

    if (!pos) return style

    if (pos.includes('bottom')) style.bottom = '5rem'
    if (pos.includes('top')) style.top = '5rem'
    if (pos.includes('left')) style.left = '1rem'
    if (pos.includes('right')) style.right = '1rem'

    return style
  }, [settings])

  const getButtonPositionStyle = useMemo<CSSProperties>(() => {
    const pos = settings.chatPosition
    const style: React.CSSProperties = {
      position: 'absolute',
      zIndex: 11
    }

    if (!pos) return style

    if (pos.includes('bottom')) style.bottom = '1rem'
    if (pos.includes('top')) style.top = '1rem'
    if (pos.includes('left')) style.left = '1rem'
    if (pos.includes('right')) style.right = '1rem'

    return style
  }, [settings])

  return (
    <>
      <div className='chat-preview-container position-relative w-100 p-3 rounded'>
        <IconButton
          className='chat-icon-button position-absolute d-flex align-items-center justify-content-center'
          onClick={handleWidgetToken}
          style={{
            ...getButtonPositionStyle,
            backgroundColor: settings.headerBackground
          }}
        >
          {isWidgetOpen ? (
            <CloseIcon
              style={{
                color: settings.headerTextColor
              }}
            />
          ) : (
            <ChatIcon
              style={{
                color: settings.headerTextColor
              }}
            />
          )}
        </IconButton>
        {isWidgetOpen && (
          <div
            className='widget-wrapper position-absolute'
            style={widgetPositionStyle}
          >
            <Card className='chat-widget-card d-flex flex-column overflow-hidden'>
              {isShowHome && (
                <div className='cw-container d-flex flex-column'>
                  <div
                    className='cw-tab-content p-3'
                    style={{ background: getTabGradient() }}
                  >
                    <div
                      className='cw-header p-3'
                      style={{
                        color: settings.headerTextColor
                      }}
                    >
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
                          <InputLabel
                            htmlFor='outlined-adornment-search'
                            style={{
                              color: settings.headerBackground
                            }}
                          >
                            Search for answers
                          </InputLabel>

                          <OutlinedInput
                            id='outlined-adornment-search'
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
                                  <SearchIcon
                                    style={{
                                      color: settings.headerBackground
                                    }}
                                  />
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
                        style={{
                          color: settings.headerBackground
                        }}
                      >
                        <CardContent className='d-flex justify-content-between align-items-center'>
                          <div>
                            <h6 className='mb-1'>New Conversation</h6>
                          </div>
                          <SendIcon
                            style={{
                              color: settings.headerBackground
                            }}
                          />
                        </CardContent>
                      </Card>

                      <Card
                        className='col glass-card cursor-pointer'
                        style={{
                          color: settings.headerBackground
                        }}
                      >
                        <CardContent className='d-flex justify-content-between align-items-center'>
                          <div>
                            <h6 className='mb-0'>Your Chats</h6>
                            <small>No chats yet</small>
                          </div>
                          <ChatIcon
                            style={{
                              color: settings.headerBackground
                            }}
                          />
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
                        <ArrowBackTwoToneIcon
                          style={{
                            color: settings.headerTextColor
                          }}
                        />
                      </IconButton>
                    }
                    title={settings.headerTitle}
                    className='chat-header'
                    style={{
                      background: settings.headerBackground,
                      color: settings.headerTextColor
                    }}
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
                              {settings.enableAttachment && (
                                <IconButton className='attachment-button'>
                                  <AttachmentIcon />
                                </IconButton>
                              )}
                              <IconButton
                                onClick={sendMessage}
                                className='send-button'
                              >
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
