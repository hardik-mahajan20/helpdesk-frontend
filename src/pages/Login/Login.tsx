/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  CircularProgress
} from '@mui/material'
import './Login.scss'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { login } from '../../services/auth-service'
import { setAuthSession } from '../../utils/storage'

export default function Login () {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please enter email and password.')
      return
    }

    try {
      setLoading(true)

      const data = await login({
        email,
        password,
        rememberMe: false,
        turnstileToken: ''
      })

      await setAuthSession(data.accessToken)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box className='auth-container auth-theme'>
      <Box className='auth-wrapper d-flex flex-column flex-lg-row'>
        <Box className='auth-image-section d-flex justify-content-center align-items-center'>
          <img
            className='main-illustration'
            src='/src/assets/images/auth-left-side-img.jpg'
            alt='Login Illustration'
          />
        </Box>

        <Box className='auth-form-section d-flex justify-content-center align-items-center'>
          <Box className='form-container'>
            <Typography variant='h5' mb={1}>
              HelpDesk
            </Typography>

            <Typography variant='body2' mb={3}>
              Login into your account
            </Typography>

            <Box component='form' onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label='Email'
                type='email'
                variant='filled'
                margin='normal'
                value={email}
                required
                placeholder='Enter your Email'
                onChange={e => setEmail(e.target.value)}
              />

              <TextField
                fullWidth
                label='Password'
                type='password'
                variant='filled'
                margin='normal'
                value={password}
                required
                placeholder='Enter your Email'
                onChange={e => setPassword(e.target.value)}
              />

              {error && (
                <Typography color='error' variant='body2' mt={1}>
                  {error}
                </Typography>
              )}

              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                mt={1}
              >
                <FormControlLabel control={<Checkbox />} label='Remember me' />
                <Typography variant='body2' color='primary'>
                  Forgot password?
                </Typography>
              </Box>

              <Button
                type='submit'
                fullWidth
                variant='contained'
                size='large'
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Login'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
