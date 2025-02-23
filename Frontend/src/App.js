import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import { fetchJobs } from './components/JobManager';

const App = () => {
  // State for fetched jobs.
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    // Fetch jobs when the component mounts.
    const getJobs = async () => {
      try {
        const data = await fetchJobs();
        setJobs(data); // Update state with fetched jobs.
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    getJobs();
  }, []); // Empty dependency array ensures this runs only once on mount.

  return (
    <Box>
      <Box sx={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
        <LeftPanel jobs={jobs} onJobSelect={setSelectedJob} />
        <RightPanel job={selectedJob} />
      </Box>
    </Box>
  );
};

export default App;
