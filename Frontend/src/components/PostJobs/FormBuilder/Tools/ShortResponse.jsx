import React from 'react';

const ShortResponse = ({ question, updateQuestion }) => {
  return (
    <div>
      <input 
        type="text" 
        value={question.title} 
        onChange={(e) => updateQuestion({ title: e.target.value })}
        placeholder="Enter your question" 
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <input 
        type="text" 
        placeholder="Short answer" 
        value={question.answer || ''} 
        readOnly 
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default ShortResponse;
