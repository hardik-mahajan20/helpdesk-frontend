import { Button } from '@mui/material'
import './KnowledgeBase.scss'
import AddIcon from '@mui/icons-material/Add';
export default function KnowledgeBase () {
  return (
    <>
      <div className='knowledge-base-container h-100 p-2 p-lg-4'>
        <div className='knowledge-base-header d-flex justify-content-between align-items-start mb-3 pb-3'>
          <div className='header-left'>
            <h1 className='page-title fs-2'>Knowledge Base</h1>
            <p className='page-subtitle'>
              Manage articles and categories for all properties.
            </p>
          </div>
          <div className='header-actions d-flex align-items-center gap-3'>
            <Button
              variant='contained'
              startIcon={<AddIcon />}
              className='action-btn'
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
