import type { Agent } from './agent'
import type { DepartmentsGet } from '../department/departments-get'

export interface AddAgentDialogProps {
  open: boolean
  agent?: Agent | null
  departments: DepartmentsGet[]
  onClose: () => void
  onSubmit: (data: {
    email: string
    department: string
    reportsTo: string
  }) => void
}
