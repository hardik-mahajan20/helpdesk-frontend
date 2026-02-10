import { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  TextField,
  Box,
  Button,
} from "@mui/material";
import "./Reporting.scss";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";

export default function Reporting() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("7days");
  const [customStartDate, setCustomStartDate] = useState<string>("");
  const [customEndDate, setCustomEndDate] = useState<string>("");

  const timePeriods = [
    { value: "7days", label: "Last 7 Days" },
    { value: "30days", label: "Last 30 Days" },
    { value: "90days", label: "Last 90 Days" },
    { value: "custom", label: "Custom Range" },
  ];

  const handlePeriodChange = (event: SelectChangeEvent) => {
    setSelectedPeriod(event.target.value);
    console.log("Selected period:", event.target.value);
  };

  // Unified height for all controls
  const controlHeight = 50;

  return (
    <div className="h-100 p-2 p-lg-4 reporting-container">
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start mb-3 pb-3 reporting-header">
        <div className="mb-3 mb-lg-0">
          <h1 className="fs-2 lh-sm page-title">Analytics & Reporting</h1>
          <p className="fs-6 m-0 lh-base page-subtitle">
            Comprehensive insights and analytics across all modules
          </p>
        </div>

        <div className="d-flex flex-column flex-wrap flex-md-row justify-content-end gap-2 header-right">
          <div className="d-flex flex-wrap justify-content-end gap-2 align-items-center">
            {/* Time Period Dropdown */}
            <FormControl sx={{ m: 1, width: 250, height: controlHeight }}>
              <InputLabel id="time-period-select-label">Time Period</InputLabel>
              <Select
                labelId="time-period-select-label"
                id="time-period-select"
                value={selectedPeriod}
                label="Time Period"
                onChange={handlePeriodChange}
                sx={{ height: controlHeight }}
              >
                {timePeriods.map((period) => (
                  <MenuItem key={period.value} value={period.value}>
                    {period.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Custom Date Pickers */}
            {selectedPeriod === "custom" && (
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <TextField
                  label="Start Date"
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  sx={{ height: controlHeight }}
                  slotProps={{ inputLabel: { shrink: true } }}
                />
                <TextField
                  label="End Date"
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  sx={{ height: controlHeight }}
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Box>
            )}

            {/* Buttons */}
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              sx={{ height: controlHeight }}
            >
              Generate
            </Button>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              sx={{ height: controlHeight }}
            >
              Export
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
