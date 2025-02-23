import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const DraggableQuestion = ({ 
  question, 
  index, 
  slotHeight, 
  totalItems, 
  reorderQuestion, 
  draggingState, 
  setDraggingState, 
  children 
}) => {
  const nodeRef = useRef(null);

  // When drag starts, record this question as the active one
  const handleDragStart = (e, data) => {
    setDraggingState({ id: question.id, initialIndex: index, offset: 0 });
  };

  // Update the drag offset as the question is moved
  const handleDrag = (e, data) => {
    if (draggingState && draggingState.id === question.id) {
      const newOffset = draggingState.offset + data.deltaY;
      setDraggingState({ ...draggingState, offset: newOffset });
    }
  };

  // On drag stop, compute the new index and reorder the questions accordingly
  const handleDragStop = (e, data) => {
    if (draggingState && draggingState.id === question.id) {
      const targetIndex = Math.max(
        0,
        Math.min(totalItems - 1, Math.round((draggingState.initialIndex * slotHeight + draggingState.offset) / slotHeight))
      );
      if (targetIndex !== draggingState.initialIndex) {
        reorderQuestion(question.id, targetIndex);
      }
      setDraggingState(null);
    }
  };

  // Determine the visual Y position.
  // - For the dragged question: show it at its initial position plus the drag offset.
  // - For other questions: if they fall between the dragged question’s original and target positions, shift them.
  let additionalOffset = 0;
  if (draggingState && draggingState.id !== question.id) {
    const { initialIndex, offset } = draggingState;
    const targetIndex = Math.max(
      0,
      Math.min(totalItems - 1, Math.round((initialIndex * slotHeight + offset) / slotHeight))
    );
    if (initialIndex < index && index <= targetIndex) {
      additionalOffset = -slotHeight;
    } else if (initialIndex > index && index >= targetIndex) {
      additionalOffset = slotHeight;
    }
  }

  const positionY = (draggingState && draggingState.id === question.id)
    ? (draggingState.initialIndex * slotHeight + draggingState.offset)
    : (index * slotHeight + additionalOffset);

  return (
    <Draggable
      nodeRef={nodeRef}
      axis="y"
      position={{ x: 0, y: positionY }}
      onStart={handleDragStart}
      onDrag={handleDrag}
      onStop={handleDragStop}
      handle=".drag-handle"
    >
      <Box 
        ref={nodeRef} 
        sx={{ 
          position: 'absolute', 
          width: '90%', 
          left: '5%',
          // Only animate when no drag is active for smoother snapping
          transition: draggingState ? 'none' : 'top 0.2s ease'
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 2,
            position: 'relative',
            height: slotHeight - 10,
            boxSizing: 'border-box'
          }}
        >
          {children}
          {/* Drag handle at the bottom-right */}
          <Box
            className="drag-handle"
            sx={{
              position: 'absolute',
              right: 8,
              bottom: 8,
              cursor: 'grab',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Box component="span" sx={{ fontSize: '24px', userSelect: 'none' }}>
              &#9776;
            </Box>
          </Box>
        </Paper>
      </Box>
    </Draggable>
  );
};

export default DraggableQuestion;
