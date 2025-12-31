import {
  Tooltip,
  IconButton,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment
} from '@mui/material'
import { useState, useCallback, useMemo, useEffect, memo } from 'react'
import StickyHeadTable from '../../core/components/StickyHeadTable'
import type { Column } from '../../core/interfaces'
import type {
  DepartmentActionsProps,
  Department,
  AllDepartmentsGet
} from '../../interfaces'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SearchIcon from '@mui/icons-material/Search'
import {
  deleteDepartment,
  getAllDepartments
} from '../../services/department-service'
import './Departments.scss'
import AddDepartmentDialog from './AddDepartmentDialog'
import EditDepartmentDialog from './EditDepartmentDialog'
import ConfirmDeleteDialog from '../../core/components/ConfirmationDialog'

const DepartmentActions = memo(
  ({ department, onEdit, onDelete }: DepartmentActionsProps) => (
    <>
      <Tooltip title='Edit Department'>
        <IconButton
          size='small'
          color='primary'
          onClick={() => onEdit(department)}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title='Delete Department'>
        <IconButton
          size='small'
          color='success'
          onClick={() => onDelete(department)}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  )
)

export default function Departments () {
  // React Hook's
  const [departments, setDepartments] = useState<AllDepartmentsGet[]>([])
  const [searchText, setSearchText] = useState<string>('')
  const [isAddADepartmentOpen, setIsAddADepartmentOpen] = useState(false)
  const [isEditADepartmentOpen, setIsEditADepartmentOpen] = useState(false)
  const [departmentId, setDepartmentId] = useState<number>(0)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null)

  // CallBack Functions
  const handleDeleteDepartment = useCallback((department: Department) => {
    setSelectedDepartment(department)
    setIsDeleteDialogOpen(true)
  }, [])

  const handleConfirmDelete = async () => {
    if (!selectedDepartment) return

    try {
      await deleteDepartment(selectedDepartment.id)

      setDepartments(prev => prev.filter(d => d.id !== selectedDepartment.id))

      setIsDeleteDialogOpen(false)
      setSelectedDepartment(null)
    } catch (error) {
      console.error('Failed to delete department', error)
    }
  }

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false)
    setSelectedDepartment(null)
  }

  const handleEditDepartment = useCallback(async (department: Department) => {
    if (department.id > 0) setDepartmentId(department.id)
    setIsEditADepartmentOpen(true)
  }, [])

  const handleAddDepartment = async () => {
    setIsAddADepartmentOpen(true)
    console.log(isAddADepartmentOpen)
  }

  // Table Structure
  const columns = useMemo<Column<Department>[]>(
    () => [
      { id: 'name', label: 'Name', minWidth: 150 },
      { id: 'departmentMembers', label: 'Members', minWidth: 200 },
      { id: 'activeChatsCount', label: 'Active Chats', minWidth: 150 },
      {
        id: 'actions',
        label: 'Actions',
        minWidth: 120,
        align: 'center',
        render: row => (
          <DepartmentActions
            department={row}
            onEdit={handleEditDepartment}
            onDelete={handleDeleteDepartment}
          />
        )
      }
    ],
    [handleEditDepartment, handleDeleteDepartment]
  )

  useEffect(() => {
    const loadDepartments: () => Promise<void> = async () => {
      try {
        setDepartments(await getAllDepartments<AllDepartmentsGet[]>())
        console.log('loadDepartment')
      } catch (error) {
        console.error(error)
      }
    }
    loadDepartments()
  }, [])

  const filteredRows = useMemo(() => {
    if (!searchText.trim()) return departments

    const search = searchText.toLowerCase()

    return departments.filter(
      department =>
        department.name?.toLowerCase().includes(search) ||
        department.departmentMembers?.toLowerCase().includes(search)
    )
  }, [departments, searchText])

  return (
    <>
      <div className='department-container h-100 p-2 p-lg-3'>
        {/* Header */}
        <div className='department-header d-flex flex-column flex-md-row justify-content-between align-items-start mb-3 pb-3'>
          <div className='header-left'>
            <h1 className='page-title fs-2'>Departments</h1>
            <p className='page-subtitle m-0'>
              Manage Departments for all properties
            </p>
          </div>
          <div className='header-actions d-flex align-items-center gap-3'>
            <Button
              variant='contained'
              startIcon={<AddIcon />}
              onClick={handleAddDepartment}
            >
              Add Department
            </Button>
          </div>
        </div>
        <div className='search-tabs-section d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 gap-md-4 mb-4'>
          <FormControl sx={{ m: 1, width: '50ch' }} variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-password'>
              Search
            </InputLabel>
            <OutlinedInput
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton edge='end'>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
              label='Search'
            />
          </FormControl>
        </div>
        <div className='table-container'>
          <StickyHeadTable columns={columns} rows={filteredRows} />
        </div>
      </div>

      <div>
        {isAddADepartmentOpen && (
          <AddDepartmentDialog
            open={isAddADepartmentOpen}
            onClose={() => setIsAddADepartmentOpen(false)}
          />
        )}
        {isEditADepartmentOpen && (
          <EditDepartmentDialog
            id={departmentId}
            open={isEditADepartmentOpen}
            onClose={() => setIsEditADepartmentOpen(false)}
          />
        )}
        <ConfirmDeleteDialog
          open={isDeleteDialogOpen}
          title='Delete Department'
          description={`Are you sure you want to delete "${selectedDepartment?.name}" department?`}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </>
  )
}
