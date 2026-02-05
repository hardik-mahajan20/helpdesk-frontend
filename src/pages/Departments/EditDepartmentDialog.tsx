import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import type {
  AllDepartmentsGet,
  EditDepartmentDialogProps,
  UpdateDepartmentRequest,
} from "../../interfaces";
import {
  getDepartmentById,
  updateDepartment,
} from "../../services/department-service";
import { toast } from "react-toastify";

export default function EditDepartmentDialog({
  id,
  open,
  onClose,
}: EditDepartmentDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  useState(false);

  useEffect(() => {
    const loadDepartment: () => Promise<void> = async () => {
      const result: AllDepartmentsGet = (await getDepartmentById(id)).data;
      setName(result.name);
      setDescription(result.description);
    };
    loadDepartment();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const payload: UpdateDepartmentRequest = {
        id,
        name,
        description,
      };

      await updateDepartment(payload);
      toast.success("Department Update Successfully");
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
