import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";
import type {
  AddProjectRequest,
  EditProjectDialogProps,
} from "../../interfaces";
import { addProject } from "../../services/project-service";

export default function EditProjectDialog({
  open,
  onClose,
}: EditProjectDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [liveProjectUrl, setLiveProjectUrl] = useState("");

  const handleSubmit = async () => {
    try {
      const payload: AddProjectRequest = {
        name,
        description,
        liveProjectUrl,
      };

      await addProject(payload);
      onClose();
    } catch (error) {
      console.error("Failed to invite agent", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Project</DialogTitle>

      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        className="p-3"
      >
        <TextField
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          required
          multiline
          minRows={3}
          maxRows={6}
        />
        <TextField
          label="Live Project URL"
          type="text"
          value={liveProjectUrl}
          onChange={(e) => setLiveProjectUrl(e.target.value)}
          fullWidth
          required
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
