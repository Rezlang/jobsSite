import React from 'react';
import Box from '@mui/material/Box';
import JobList from './JobList';

const LeftPanel = ({ jobs, onJobSelect }) => {
  return (
    <Box sx={{ width: 300, borderRight: '1px solid #ccc', display: 'flex', flexDirection: 'column' }}>
      <JobList jobs={jobs} onJobSelect={onJobSelect} />
    </Box>
  );
};

export default LeftPanel;
