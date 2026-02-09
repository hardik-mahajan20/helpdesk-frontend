import "./Contacts.scss";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Tabs,
  Tab,
  TableSortLabel,
  Skeleton,
} from "@mui/material";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";

import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import {
  getAllContacts,
  getFilteredOrganizationsByProject,
} from "../../services/contact-service";
import type { Person, PagedPersonResponse } from "../../interfaces/contacts";
import type { ApiResponse } from "../../interfaces";

export default function Contacts() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [rows, setRows] = useState<Person[]>([]);

  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [sortBy, setSortBy] = useState("id");
  const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

  // debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      loadContacts();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText, selectedTab, page, rowsPerPage, sortBy, sortDirection]);

  const loadContacts = async () => {
    setIsLoading(true);
    try {
      const filter = {
        pageNumber: page + 1,
        pageSize: rowsPerPage,
        search: searchText,
        sortBy,
        sortDirection,
        projectId: 0,
      };

      if (selectedTab === 0) {
        // Persons
        const res: ApiResponse<PagedPersonResponse> =
          await getAllContacts(filter);

        setRows(res.data.items);
        setTotalCount(res.data.totalCount);
      } else {
        // Organizations
        const res: ApiResponse<any> =
          await getFilteredOrganizationsByProject(filter);

        setRows(res.data.items);
        setTotalCount(res.data.totalCount);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (_: any, newValue: number) => {
    setSelectedTab(newValue);
    setPage(0);
    setRows([]);
    setTotalCount(0);
    setIsLoading(true);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (id: number) => {
    console.log("Delete", id);
    // call delete API here
    loadContacts();
  };

  const handleEdit = (id: number) => {
    console.log("Edit", id);
    // open modal
  };

  const isPersonTab = selectedTab === 0;

  const handleSort = (column: string) => {
    const isAsc = sortBy === column && sortDirection === "ASC";
    setSortDirection(isAsc ? "DESC" : "ASC");
    setSortBy(column);
    setPage(0);
  };

  return (
    <div className="contacts-container h-100 p-2 p-lg-4">
      {/* Header */}
      <div className="contacts-header d-flex justify-content-between mb-3">
        <div>
          <h1 className="page-title fs-2">Contacts</h1>
          <p>Manage person and organizations for all properties</p>
        </div>

        <div className="d-flex gap-2">
          <Button variant="outlined" startIcon={<FileDownloadIcon />}>
            Import
          </Button>
          <Button variant="outlined" startIcon={<FileUploadIcon />}>
            Export
          </Button>
          <Button variant="contained" startIcon={<AddIcon />}>
            {isPersonTab ? "Add Person" : "Add Organization"}
          </Button>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <FormControl sx={{ width: "40ch" }}>
          <InputLabel>Search</InputLabel>
          <OutlinedInput
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            label="Search"
          />
        </FormControl>

        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="Persons" />
          <Tab label="Organizations" />
        </Tabs>
      </div>

      <Paper>
        {isLoading ? (
          <ContactsSkeleton isPersonTab={isPersonTab} />
        ) : (
          <>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === "name"}
                        direction={
                          sortBy === "name"
                            ? (sortDirection.toLowerCase() as any)
                            : "asc"
                        }
                        onClick={() => handleSort("name")}
                      >
                        Name
                      </TableSortLabel>
                    </TableCell>

                    <TableCell>
                      <TableSortLabel
                        active={sortBy === "phone"}
                        direction={
                          sortBy === "phone"
                            ? (sortDirection.toLowerCase() as any)
                            : "asc"
                        }
                        onClick={() => handleSort("phone")}
                      >
                        Phone
                      </TableSortLabel>
                    </TableCell>

                    <TableCell>
                      <TableSortLabel
                        active={sortBy === "project"}
                        direction={
                          sortBy === "project"
                            ? (sortDirection.toLowerCase() as any)
                            : "asc"
                        }
                        onClick={() => handleSort("project")}
                      >
                        Project
                      </TableSortLabel>
                    </TableCell>

                    {isPersonTab && (
                      <TableCell>
                        <TableSortLabel
                          active={sortBy === "organization"}
                          direction={
                            sortBy === "organization"
                              ? (sortDirection.toLowerCase() as any)
                              : "asc"
                          }
                          onClick={() => handleSort("organization")}
                        >
                          Organization
                        </TableSortLabel>
                      </TableCell>
                    )}

                    <TableCell>Last Seen</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {rows.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        {isPersonTab
                          ? "No Persons found"
                          : "No Organizations found"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    rows.map((row: any) => (
                      <TableRow key={row.id}>
                        <TableCell>
                          {isPersonTab
                            ? `${row.firstName} ${row.lastName}`
                            : row.name}
                          <div className="text-muted">{row.email}</div>
                        </TableCell>
                        <TableCell>{row.phone || "N/A"}</TableCell>
                        <TableCell>{row.projectName}</TableCell>
                        {isPersonTab && (
                          <TableCell>{row.organizationName}</TableCell>
                        )}
                        <TableCell>
                          {row.lastSeenAt
                            ? new Date(row.lastSeenAt).toLocaleString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                              })
                            : ""}
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEdit(row.id)}>
                            <EditIcon color="primary" />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(row.id)}>
                            <DeleteIcon color="primary" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>
    </div>
  );
}

function ContactsSkeleton({ isPersonTab }: { isPersonTab: boolean }) {
  const rows = Array.from({ length: 10 });
  const cols = isPersonTab ? 6 : 5;

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            {Array.from({ length: cols }).map((_, i) => (
              <TableCell key={i}>
                <Skeleton variant="text" width="60%" />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: cols }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton variant="text" height={20} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
