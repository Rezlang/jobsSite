import React from 'react';
import Box from '@mui/material/Box';
import JobsList from './JobsList';

const LeftPanel = ({ jobs, onJobSelect }) => {
  return (
    <Box sx={{ width: 300, borderRight: '1px solid #ccc', display: 'flex', flexDirection: 'column' }}>
      <JobsList jobs={jobs} onJobSelect={onJobSelect} />
    </Box>
  );
};

export default LeftPanel;
