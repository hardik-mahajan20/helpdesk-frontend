import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type SyntheticEvent,
} from "react";
import {
  deleteAgent,
  getAllAgents,
  getAllDepartments,
  getAllPendingAgents,
} from "../../services/agent-service";
import "./Agents.scss";
import type {
  Agent,
  AgentActionsProps,
  AgentPendingInvitations,
  AgentsGet,
  DepartmentsGet,
  Invitations_Agent,
  ReportsToDropdown,
} from "../../interfaces";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Skeleton,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import type { Column } from "../../core/interfaces";
import StickyHeadTable from "../../core/components/StickyHeadTable";
import EditIcon from "@mui/icons-material/Edit";
import AddAgentDialog from "./AddAgentDialog";
import EditAgentDialog from "./EditAgentDialog";
import { getToken } from "../../services/auth-service";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FilterListIcon from "@mui/icons-material/FilterList";
import { toast } from "react-toastify";
import type { RolesDropdown } from "../../interfaces/agent/roles-dropdown";
import type { ProjectsDropdown } from "../../interfaces/agent/projects-dropdown";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Agents() {
  const [agents, setAgents] = useState<AgentsGet[]>([]);
  const [departments, setDepartments] = useState<DepartmentsGet[]>([]);
  const [isAddAgentOpen, setIsAddAgentOpen] = useState<boolean>(false);

  const [isEditAgentOpen, setIsEditAgentOpen] = useState<boolean>(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const [roles, setRoles] = useState<RolesDropdown[]>([]);
  const [projects, setProjects] = useState<ProjectsDropdown[]>([]);
  const [reportsTo, setReportsTo] = useState<ReportsToDropdown[]>([]);

  const [invitedAgents, setInvitedAgents] = useState<AgentPendingInvitations[]>(
    [],
  );

  const [value, setValue] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(true);

  const handleChange = async (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [searchText, setSearchText] = useState("");

  const handleDeleteAgent = useCallback(async (agent: Agent) => {
    const result = await deleteAgent(agent.userId);
    toast.success(result.messages[0]);
  }, []);

  const handleEditAgent = useCallback(async () => {
    try {
      // Fetch agent details
      const token = getToken();

      const agentDetails = await fetch(`http://localhost:5093/api/agents/5`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json());

      // Parallel API calls
      const [rolesRes, projectsRes, departmentsRes, reportsToRes] =
        await Promise.all([
          fetch("http://localhost:5093/api/agents/roles", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }).then((r) => r.json()),
          fetch("http://localhost:5093/api/projects", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }).then((r) => r.json()),
          fetch("http://localhost:5093/api/agents/departments", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }).then((r) => r.json()),
          fetch(
            "http://localhost:5093/api/agents/reports-to?roleId=3&agentUserId=5&departmentId=10",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            },
          ).then((r) => r.json()),
        ]);

      setSelectedAgent(agentDetails.data);
      setRoles(rolesRes.data);
      setProjects(projectsRes.data);
      setDepartments(departmentsRes.data);
      setReportsTo(reportsToRes.data);

      setIsEditAgentOpen(true);
    } catch (error) {
      console.error("Failed to load edit agent data", error);
    }
  }, []);

  const handleAddAgent = useCallback(async () => {
    const data: DepartmentsGet[] = (await getAllDepartments<DepartmentsGet[]>())
      .data;
    setDepartments(data);
    setIsAddAgentOpen(true);
  }, []);

  const handleSubmitAddAgent = async () => {
    setIsAddAgentOpen(false);
    setAgents((await getAllAgents<AgentsGet[]>(true)).data);
  };

  const AgentActions = ({ agent, onEdit, onDelete }: AgentActionsProps) => (
    <>
      <Tooltip title="Edit Agent">
        <IconButton size="small" color="primary" onClick={() => onEdit(agent)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete Agent">
        <IconButton
          size="small"
          color="success"
          onClick={() => onDelete(agent)}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  );
  const columns = useMemo<Column<Agent>[]>(
    () => [
      { id: "fullName", label: "Name", minWidth: 200 },
      { id: "projects", label: "Project", minWidth: 150 },
      { id: "phoneNumber", label: "Phone", minWidth: 150 },
      { id: "reportsTo", label: "Report To", minWidth: 150 },
      { id: "departmentName", label: "Department", minWidth: 150 },
      {
        id: "actions",
        label: "Actions",
        minWidth: 120,
        align: "center",
        render: (row) => (
          <AgentActions
            agent={row}
            onEdit={handleEditAgent}
            onDelete={handleDeleteAgent}
          />
        ),
      },
    ],
    [handleEditAgent, handleDeleteAgent],
  );
  const invitations_columns: Column<Invitations_Agent>[] = [
    { id: "invitedEmail", label: "Name", minWidth: 200 },
    { id: "reportsTo", label: "Report To", minWidth: 150 },
    { id: "departmentName", label: "Department", minWidth: 150 },
    { id: "invitedBy", label: "invited By", minWidth: 150 },
    { id: "expiresAt", label: "Expires At", minWidth: 150 },
  ];

  const rows: Agent[] = agents;
  const invited_rows: Invitations_Agent[] = invitedAgents;

  useEffect(() => {
    const loadAgents: () => Promise<void> = async () => {
      try {
        setLoading(true);
        if (value == 0) {
          setAgents((await getAllAgents<AgentsGet[]>(true)).data);
        } else if (value == 1) {
          setAgents((await getAllAgents<AgentsGet[]>(false)).data);
        } else {
          setInvitedAgents(
            (await getAllPendingAgents<AgentPendingInvitations[]>()).data,
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadAgents();
  }, [value]);

  const filteredRows = useMemo(() => {
    if (!searchText.trim()) return rows;

    const search = searchText.toLowerCase();

    return rows.filter((agent: Agent) => {
      return (
        agent.fullName?.toLowerCase().includes(search) ||
        agent.departmentName?.toLowerCase().includes(search) ||
        agent.reportsTo?.toLowerCase().includes(search) ||
        agent.projects?.toLowerCase().includes(search)
      );
    });
  }, [rows, searchText]);
  return (
    <>
      <div className="agents-container h-100 p-2 p-lg-4">
        {/* Header */}
        <div className="agents-header d-flex flex-column flex-md-row justify-content-between align-items-start mb-3 pb-3">
          <div className="header-left">
            <h1 className="page-title fs-2">Agents</h1>
            <p className="page-subtitle m-0">Manage agents for all projects</p>
          </div>
          <div className="header-actions d-flex align-items-center gap-3">
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              className="action-btn"
            >
              Filter
            </Button>
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
              onClick={() => {
                handleAddAgent();
              }}
            >
              Add Agent
            </Button>
          </div>
        </div>
        <div className="search-tabs-section d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 gap-md-4 mb-4">
          <FormControl sx={{ m: 1, width: "50ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Search
            </InputLabel>
            <OutlinedInput
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
              label="Search"
            />
          </FormControl>

          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Active" {...a11yProps(0)} />
              <Tab label="InActive" {...a11yProps(1)} />
              <Tab label="Pending" {...a11yProps(2)} />
            </Tabs>
          </Box>
        </div>
        <div className="table-container">
          {loading ? (
            <AgentsSkeleton />
          ) : value === 0 || value === 1 ? (
            <StickyHeadTable columns={columns} rows={filteredRows} />
          ) : (
            <StickyHeadTable
              columns={invitations_columns}
              rows={invited_rows}
            />
          )}
        </div>
      </div>
      <div>
        {isAddAgentOpen && (
          <AddAgentDialog
            open={isAddAgentOpen}
            departments={departments}
            onClose={() => setIsAddAgentOpen(false)}
            onSubmit={handleSubmitAddAgent}
          />
        )}
      </div>
      <EditAgentDialog
        open={isEditAgentOpen}
        agent={selectedAgent}
        roles={roles}
        projects={projects}
        departments={departments}
        reportsTo={reportsTo}
        onClose={() => setIsEditAgentOpen(false)}
        onSubmit={() => {
          setIsEditAgentOpen(false);
        }}
      />
    </>
  );
}
function AgentsSkeleton() {
  const rows = Array.from({ length: 10 });
  const cols = 6;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
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
                    <Skeleton variant="text" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
