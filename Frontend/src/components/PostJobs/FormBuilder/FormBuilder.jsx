import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import DraggableQuestion from './DraggableQuestion';
import ShortResponse from './Tools/ShortResponse';
import LongResponse from './Tools/LongResponse';
import NumericalInput from './Tools/NumericalInput';
import CheckBoxes from './Tools/CheckBoxes';
import SingleChoice from './Tools/SingleChoice';

const questionComponents = {
  short: ShortResponse,
  long: LongResponse,
  numerical: NumericalInput,
  checkbox: CheckBoxes,
  single: SingleChoice
};

let idCounter = 0;
const SLOT_HEIGHT = 160;

const FormBuilder = () => {
  const [questions, setQuestions] = useState([]);
  // Shared drag state: holds { id, initialIndex, offset } for the question being dragged
  const [draggingState, setDraggingState] = useState(null);

  const addQuestion = (type) => {
    const newQuestion = {
      id: `q-${idCounter++}`,
      type,
      title: '',
      // Initialize options for choice-based questions
      options: (type === 'checkbox' || type === 'single') ? ['Option 1'] : [],
      answer: ''
    };
    setQuestions([...questions, newQuestion]);
  };

  // Update a question’s data
  const updateQuestion = (id, updatedData) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updatedData } : q));
  };

  // Remove the question from its current spot and insert it at the new index
  const reorderQuestion = (id, newIndex) => {
    setQuestions(prevQuestions => {
      const currentIndex = prevQuestions.findIndex(q => q.id === id);
      if (currentIndex === -1 || currentIndex === newIndex) return prevQuestions;
      const newQuestions = [...prevQuestions];
      const [movedItem] = newQuestions.splice(currentIndex, 1);
      newQuestions.splice(newIndex, 0, movedItem);
      return newQuestions;
    });
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', position: 'relative' }}>
      {/* Main panel displaying questions */}
      <Box
        className="main-panel"
        sx={{
          flex: 1,
          position: 'relative',
          overflow: 'auto',
          bgcolor: '#f9f9f9',
          p: 2,
          minHeight: '100vh'
        }}
      >
        {questions.map((q, index) => {
          const Component = questionComponents[q.type];
          return (
            <DraggableQuestion
              key={q.id}
              question={q}
              index={index}
              totalItems={questions.length}
              slotHeight={SLOT_HEIGHT}
              reorderQuestion={reorderQuestion}
              draggingState={draggingState}
              setDraggingState={setDraggingState}
            >
              <Component
                question={q}
                updateQuestion={(data) => updateQuestion(q.id, data)}
              />
            </DraggableQuestion>
          );
        })}
      </Box>

      {/* Tool panel for adding new questions */}
      <Box
        className="tool-list"
        sx={{
          width: 250,
          borderLeft: '1px solid #ccc',
          p: 2,
          bgcolor: '#fff'
        }}
      >
        <Typography variant="h6" gutterBottom>
          Tools
        </Typography>
        <Button variant="contained" fullWidth sx={{ mb: 1 }} onClick={() => addQuestion('short')}>
          Short Response
        </Button>
        <Button variant="contained" fullWidth sx={{ mb: 1 }} onClick={() => addQuestion('long')}>
          Long Response
        </Button>
        <Button variant="contained" fullWidth sx={{ mb: 1 }} onClick={() => addQuestion('numerical')}>
          Numerical Input
        </Button>
        <Button variant="contained" fullWidth sx={{ mb: 1 }} onClick={() => addQuestion('checkbox')}>
          Check Boxes
        </Button>
        <Button variant="contained" fullWidth sx={{ mb: 1 }} onClick={() => addQuestion('single')}>
          Single Choice
        </Button>
      </Box>
    </Box>
  );
};

export default FormBuilder;
