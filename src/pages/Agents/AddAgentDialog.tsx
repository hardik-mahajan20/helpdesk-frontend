import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  ListSubheader
} from '@mui/material'
import { useState, useEffect } from 'react'
import type { AddAgentDialogProps, ReportsToDropdown } from '../../interfaces'
import { getAllReportsTos, inviteAgent } from '../../services/agent-service'
import './AddAgentDialog.scss'
import { toast } from 'react-toastify'

export default function AddAgentDialog ({
  open,
  departments,
  onClose
}: AddAgentDialogProps) {
  const [email, setEmail] = useState('')
  const [department, setDepartment] = useState<number | ''>('')
  const [reportsTo, setReportsTo] = useState<number | ''>('')

  const [reportPersons, setReportPersons] = useState<ReportsToDropdown[]>([])

  const handleSubmit = async () => {
    try {
      if (!department) return

      const payload = {
        email,
        roleId: 3,
        departmentId: Number(department),
        reportsToId: Number(reportsTo) || 0
      }

      var result = await inviteAgent(payload)
      toast.success(result.messages[0])
      onClose()
    } catch (error) {
      console.error('Failed to invite agent', error)
    }
  }

  useEffect(() => {
    const fetchReports = async () => {
      if (!department) return

      try {
        const data = (
          await getAllReportsTos<ReportsToDropdown[]>(3, Number(department))
        ).data
        setReportPersons(data)
      } catch (error) {
        console.error('Failed to fetch reports to:', error)
      }
    }

    fetchReports()
  }, [department])

  const groupedReports = reportPersons.reduce((acc: any, person) => {
    const group = person.groupName || 'Department Member'
    if (!acc[group]) acc[group] = []
    acc[group].push(person)
    return acc
  }, {})

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>Add Agent</DialogTitle>

      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        className='p-3'
      >
        <TextField
          label='Agent Email'
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          fullWidth
          required
        />
        <FormControl fullWidth required>
          <InputLabel id='department-label'>Department</InputLabel>
          <Select
            labelId='department-label'
            value={department}
            label='Department'
            onChange={e => setDepartment(e.target.value as number)}
          >
            {departments.map(dept => (
              <MenuItem key={dept.id} value={dept.id}>
                {dept.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id='reports-to-label'>Reports To</InputLabel>
          <Select
            labelId='reports-to-label'
            value={reportsTo}
            label='Reports To'
            onChange={e => setReportsTo(e.target.value as number)}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>

            {Object.entries(groupedReports).map(([group, persons]) => [
              <ListSubheader key={group}>{group}</ListSubheader>,
              ...(persons as ReportsToDropdown[]).map(person => (
                <MenuItem key={person.id} value={person.id}>
                  {person.name}
                </MenuItem>
              ))
            ])}
          </Select>
        </FormControl>
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
