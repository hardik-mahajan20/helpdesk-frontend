import type { Column } from "./Column";

export interface TableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowsPerPageOptions?: number[];
  initialRowsPerPage?: number;
}
