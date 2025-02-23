import React, { useState } from 'react';
import { 
  Box, TextField, Button, Dialog, DialogTitle, DialogContent, 
  DialogActions, FormGroup, FormControlLabel, Checkbox 
} from '@mui/material';

const filterOptions = {
  workLocation: ['Remote', 'Hybrid', 'In-Office'],
  employmentType: ['Full-Time', 'Part-Time', 'Internship'],
  careerLevel: ['Early-Career', 'Mid-Career', 'Experienced']
};

const Toolbar = ({ onApplyFilters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    workLocation: [],
    employmentType: [],
    careerLevel: []
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentFilterGroup, setCurrentFilterGroup] = useState(null);
  const [tempSelections, setTempSelections] = useState([]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Open the dialog for a given filter group
  const openFilterDialog = (group) => {
    setCurrentFilterGroup(group);
    setTempSelections(filters[group]); // pre-select current values if any
    setDialogOpen(true);
  };

  // When a checkbox is toggled, update tempSelections and update filters immediately
  const handleDialogCheckboxChange = (option) => {
    let newSelections;
    if (tempSelections.includes(option)) {
      newSelections = tempSelections.filter(item => item !== option);
    } else {
      newSelections = [...tempSelections, option];
    }
    setTempSelections(newSelections);
    // Update filters immediately and notify parent
    setFilters(prevFilters => {
      const updatedFilters = { ...prevFilters, [currentFilterGroup]: newSelections };
      onApplyFilters({ searchTerm, filters: updatedFilters });
      return updatedFilters;
    });
  };

  // Close the dialog; filters have already been applied on checkbox change.
  const handleDialogClose = () => {
    setDialogOpen(false);
    setCurrentFilterGroup(null);
  };

  // The Search button only triggers a keyword search.
  const handleSearch = () => {
    onApplyFilters({ searchTerm, filters });
  };

  return (
    <Box sx={{ p: 1, borderBottom: '1px solid #ccc' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <TextField 
          variant="outlined"
          size="small"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ flex: 1, mr: 1 }}
        />
        <Button variant="contained" size="small" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      {/* Render three ovular filter buttons with smaller size */}
      <Box sx={{ display: 'flex', overflowX: 'auto', py: 1 }}>
        <Button
          variant="outlined"
          onClick={() => openFilterDialog('workLocation')}
          sx={{ 
            borderRadius: '20px', 
            mr: 1, 
            flexShrink: 0, 
            minHeight: 24, 
            fontSize: '0.75rem',
            px: 1
          }}
        >
          Remote/Hybrid/In-Office
        </Button>
        <Button
          variant="outlined"
          onClick={() => openFilterDialog('employmentType')}
          sx={{ 
            borderRadius: '20px', 
            mr: 1, 
            flexShrink: 0, 
            minHeight: 24, 
            fontSize: '0.75rem',
            px: 1
          }}
        >
          Full-Time/Part-Time/Internship
        </Button>
        <Button
          variant="outlined"
          onClick={() => openFilterDialog('careerLevel')}
          sx={{ 
            borderRadius: '20px', 
            mr: 1, 
            flexShrink: 0, 
            minHeight: 24, 
            fontSize: '0.75rem',
            px: 1
          }}
        >
          Early-Career/Mid-Career/Experienced
        </Button>
      </Box>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          {currentFilterGroup === 'workLocation'
            ? 'Select Work Location'
            : currentFilterGroup === 'employmentType'
            ? 'Select Employment Type'
            : 'Select Career Level'}
        </DialogTitle>
        <DialogContent>
          <FormGroup>
            {currentFilterGroup &&
              filterOptions[currentFilterGroup].map(option => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox 
                      checked={tempSelections.includes(option)}
                      onChange={() => handleDialogCheckboxChange(option)}
                    />
                  }
                  label={option}
                />
              ))
            }
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Toolbar;
