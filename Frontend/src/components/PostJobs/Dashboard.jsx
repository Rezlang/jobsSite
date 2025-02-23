import React, { useEffect, useState } from 'react';
import { fetchJobs } from '../JobManager'; // adjust the path as needed
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Typography,
} from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchJobs();
        setJobs(data);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      }
    };

    loadJobs();
  }, []);

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <List>
        {jobs.map((job) => (
          <ListItem key={job.id || job._id} divider>
            {/* Job title on the left */}
            <ListItemText primary={job.title} />
            {/* Icons and buttons on the right */}
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="share">
                <GroupsIcon />
              </IconButton>
              <IconButton edge="end" aria-label="edit">
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="views">
                <VisibilityIcon />
                <Typography variant="caption" sx={{ ml: 0.5 }}>
                  {job.views || 0}
                </Typography>
              </IconButton>
              <Button variant="contained" size="small" sx={{ ml: 2 }}>
                View Applications
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Dashboard;
