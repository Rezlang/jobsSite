import React, { useState } from 'react';
import Toolbar from './Toolbar';
import JobItem from './JobItem';

const JobsList = ({ jobs, onDeleteJob }) => {
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
        {filteredJobs.map(job => (
          <JobItem 
            key={job.id} 
            job={job} 
            onClick={() => {
              // Handle job click
            }}
          >
            <button onClick={() => onDeleteJob(job.id)}>Delete Job</button>
          </JobItem>
        ))}
      </div>
    </div>
  );
};

export default JobsList;
