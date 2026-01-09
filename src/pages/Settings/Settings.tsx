import { useState } from 'react'
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  TextField,
  Switch,
  FormControlLabel,
  FormGroup,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Tooltip
} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import './Settings.scss'
import ChatIcon from '@mui/icons-material/Chat'
import ContentCutIcon from '@mui/icons-material/ContentCut'
import PaletteIcon from '@mui/icons-material/Palette'
import './Settings.scss'
import { SketchPicker } from 'react-color'
import CodeIcon from '@mui/icons-material/Code'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import VisibilityIcon from '@mui/icons-material/Visibility'
import ChatWidget from '../ChatWidget'
function TabPanel ({ value, index, children }: any) {
  return value === index ? <Box sx={{ mt: 3 }}>{children}</Box> : null
}

const positions: {
  label: string
  value: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}[] = [
  { label: 'Top Left', value: 'top-left' },
  { label: 'Top Right', value: 'top-right' },
  { label: 'Bottom Left', value: 'bottom-left' },
  { label: 'Bottom Right', value: 'bottom-right' }
]

const positionMatrix: (
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'middle-left'
  | 'middle-center'
  | 'middle-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
)[] = [
  'top-left',
  'top-center',
  'top-right',
  'middle-left',
  'middle-center',
  'middle-right',
  'bottom-left',
  'bottom-center',
  'bottom-right'
]

const colorFields = [
  { key: 'headerTextColor', label: 'Header Text Color' },
  { key: 'headerBackground', label: 'Header Background Color' },
  { key: 'agentTextColor', label: 'Agent Text Color' },
  { key: 'agentMessageBackground', label: 'Agent Message Background' },
  { key: 'customerTextColor', label: 'Customer Text Color' },
  { key: 'customerMessageBackground', label: 'Customer Message Background' }
] as { key: ColorFieldKeys; label: string }[]

type ColorFieldKeys =
  | 'headerTextColor'
  | 'headerBackground'
  | 'agentTextColor'
  | 'agentMessageBackground'
  | 'customerTextColor'
  | 'customerMessageBackground'

export default function Settings () {
  const [tabIndex, setTabIndex] = useState(0)
  const [, setChatPosition] = useState<string | null>(null)

  const onColorChange = (color: any, key: string) => {
    setColors(prev => ({
      ...prev,
      [key]: color.hex
    }))
  }
  const [colors, setColors] = useState<Record<string, string>>({
    primaryColor: '#1976d2',
    secondaryColor: '#9c27b0'
  })

  const [activePicker, setActivePicker] = useState<string | null>(null)

  const togglePicker = (key: string) => {
    setActivePicker(prev => (prev === key ? null : key))
  }

  const linkvalue =
    'https://yourdomain.com/livechat?project=3B563A93-CE09-44E9-ADC3-230038326F58'
  const codeValue = `<script type="text/javascript" data-project-code="3b563a93-ce09-44e9-adc3-230038326f58">
            (function() {
              var s1 = document.createElement("script"),
                  s0 = document.getElementsByTagName("script")[0];
              s1.async = true;
              s1.src = "http://localhost:4200/assets/chat-widget-embed.js";
              s1.charset = "UTF-8";
              s1.setAttribute("crossorigin","*");
              s0.parentNode.insertBefore(s1, s0);
            })();
          </script>`
  const [copied, setCopied] = useState(false)

  const handleLinkCopy = async () => {
    await navigator.clipboard.writeText(linkvalue)
    setCopied(true)

    setTimeout(() => setCopied(false), 1500)
  }
  const handleCodeCopy = async () => {
    await navigator.clipboard.writeText(linkvalue)
    setCopied(true)

    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className='profile-container h-100 p-2 p-lg-3'>
      <div className='profile-header d-flex justify-content-between align-items-start mb-3 pb-3'>
        <div className='header-left'>
          <h1 className='page-title fs-2'>Settings</h1>
          <p className='page-subtitle m-0'>
            Manage Projects and Chat Widget Settings
          </p>
        </div>
      </div>

      <Paper elevation={0}>
        <Tabs
          variant='fullWidth'
          value={tabIndex}
          onChange={(_, newValue) => setTabIndex(newValue)}
          indicatorColor='primary'
          textColor='primary'
        >
          <Tab icon={<ChatIcon />} iconPosition='start' label='Chat Widget' />
          <Tab
            icon={<ContentCutIcon />}
            iconPosition='start'
            label='ShortCut Messagess'
          />
          <Tab
            icon={<SettingsIcon />}
            iconPosition='start'
            label='General Settings'
          />
        </Tabs>

        <TabPanel value={tabIndex} index={0}>
          <div>
            <div className='d-flex flex-row xxl-flex-column gap-3 py-0 my-4'>
              <div className='card d-flex flex-column gap-3 w-50'>
                <div className='d-flex justify-content-between align-items-center'>
                  <div className='d-flex align-items-center gap-1'>
                    <PaletteIcon className='d-none d-sm-inline' />
                    <h1 className='fw-medium fs-4 my-0'>Widget Appearance</h1>
                  </div>
                </div>
                <div className='d-flex flex-column flex-grow-1 gap-3'>
                  <TextField
                    fullWidth
                    label='Widget Title'
                    type='text'
                    variant='outlined'
                    margin='dense'
                    required
                    placeholder='Enter Widget Title'
                  />
                  <TextField
                    fullWidth
                    label='Welcome Message'
                    type='text'
                    variant='outlined'
                    margin='dense'
                    required
                    placeholder='Enter Welcome Message'
                  />
                  <div className='chat-position-card p-2'>
                    <h3 className='fs-6 fw-medium mb-3 mt-0'>
                      Chat Widget Position
                    </h3>
                    <div className='d-flex gap-2 flex-wrap'>
                      {positions.map(pos => (
                        <div
                          key={pos.value}
                          onClick={() => setChatPosition(pos.value)}
                          className='position-item rounded active'
                        >
                          <div className='position-grid'>
                            {positionMatrix.map(cell => (
                              <div
                                key={cell}
                                className='position-cell d-flex align-items-center justify-content-center'
                              >
                                {cell === pos.value && (
                                  <div className='widget-dot' title='Widget' />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='color-fields color-input-field'>
                    {colorFields.map(colorField => (
                      <div
                        key={colorField.key}
                        className='d-flex flex-column gap-1 position-relative'
                      >
                        <label className='fw-medium small'>
                          {colorField.label}
                        </label>

                        <div className='d-flex justify-content-center align-items-center gap-2'>
                          {/* Color preview */}
                          <div
                            className='color-preview rounded'
                            style={{ background: colors[colorField.key] }}
                            onClick={() => togglePicker(colorField.key)}
                          />

                          <TextField
                            fullWidth
                            value={colors[colorField.key]}
                            onChange={e =>
                              setColors(prev => ({
                                ...prev,
                                [colorField.key]: e.target.value
                              }))
                            }
                            placeholder='#HEX'
                            variant='outlined'
                            className='color-input'
                            margin='dense'
                            size='small'
                          />
                        </div>

                        {/* Color Picker Popup */}
                        {activePicker === colorField.key && (
                          <div className='color-picker-popup rounded'>
                            <SketchPicker
                              color={colors[colorField.key]}
                              onChangeComplete={color =>
                                onColorChange(color, colorField.key)
                              }
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className='d-flex flex-column gap-2 mt-1'>
                    <FormGroup>
                      <FormControlLabel
                        control={<Switch defaultChecked />}
                        label='Show agent photos'
                      />
                      <FormControlLabel
                        required
                        control={<Switch defaultChecked />}
                        label='Enable file uploads'
                      />
                      <FormControlLabel
                        control={<Switch defaultChecked />}
                        label='Enable Chat Message Edit'
                      />
                      <FormControlLabel
                        control={<Switch defaultChecked />}
                        label='Enable Chat Message Delete'
                      />
                    </FormGroup>
                  </div>
                  <div className='d-flex justify-content-end flex-wrap gap-3 mt-3'>
                    <Button variant='outlined'>Cancel</Button>
                    <Button variant='contained' color='primary'>
                      Save
                    </Button>
                  </div>
                </div>
              </div>

              <div className='live-preview d-none d-xxl-flex flex-column gap-3 w-50'>
                <div className='custom-card-header d-flex align-items-center'>
                  <VisibilityIcon color='primary' />
                  <h1 className='title fw-medium fs-4 mt-0 mb-0'>
                    Live Preview
                  </h1>
                </div>
                <ChatWidget
                  settings={{
                    chatWidgetId: 1,
                    headerTitle: 'Live Support',
                    welcomeMessage: 'Hi! How can we help?',
                    chatPosition: 'bottom-right',
                    headerTextColor: '#ffffff',
                    headerBackground: '#1976d2',
                    agentTextColor: '#000000',
                    agentMessageBackground: '#e3f2fd',
                    customerTextColor: '#000000',
                    customerMessageBackground: '#f5f5f5',
                    enablePhoto: true,
                    enableAttachment: true,
                    enableEmoji: true,
                    enableEditOption: true,
                    enableDeleteOption: true
                  }}
                />
              </div>
            </div>
            <div className='card w-100 mt-3 d-flex flex-column gap-3'>
              <div className='d-flex align-items-center gap-1'>
                <CodeIcon />
                <h1 className='title fw-medium fs-4 mt-0 mb-0'>
                  Installation Code
                </h1>
              </div>
              <FormControl variant='outlined' fullWidth>
                <InputLabel htmlFor='outlined-adornment-direct-chat'>
                  Direct Chat Link
                </InputLabel>

                <OutlinedInput
                  id='outlined-adornment-direct-chat'
                  type='text'
                  value={linkvalue}
                  readOnly
                  label='Direct Chat Link'
                  endAdornment={
                    <InputAdornment position='end'>
                      <Tooltip title={copied ? 'Copied!' : 'Copy'}>
                        <IconButton edge='end' onClick={handleLinkCopy}>
                          <ContentCopyIcon />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl variant='outlined' fullWidth>
                <InputLabel>Widget Code</InputLabel>

                <OutlinedInput
                  multiline
                  rows={4}
                  value={codeValue}
                  readOnly
                  label='Widget Code'
                  endAdornment={
                    <InputAdornment position='end'>
                      <Tooltip title={copied ? 'Copied!' : 'Copy'}>
                        <IconButton edge='end' onClick={handleCodeCopy}>
                          <ContentCopyIcon />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
          </div>
        </TabPanel>

        <TabPanel value={tabIndex} index={1}>
          <Typography variant='body1'>
            Security settings (change password, 2FA, sessions)
          </Typography>
        </TabPanel>

        <TabPanel value={tabIndex} index={2}>
          <Typography variant='body1'>
            User preferences and application settings
          </Typography>
        </TabPanel>
      </Paper>
    </div>
  )
}
