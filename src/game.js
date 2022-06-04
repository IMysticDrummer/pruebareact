import React from "react";
import {Board, calculateWinner} from "./board";

function GamePrepare (props) {

}

function handleClick (i, state) {
  const history=state.history.slice(0, state.stepNumber+1);
  const current=history[history.length-1];
  const squares =current.squares.slice();

  //Si alguien ya ha ganado o el cuadro está
  //ocupado, no hace caso al click
  if (calculateWinner(squares) || squares[i]) {
    return;
  }

  squares[i]=state.xIsNext ? "X" : "O";

  return(
    {
      history: history.concat([{'squares':squares}]),
      xIsNext: !state.xIsNext,
      stepNumber: history.length
    }
  );
}

function jumpTo(step) {
  return (
    {
      stepNumber: step,
      xIsNext: (step %2) === 0,
    }
  );
}
export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      xIsNext: true,
      stepNumber: 0,
    }
  }
  
  //Modificamos para mostrar el tablero reciente desde el history
  render() {
    //Código añadido para mostrar el último añadido a history
    const history=this.state.history;
    const current=history[this.state.stepNumber];
    const winner=calculateWinner(current.squares);

    const moves=history.map(
      (step, move) => {
        const desc = move ? "Go to move # "+move: "Go to game start";

        return(
          <li key={move}>
            <button onClick={
              ()=>{
                this.setState(jumpTo(move));
              }
            }>
              {desc}
            </button>
          </li>
        );
      }
    );

    let status= winner ? ('Winner: ' + winner)  : ('Next player: ' + (this.state.xIsNext ? 'X' : 'O')); 
    
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={
              (i) => {
                this.setState(handleClick(i, this.state));
              }
            }
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}