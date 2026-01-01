import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Router from './utils/routes'

export default function App () {
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  )
}
