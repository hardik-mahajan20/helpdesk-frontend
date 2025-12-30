import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./app.css";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Agents from "./pages/Agents";
import Contacts from "./pages/Contacts";
import Login from "./pages/Login/Login";
import Layout from "./layouts";
import Inbox from "./pages/Inbox";
import KnowledgeBase from "./pages/KnowledgeBase";
import Reporting from "./pages/Reporting";
import Departments from "./pages/Departments";
import ProtectedRoute from "./guard/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/*" element={<PageNotFound />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/knowledge-base" element={<KnowledgeBase />} />
              <Route path="/reporting" element={<Reporting />} />
              <Route path="/department" element={<Departments />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
