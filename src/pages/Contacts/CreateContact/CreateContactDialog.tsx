import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useProjectSelectionStore } from "../../../services/project-selection-service";
import {
  createOrganization,
  createPerson,
  getOrganizationsByProjectId,
} from "../../../services/contact-service";
import { toast } from "react-toastify";
import type {
  OrganizationCreate,
  OrganizationDropdownList,
  PersonCreate,
} from "../../../interfaces/contacts";

type Props = {
  open: boolean;
  onClose: (refresh?: boolean) => void;
  selectedTab: number;
  contactId?: number;
};

const COUNTRIES = ["India", "USA"] as const;
type Country = (typeof COUNTRIES)[number];

type FormState = {
  projectId: number;
  organizationId: number | "";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: Country | "";
  city: string;
  name: string;
};

export default function CreateContactDialog({
  open,
  onClose,
  selectedTab,
  contactId,
}: Props) {
  const isPerson = selectedTab === 0;

  const { getProjectsList, refreshProjects } = useProjectSelectionStore();
  const projects = getProjectsList();

  useEffect(() => {
    if (open) {
      refreshProjects();
    }
  }, [open, refreshProjects]);

  const [form, setForm] = useState<FormState>({
    projectId: 0,
    organizationId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    name: "",
  });

  const resetForm = () => {
    setForm({
      projectId: 0,
      organizationId: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      name: "",
    });
    setOrganizations([]);
    setOrgLoading(false);
  };

  // Cancel button or backdrop
  const handleClose = () => {
    resetForm();
    onClose(); // optionally pass refresh if needed
  };

  useEffect(() => {
    if (contactId) {
      console.log(contactId);
    }
  }, [contactId]);

  const handleChange = (key: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [key]: value }));
  };
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (isPerson) {
        const personData: PersonCreate = {
          projectId: form.projectId,
          organizationId: form.organizationId || null, // optional
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          country: form.country || null,
          city: form.city || null,
        };

        const result = await createPerson(personData);
        toast.success(result.messages[0]);
      } else {
        // Organization form submit
        const orgData: OrganizationCreate = {
          projectId: form.projectId,
          name: form.name,
          email: form.email,
          phone: form.phone,
        };

        const result = await createOrganization(orgData);
        toast.success(result.messages[0]);
      }

      resetForm();
      onClose(true); // refresh parent
    } catch {
      console.error("Submit went wrong");
    } finally {
      setLoading(false);
    }
  };

  const [organizations, setOrganizations] = useState<
    OrganizationDropdownList[]
  >([]);
  const [orgLoading, setOrgLoading] = useState(false);

  useEffect(() => {
    if (!form.projectId) {
      setOrganizations([]);
      return;
    }

    const loadOrganizations = async () => {
      setOrgLoading(true);
      try {
        const res = await getOrganizationsByProjectId<
          OrganizationDropdownList[]
        >(form.projectId);
        setOrganizations(res.data);
      } finally {
        setOrgLoading(false);
      }
    };

    loadOrganizations();
  }, [form.projectId]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {contactId
          ? isPerson
            ? "Update Person"
            : "Update Organization"
          : isPerson
            ? "Create Person"
            : "Create Organization"}
      </DialogTitle>

      <DialogContent dividers>
        {isPerson ? (
          <div className="d-flex flex-column gap-3 mt-2">
            <div className="d-flex gap-2">
              <TextField
                select
                label="Project"
                value={form.projectId}
                onChange={(e) => {
                  handleChange("projectId", Number(e.target.value));
                  handleChange("organizationId", "");
                }}
                fullWidth
                slotProps={{
                  select: {
                    MenuProps: {
                      disablePortal: true,
                      PaperProps: {
                        sx: {
                          maxHeight: 150,
                        },
                      },
                    },
                  },
                }}
              >
                {projects.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Organization"
                value={form.organizationId}
                onChange={(e) =>
                  handleChange("organizationId", Number(e.target.value))
                }
                fullWidth
                disabled={!form.projectId || orgLoading}
                slotProps={{
                  select: {
                    MenuProps: {
                      disablePortal: true,
                      PaperProps: { sx: { maxHeight: 150 } },
                    },
                  },
                }}
              >
                {organizations.map((org) => (
                  <MenuItem key={org.id} value={org.id}>
                    {org.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="d-flex gap-2">
              <TextField
                label="First Name"
                value={form.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                fullWidth
              />
              <TextField
                label="Last Name"
                value={form.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                fullWidth
              />
            </div>

            <div className="d-flex gap-2">
              <TextField
                label="Email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                fullWidth
              />
              <TextField
                label="Phone"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                fullWidth
              />
            </div>

            <div className="d-flex gap-2">
              <TextField
                select
                label="Country"
                value={form.country}
                onChange={(e) =>
                  handleChange("country", e.target.value as Country)
                }
                fullWidth
                slotProps={{
                  select: {
                    MenuProps: {
                      disablePortal: true,
                      PaperProps: { sx: { maxHeight: 150 } },
                    },
                  },
                }}
              >
                {COUNTRIES.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="City"
                value={form.city}
                onChange={(e) => handleChange("city", e.target.value)}
                fullWidth
              />
            </div>
          </div>
        ) : (
          <div>
            <div className="d-flex gap-3 mt-2">
              <TextField
                select
                label="Project"
                value={form.projectId}
                onChange={(e) => {
                  handleChange("projectId", Number(e.target.value));
                  handleChange("organizationId", "");
                }}
                fullWidth
                slotProps={{
                  select: {
                    MenuProps: {
                      disablePortal: true,
                      PaperProps: {
                        sx: {
                          maxHeight: 150,
                        },
                      },
                    },
                  },
                }}
              >
                {projects.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                fullWidth
              />
            </div>
            <div className="d-flex gap-3 mt-2">
              <TextField
                label="Email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                fullWidth
              />

              <TextField
                label="Phone"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                fullWidth
              />
            </div>
          </div>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
