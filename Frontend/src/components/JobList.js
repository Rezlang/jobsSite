import React, { useState } from 'react';
import Toolbar from './Toolbar';
import JobItem from './JobItem';

// Example jobs array with additional attributes for filtering
const jobsData = [
  {
    id: 1,
    logo: "https://via.placeholder.com/50",
    title: "Software Engineer",
    company: "Example Inc.",
    description: "We are looking for a software engineer to join our team. Responsibilities include developing scalable applications, working with cross-functional teams, and participating in code reviews. Additional experience with React and Node.js is a plus.",
    workLocation: "Remote",
    employmentType: "Full-Time",
    careerLevel: "Experienced"
  },
  {
    id: 2,
    logo: "https://via.placeholder.com/50",
    title: "Product Manager",
    company: "Acme Corp",
    description: "As a product manager, you will drive product development from concept to launch. You will collaborate with design, engineering, and marketing teams and analyze market trends to ensure product success.",
    workLocation: "In-Office",
    employmentType: "Full-Time",
    careerLevel: "Mid-Career"
  },
  {
    id: 3,
    logo: "https://via.placeholder.com/50",
    title: "UX Designer Intern",
    company: "Design Studio",
    description: "Join our team as an intern and help us improve user experience across our product lines. This role is ideal for someone eager to learn and contribute to design projects.",
    workLocation: "Hybrid",
    employmentType: "Internship",
    careerLevel: "Early-Career"
  },
  {
    id: 4,
    logo: "https://via.placeholder.com/50",
    title: "Marketing Specialist",
    company: "BrandCo",
    description: "We are seeking a creative marketing specialist to lead our digital campaigns. You should have a strong understanding of social media trends and data analytics.",
    workLocation: "Remote",
    employmentType: "Part-Time",
    careerLevel: "Mid-Career"
  }
];

const JobsList = () => {
  // criteria holds the search term and filter selections passed up from Toolbar
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

  // Filter jobs based on the search term and selected filters.
  const filteredJobs = jobsData.filter(job => {
    const { searchTerm, filters } = criteria;
    
    // Match the search term against job title, company, or description.
    const searchTermMatch = searchTerm.trim() === '' ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // For each filter group, if selections exist, ensure the job's attribute is one of the selected values.
    const workLocationMatch = filters.workLocation.length === 0 || filters.workLocation.includes(job.workLocation);
    const employmentTypeMatch = filters.employmentType.length === 0 || filters.employmentType.includes(job.employmentType);
    const careerLevelMatch = filters.careerLevel.length === 0 || filters.careerLevel.includes(job.careerLevel);
    
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
              // Handle job click (e.g., open a detailed view)
            }} 
          />
        ))}
      </div>
    </div>
  );
};

export default JobsList;
