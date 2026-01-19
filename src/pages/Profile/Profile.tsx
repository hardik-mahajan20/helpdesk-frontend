import { useState } from 'react'
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Tooltip,
  IconButton,
  Button
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import LockIcon from '@mui/icons-material/Lock'
import SettingsIcon from '@mui/icons-material/Settings'
import './Profile.scss'
import SecurityTab from './SecurityTab'
import { useProfileSelectionStore } from '../../services/profile-selection-service'
import type { UserProfileResponse } from '../../interfaces/profile'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import { updateProfile } from '../../services/profile-service'

function TabPanel ({ value, index, children }: any) {
  return value === index ? <Box sx={{ mt: 3 }}>{children}</Box> : null
}
type ProfileForm = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  reportsToName: string
  reportsToEmail: string
}

export default function Profile () {
  const [tabIndex, setTabIndex] = useState(0)

  const { getProfile } = useProfileSelectionStore()

  const [profileData, setProfileData] = useState<UserProfileResponse | null>(
    null
  )
  const [profileForm, setProfileForm] = useState<ProfileForm>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    reportsToName: '',
    reportsToEmail: ''
  })

  useState(() => {
    const loadProfile = async () => {
      const profile = await getProfile()
      if (!profile) return
      setProfileData(profile)
      setProfileForm({
        firstName: profile.firstName ?? '',
        lastName: profile.lastName ?? '',
        email: profile.email ?? '',
        phoneNumber: profile.phoneNumber ?? '',
        reportsToName: profile.reportsToPersonName ?? '',
        reportsToEmail: profile.reportsToPersonEmail ?? ''
      })
    }
    loadProfile()
  })

  const saveUserData = async (): Promise<void> => {
    const payload = {
      firstName: profileForm.firstName,
      lastName: profileForm.lastName,
      email: profileForm.email,
      phoneNumber: profileForm.phoneNumber
    }
    await updateProfile(payload)
  }

  const handleChange =
    (field: keyof ProfileForm) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setProfileForm(prev => ({
        ...prev,
        [field]: event.target.value
      }))
    }

  return (
    <div className='profile-container h-100 p-2 p-lg-3'>
      <div className='profile-header d-flex justify-content-between align-items-start mb-3 pb-3'>
        <div className='header-left'>
          <h1 className='page-title fs-2'>Profile</h1>
          <p className='page-subtitle m-0'>
            Manage your account information and preferences
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
          <Tab icon={<PersonIcon />} iconPosition='start' label='Profile' />
          <Tab icon={<LockIcon />} iconPosition='start' label='Security' />
          <Tab icon={<SettingsIcon />} iconPosition='start' label='Settings' />
        </Tabs>

        <TabPanel value={tabIndex} index={0}>
          <Paper variant='outlined'>
            <div className='tab-content py-3 py-sm-4 px-0'>
              <Card className='section-card'>
                <CardContent>
                  <div className='profile-info flex-wrap d-flex flex-column flex-lg-row align-items-lg-start gap-4'>
                    <div className='avatar-section d-flex flex-column align-items-center flex-sm-row align-items-sm-start gap-3'>
                      <div className='avatar-container d-flex flex-column align-items-center position-relative'>
                        <div className='avatar-wrapper position-relative'>
                          {/* @if(!imageLoadFailed && (previewImageUrl || profileData()?.avatarUrl)) {
              <img
                [src]="previewImageUrl || profileData()?.avatarUrl"
                alt="Profile Avatar"
                className="avatar-img"
                (error)="onImageError()"
              />
              } @else { */}
                          <div className='avatar-initials w-100 h-100 d-flex justify-content-center align-items-center'>
                            HM
                          </div>
                          {/* } */}
                        </div>
                        <input
                          type='file'
                          id='avatarInput'
                          accept='image/*'
                          hidden
                        />
                        <label className='camera-btn d-flex justify-content-center align-items-center text-white position-absolute'>
                          <PhotoCameraIcon>
                          </PhotoCameraIcon>
                        </label>
                      </div>
                      <div className='user-info text-center text-sm-start mt-3 mt-sm-0 ms-sm-3'>
                        <h3>
                          {profileData?.firstName} {profileData?.lastName}
                        </h3>
                        <p className='user-email'>{profileData?.email}</p>
                        <span className='user-role'>
                          {profileData?.roleName}
                        </span>
                        {profileData?.roleName && (
                          <span className='user-role ms-2'>
                            {profileData?.department}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className='form-section flex-grow-1'>
                      <div className='form-row mb-3 gap-3 align-items-start justify-content-between'>
                        <FormControl variant='outlined' className='mb-1 flex-1'>
                          <InputLabel
                            htmlFor='outlined-adornment-first-name'
                            className='mono-font'
                          >
                            First Name
                          </InputLabel>

                          <OutlinedInput
                            id='outlined-adornment-first-name'
                            type='text'
                            required
                            value={profileForm.firstName}
                            onChange={handleChange('firstName')}
                            label='First Name'
                            endAdornment={
                              <InputAdornment position='end'>
                                <Tooltip title='User First Name'>
                                  <IconButton edge='end' />
                                </Tooltip>
                              </InputAdornment>
                            }
                          />
                        </FormControl>

                        <FormControl variant='outlined' className='mb-1 '>
                          <InputLabel
                            htmlFor='outlined-adornment-last-name'
                            className='mono-font'
                          >
                            Last Name
                          </InputLabel>

                          <OutlinedInput
                            id='outlined-adornment-last-name'
                            type='text'
                            required
                            value={profileForm.lastName}
                            onChange={handleChange('lastName')}
                            label='Last Name'
                            endAdornment={
                              <InputAdornment position='end'>
                                <Tooltip title='User Last Name'>
                                  <IconButton edge='end' />
                                </Tooltip>
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                      </div>
                      <div className='form-row mb-3 gap-3 align-items-start justify-content-between'>
                        <FormControl variant='outlined' className='mb-1'>
                          <InputLabel
                            htmlFor='outlined-adornment-email'
                            className='mono-font'
                          >
                            Email
                          </InputLabel>

                          <OutlinedInput
                            id='outlined-adornment-email'
                            type='text'
                            required
                            value={profileForm.email}
                            onChange={handleChange('email')}
                            label='Email'
                            endAdornment={
                              <InputAdornment position='end'>
                                <Tooltip title='User Email'>
                                  <IconButton edge='end' />
                                </Tooltip>
                              </InputAdornment>
                            }
                          />
                        </FormControl>

                        <FormControl variant='outlined' className='mb-1'>
                          <InputLabel
                            htmlFor='outlined-adornment-phone'
                            className='mono-font'
                          >
                            Phone
                          </InputLabel>

                          <OutlinedInput
                            id='outlined-adornment-phone'
                            type='text'
                            required
                            value={profileForm.phoneNumber}
                            onChange={handleChange('phoneNumber')}
                            label='Phone'
                            endAdornment={
                              <InputAdornment position='end'>
                                <Tooltip title='User Phone Number'>
                                  <IconButton edge='end' />
                                </Tooltip>
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                      </div>
                      <div className='form-row mb-3 gap-3 align-items-start justify-content-between'>
                        <FormControl variant='outlined' className='mb-1'>
                          <InputLabel
                            htmlFor='outlined-adornment-reports-to'
                            className='mono-font'
                          >
                            Reports To (Name)
                          </InputLabel>

                          <OutlinedInput
                            id='outlined-adornment-reports-to'
                            type='text'
                            readOnly
                            value={profileForm.reportsToName}
                            label='Reports To (Name)'
                            endAdornment={
                              <InputAdornment position='end'>
                                <Tooltip title='User Reports to name'>
                                  <IconButton edge='end' />
                                </Tooltip>
                              </InputAdornment>
                            }
                          />
                        </FormControl>

                        <FormControl variant='outlined' className='mb-1'>
                          <InputLabel
                            htmlFor='outlined-adornment-reports-to-email'
                            className='mono-font'
                          >
                            Reports To (Email)
                          </InputLabel>

                          <OutlinedInput
                            id='outlined-adornment-reports-to-email'
                            type='text'
                            readOnly
                            value={profileForm.reportsToEmail}
                            label='Reports To (Email)'
                            endAdornment={
                              <InputAdornment position='end'>
                                <Tooltip title='User Reports to email'>
                                  <IconButton edge='end' />
                                </Tooltip>
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                      </div>
                      <div className='form-actions d-flex justify-content-end'>
                        <Button
                          variant='contained'
                          color='primary'
                          onClick={() => saveUserData()}
                        >
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Paper>
        </TabPanel>

        <TabPanel value={tabIndex} index={1}>
          <SecurityTab></SecurityTab>
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
