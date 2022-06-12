import React from "react";
import {Board, calculateWinner} from "./board";
import {addGameStatus, jumpTo} from "./gameSlice";
import { useSelector, useDispatch } from "react-redux";

function GameRender (props) {
  const state=useSelector((state) => state.gameStore);
  const stepNumber=state.stepNumber;
  const history=state.stepsHistory.slice(0, stepNumber+1);
  const current=history[history.length-1];
  const squares=current.squares.slice();
  const winner=calculateWinner(current.squares);
  const xIsNext=useSelector((state) => state.gameStore.xIsNext);

  const moves=history.map(
    (step, move) => {
      return(
        <ButtonsList move={move} key={move} />
      );
    }
  );

  let status= winner ? ('Winner: ' + winner)  : ('Next player: ' + (xIsNext ? 'X' : 'O'));

  const dispatch=useDispatch();
  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={squares}
          onClick={
            (i) => {
              //Si alguien ya ha ganado o el cuadro está
              //ocupado, no hace caso al click
              if (calculateWinner(squares) || squares[i]) {
                return;
              }
              squares[i]=state.xIsNext ? "X" : "O";
              dispatch(addGameStatus(squares));
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

/*
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
*/

function ButtonsList (props) {
  const desc = props.move ? "Go to move # "+props.move: "Go to game start";
  const dispatch=useDispatch();
  return(
    <li key={props.move}>
      <button onClick={() => dispatch(jumpTo(props.move))}>
        {desc}
      </button>
    </li>
  );
}
export default class Game extends React.Component {
  constructor(props) {
    super(props);
  }
  
  //Modificamos para mostrar el tablero reciente desde el history
  render() {
    return(
      <GameRender />
    );
  }
}