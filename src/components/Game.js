import React, { useState } from 'react';
import { calculateWinner } from '../utils/winner';
import Board from './Board';

const Game = () => {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXisNext] = useState(true);
    const winner = calculateWinner(history[stepNumber]);
    const xO = xIsNext ? "X" : "O";

    const handleClick = (i) => {
        const historyPoint = history.slice(0, stepNumber + 1);
        const current = historyPoint[stepNumber];
        const squares = [...current];

        if (winner || squares[i]) return;

        squares[i] = xO;
        setHistory([...historyPoint, squares]);
        setStepNumber(historyPoint.length);
        setXisNext(!xIsNext);
    };

    const Reset = (step) => {
        setStepNumber(step);
        setXisNext(step % 2 === 0);
    };

    return (
        <React.Fragment>
            <h1>React Juego del Gato</h1>
            <Board squares={history[stepNumber]} onClick={handleClick} />
            <div className="info-wrapper">
                <button onClick={() => Reset(0)}>Reset</button>
                <h3>{winner ? "Ganador: " + winner : stepNumber === 9 ? "Empate" : "Siguiente Jugador: " + xO}</h3>
            </div>
        </React.Fragment>
    );
}

export default Game;