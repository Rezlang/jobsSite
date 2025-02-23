import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Checkbox, FormControlLabel, Radio, RadioGroup, FormControl } from '@mui/material';

// Dummy fetchJob function – in a real app, this would call your API
const fetchJob = async (jobID) => {
  // Simulate an API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: jobID,
        title: "Job Title",
        custom_questions: [
          {
            answer: "",
            id: "q-0",
            options: [],
            title: "TEST SHORT",
            type: "short",
          },
          {
            answer: "",
            id: "q-1",
            options: [],
            title: "TEST LONG",
            type: "long",
          },
          {
            answer: "",
            id: "q-2",
            options: [],
            title: "TEST NUMERIC",
            type: "numerical",
          },
          {
            answer: "",
            id: "q-3",
            options: ["Option 1", "Option 2", "Option 3"],
            title: "TEST CHECK",
            type: "checkbox",
          },
          {
            answer: "",
            id: "q-4",
            options: ["Option 1", "Option 2", "Option 3"],
            title: "TEST SELECT",
            type: "single",
          }
        ]
      });
    }, 1000);
  });
};

const Application = ({ jobID }) => {
  const [jobData, setJobData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJob() {
      try {
        const data = await fetchJob(jobID);
        setJobData(data);
        // Initialize answers for each question
        const initialAnswers = {};
        data.custom_questions.forEach(q => {
          initialAnswers[q.id] = q.answer;
        });
        setAnswers(initialAnswers);
      } catch (error) {
        console.error("Error fetching job data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadJob();
  }, [jobID]);

  const handleChange = (qId, value) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const handleCheckboxChange = (qId, option) => {
    setAnswers(prev => {
      const current = prev[qId] || [];
      if (current.includes(option)) {
        return { ...prev, [qId]: current.filter(item => item !== option) };
      } else {
        return { ...prev, [qId]: [...current, option] };
      }
    });
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case 'short':
        return (
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Your answer"
            value={answers[question.id]}
            onChange={(e) => handleChange(question.id, e.target.value)}
          />
        );
      case 'long':
        return (
          <TextField
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            placeholder="Your answer"
            value={answers[question.id]}
            onChange={(e) => handleChange(question.id, e.target.value)}
          />
        );
      case 'numerical':
        return (
          <TextField
            fullWidth
            variant="outlined"
            type="number"
            placeholder="Your answer"
            value={answers[question.id]}
            onChange={(e) => handleChange(question.id, e.target.value)}
          />
        );
      case 'checkbox':
        return (
          <Box>
            {question.options.map((option, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={answers[question.id]?.includes(option) || false}
                    onChange={() => handleCheckboxChange(question.id, option)}
                  />
                }
                label={option}
              />
            ))}
          </Box>
        );
      case 'single':
        return (
          <FormControl component="fieldset">
            <RadioGroup
              value={answers[question.id]}
              onChange={(e) => handleChange(question.id, e.target.value)}
            >
              {question.options.map((option, index) => (
                <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
              ))}
            </RadioGroup>
          </FormControl>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <Typography>Loading application...</Typography>;
  }

  if (!jobData) {
    return <Typography>Error loading job data.</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Application for {jobData.title}
      </Typography>
      {jobData.custom_questions.map(question => (
        <Box key={question.id} sx={{ my: 2 }}>
          <Typography variant="h6">{question.title}</Typography>
          {renderQuestion(question)}
        </Box>
      ))}
      <Button variant="contained" color="primary">
        Submit Application
      </Button>
    </Box>
  );
};

export default Application;
