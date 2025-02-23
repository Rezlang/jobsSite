import React from 'react';

const NumericalInput = ({ question, updateQuestion }) => {
  return (
    <div>
      {/* Title Input */}
      <input 
        type="text" 
        value={question.title} 
        onChange={(e) => updateQuestion({ title: e.target.value })}
        placeholder="Enter your question" 
        style={{ width: '100%', marginBottom: '10px' }}
      />
      {/* Read-only preview of the numerical input */}
      <input 
        type="number" 
        placeholder="Enter a number" 
        value={question.answer || ''} 
        readOnly 
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default NumericalInput;
