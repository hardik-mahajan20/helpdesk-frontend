import "./Inbox.scss";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Button } from "@mui/material";
export default function Inbox() {
  return (
    <>
      <div className="inbox-container h-100 p-2 p-lg-4">
        <div className="inbox-header d-flex justify-content-between align-items-start mb-3 pb-3">
          <div className="header-left">
            <h1 className="page-title fs-2">Inbox</h1>
            <p className="page-subtitle">Manage chats and tickets</p>
          </div>
          <div className="header-actions d-flex align-items-center gap-3">
            <Button
              variant="outlined"
              startIcon={<FileDownloadIcon />}
              className="action-btn"
            >
              Import
            </Button>
            <Button
              variant="outlined"
              startIcon={<FileUploadIcon />}
              className="action-btn"
            >
              Export
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
