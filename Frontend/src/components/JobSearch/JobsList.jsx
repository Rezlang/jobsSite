import React, { useState } from 'react';
import Toolbar from './Toolbar';
import JobItem from './JobItem';
import Skeleton from '@mui/material/Skeleton';

const JobsList = ({ jobs, onDeleteJob, onJobSelect, loading }) => {
  const [criteria, setCriteria] = useState({
    searchTerm: '',
    filters: {
      workLocation: [],
      employmentType: [],
      careerLevel: []
    }
  });

  const handleApplyFilters = (newCriteria) => {
    setCriteria(newCriteria);
  };

  // Filter jobs based on search term and filters
  const filteredJobs = jobs.filter(job => {
    const { searchTerm, filters } = criteria;
    const searchTermMatch =
      searchTerm.trim() === '' ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const workLocationMatch =
      filters.workLocation.length === 0 || filters.workLocation.includes(job.workLocation);
    const employmentTypeMatch =
      filters.employmentType.length === 0 || filters.employmentType.includes(job.employmentType);
    const careerLevelMatch =
      filters.careerLevel.length === 0 || filters.careerLevel.includes(job.careerLevel);

    return searchTermMatch && workLocationMatch && employmentTypeMatch && careerLevelMatch;
  });

  return (
    <div>
      <Toolbar onApplyFilters={handleApplyFilters} />
      <div>
        {loading ? (
          <div/>
        ) : filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <JobItem 
              key={job.id} 
              job={job} 
              onClick={() => onJobSelect(job)}
            >
              <button onClick={() => onDeleteJob(job.id)}>Delete Job</button>
            </JobItem>
          ))
        ) : (
          Array.from(new Array(3)).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width="100%"
              height={150}
              style={{ marginBottom: 8, borderRadius: 2 }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default JobsList;
