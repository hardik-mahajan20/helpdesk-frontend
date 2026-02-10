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
  getOrganizationById,
  getOrganizationsByProjectId,
  getPersonById,
  updateOrganization,
  updatePerson,
} from "../../../services/contact-service";
import { toast } from "react-toastify";
import type {
  Organization,
  OrganizationCreate,
  OrganizationDropdownList,
  Person,
  PersonCreate,
} from "../../../interfaces/contacts";

type Props = {
  open: boolean;
  onClose: (refresh?: boolean) => void;
  selectedTab: number;
  contactId: number;
};

const COUNTRIES = [
  { id: 1, name: "India" },
  { id: 2, name: "USA" },
];

type CountryId = number;

type FormState = {
  projectId: number;
  organizationId: number | "";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryId: CountryId;
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
    countryId: 0,
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
      countryId: 0,
      city: "",
      name: "",
    });
    setOrganizations([]);
    setOrgLoading(false);
  };

  const handleClose = () => {
    resetForm();
    onClose(false);
  };

  useEffect(() => {
    if (contactId > 0) {
      const loadContact = async () => {
        try {
          if (isPerson) {
            const res = await getPersonById<any>(contactId);
            const p = res.data;

            setForm((prev) => ({
              ...prev,
              projectId: p.projectId,
              organizationId: p.organizationId || "",
              firstName: p.firstName,
              lastName: p.lastName,
              email: p.email,
              phone: p.phone,
              countryId: p.countryId || 0,
              city: p.city || "",
            }));

            // load organizations for that project
            if (p.projectId) {
              setOrgLoading(true);
              const orgRes = await getOrganizationsByProjectId<
                OrganizationDropdownList[]
              >(p.projectId);
              setOrganizations(orgRes.data);
              setOrgLoading(false);
            }
          } else {
            // fetch organization by ID
            const res = await getOrganizationById<any>(contactId);
            const o = res.data;

            setForm((prev) => ({
              ...prev,
              projectId: o.projectId,
              name: o.name,
              email: o.email,
              phone: o.phone,
            }));
          }
        } catch (err) {
          console.error("Failed to load contact data", err);
        }
      };

      loadContact();
    } else {
      // if no contactId (i.e., creating new), reset form
      resetForm();
    }
  }, [contactId, isPerson]);

  const handleChange = (key: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [key]: value }));
  };
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (isPerson) {
        const personCreateData: PersonCreate = {
          projectId: form.projectId,
          organizationId: form.organizationId || null,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          countryId: form.countryId || null,
          city: form.city || null,
        };
        const personUpdateData: Person = {
          id: contactId,
          projectId: form.projectId,
          organizationId: form.organizationId || null,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          countryId: form.countryId || null,
          city: form.city || null,
          countryName: "",
          organizationName: "",
          projectName: "",
        };

        let result;
        if (contactId > 0) {
          // Update
          result = await updatePerson(personUpdateData);
          toast.success("Person updated successfully");
        } else {
          // Create
          result = await createPerson(personCreateData);
          toast.success(result.messages[0]);
        }
      } else {
        const organizationCreateData: OrganizationCreate = {
          projectId: form.projectId,
          name: form.name,
          email: form.email,
          phone: form.phone,
        };

        const organizationUpdateData: Organization = {
          id: contactId || 0,
          projectId: form.projectId,
          name: form.name,
          email: form.email,
          phone: form.phone,
          projectName: "",
        };

        let result;
        if (contactId > 0) {
          // Update
          result = await updateOrganization(organizationUpdateData);
          toast.success("Organization updated successfully");
        } else {
          // Create
          result = await createOrganization(organizationCreateData);
          toast.success(result.messages[0]);
        }
      }

      resetForm();
      onClose(true);
    } catch (err) {
      console.error("Submit went wrong", err);
      toast.error("Something went wrong");
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
                value={form.countryId}
                onChange={(e) =>
                  handleChange("countryId", Number(e.target.value))
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
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
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
