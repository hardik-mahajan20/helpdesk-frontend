export interface ConfirmDeleteDialogProps {
  open: boolean
  title?: string
  description?: string
  onCancel: () => void
  onConfirm: () => void
}
