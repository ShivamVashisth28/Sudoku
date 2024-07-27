import React from 'react';
import SingleBox from './SingleBox';

function SmallGrid({ numbers, startRow, startCol, onChange }) {
  return (
    <div className="flex h-1/3">
      {[0, 1, 2].map((value, index) => (
        <SingleBox 
          key={index} 
          value={numbers[index]} 
          row={startRow} 
          col={startCol + index} 
          onChange={onChange} 
        />
      ))}
    </div>
  );
}

export default SmallGrid;
