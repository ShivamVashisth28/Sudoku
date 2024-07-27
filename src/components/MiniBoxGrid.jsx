import React from 'react';
import SmallGrid from './SmallGrid';

function MiniBoxGrid({ value, startRow, startCol, onChange }) {
  return (
    <div className="w-1/3 h-full border border-black">
      {value && [0, 1, 2].map((val, index) => (
        <SmallGrid 
          key={index} 
          numbers={value[index]} 
          startRow={startRow + val} 
          startCol={startCol} 
          onChange={onChange} 
        />
      ))}
    </div>
  );
}

export default MiniBoxGrid;
