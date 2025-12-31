import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import './PageNotFound.css'

export default function PageNotFound () {
  const navigate = useNavigate()

  return (
    <div className='d-flex flex-column justify-content-center align-items-center text-center mx-auto'>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist or has been moved.</p>
      <Button variant='contained' onClick={() => navigate('/dashboard')}>
        Go to Home
      </Button>
    </div>
  )
}
