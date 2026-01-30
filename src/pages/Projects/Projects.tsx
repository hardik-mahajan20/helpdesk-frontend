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
  ProjectsActionsProps,
  Project,
  AllProjectsGet
} from '../../interfaces'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import SearchIcon from '@mui/icons-material/Search'
import ConfirmDeleteDialog from '../../core/components/ConfirmationDialog'
import { deleteProject, getAllProjects } from '../../services/project-service'
import AddProjectDialog from './AddProjectDialog'
import SettingsIcon from '@mui/icons-material/Settings'
import { useProjectSelectionStore } from '../../services/project-selection-service'
import { useNavigate } from 'react-router-dom'
import "./Projects.scss"

const ProjectActions = memo(
  ({ projects, goToSettings, onDelete }: ProjectsActionsProps) => (
    <>
      <Tooltip title='Edit Project'>
        <IconButton
          size='small'
          color='primary'
          onClick={() => goToSettings(projects)}
        >
          <SettingsIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title='Delete Project'>
        <IconButton
          size='small'
          color='success'
          onClick={() => onDelete(projects)}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  )
)

export default function Projects () {
  // React Hook's
  const [projects, setProjects] = useState<AllProjectsGet[]>([])
  const [searchText, setSearchText] = useState<string>('')
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const navigate = useNavigate()

  const { setProjectId } = useProjectSelectionStore()

  // CallBack Functions
  const handleDeleteProject = useCallback((projects: Project) => {
    setSelectedProject(projects)
    setIsDeleteDialogOpen(true)
  }, [])

  const handleConfirmDelete = async () => {
    if (!selectedProject) return

    try {
      await deleteProject(selectedProject.projectId)

      setProjects(prev =>
        prev.filter(d => d.projectId !== selectedProject.projectId)
      )

      setIsDeleteDialogOpen(false)
      setSelectedProject(null)
    } catch (error) {
      console.error('Failed to delete project', error)
    }
  }

  const handleCancelDelete = () => {
    setSelectedProject(null)
  }

  const handleProjectSettingsNavigation = useCallback(
    async (project: Project) => {
      if (project.projectId > 0) setProjectId(project.projectId)
      navigate('/settings')
    },
    []
  )

  const handleAddProject = async () => {
    setIsAddProjectOpen(true)
  }

  // Table Structure
  const columns = useMemo<Column<Project>[]>(
    () => [
      { id: 'name', label: 'Project', minWidth: 200 },
      { id: 'isActive', label: 'Enable', minWidth: 150 },
      { id: 'createdBy', label: 'Created By', minWidth: 150 },
      { id: 'createdAt', label: 'Created Date', minWidth: 150 },
      {
        id: 'actions',
        label: 'Actions',
        minWidth: 120,
        align: 'center',
        render: row => (
          <ProjectActions
            projects={row}
            goToSettings={handleProjectSettingsNavigation}
            onDelete={handleDeleteProject}
          />
        )
      }
    ],
    [handleProjectSettingsNavigation, handleDeleteProject]
  )

  useEffect(() => {
    const loadProjects: () => Promise<void> = async () => {
      try {
        setProjects(await getAllProjects<AllProjectsGet[]>())
      } catch (error) {
        console.error(error)
      }
    }
    loadProjects()
  }, [])

  const filteredRows = useMemo(() => {
    if (!searchText.trim()) return projects

    const search = searchText.toLowerCase()

    return projects.filter(
      project =>
        project.name?.toLowerCase().includes(search) ||
        project.createdBy?.toLowerCase().includes(search)
    )
  }, [projects, searchText])

  return (
    <>
      <div className='projects-container h-100 p-2 p-lg-4'>
        {/* Header */}
        <div className='projects-header d-flex flex-column flex-md-row justify-content-between align-items-start mb-3 pb-3'>
          <div className='header-left'>
            <h1 className='page-title fs-2'>Projects</h1>
            <p className='page-subtitle m-0'>Manage all projects</p>
          </div>
          <div className='header-actions d-flex align-items-center gap-3'>
            <Button
              variant='contained'
              startIcon={<AddIcon />}
              onClick={handleAddProject}
              className='add-project-btn d-flex align-items-center gap-2'
            >
              Add Project
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
        {isAddProjectOpen && (
          <AddProjectDialog
            open={isAddProjectOpen}
            onClose={() => setIsAddProjectOpen(false)}
          />
        )}
        <ConfirmDeleteDialog
          open={isDeleteDialogOpen}
          title='Delete Project'
          description={`Are you sure you want to delete "${selectedProject?.name}" project?`}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </>
  )
}
