import React, { useState } from 'react';
import Box from '@mui/material/Box';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';

const App = () => {
  // Sample job data. In a real app, you might fetch this from an API.
  const jobs = [
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

  const [selectedJob, setSelectedJob] = useState(null);

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
