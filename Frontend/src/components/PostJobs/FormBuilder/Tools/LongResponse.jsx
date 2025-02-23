import React from 'react';

const LongResponse = ({ question, updateQuestion }) => {
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
      {/* Read-only preview of the long answer textarea */}
      <textarea 
        placeholder="Long answer" 
        value={question.answer || ''} 
        readOnly 
        style={{ width: '100%', minHeight: '80px' }}
      />
    </div>
  );
};

export default LongResponse;
