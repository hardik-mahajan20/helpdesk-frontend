import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  Select,
  OutlinedInput,
  type SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { updateAgent } from "../../services/agent-service";
import type UpdateAgentRequest from "../../interfaces/agent/update-agent-request";
import { toast } from "react-toastify";
import type { DepartmentsGet, ReportsToDropdown } from "../../interfaces";
import type { RolesDropdown } from "../../interfaces/agent/roles-dropdown";
import type { ProjectsDropdown } from "../../interfaces/agent/projects-dropdown";
import type { AgentsGetById } from "../../interfaces/agent/agent-get-by-id";
import type { AgentFormData } from "../../interfaces/agent/agent-form-data";

export default function EditAgentDialog({
  open,
  agent,
  roles,
  projects,
  departments,
  reportsTo,
  onClose,
}: {
  open: boolean;
  agent: AgentsGetById;
  roles: RolesDropdown[];
  projects: ProjectsDropdown[];
  departments: DepartmentsGet[];
  reportsTo: ReportsToDropdown[];
  onClose: () => void;
  onSubmit: () => void;
}) {
  const [form, setForm] = useState<AgentFormData>({
    name: "",
    email: "",
    chatLimit: 0,
    roleId: 0,
    status: false,
    departmentId: 0,
    reportsToId: 0,
    projectIds: [],
  });

  const handleSubmit = async () => {
    try {
      const firstAgent = agent;

      const agentProjects = (form.projectIds || []).map(
        (projectId: number) => ({
          id: projectId,
          chatAgent: true,
        }),
      );

      const payload: UpdateAgentRequest = {
        agentUserId: firstAgent.userId,
        name: firstAgent.fullName,
        email: firstAgent.email,
        role: form.roleId,
        status: true,
        chatLimit: form.chatLimit,
        department: form.departmentId,
        reportsToPerson: form.reportsToId,
        agentProjects,
        adminProjects: [],
      };

      const result = await updateAgent(payload);
      toast.success(result.messages[0]);
      onClose();
    } catch {
      toast.error("error");
    }
  };

  useEffect(() => {
    const loadAgents = async () => {
      if (agent) {
        const firstAgent = agent;

        // const projectIds = agent.map((a: Project) => a.projectId)

        setForm({
          name: firstAgent.fullName ?? "Na",
          email: firstAgent.email,
          chatLimit: firstAgent.chatLimit,
          roleId: firstAgent.roleId,
          status: firstAgent.isActive ? true : false,
          departmentId: firstAgent.departmentId,
          reportsToId: firstAgent.reportsToId,
          projectIds: firstAgent.projectId,
        });
      }
    };
    loadAgents();
  }, [agent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChatLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      chatLimit: Number(e.target.value),
    }));
  };

  const handleRoleChange = (e: SelectChangeEvent<number>) => {
    setForm((prev) => ({
      ...prev,
      roleId: Number(e.target.value),
    }));
  };

  const handleStatusChange = (e: SelectChangeEvent<boolean>) => {
    setForm((prev) => ({
      ...prev,
      status: e.target.value === "Active",
    }));
  };

  const handleDepartmentChange = (e: SelectChangeEvent<number>) => {
    setForm((prev) => ({
      ...prev,
      departmentId: Number(e.target.value),
    }));
  };

  const handleReportsToChange = (e: SelectChangeEvent<number>) => {
    setForm((prev) => ({
      ...prev,
      reportsToId: Number(e.target.value),
    }));
  };

  const handleProjectsChange = (e: SelectChangeEvent<number[]>) => {
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      projectIds:
        typeof value === "string" ? value.split(",").map(Number) : value,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit User</DialogTitle>

      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid size={12}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              disabled
              value={form.name || ""}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid size={12}>
            <TextField
              label="Email"
              name="email"
              fullWidth
              disabled
              value={form.email || ""}
              required
            />
          </Grid>

          <Grid size={12}>
            <TextField
              label="Chat Limit"
              name="chatLimit"
              type="number"
              fullWidth
              value={form.chatLimit || ""}
              onChange={handleChatLimitChange}
              required
            />
          </Grid>

          <Grid size={12}>
            <FormControl fullWidth>
              <InputLabel id="project-multiple-checkbox-label">
                Projects
              </InputLabel>

              <Select
                labelId="project-multiple-checkbox-label"
                multiple
                name="projectIds"
                value={form.projectIds ?? []}
                onChange={handleProjectsChange}
                input={<OutlinedInput label="Projects" />}
                renderValue={(selected: unknown[]) =>
                  projects
                    .filter((p: ProjectsDropdown) =>
                      selected.includes(p.projectId),
                    )
                    .map((p: ProjectsDropdown) => p.name)
                    .join(", ")
                }
              >
                {projects.map((p: ProjectsDropdown) => (
                  <MenuItem key={p.projectId} value={p.projectId}>
                    <Checkbox
                      checked={form.projectIds?.includes(p.projectId)}
                    />
                    <ListItemText primary={p.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={6}>
            <FormControl fullWidth required>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                name="roleId"
                value={form.roleId ?? ""}
                onChange={handleRoleChange}
                input={<OutlinedInput label="Role" />}
              >
                {roles.map((r: RolesDropdown) => (
                  <MenuItem key={r.id} value={r.id}>
                    {r.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={6}>
            <FormControl fullWidth required>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                name="status"
                value={form.status}
                onChange={handleStatusChange}
                input={<OutlinedInput label="Status" />}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="InActive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={6}>
            <FormControl fullWidth required>
              <InputLabel id="department-label">Department</InputLabel>
              <Select
                labelId="department-label"
                name="departmentId"
                value={form.departmentId ?? ""}
                onChange={handleDepartmentChange}
                input={<OutlinedInput label="Department" />}
              >
                {departments.map((d: DepartmentsGet) => (
                  <MenuItem key={d.id} value={d.id}>
                    {d.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={6}>
            <FormControl fullWidth required>
              <InputLabel id="reports-to-label">Reports To</InputLabel>
              <Select
                labelId="reports-to-label"
                name="reportsToId"
                value={form.reportsToId ?? ""}
                onChange={handleReportsToChange}
                input={<OutlinedInput label="Reports To" />}
              >
                {reportsTo.map((r: ReportsToDropdown) => (
                  <MenuItem key={r.id} value={r.id}>
                    {r.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
