import { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import SettingsIcon from "@mui/icons-material/Settings";
import "./Profile.scss";

function TabPanel({ value, index, children }: any) {
  return value === index ? <Box sx={{ mt: 3 }}>{children}</Box> : null;
}

export default function Profile() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className="profile-container h-100 p-2 p-lg-3">
      <div className="profile-header d-flex justify-content-between align-items-start mb-3 pb-3">
        <div className="header-left">
          <h1 className="page-title fs-2">Profile</h1>
          <p className="page-subtitle m-0">
            Manage your account information and preferences
          </p>
        </div>
      </div>

      <Paper elevation={0}>
        <Tabs
          variant="fullWidth"
          value={tabIndex}
          onChange={(_, newValue) => setTabIndex(newValue)}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab icon={<PersonIcon />} iconPosition="start" label="Profile" />
          <Tab icon={<LockIcon />} iconPosition="start" label="Security" />
          <Tab icon={<SettingsIcon />} iconPosition="start" label="Settings" />
        </Tabs>

        <TabPanel value={tabIndex} index={0}>
          <Paper variant="outlined">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell width="30%">Full Name</TableCell>
                  <TableCell>Harsh Kumar</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>harsh@example.com</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Role</TableCell>
                  <TableCell>Administrator</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell>Active</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </TabPanel>

        <TabPanel value={tabIndex} index={1}>
          <Typography variant="body1">
            Security settings (change password, 2FA, sessions)
          </Typography>
        </TabPanel>

        <TabPanel value={tabIndex} index={2}>
          <Typography variant="body1">
            User preferences and application settings
          </Typography>
        </TabPanel>
      </Paper>
    </div>
  );
}
