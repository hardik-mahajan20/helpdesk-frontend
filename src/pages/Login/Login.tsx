import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  CircularProgress,
  InputAdornment,
  OutlinedInput,
  IconButton,
  FormControl,
  InputLabel,
  FilledInput
} from '@mui/material'
import './Login.scss'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { login } from '../../services/auth-service'
import { setAuthSession } from '../../utils/storage'
import EmailIcon from '@mui/icons-material/Email'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

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

  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='d-flex justify-content-center align-items-center auth-container'>
      <div className='auth-wrapper d-flex flex-column flex-lg-row'>
        <div className='auth-image-section d-flex justify-content-center align-items-center position-relative'>
          <div className='image-content text-center'>
            <img
              className='main-illustration'
              src='/src/assets/images/auth-left-side-img.jpg'
              alt='Login Illustration'
            />
          </div>
        </div>

        <div className='auth-form-section d-flex justify-content-center align-items-center m-2'>
          <div className='form-container'>
            <div className='brand-header mb-0 mb-sm-3 mb-lg-4'>
              <div className='brand-info d-flex align-items-center'>
                <div className='brand-logo'>
                  <svg
                    version='1.0'
                    xmlns='http://www.w3.org/2000/svg'
                    width='65'
                    height='70'
                    viewBox='0 0 500.000000 500.000000'
                    preserveAspectRatio='xMidYMid meet'
                  >
                    <g
                      transform='translate(0.000000,500.000000) scale(0.100000,-0.100000)'
                      className='right-hand'
                      stroke='none'
                    >
                      <path
                        d='M2645 3663 c-11 -2 -69 -18 -130 -34 -60 -17 -168 -41 -240 -53 -203
                    -36 -183 -20 -301 -257 -119 -239 -116 -232 -104 -264 15 -39 59 -55 150 -55
                    102 0 139 15 213 88 95 93 106 118 81 189 -5 12 4 7 27 -14 37 -35 60 -39 124
                    -22 76 19 92 30 103 62 8 27 10 28 11 9 2 -42 22 -63 94 -98 39 -19 77 -34 84
                    -34 7 0 36 -33 66 -72 30 -40 77 -94 105 -120 118 -110 345 -228 537 -278 63
                    -17 66 -19 30 -19 -22 0 -77 6 -122 12 -97 15 -102 29 50 -134 159 -171 325
                    -309 371 -309 12 0 36 14 54 31 30 27 33 34 27 67 -21 118 -104 441 -172 672
                    -4 13 -3 13 5 0 25 -39 226 -667 252 -787 32 -146 48 -183 82 -183 25 0 127
                    82 225 182 66 67 73 78 83 133 18 94 24 395 11 530 -14 142 -41 281 -76 391
                    -26 81 -131 301 -163 342 l-18 23 -75 -74 c-96 -92 -185 -140 -330 -176 -60
                    -16 -112 -30 -115 -34 -3 -3 -1 -14 5 -26 10 -18 8 -21 -25 -27 -76 -14 -189
                    19 -291 85 -109 70 -282 163 -396 212 -110 48 -163 58 -232 42z'
                      />
                    </g>

                    <g
                      transform='translate(0.000000,500.000000) scale(0.100000,-0.100000)'
                      className='left-hand'
                      stroke='none'
                    >
                      <path
                        d='M941 3488 c-137 -284 -198 -596 -173 -896 6 -76 18 -171 27 -211 17
                    -72 17 -72 100 -144 98 -84 260 -188 280 -180 8 2 17 21 20 41 31 197 160 582
                    250 749 31 57 34 69 -53 -197 -74 -227 -137 -448 -129 -457 3 -2 49 -22 104
                    -43 l98 -38 6 63 c3 38 16 84 32 118 32 65 149 194 183 203 38 10 120 -23 154
                    -62 16 -19 30 -38 30 -42 0 -4 4 -13 9 -21 7 -11 22 0 67 48 l58 63 68 -4 c61
                    -3 71 -7 103 -38 38 -37 55 -81 55 -147 0 -38 3 -42 33 -52 82 -27 129 -131
                    97 -215 -8 -21 -6 -26 13 -32 35 -10 86 -52 102 -84 9 -18 15 -56 15 -100 l0
                    -70 57 -63 c76 -83 107 -105 160 -113 76 -11 173 42 173 96 0 9 -14 35 -31 56
                    -33 41 -187 272 -209 314 -7 14 58 -48 146 -136 178 -180 200 -193 309 -180
                    59 7 161 41 171 57 3 6 -32 46 -79 89 -74 69 -307 362 -307 385 0 5 51 -41
                    113 -102 115 -113 257 -225 314 -249 40 -17 113 -18 166 -2 22 7 63 33 90 58
                    l50 46 -87 49 c-67 37 -107 70 -174 140 -94 98 -282 318 -282 330 0 7 16 -7
                    263 -232 135 -123 164 -144 211 -158 44 -13 62 -14 99 -4 41 10 107 59 107 79
                    0 4 -42 41 -92 83 -93 75 -313 294 -398 396 -33 39 -65 64 -120 91 -131 66
                    -273 182 -362 298 -26 34 -54 53 -131 89 l-98 46 -51 -17 c-28 -9 -64 -16 -81
                    -16 -24 0 -43 -14 -107 -83 -45 -47 -100 -95 -131 -112 -50 -28 -61 -30 -154
                    -30 -83 1 -107 4 -141 22 -84 45 -96 111 -39 214 38 67 125 245 125 254 0 15
                    -92 -11 -259 -74 l-84 -31 6 30 c4 16 3 30 -1 30 -4 0 -85 7 -180 15 -148 13
                    -183 19 -242 44 -69 29 -148 81 -184 120 -11 12 -23 21 -27 21 -5 0 -31 -46
                    -58 -102z'
                      />
                    </g>

                    <g
                      transform='translate(0.000000,500.000000) scale(0.100000,-0.100000)'
                      className='right-hand'
                      stroke='none'
                    >
                      <path
                        d='M1650 2390 c-69 -70 -120 -177 -120 -248 0 -51 3 -58 39 -92 22 -21
                    59 -44 83 -52 l44 -15 12 75 c8 48 22 91 39 119 16 25 38 61 50 81 42 69 22
                    138 -47 166 -22 9 -43 16 -46 16 -3 0 -27 -22 -54 -50z'
                      />
                      <path
                        d='M2038 2413 c-19 -5 -199 -225 -234 -286 -33 -58 -49 -160 -35 -214
                    16 -59 68 -124 121 -151 l45 -22 6 83 c8 116 31 172 115 279 113 144 131 193
                    99 263 -22 45 -64 62 -117 48z'
                      />
                      <path
                        d='M2126 2108 c-94 -113 -116 -165 -123 -283 -4 -62 -2 -104 6 -123 16
                    -38 74 -70 144 -78 l57 -7 -16 32 c-13 25 -15 54 -12 124 5 101 16 130 79 210
                    48 61 58 108 34 152 -17 33 -51 55 -83 55 -10 0 -48 -37 -86 -82z'
                      />
                      <path
                        d='M2287 1903 c-33 -35 -57 -92 -57 -136 0 -56 39 -156 77 -193 33 -34
                    34 -34 126 -34 51 0 102 3 115 7 23 6 22 7 -21 52 -83 85 -97 114 -97 202 0
                    74 -1 78 -31 103 -40 34 -78 33 -112 -1z'
                      />
                    </g>
                  </svg>
                </div>
                <h2>HelpDesk</h2>
              </div>
              <p className='brand-description d-none d-sm-block'>
                We are <span className='highlight'>experts</span> in support,
                service, resolution, & customer care.
              </p>
            </div>

            <div className='form-header mb-3 mb-lg-4'>
              <h1>Login into your account</h1>
            </div>

            <Box component='form' onSubmit={handleSubmit} className='auth-form'>
              <FormControl
                variant='filled'
                fullWidth
                margin='normal'
                sx={{
                  borderRadius: 1
                }}
              >
                <InputLabel htmlFor='filled-adornment-password'>
                  Email
                </InputLabel>
                <FilledInput
                  id='filled-adornment-password'
                  type='email'
                  required
                  value={email}
                  placeholder='Enter your Email'
                  onChange={e => setEmail(e.target.value)}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton aria-label='Enter Email' edge='end'>
                        <EmailIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <FormControl
                fullWidth
                variant='filled'
                margin='normal'
                sx={{
                  borderRadius: 1
                }}
              >
                <InputLabel htmlFor='filled-adornment-password'>
                  Password
                </InputLabel>
                <FilledInput
                  id='filled-adornment-password'
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  placeholder='Enter your Password'
                  onChange={e => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label={
                          showPassword
                            ? 'hide the password'
                            : 'display the password'
                        }
                        edge='end'
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

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
                <FormControlLabel
                  control={<Checkbox />}
                  label='Remember me'
                  className='text-color'
                />
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
          </div>
        </div>
      </div>
    </div>
  )
}
