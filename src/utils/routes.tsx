import PageNotFound from "../pages/PageNotFound";
import Layout from "../layouts";
import Dashboard from "../pages/Dashboard";
import Inbox from "../pages/Inbox";
import Contacts from "../pages/Contacts";
import Projects from "../pages/Projects";
import KnowledgeBase from "../pages/KnowledgeBase";
import Reporting from "../pages/Reporting";
import Departments from "../pages/Departments";
import Agents from "../pages/Agents";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import { AuthGuard } from "../guard/auth-guard";
import { RoleGuard } from "../guard/role-guard";
import { Roles } from "../enums";
import UnAuthorize from "../pages/UnAuthorize";

export default function Router() {
  return (
    <>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="unauthorized" element={<UnAuthorize />} />

        {/* Authenticated */}
        <Route element={<AuthGuard />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/knowledge-base" element={<KnowledgeBase />} />
            <Route path="/reporting" element={<Reporting />} />
            {/* Authorized */}
            <Route
              element={
                <RoleGuard allowedRoles={[Roles.SuperAdmin, Roles.Admin]} />
              }
            >
              <Route path="/agents" element={<Agents />} />
              <Route path="/department" element={<Departments />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/projects" element={<Projects />} />
            </Route>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
        {/* 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
