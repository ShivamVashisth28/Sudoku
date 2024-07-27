import React, { useCallback, useEffect, useState } from "react";
import MiniBoxGrid from "./MiniBoxGrid";
import '../index.css';
import { useRecoilState } from "recoil";
import { solveAtom } from "../store/solveAtom";

function Board({ box, solution }) {
  const [gridContainer, setGridContainer] = useState([]);
  const [currentBoard, setCurrentBoard] = useState(box);
  const [isSolved , setIsSolved] = useRecoilState(solveAtom)

  const fillEmptyBoard = (row, col) => {
    const grid = [[], [], []];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        grid[i][j] = box[row + i][col + j];
      }
    }
    return grid;
  };

  const setGrids = useCallback(() => {
    const newGridContainer = [];
    for (let i = 0; i < 9; i += 3) {
      for (let j = 0; j < 9; j += 3) {
        newGridContainer.push(fillEmptyBoard(i, j));
      }
    }
    setGridContainer(newGridContainer);
  }, [box]);

  useEffect(() => {
    setGrids();
    setCurrentBoard(box);
  }, [box, setGrids]);

  const handleChange = (row, col, value) => {
    const newBoard = [...currentBoard];
    newBoard[row][col] = value;
    setCurrentBoard(newBoard);
    checkSolution()
  };

  const checkSolution = () => {
    if (JSON.stringify(currentBoard) === JSON.stringify(solution)) {
        setIsSolved(true)
    } else {
        setIsSolved(false)
    }
}

  return (
    <div className="box-size border-2 border-slate-600">
      <div className="flex h-1/3 w-full">
        {gridContainer.slice(0, 3).map((grid, index) => (
          <MiniBoxGrid 
            key={index} 
            value={grid} 
            startRow={Math.floor(index / 3) * 3} 
            startCol={(index % 3) * 3} 
            onChange={handleChange} 
          />
        ))}
      </div>
      <div className="flex h-1/3 w-full">
        {gridContainer.slice(3, 6).map((grid, index) => (
          <MiniBoxGrid 
            key={index} 
            value={grid} 
            startRow={Math.floor(index / 3) * 3 + 3} 
            startCol={(index % 3) * 3} 
            onChange={handleChange} 
          />
        ))}
      </div>
      <div className="flex h-1/3 w-full">
        {gridContainer.slice(6, 9).map((grid, index) => (
          <MiniBoxGrid 
            key={index} 
            value={grid} 
            startRow={Math.floor(index / 3) * 3 + 6} 
            startCol={(index % 3) * 3} 
            onChange={handleChange} 
          />
        ))}
      </div>
    </div>
  );
}

export default Board;
