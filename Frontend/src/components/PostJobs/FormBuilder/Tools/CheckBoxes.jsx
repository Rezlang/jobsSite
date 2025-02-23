import React from 'react';

const CheckBoxes = ({ question, updateQuestion }) => {
  const updateOption = (index, value) => {
    const newOptions = [...question.options];
    newOptions[index] = value;
    updateQuestion({ options: newOptions });
  };

  const addOption = () => {
    updateQuestion({ options: [...question.options, `Option ${question.options.length + 1}`] });
  };

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
      {question.options.map((option, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          <input type="checkbox" disabled />
          <input 
            type="text" 
            value={option} 
            onChange={(e) => updateOption(index, e.target.value)}
            style={{ marginLeft: '5px', flex: 1 }}
          />
        </div>
      ))}
      <button onClick={addOption}>Add Option</button>
    </div>
  );
};

export default CheckBoxes;
