import type { Department } from "./department";

export interface DepartmentActionsProps {
  department: Department;
  onEdit: (department: Department) => void;
  onDelete: (department: Department) => void;
}
