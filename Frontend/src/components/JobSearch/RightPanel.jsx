import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Application from './Application';

const RightPanel = ({ job }) => {
  const [showApplication, setShowApplication] = useState(false);

  if (!job) {
    return (
      <Box sx={{ flex: 1, p: 2 }}>
        <Typography variant="body1">Please select a job to view details.</Typography>
      </Box>
    );
  }

  if (showApplication) {
    return <Application jobID={job.id} />;
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
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowApplication(true)}
        sx={{ mt: 2 }}
      >
        Apply
      </Button>
    </Box>
  );
};

export default RightPanel;
