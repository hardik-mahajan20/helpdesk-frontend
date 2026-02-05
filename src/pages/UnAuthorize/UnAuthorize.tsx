import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function UnAuthorize () {
  const navigate = useNavigate()

  return (
    <div className='d-flex flex-column justify-content-center align-items-center text-center mx-auto'>
      <h1>401</h1>
      <h2>You are un UnAuthorize to access this</h2>
      <p>The page you are looking for not authorize for you.</p>
      <Button variant='contained' onClick={() => navigate('/dashboard')}>
        Go to Home
      </Button>
    </div>
  )
}
