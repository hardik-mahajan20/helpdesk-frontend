import './Dashboard.scss'
export default function Dashboard () {
  return (
    <>
      <div className='dashboard-container h-100 p-2 p-lg-3'>
        <div className='dashboard-header d-flex justify-content-between align-items-start mb-3 pb-3'>
          <div className='header-left'>
            <h1 className='page-title fs-2'>Dashboard</h1>
            <p className='page-subtitle'>
              Manage person and organizations for all properties
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
