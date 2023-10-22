import React from 'react';
import "../index.css"

const Tags = () => {
  const numRows = 14;
  const numCols = 8;

  // Create a 2D array to store content for each cell
  const gridData = [];

  // Initialize the grid data with default values
  for (let row = 0; row < numRows; row++) {
    const rowData = [];
    for (let col = 0; col < numCols; col++) {
      rowData.push('Default value');
    }
    gridData.push(rowData);
  }

  // Set specific values for the first row, first column as time period, etc.
  gridData[0][0] = 'Time Period';
  gridData[0][1] = 'Monday';
  gridData[0][2] = 'Tuesday';

  // Render the grid based on gridData
  const boxes = [];

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      boxes.push(
        <div key={`${row}-${col}`} className="box">
          {gridData[row][col]}
        </div>
      );
    }
  }

  return (
    <div className="box-grid">
      {boxes}
    </div>
  );
};

export default Tags;
