import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import type {
  AddProjectDialogProps,
  AddProjectForm,
  AddProjectRequest,
  ApiResponse,
} from "../../interfaces";
import { addProject } from "../../services/project-service";
import { toast } from "react-toastify";

export default function AddProjectDialog({
  open,
  onClose,
}: AddProjectDialogProps) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AddProjectForm>({
    defaultValues: {
      name: "",
      description: "",
      liveProjectUrl: "",
    },
  });

  const onSubmit = async (data: AddProjectForm) => {
    try {
      const payload: AddProjectRequest = { ...data };
      const result: ApiResponse<unknown> = await addProject(payload);
      toast.success(result.messages[0]);
      reset();
      onClose();
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Project</DialogTitle>

      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        className="p-3"
      >
        <Controller
          name="name"
          control={control}
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              fullWidth
              multiline
              minRows={3}
              maxRows={6}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          )}
        />

        <Controller
          name="liveProjectUrl"
          control={control}
          rules={{
            required: "Live Project URL is required",
            pattern: {
              value: /^https?:\/\/.+/,
              message: "Enter a valid URL starting with http or https",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Live Project URL"
              fullWidth
              error={!!errors.liveProjectUrl}
              helperText={errors.liveProjectUrl?.message}
            />
          )}
        />
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            reset();
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
