import Login from '../pages/Login/Login'
import PageNotFound from '../pages/PageNotFound'
import ProtectedRoute from '../guard/ProtectedRoute'
import Layout from '../layouts'
import Dashboard from '../pages/Dashboard'
import Inbox from '../pages/Inbox'
import Contacts from '../pages/Contacts'
import Projects from '../pages/Projects'
import KnowledgeBase from '../pages/KnowledgeBase'
import Reporting from '../pages/Reporting'
import Departments from '../pages/Departments'
import Agents from '../pages/Agents'
import Profile from '../pages/Profile'
import Settings from '../pages/Settings'
import { Route, Routes } from 'react-router-dom'

export default function Router () {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/*' element={<PageNotFound />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/inbox' element={<Inbox />} />
            <Route path='/contacts' element={<Contacts />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/knowledge-base' element={<KnowledgeBase />} />
            <Route path='/reporting' element={<Reporting />} />
            <Route path='/department' element={<Departments />} />
            <Route path='/agents' element={<Agents />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/settings' element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}
