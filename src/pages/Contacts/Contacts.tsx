import "./Contacts.scss";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function Contacts() {
  return (
    <>
      <div className="contacts-container h-100 p-2 p-lg-4">
        <div className="contacts-header d-flex justify-content-between align-items-start mb-3 pb-3">
          <div className="header-left">
            <h1 className="page-title fs-2">Contacts</h1>
            <p className="page-subtitle">
              Manage person and organizations for all properties
            </p>
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
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              className="action-btn"
            >
              Add Person
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
