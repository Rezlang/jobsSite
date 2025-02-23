import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const JobItem = ({ job, onClick }) => {
  const { logo, title, company, description, workLocation, employmentType, careerLevel } = job;
  const previewDescription = description.length > 100 ? description.substring(0, 100) + '...' : description;

  return (
    <Card sx={{ display: 'flex', mb: 1, cursor: 'pointer' }} onClick={onClick}>
      <CardMedia
        component="img"
        image={logo}
        alt={`${company} logo`}
        sx={{ width: 50, height: 50, m: 1 }}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {company}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {previewDescription}
        </Typography>
        <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Typography variant="caption" color="primary">
            {workLocation}
          </Typography>
          <Typography variant="caption" color="primary">
            {employmentType}
          </Typography>
          <Typography variant="caption" color="primary">
            {careerLevel}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobItem;
