import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

const RightPanel = ({ job }) => {
  if (!job) {
    return (
      <Box sx={{ flex: 1, p: 2 }}>
        <Typography variant="body1">Please select a job to view details.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flex: 1, p: 2, overflowY: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        {job.title}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {job.company}
      </Typography>
      <CardMedia
        component="img"
        image={job.logo}
        alt={`${job.company} logo`}
        sx={{ width: 100, height: 100, mb: 2 }}
      />
      <Typography variant="body1">{job.description}</Typography>
    </Box>
  );
};

export default RightPanel;
