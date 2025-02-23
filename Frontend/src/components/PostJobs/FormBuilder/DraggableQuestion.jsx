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

  const handleDragStart = (e, data) => {
    setDraggingState({ id: question.id, initialIndex: index, offset: 0 });
  };

  const handleDrag = (e, data) => {
    if (draggingState && draggingState.id === question.id) {
      const newOffset = draggingState.offset + data.deltaY;
      setDraggingState({ ...draggingState, offset: newOffset });
    }
  };

  const GAP = 10; // Space between questions

const handleDragStop = (e, data) => {
  if (draggingState && draggingState.id === question.id) {
    const targetIndex = Math.max(
      0,
      Math.min(
        totalItems - 1,
        Math.round((draggingState.initialIndex * (slotHeight + GAP) + draggingState.offset) / (slotHeight + GAP))
      )
    );
    if (targetIndex !== draggingState.initialIndex) {
      reorderQuestion(question.id, targetIndex);
    }
    setDraggingState(null);
  }
};

let additionalOffset = 0;
if (draggingState && draggingState.id !== question.id) {
  const { initialIndex, offset } = draggingState;
  const targetIndex = Math.max(
    0,
    Math.min(
      totalItems - 1,
      Math.round((initialIndex * (slotHeight + GAP) + offset) / (slotHeight + GAP))
    )
  );
  if (initialIndex < index && index <= targetIndex) {
    additionalOffset = -(slotHeight + GAP);
  } else if (initialIndex > index && index >= targetIndex) {
    additionalOffset = (slotHeight + GAP);
  }
}

const positionY = (draggingState && draggingState.id === question.id)
  ? (draggingState.initialIndex * (slotHeight + GAP) + draggingState.offset)
  : (index * (slotHeight + GAP) + additionalOffset);


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
          transition: draggingState ? 'none' : 'top 0.2s ease'
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 2,
            pr: 15,
            position: 'relative',
            height: slotHeight, // fixed height ensures snapping with no extra space
            overflowY: 'auto',
            boxSizing: 'border-box'
          }}
        >
          {children}
          <Box
            className="drag-handle"
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'grab',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Box component="span" sx={{ fontSize: '48px', userSelect: 'none' , color: 'rgba(0,0,0,0.5)'}}>
              &#9776;
            </Box>
          </Box>
        </Paper>
      </Box>
    </Draggable>
  );
};

export default DraggableQuestion;
