import React, { useState } from 'react';
import { createJob } from './JobManager';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  Box,
  CircularProgress,
  Alert
} from '@mui/material';

function JobCreationForm() {
  // Form field states
  const [logo, setLogo] = useState("");
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [description, setDescription] = useState("");
  const [isRemote, setIsRemote] = useState(true);
  const [location, setLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [careerLevel, setCareerLevel] = useState("");

  // Status states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Example list of locations for on-site jobs
  const locations = ["New York", "San Francisco", "Los Angeles", "Chicago", "Houston"];

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      logo,
      company,
      title,
      minSalary: parseFloat(minSalary),
      maxSalary: parseFloat(maxSalary),
      description,
      workLocation: isRemote ? "Remote" : location,
      employmentType,
      careerLevel,
    };

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await createJob(jobData);
      setSuccess("Job created successfully!");

      // Clear the form fields after successful submission
      setLogo("");
      setCompany("");
      setTitle("");
      setMinSalary("");
      setMaxSalary("");
      setDescription("");
      setIsRemote(true);
      setLocation("");
      setEmploymentType("");
      setCareerLevel("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Ensure all required fields are filled.
  const isFormValid = () => {
    if (
      !logo ||
      !company ||
      !title ||
      !minSalary ||
      !maxSalary ||
      !description ||
      !employmentType ||
      !careerLevel
    ) {
      return false;
    }
    if (!isRemote && !location) {
      return false;
    }
    return true;
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, bgcolor: 'white' }}>
        <Typography variant="h5" component="h1" gutterBottom color="primary">
          Create Job Posting
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Company Logo URL"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Company Name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Min Salary"
            type="number"
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Max Salary"
            type="number"
            value={maxSalary}
            onChange={(e) => setMaxSalary(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            required
          />
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Work Location</FormLabel>
            <RadioGroup
              row
              name="workLocationOption"
              value={isRemote ? "remote" : "onsite"}
              onChange={(e) => setIsRemote(e.target.value === "remote")}
            >
              <FormControlLabel
                value="remote"
                control={<Radio color="primary" />}
                label="Remote"
              />
              <FormControlLabel
                value="onsite"
                control={<Radio color="primary" />}
                label="On-site"
              />
            </RadioGroup>
          </FormControl>
          {!isRemote && (
            <FormControl fullWidth margin="normal">
              <InputLabel id="location-select-label">Location</InputLabel>
              <Select
                labelId="location-select-label"
                value={location}
                label="Location"
                onChange={(e) => setLocation(e.target.value)}
                required
              >
                <MenuItem value="">
                  <em>Select location</em>
                </MenuItem>
                {locations.map((loc, index) => (
                  <MenuItem key={index} value={loc}>
                    {loc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <FormControl fullWidth margin="normal">
            <InputLabel id="employment-type-label">Employment Type</InputLabel>
            <Select
              labelId="employment-type-label"
              value={employmentType}
              label="Employment Type"
              onChange={(e) => setEmploymentType(e.target.value)}
              required
            >
              <MenuItem value="">
                <em>Select employment type</em>
              </MenuItem>
              <MenuItem value="Full-time">Full-time</MenuItem>
              <MenuItem value="Part-time">Part-time</MenuItem>
              <MenuItem value="Internship">Internship</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="career-level-label">Career Level</InputLabel>
            <Select
              labelId="career-level-label"
              value={careerLevel}
              label="Career Level"
              onChange={(e) => setCareerLevel(e.target.value)}
              required
            >
              <MenuItem value="">
                <em>Select career level</em>
              </MenuItem>
              <MenuItem value="Early">Early</MenuItem>
              <MenuItem value="Mid">Mid</MenuItem>
              <MenuItem value="Experienced">Experienced</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ mt: 3 }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={!isFormValid() || loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Create Job"}
            </Button>
          </Box>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {success}
            </Alert>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default JobCreationForm;
