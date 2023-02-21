import React, { useState } from "react";
import "./Board.css";

const BoardSquare = ({ position, playerIndex, currentPlayer }) => {
  return (
    <div
      className="board-square"
      style={{
        backgroundColor:
          playerIndex === currentPlayer
            ? "lightblue"
            : position % 2 === 0
            ? "#F2F2F2"
            : "#E6E6E6",
      }}
    >
      <span
        className="board-square-text"
        style={{
          fontSize: "16px",
          color: "green",
        }}
      >
        {playerIndex !== -1 ? `Player ${playerIndex + 1}` : position + 1}
      </span>
    </div>
  );
};

const Dice = ({ onRoll, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      const roll = Math.floor(Math.random() * 6) + 1;
      onRoll(roll);
    }
  };

  return (
    <button onClick={handleClick} disabled={disabled} className="dice-button">
      Roll dice
    </button>
  );
};

const Board = () => {
  const [playerPositions, setPlayerPositions] = useState([0, 0]);
  const [turn, setTurn] = useState(0);
  const [winner, setWinner] = useState(-1);
  const [turnDone, setTurnDone] = useState(false);
  const currentPlayer = winner === -1 ? turn : -1;

  const movePlayer = (playerIndex, diceRoll) => {
    if (winner !== -1 || (turnDone && playerIndex === turn)) {
      return;
    }
    const newPositions = [...playerPositions];
    newPositions[playerIndex] += diceRoll;
    if (newPositions[playerIndex] >= 40) {
      setWinner(playerIndex);
      return;
    }
    setTurnDone(true);
    setPlayerPositions(newPositions);
  };

  const nextTurn = () => {
    setTurn(turn === 0 ? 1 : 0);
    setTurnDone(false);
  };

  const board = [];
  for (let i = 0; i < 40; i++) {
    board.push(
      <BoardSquare
        key={i}
        position={i}
        playerIndex={playerPositions.indexOf(i)}
        currentPlayer={currentPlayer}
      />
    );
  }

  return (
    <div className="board-container">
      {winner !== -1 && <div className="winner">Player {winner + 1} wins!</div>}
      <div className="board">{board}</div>
      {winner === -1 && (
        <>
          <Dice
            onRoll={(diceRoll) => movePlayer(turn, diceRoll)}
            disabled={turnDone}
          />
          {turnDone && (
            <button onClick={nextTurn} className="next-turn-button">
              Next turn
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Board;
