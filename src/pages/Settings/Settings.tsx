import { useEffect, useState } from 'react'
import {
  Box,
  Tabs,
  Tab,
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
  Tooltip,
  MenuItem,
  Card,
  Select
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
import FolderIcon from '@mui/icons-material/Folder'
import NotificationsIcon from '@mui/icons-material/Notifications'
import EmailIcon from '@mui/icons-material/Email'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import ChatWidget from '../ChatWidget'
import {
  createChatShortCut,
  deleteChatShortCut,
  getChatShortCutMessages,
  getChatWidgetByProjectId,
  getProjectById,
  toggleChatShortCutVisibility,
  updateChatShortCut,
  updateChatWidgetSetting,
  updateProjectDetails
} from '../../services/settings-service'
import type {
  ChatShortCutCreate,
  ChatShortCutMessages,
  ChatWidgetSettingsDto,
  ProjectDetailsRequestDTO,
  ShortCutMessage,
  UpdateChatWidgetRequestDTO
} from '../../interfaces'
import { useProjectSelectionStore } from '../../services/project-selection-service'
import { useNavigate } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import CancelIcon from '@mui/icons-material/Cancel'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { VisibilityOff } from '@mui/icons-material'
import { useProfileSelectionStore } from '../../services/profile-selection-service'
import SaveIcon from '@mui/icons-material/Save'
import ConfirmDeleteDialog from '../../core/components/ConfirmationDialog'
import { toast } from 'react-toastify'
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
  const [chatShortCutForm, setChatShortCutForm] = useState<
    ChatShortCutMessages[]
  >([])

  const [tabIndex, setTabIndex] = useState(0)

  const [project, setProject] = useState<ProjectDetailsRequestDTO>()
  const [originalProject, setOriginalProject] =
    useState<ProjectDetailsRequestDTO>()
  const [, setChatWidget] = useState<ChatWidgetSettingsDto>()

  const [activePicker, setActivePicker] = useState<string | null>(null)
  const [, setChatShortCutMessages] = useState<ChatShortCutMessages[]>([])
  const [currentUserId, setCurrentUserId] = useState<number>(0)

  const togglePicker = (key: string) => {
    setActivePicker(prev => (prev === key ? null : key))
  }

  const linkValue = project?.directChatLink
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
    if (!linkValue) return
    await navigator.clipboard.writeText(linkValue)
    setCopied(true)

    setTimeout(() => setCopied(false), 1500)
    toast.success('Copied : Direct Chat Link')
  }
  const handleCodeCopy = async () => {
    if (!linkValue) return
    await navigator.clipboard.writeText(linkValue)
    setCopied(true)

    setTimeout(() => setCopied(false), 1500)
    toast.success('Copied : Widget Code')
  }
  const handleEmailCopy = async () => {
    if (!linkValue) return
    await navigator.clipboard.writeText(linkValue)
    setCopied(true)

    setTimeout(() => setCopied(false), 1500)
    toast.success('Copied : Ticket Forwarding Email')
  }

  const selectedProjectId = useProjectSelectionStore(
    state => state.selectedProjectId
  )

  useEffect(() => {
    const loadProject: () => Promise<void> = async () => {
      try {
        setProject(
          (await getProjectById<ProjectDetailsRequestDTO>(selectedProjectId))
            .data
        )
        setOriginalProject(
          (await getProjectById<ProjectDetailsRequestDTO>(selectedProjectId))
            .data
        )
      } catch (error) {
        console.error(error)
      }
    }
    const loadChatWidget = async () => {
      try {
        const data = (
          await getChatWidgetByProjectId<ChatWidgetSettingsDto>(
            selectedProjectId
          )
        ).data
        const chatShortCutMessages = (
          await getChatShortCutMessages<ChatShortCutMessages[]>(
            selectedProjectId
          )
        ).data

        setChatWidget(data)
        setChatShortCutMessages(chatShortCutMessages)
        setWidgetForm(data)
        setChatShortCutForm(chatShortCutMessages)
        setCurrentUserId(getCurrentUserId())
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

  const getCurrentUserId = useProfileSelectionStore(
    state => state.getCurrentUserId
  )

  const navigate = useNavigate()

  const saveChatWidget = async () => {
    const formValue = widgetForm
    const payload: UpdateChatWidgetRequestDTO = {
      projectId: selectedProjectId,
      widgetSetting: JSON.stringify(formValue)
    }
    var result: any = await updateChatWidgetSetting(payload)
    toast.success(result.messages[0])
  }
  const saveProjectSettings = async () => {
    try {
      if (!project) return

      setOriginalProject(project)

      const toggleSettings = {
        enableNewChatNotifications:
          project?.enableNewChatNotifications || false,
        enableEmailNotifications: project?.enableEmailNotifications || false,
        enableSoundNotifications: project?.enableSoundNotifications || false
      }

      const payload = {
        Id: selectedProjectId,
        Name: project?.projectName.toString(),
        Description: project?.description.toString(),
        LiveProjectUrl: project?.projectURL.toString(),
        Settings: JSON.stringify(toggleSettings),
        IsProjectEnable: project?.projectStatus,
        IsPreChatFormEnable: project?.preChatFormEnabled
      }

      var result: any = await updateProjectDetails(payload)
      toast.success(result.messages[0])
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong')
    }
  }
  const cancelProjectSetting = () => {
    setProject(originalProject)
  }
  const saveShortCut = async () => {
    const updatedData = {
      id: newShortcut.id,
      projectId: selectedProjectId,
      shortCutKey: newShortcut.shortCutKey,
      shortCutMessage: newShortcut.shortCutMessage,
      isPublic: newShortcut.isPublic
    }
    await updateChatShortCut(updatedData)
    toast.success('Chat ShortCut updated successfully')

    setChatShortCutForm(prev =>
      prev.map(shortcut =>
        shortcut.id === updatedData.id
          ? { ...shortcut, ...updatedData }
          : shortcut
      )
    )
    setNewShortcut(DEFAULT_SHORTCUT)
    setIsEditing(false)
  }
  const addShortCut = async () => {
    const shortcut: ChatShortCutCreate = {
      projectId: selectedProjectId,
      shortCutKey: newShortcut.shortCutKey,
      shortCutMessage: newShortcut.shortCutMessage,
      isPublic: true
    }
    const createdShortcut: ChatShortCutMessages = (
      await createChatShortCut(shortcut)
    ).data
    toast.success('Chat ShortCut created successfully.')

    setChatShortCutForm(prev =>
      [...prev, createdShortcut].sort((a, b) => b.id - a.id)
    )
    setNewShortcut(DEFAULT_SHORTCUT)
  }

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false)
  const [selectedShortcut, setSelectedShortcut] =
    useState<ShortCutMessage | null>(null)
  const DEFAULT_SHORTCUT: ShortCutMessage = {
    id: 0,
    projectId: 0,
    shortCutKey: '',
    shortCutMessage: '',
    isPublic: true
  }
  const [newShortcut, setNewShortcut] =
    useState<ShortCutMessage>(DEFAULT_SHORTCUT)

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false)
  }

  const handleConfirmDelete = async (): Promise<void> => {
    if (!selectedShortcut) return
    await deleteChatShortCut(selectedShortcut.id)
    toast.success('Chat shortcut deleted successfully')

    setChatShortCutForm(prev =>
      prev.filter(shortcut => shortcut.id !== selectedShortcut.id)
    )
    setIsDeleteDialogOpen(false)
    setSelectedShortcut(null)
  }

  const handleDeleteShortcut = (id: number): void => {
    const index = chatShortCutForm.findIndex(s => s.id === id)
    if (index === -1) return
    const currentShortCut = chatShortCutForm[index]
    setSelectedShortcut(currentShortCut)
    setIsDeleteDialogOpen(true)
  }

  const editShortCut = (id: number): void => {
    const index = chatShortCutForm.findIndex(s => s.id === id)
    if (index === -1) return
    const currentShortCut = chatShortCutForm[index]
    setNewShortcut(currentShortCut)
    setIsEditing(true)
  }

  const toggleShortCutVisibility = async (id: number): Promise<void> => {
    var result = await toggleChatShortCutVisibility(id)
    toast.success(result.messages[0])
    setChatShortCutForm(prev =>
      prev.map(shortcut =>
        shortcut.id === id
          ? { ...shortcut, isPublic: !shortcut.isPublic }
          : shortcut
      )
    )
  }

  return (
    <div className='settings-container h-100 p-2 p-lg-4'>
      <div className='settings-header d-flex justify-content-between align-items-start mb-3 pb-3'>
        <div className='header-left'>
          <h1 className='page-title fs-2'>Settings</h1>
          <p className='page-subtitle'>
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
          <Tab
            icon={<ChatIcon color='primary' />}
            iconPosition='start'
            label='Chat Widget'
          />
          <Tab
            icon={<ContentCutIcon color='primary' />}
            iconPosition='start'
            label='ShortCut Messages'
          />
          <Tab
            icon={<SettingsIcon color='primary' />}
            iconPosition='start'
            label='General Settings'
          />
        </Tabs>

        <TabPanel value={tabIndex} index={0}>
          <div className='p-1'>
            <div className='d-flex flex-row xxl-flex-column gap-3 py-0 my-4'>
              <div className='card d-flex flex-column gap-3 w-50'>
                <div className='d-flex justify-content-between align-items-center'>
                  <div className='d-flex align-items-center gap-1'>
                    <PaletteIcon
                      className='d-none d-sm-inline'
                      color='primary'
                    />
                    <h1 className='title fw-medium fs-4 my-0'>
                      Widget Appearance
                    </h1>
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
                    <h3 className='fs-6 fw-medium mb-3 mt-0 '>
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
                        <label className='fw-medium small text-color'>
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
                        className='toggle-text'
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
                        className='toggle-text'
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
                        className='toggle-text'
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
                        className='toggle-text'
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
                <CodeIcon color='primary' />
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
                          <ContentCopyIcon color='primary' />
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
                          <ContentCopyIcon color='primary' />
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
          <div className='card d-flex flex-column gap-3 mt-4 card new-shortcut-container'>
            <div className='d-flex align-items-center gap-1'>
              <ContentCutIcon color='primary'></ContentCutIcon>
              <h1 className='fw-medium fs-4 mx-0 title'>Shortcut Messages</h1>
            </div>
            <div className='d-flex flex-column gap-3'>
              <div className='d-flex flex-wrap align-items-start gap-3'>
                <TextField
                  label='Title'
                  type='text'
                  variant='outlined'
                  margin='dense'
                  required
                  placeholder='Enter shortcut title'
                  value={newShortcut?.shortCutKey ?? ''}
                  onChange={e =>
                    setNewShortcut(prev =>
                      prev ? { ...prev, shortCutKey: e.target.value } : prev
                    )
                  }
                  className='field'
                />
                <TextField
                  label=''
                  type='text'
                  variant='outlined'
                  margin='dense'
                  required
                  placeholder='Enter shortcut message'
                  value={newShortcut?.shortCutMessage ?? ''}
                  onChange={e =>
                    setNewShortcut(prev =>
                      prev ? { ...prev, shortCutMessage: e.target.value } : prev
                    )
                  }
                  className='field'
                />
                <TextField
                  select
                  label='Visibility'
                  variant='outlined'
                  margin='dense'
                  value={newShortcut?.isPublic ?? true}
                  onChange={e =>
                    setNewShortcut(prev =>
                      prev
                        ? { ...prev, isPublic: e.target.value === 'true' }
                        : prev
                    )
                  }
                  className='field'
                >
                  <MenuItem value='true'>Public</MenuItem>
                  <MenuItem value='false'>Private</MenuItem>
                </TextField>
              </div>
              <div className='d-flex align-items-center justify-content-start gap-3'>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={isEditing ? saveShortCut : addShortCut}
                  className='add-shortcut'
                  startIcon={
                    isEditing ? <SaveIcon></SaveIcon> : <AddIcon></AddIcon>
                  }
                >
                  {isEditing ? 'Save Changes' : 'Add ShortCut'}
                </Button>
                <Button
                  variant='contained'
                  className='add-shortcut'
                  startIcon={<CancelIcon></CancelIcon>}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>

          <div className='mt-4 pe-2 shortcut-list-container'>
            <div className='d-flex flex-column gap-3'>
              {chatShortCutForm.map(
                shortcut =>
                  (shortcut.isPublic === true ||
                    shortcut.userId === currentUserId) && (
                    <Card key={shortcut.id} className='shortcut-card'>
                      <div className='d-flex justify-content-between align-items-center mb-2 shortcut-card-header'>
                        <h3 className='shortcut-title'>
                          {shortcut.shortCutKey}
                          {!shortcut.isPublic && '(Visible to you only)'}
                        </h3>
                        {shortcut.userId === currentUserId && (
                          <div className='d-flex align-items-center justify-content-end gap-3'>
                            <IconButton
                              edge='end'
                              onClick={() =>
                                toggleShortCutVisibility(shortcut.id)
                              }
                              color='primary'
                            >
                              {shortcut.isPublic ? (
                                <VisibilityIcon color='primary' />
                              ) : (
                                <VisibilityOff color='primary' />
                              )}
                            </IconButton>
                            <IconButton
                              edge='end'
                              onClick={() => editShortCut(shortcut.id)}
                              color='primary'
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              edge='end'
                              onClick={() => handleDeleteShortcut(shortcut.id)}
                              color='primary'
                            >
                              <DeleteIcon color='primary' />
                            </IconButton>
                          </div>
                        )}
                      </div>
                      <p className='shortcut-message'>
                        {shortcut.shortCutMessage}
                      </p>
                    </Card>
                  )
              )}
            </div>
          </div>
        </TabPanel>

        <TabPanel value={tabIndex} index={2}>
          <div className='card mt-4'>
            <div className='project-info-card d-flex flex-column gap-3'>
              <div className='d-flex align-items-center gap-1'>
                <FolderIcon color='primary'></FolderIcon>
                <h1 className='title fw-medium fs-4 mx-0'>Project Settings</h1>
              </div>

              <div className='project-info-layout'>
                <div className='project-image-wrapper'>
                  {project?.projectImage ? (
                    <img
                      src={project?.projectImage}
                      alt='Project Image'
                      className='project-image'
                    />
                  ) : (
                    <div className='project-image avatar-initials d-flex justify-content-center align-items-center'>
                      {project?.projectName?.[0]
                        ? project?.projectName?.[0]
                        : ''}
                    </div>
                  )}
                  {/* Upload Button */}
                  <div className='image-label'>Project Image</div>
                  <label className='upload-icon'>
                    <input type='file' accept='image/*' />
                    <AddAPhotoIcon></AddAPhotoIcon>
                  </label>
                </div>

                {/* Project Fields */}
                <div className='project-fields d-flex flex-column gap-3 flex-fill'>
                  <div className='field-row d-flex gap-3 flex-wrap'>
                    <FormControl
                      variant='outlined'
                      className='field flex-fill min-w-200px'
                    >
                      <InputLabel htmlFor='outlined-adornment-project-name'>
                        Project Name
                      </InputLabel>
                      <OutlinedInput
                        id='outlined-adornment-project-name'
                        type='text'
                        value={project?.projectName ? project?.projectName : ''}
                        label='Project Name'
                        onChange={e =>
                          setProject(prev =>
                            prev
                              ? { ...prev, projectName: e.target.value }
                              : prev
                          )
                        }
                      />
                    </FormControl>
                    <FormControl
                      variant='outlined'
                      className='field'
                      margin='dense'
                      required
                    >
                      <InputLabel id='project-status-label'>
                        Project Status
                      </InputLabel>

                      <Select
                        labelId='project-status-label'
                        label='Project Status'
                        value={project?.projectStatus ? 'true' : 'false'}
                        onChange={e =>
                          setProject(prev =>
                            prev
                              ? {
                                  ...prev,
                                  projectStatus: e.target.value === 'true'
                                }
                              : prev
                          )
                        }
                      >
                        <MenuItem value='true'>Active</MenuItem>
                        <MenuItem value='false'>Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className='field-row d-flex gap-3 flex-wrap'>
                    <FormControl
                      variant='outlined'
                      className='field flex-fill min-w-200px'
                    >
                      <InputLabel htmlFor='outlined-adornment-project-code'>
                        Project Code
                      </InputLabel>
                      <OutlinedInput
                        id='outlined-adornment-project-code'
                        type='text'
                        value={project?.projectCode ? project?.projectCode : ''}
                        label='Project Code'
                        readOnly
                        disabled
                      />
                    </FormControl>
                    <FormControl
                      variant='outlined'
                      className='field flex-fill min-w-200px'
                    >
                      <InputLabel htmlFor='outlined-adornment-property-url'>
                        Property URL
                      </InputLabel>
                      <OutlinedInput
                        id='outlined-adornment-property-url'
                        type='text'
                        value={project?.projectURL ? project?.projectURL : ''}
                        label='Property URL'
                        onChange={e =>
                          setProject(prev =>
                            prev
                              ? { ...prev, projectURL: e.target.value }
                              : prev
                          )
                        }
                      />
                    </FormControl>
                    <FormControl
                      variant='outlined'
                      className='field'
                      margin='dense'
                      required
                    >
                      <InputLabel id='project-pre-chat-status-label'>
                        PreChat Form
                      </InputLabel>

                      <Select
                        labelId='project-pre-chat-status-label'
                        value={project?.preChatFormEnabled ? 'true' : 'false'}
                        label='PreChat Form'
                        onChange={e =>
                          setProject(prev =>
                            prev
                              ? {
                                  ...prev,
                                  preChatFormEnabled: e.target.value === 'true'
                                }
                              : prev
                          )
                        }
                      >
                        <MenuItem value='true'>Active</MenuItem>
                        <MenuItem value='false'>Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <FormControl variant='outlined' className='field full-width'>
                    <InputLabel htmlFor='outlined-adornment-description'>
                      Description
                    </InputLabel>
                    <OutlinedInput
                      multiline
                      rows={2}
                      id='outlined-adornment-description'
                      type='text'
                      value={project?.description ? project?.description : ''}
                      label='Description'
                      onChange={e =>
                        setProject(prev =>
                          prev ? { ...prev, description: e.target.value } : prev
                        )
                      }
                    />
                  </FormControl>
                </div>
              </div>
            </div>
            <div className='mt-3 d-flex flex-column gap-3'>
              <div className='d-flex align-items-center gap-1'>
                <NotificationsIcon color='primary'></NotificationsIcon>
                <h1 className='title fw-medium fs-4 mx-0'>
                  Notification Settings
                </h1>
              </div>
              <div className='d-flex align-self-center justify-content-between gap-3 w-100'>
                <div className='d-flex flex-column gap-1'>
                  <h6 className='m-0 toggle-text'>New Chat Notifications</h6>
                  <p className='m-0 toggle-text'>
                    Get notified when new chats arrive
                  </p>
                </div>
                <div className='notification toggle'>
                  <Switch
                    checked={project?.enableNewChatNotifications ?? false}
                    onChange={e =>
                      setProject(prev =>
                        prev
                          ? {
                              ...prev,
                              enableNewChatNotifications: e.target.checked
                            }
                          : prev
                      )
                    }
                  />
                </div>
              </div>
              <div className='d-flex align-self-center justify-content-between gap-3 w-100'>
                <div className='d-flex flex-column gap-1'>
                  <h6 className='m-0 toggle-text'>Email Notifications</h6>
                  <p className='m-0 toggle-text'>
                    Receive notifications via email
                  </p>
                </div>
                <div className='notification toggle'>
                  <Switch
                    checked={project?.enableEmailNotifications ?? false}
                    onChange={e =>
                      setProject(prev =>
                        prev
                          ? {
                              ...prev,
                              enableEmailNotifications: e.target.checked
                            }
                          : prev
                      )
                    }
                  />
                </div>
              </div>
              <div className='d-flex align-self-center justify-content-between gap-3 w-100'>
                <div className='d-flex flex-column gap-1'>
                  <h6 className='m-0 toggle-text'>Sound Notifications</h6>
                  <p className='m-0 toggle-text'>Play sound for new messages</p>
                </div>
                <div className='notification toggle'>
                  <Switch
                    checked={project?.enableSoundNotifications ?? false}
                    onChange={e =>
                      setProject(prev =>
                        prev
                          ? {
                              ...prev,
                              enableSoundNotifications: e.target.checked
                            }
                          : prev
                      )
                    }
                  />
                </div>
              </div>

              <div className='d-flex justify-content-end flex-wrap gap-3'>
                <Button variant='outlined' onClick={cancelProjectSetting}>
                  Cancel
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={saveProjectSettings}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
          <div className='mt-4 card d-flex flex-column gap-3'>
            <div className='d-flex align-items-center gap-1'>
              <EmailIcon color='primary'></EmailIcon>

              <h1 className='title fw-medium fs-4 mx-0'>Email Integration</h1>
            </div>
            <FormControl variant='outlined' fullWidth>
              <InputLabel htmlFor='outlined-adornment-ticket-forwarding-email'>
                Ticket Forwarding Email
              </InputLabel>

              <OutlinedInput
                id='outlined-adornment-ticket-forwarding-email'
                type='text'
                value={
                  project?.ticketForwardingEmail
                    ? project?.ticketForwardingEmail
                    : ''
                }
                readOnly
                label='Ticket Forwarding Email'
                endAdornment={
                  <InputAdornment position='end'>
                    <Tooltip title={copied ? 'Copied!' : 'Copy'}>
                      <IconButton edge='end' onClick={handleEmailCopy}>
                        <ContentCopyIcon color='primary' />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
        </TabPanel>
      </Paper>
      <ConfirmDeleteDialog
        open={isDeleteDialogOpen}
        title='Delete Shortcut'
        description={`Are you sure you want to delete this shortcut?`}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
