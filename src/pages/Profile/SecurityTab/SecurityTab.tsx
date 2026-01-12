import {
  Button,
  Card,
  CardContent,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Switch,
  Tooltip
} from '@mui/material'
import './SecurityTab.scss'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useState } from 'react'
import SecurityIcon from '@mui/icons-material/Security'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useNavigate } from 'react-router-dom'
import { changePassword } from '../../../services/profile-service'
import { logout } from '../../../services/auth-service'

export default function Profile () {
  const navigate = useNavigate()
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(true)
  const [showNewPassword, setShowNewPassword] = useState<boolean>(true)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(true)
  const [currentPassword, setCurrentPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const twoFactorOptions = [
    {
      id: 'totp',
      title: 'TOTP Authenticator',
      description: 'Use an authenticator app for 2FA',
      icon: 'security',
      enabled: false
    }
    // { id: 'passkey', title: 'Passkeys', description: 'Use biometric authentication', icon: 'fingerprint', enabled: false }
  ]
  const backupCodes: string[] = [
    'HCNT4RF9',
    'IKZB209U',
    'IKZB209U',
    'HCNT4RF9',
    'IKZB209U',
    'IKZB209U'
  ]

  const updatePassword = async () => {
    const payload = {
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword
    }
    await changePassword(payload)
    await logout()
    navigate('/')
  }
  return (
    <div className='tab-content py-3 py-sm-4 px-0'>
      <Card className='section-card mb-4'>
        <CardContent>
          <div className='security-section'>
            <h3 className='fs-4'>Password</h3>
            <div className='password-form d-flex flex-column'>
              <FormControl variant='outlined' fullWidth className='w-100 mb-3'>
                <InputLabel htmlFor='outlined-adornment-current-password'>
                  Current Password
                </InputLabel>

                <OutlinedInput
                  id='outlined-adornment-current-password'
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  label='Current Password'
                  endAdornment={
                    <InputAdornment position='end'>
                      <Tooltip title='Hardik'>
                        <IconButton
                          edge='end'
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                        >
                          {showCurrentPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl variant='outlined' fullWidth className='w-100 mb-3'>
                <InputLabel htmlFor='outlined-adornment-new-password'>
                  New Password
                </InputLabel>

                <OutlinedInput
                  id='outlined-adornment-new-password'
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  label='New Password'
                  endAdornment={
                    <InputAdornment position='end'>
                      <Tooltip title='Hardik'>
                        <IconButton
                          edge='end'
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl variant='outlined' fullWidth className='w-100 mb-3'>
                <InputLabel htmlFor='outlined-adornment-confirm-password'>
                  Confirm Password
                </InputLabel>

                <OutlinedInput
                  id='outlined-adornment-confirm-password'
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  label='Confirm Password'
                  endAdornment={
                    <InputAdornment position='end'>
                      <Tooltip title='Hardik'>
                        <IconButton
                          edge='end'
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
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
                onClick={() => updatePassword()}
              >
                Update Password
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className='section-card'>
        <CardContent>
          <div className='security-section'>
            <h3 className='fs-4'>Two-Factor Authentication</h3>
            <p className='section-description'>
              Add an extra layer of security to your account
            </p>

            <div className='two-factor-options d-flex flex-column gap-3'>
              {twoFactorOptions.map(option => (
                <div
                  className='option-card d-flex justify-content-between align-items-center p-sm-3 p-2'
                  key={option.id}
                >
                  <div className='option-content d-flex align-items-center gap-3'>
                    <div className='option-icon d-flex justify-content-center align-items-center'>
                      <SecurityIcon></SecurityIcon>
                    </div>
                    <div className='option-info'>
                      <h4>{option.title}</h4>
                      <p>{option.description}</p>
                    </div>
                  </div>
                  <div className='option-actions ms-2'>
                    <Switch />
                  </div>
                </div>
              ))}

              <div className='twofa-setup-ui mt-3 p-3 border rounded bg-light-subtle'>
                <h5 className='mb-3'>Set up Two-Factor Authentication</h5>

                <div className='d-flex flex-column flex-md-row gap-4'>
                  <div className='qr-code-section d-flex flex-column align-items-center'>
                    {/* <qrcode></qrcode> */}
                    <p className='mt-2 text-muted small'>
                      Scan this QR code using Google Authenticator
                    </p>
                  </div>

                  <div className='text-section'>
                    <p>
                      If you're unable to scan the QR code, you can manually
                      enter this secret:
                    </p>

                    <FormControl variant='outlined' className='w-100'>
                      <InputLabel
                        htmlFor='outlined-adornment-seckret-key'
                        className='mono-font'
                      >
                        Seckret Key
                      </InputLabel>

                      <OutlinedInput
                        id='outlined-adornment-seckret-key'
                        type='text'
                        readOnly
                        value={'OEIHOWACWDFJMQNVPENLV5O4DFTYWIX5'}
                        label='Seckret Key'
                        endAdornment={
                          <InputAdornment position='end'>
                            <Tooltip title='Hardik'>
                              <IconButton
                                edge='end'
                                onClick={() =>
                                  setShowCurrentPassword(!showCurrentPassword)
                                }
                              >
                                <ContentCopyIcon></ContentCopyIcon>
                              </IconButton>
                            </Tooltip>
                          </InputAdornment>
                        }
                      />
                    </FormControl>

                    <div className='mt-3 d-flex align-items-center gap-2'>
                      <FormControl variant='outlined' className='w-50'>
                        <InputLabel
                          htmlFor='outlined-adornment-six-digit-code'
                          className='mono-font'
                        >
                          Enter 6-digit code from the app
                        </InputLabel>

                        <OutlinedInput
                          id='outlined-adornment-six-digit-code'
                          type='text'
                          label='Enter 6-digit code from the app'
                          placeholder='123456'
                        />
                      </FormControl>
                      <Button variant='contained' color='primary'>
                        Verify
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className='backup-codes-section p-3 border rounded bg-light-subtle'>
                <h5 className='mb-2'>Backup Codes</h5>
                <p className='small text-muted'>
                  Save these backup codes in a safe place. You can use them when
                  your Authenticator app is unavailable.
                  <br />
                  <strong>Each code can be used only once.</strong>
                  <br />
                  <strong>
                    If you disable 2FA or regenerate backup codes, these will
                    stop working.
                  </strong>
                </p>

                <div
                  className='backup-codes-grid d-grid gap-2 mt-3'
                  style={{
                    gridTemplateColumns:
                      ' repeat(auto-fill, minmax(120px, 1fr))'
                  }}
                >
                  {backupCodes.map((code, index) => (
                    <div
                      key={index}
                      className='backup-code border p-2 text-center rounded shadow-sm'
                    >
                      {code}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
