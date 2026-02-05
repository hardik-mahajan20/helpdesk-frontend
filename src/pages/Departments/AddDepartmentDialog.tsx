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
  AddDepartmentDialogProps,
  AddDepartmentRequest,
} from "../../interfaces";
import { addDepartment } from "../../services/department-service";
import { toast } from "react-toastify";

export default function AddDepartmentDialog({
  open,
  onClose,
}: AddDepartmentDialogProps) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async () => {
    try {
      const payload: AddDepartmentRequest = {
        name,
        description,
      };

      const result = await addDepartment(payload);
      toast.success(result.messages[0]);
      onClose();
    } catch (error) {
      console.error("Failed to invite agent", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Department</DialogTitle>

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
