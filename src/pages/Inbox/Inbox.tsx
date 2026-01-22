import "./Inbox.scss"
export default function Inbox () {
  return (
    <>
      <div className='inbox-container h-100 p-2 p-lg-3'>
        <div className='inbox-header d-flex justify-content-between align-items-start mb-3 pb-3'>
          <div className='header-left'>
            <h1 className='page-title fs-2'>Inbox</h1>
            <p className='page-subtitle'>Manage chats and tickets</p>
          </div>
        </div>
      </div>
    </>
  )
}
