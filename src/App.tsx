import { BrowserRouter } from 'react-router-dom'
import './App.scss'
import Router from './utils/routes'
import './theme/cssVariables.scss'
import { ThemeContextProvider } from './context/ThemeContext'

export default function App () {
  return (
    <>
      <ThemeContextProvider>
        <BrowserRouter>
            <Router />
        </BrowserRouter>
      </ThemeContextProvider>
    </>
  )
}
