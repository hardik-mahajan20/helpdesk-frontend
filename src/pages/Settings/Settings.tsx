import { useEffect, useState } from 'react'
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
import {
  getChatWidgetByProjectId,
  getProjectById,
  updateChatWidgetSetting
} from '../../services/settings-service'
import type {
  ChatWidgetSettingsDto,
  ProjectDetailsRequestDTO,
  UpdateChatWidgetRequestDTO
} from '../../interfaces'
import { useProjectSelectionStore } from '../../services/project-selection-service'
import { useNavigate } from 'react-router-dom'
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
  const [widgetForm, setWidgetForm] = useState<ChatWidgetSettingsDto | null>(
    null
  )

  const [tabIndex, setTabIndex] = useState(0)

  const [project, setProject] = useState<ProjectDetailsRequestDTO>()
  const [, setChatWidget] = useState<ChatWidgetSettingsDto>()

  const [activePicker, setActivePicker] = useState<string | null>(null)

  const togglePicker = (key: string) => {
    setActivePicker(prev => (prev === key ? null : key))
  }

  const linkvalue = project?.directChatLink
  const codeValue = `<script type="text/javascript" data-project-code="${project?.projectCode}">
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
  const [copied, setCopied] = useState<boolean>(false)

  const handleLinkCopy: () => Promise<void> = async () => {
    if (!linkvalue) return
    await navigator.clipboard.writeText(linkvalue)
    setCopied(true)

    setTimeout(() => setCopied(false), 1500)
  }
  const handleCodeCopy = async () => {
    if (!linkvalue) return
    await navigator.clipboard.writeText(linkvalue)
    setCopied(true)

    setTimeout(() => setCopied(false), 1500)
  }

  const selectedProjectId = useProjectSelectionStore(
    state => state.selectedProjectId
  )

  useEffect(() => {
    const loadProject: () => Promise<void> = async () => {
      try {
        setProject(
          await getProjectById<ProjectDetailsRequestDTO>(selectedProjectId)
        )
      } catch (error) {
        console.error(error)
      }
    }
    const loadChatWidget = async () => {
      try {
        const data = await getChatWidgetByProjectId<ChatWidgetSettingsDto>(
          selectedProjectId
        )

        setChatWidget(data)
        setWidgetForm(data)
      } catch (error) {
        console.error(error)
      }
    }
    if (selectedProjectId > 0) {
      loadProject()
      loadChatWidget()
    } else {
      navigate('/dashboard')
    }
  }, [selectedProjectId])

  const navigate = useNavigate()

  const saveChatWidget = async () => {
    const formVlaue = widgetForm
    const payload: UpdateChatWidgetRequestDTO = {
      projectId: selectedProjectId,
      widgetSetting: JSON.stringify(formVlaue)
    }
    await updateChatWidgetSetting(payload)
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
                    value={widgetForm?.headerTitle ?? ''}
                    onChange={e =>
                      setWidgetForm(prev =>
                        prev ? { ...prev, headerTitle: e.target.value } : prev
                      )
                    }
                  />
                  <TextField
                    fullWidth
                    label='Welcome Message'
                    type='text'
                    variant='outlined'
                    margin='dense'
                    required
                    placeholder='Enter Welcome Message'
                    value={widgetForm?.welcomeMessage ?? ''}
                    onChange={e =>
                      setWidgetForm(prev =>
                        prev
                          ? { ...prev, welcomeMessage: e.target.value }
                          : prev
                      )
                    }
                  />
                  <div className='chat-position-card p-2'>
                    <h3 className='fs-6 fw-medium mb-3 mt-0'>
                      Chat Widget Position
                    </h3>
                    <div className='d-flex gap-2 flex-wrap'>
                      {positions.map(pos => (
                        <div
                          key={pos.value}
                          className={`position-item rounded  ${
                            widgetForm?.chatPosition === pos.value
                              ? 'active'
                              : ''
                          }`}
                          onClick={() =>
                            setWidgetForm(prev =>
                              prev ? { ...prev, chatPosition: pos.value } : prev
                            )
                          }
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
                            style={{ background: widgetForm?.[colorField.key] }}
                            onClick={() => togglePicker(colorField.key)}
                          />

                          <TextField
                            fullWidth
                            value={widgetForm?.[colorField.key]}
                            onChange={e =>
                              setWidgetForm(prev =>
                                prev
                                  ? {
                                      ...prev,
                                      [colorField.key]: e.target.value
                                    }
                                  : prev
                              )
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
                              color={widgetForm?.[colorField.key]}
                              onChange={color =>
                                setWidgetForm(prev =>
                                  prev
                                    ? { ...prev, [colorField.key]: color.hex }
                                    : prev
                                )
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
                        control={
                          <Switch
                            checked={widgetForm?.enablePhoto ?? false}
                            onClick={() =>
                              setWidgetForm(prev =>
                                prev
                                  ? {
                                      ...prev,
                                      enablePhoto: !widgetForm?.enablePhoto
                                    }
                                  : prev
                              )
                            }
                          />
                        }
                        label='Show agent photos'
                      />
                      <FormControlLabel
                        required
                        control={
                          <Switch
                            checked={widgetForm?.enableAttachment ?? false}
                            onClick={() =>
                              setWidgetForm(prev =>
                                prev
                                  ? {
                                      ...prev,
                                      enableAttachment:
                                        !widgetForm?.enableAttachment
                                    }
                                  : prev
                              )
                            }
                          />
                        }
                        label='Enable file uploads'
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={widgetForm?.enableEditOption ?? false}
                            onClick={() =>
                              setWidgetForm(prev =>
                                prev
                                  ? {
                                      ...prev,
                                      enableEditOption:
                                        !widgetForm?.enableEditOption
                                    }
                                  : prev
                              )
                            }
                          />
                        }
                        label='Enable Chat Message Edit'
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={widgetForm?.enableDeleteOption ?? false}
                            onClick={() =>
                              setWidgetForm(prev =>
                                prev
                                  ? {
                                      ...prev,
                                      enableDeleteOption:
                                        !widgetForm?.enableDeleteOption
                                    }
                                  : prev
                              )
                            }
                          />
                        }
                        label='Enable Chat Message Delete'
                      />
                    </FormGroup>
                  </div>
                  <div className='d-flex justify-content-end flex-wrap gap-3 mt-3'>
                    <Button variant='outlined'>Cancel</Button>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={saveChatWidget}
                    >
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
                {widgetForm && (
                  <ChatWidget
                    settings={{
                      chatWidgetId: widgetForm.chatWidgetId,
                      headerTitle: widgetForm.headerTitle,
                      welcomeMessage: widgetForm.welcomeMessage,
                      chatPosition: widgetForm.chatPosition,
                      headerTextColor: widgetForm.headerTextColor,
                      headerBackground: widgetForm.headerBackground,
                      agentTextColor: widgetForm.agentTextColor,
                      agentMessageBackground: widgetForm.agentMessageBackground,
                      customerTextColor: widgetForm.customerTextColor,
                      customerMessageBackground:
                        widgetForm.customerMessageBackground,
                      enablePhoto: widgetForm.enablePhoto,
                      enableAttachment: widgetForm.enableAttachment,
                      enableEmoji: widgetForm.enableEmoji,
                      enableEditOption: widgetForm.enableEditOption,
                      enableDeleteOption: widgetForm.enableDeleteOption
                    }}
                  />
                )}
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
                  value={project?.directChatLink ? project?.directChatLink : ''}
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
