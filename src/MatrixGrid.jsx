import React, { useState, useEffect } from 'react';

const MatrixGrid = () => {
  // Initialize the 3x3 grid with default properties.
  const initialGrid = Array.from({ length: 9 }, (_, index) => ({
    id: index,
    color: '#ddd',  // initial background color (light gray)
    clicked: false,
  }));

  // State for the grid, order of box clicks, and whether to show the reset button.
  const [grid, setGrid] = useState(initialGrid);
  const [clickOrder, setClickOrder] = useState([]);
  const [resetAvailable, setResetAvailable] = useState(false);

  // Handle click on a box.
  const handleClick = (index) => {
    // If the box has already been clicked, do nothing.
    if (grid[index].clicked) return;

    // Update the grid: mark the clicked box as clicked and change its color to green.
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[index] = { ...newGrid[index], color: 'green', clicked: true };
      return newGrid;
    });

    // Record the index of the clicked box.
    setClickOrder((prevOrder) => [...prevOrder, index]);
  };

  // Effect that triggers once all boxes have been clicked.
  useEffect(() => {
    if (clickOrder.length === grid.length) {
      // Sequentially update each box's color to yellow, in the order they were clicked.
      clickOrder.forEach((boxIndex, seq) => {
        setTimeout(() => {
          setGrid((prevGrid) => {
            const updatedGrid = [...prevGrid];
            updatedGrid[boxIndex] = { ...updatedGrid[boxIndex], color: 'yellow' };
            return updatedGrid;
          });
        }, seq * 500); // 500ms delay multiplied by the order index.
      });

      // Once all boxes have changed to yellow, enable the reset button.
      // The delay is based on the last box's delay plus a little extra time.
      setTimeout(() => {
        setResetAvailable(true);
      }, clickOrder.length * 500 + 500);
    }
  }, [clickOrder, grid.length]);

  // Reset the grid to its initial state.
  const resetGrid = () => {
    setGrid(initialGrid);
    setClickOrder([]);
    setResetAvailable(false);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 100px)',
          gridGap: '10px',
          margin: '50px auto',
          width: 'max-content',
        }}
      >
        {grid.map((box, index) => (
          <div
            key={box.id}
            onClick={() => handleClick(index)}
            style={{
              backgroundColor: box.color,
              width: '100px',
              height: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'background-color 0.3s',
            }}
          >
            {index + 1}
          </div>
        ))}
      </div>
      {resetAvailable && (
        <button 
          onClick={resetGrid}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            marginTop: '20px',
          }}
        >
          Reset
        </button>
      )}
    </div>
  );
};

export default MatrixGrid;
