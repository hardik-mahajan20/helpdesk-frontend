import { BrowserRouter } from 'react-router-dom'
import './App.scss'
import Router from './utils/routes'
import './theme/cssVariables.scss'
import { ThemeContextProvider } from './context/ThemeContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App () {
  return (
    <>
      <ThemeContextProvider>
        <BrowserRouter>
            <Router />
            <ToastContainer />
        </BrowserRouter>
      </ThemeContextProvider>
    </>
  )
}
