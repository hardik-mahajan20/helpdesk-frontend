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
  OutlinedInput
} from '@mui/material'
import { useEffect, useState } from 'react'
import { updateAgent } from '../../services/agent-service'
import type UpdateAgentRequest from '../../interfaces/agent/update-agent-request'

export default function EditAgentDialog ({
  open,
  agent,
  roles,
  projects,
  departments,
  reportsTo,
  onClose
}: any) {
  const [form, setForm] = useState<any>({})

  const handleSubmit = async () => {
    try {
      const firstAgent = agent[0]

      const agentProjects = (form.projectIds || []).map(
        (projectId: number) => ({
          id: projectId,
          chatAgent: true
        })
      )

      const payload: UpdateAgentRequest = {
        agentUserId: firstAgent.userId,
        name: firstAgent.fullName,
        email: firstAgent.email,
        role: form.roleId,
        status: form.status === 'Active',
        chatLimit: form.chatLimit,
        department: form.departmentId,
        reportsToPerson: form.reportsToId,
        agentProjects,
        adminProjects: []
      }

      console.log(payload)
      await updateAgent(payload)
      onClose()
    } catch (error) {
      console.error('Failed to invite agent', error)
    }
  }

  useEffect(() => {
    if (agent) {
      const firstAgent = agent[0]

      const projectIds = agent.map((a: any) => a.projectId)

      setForm({
        name: firstAgent.fullName ?? 'Na',
        email: firstAgent.email,
        chatLimit: firstAgent.chatLimit,
        roleId: firstAgent.roleId,
        status: firstAgent.isActive ? 'Active' : 'InActive',
        departmentId: firstAgent.departmentId,
        reportsToId: firstAgent.reportsToId,
        projectIds: projectIds
      })
    }
  }, [agent])

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>Edit User</DialogTitle>

      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid size={12}>
            <TextField
              label='Name'
              name='name'
              fullWidth
              disabled
              value={form.name || ''}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid size={12}>
            <TextField
              label='Email'
              name='email'
              fullWidth
              disabled
              value={form.email || ''}
              required
            />
          </Grid>

          <Grid size={12}>
            <TextField
              label='Chat Limit'
              name='chatLimit'
              type='number'
              fullWidth
              value={form.chatLimit || ''}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid size={12}>
            <FormControl fullWidth>
              <InputLabel id='project-multiple-checkbox-label'>
                Projects
              </InputLabel>

              <Select
                labelId='project-multiple-checkbox-label'
                multiple
                name='projectIds'
                value={form.projectIds ?? []}
                onChange={handleChange}
                input={<OutlinedInput label='Projects' />}
                renderValue={(selected: any[]) =>
                  projects
                    .filter((p: any) => selected.includes(p.projectId))
                    .map((p: any) => p.name)
                    .join(', ')
                }
              >
                {projects.map((p: any) => (
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
              <InputLabel id='role-label'>Role</InputLabel>
              <Select
                labelId='role-label'
                name='roleId'
                value={form.roleId ?? ''}
                onChange={handleChange}
                input={<OutlinedInput label='Role' />}
              >
                {roles.map((r: any) => (
                  <MenuItem key={r.id} value={r.id}>
                    {r.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={6}>
            <FormControl fullWidth required>
              <InputLabel id='status-label'>Status</InputLabel>
              <Select
                labelId='status-label'
                name='status'
                value={form.status}
                onChange={handleChange}
                input={<OutlinedInput label='Status' />}
              >
                <MenuItem value='Active'>Active</MenuItem>
                <MenuItem value='InActive'>Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={6}>
            <FormControl fullWidth required>
              <InputLabel id='department-label'>Department</InputLabel>
              <Select
                labelId='department-label'
                name='departmentId'
                value={form.departmentId ?? ''}
                onChange={handleChange}
                input={<OutlinedInput label='Department' />}
              >
                {departments.map((d: any) => (
                  <MenuItem key={d.id} value={d.id}>
                    {d.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={6}>
            <FormControl fullWidth required>
              <InputLabel id='reports-to-label'>Reports To</InputLabel>
              <Select
                labelId='reports-to-label'
                name='reportsToId'
                value={form.reportsToId ?? ''}
                onChange={handleChange}
                input={<OutlinedInput label='Reports To' />}
              >
                {reportsTo.map((r: any) => (
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
        <Button variant='contained' onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
