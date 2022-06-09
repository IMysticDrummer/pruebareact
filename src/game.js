import React from "react";
import {Board, calculateWinner} from "./board";
import {addGameStatus, jumpTo} from "./gameSlice";
import { useSelector, useDispatch } from "react-redux";

function GameRender (props) {
  const state=useSelector((state) => state.gameStore);
  /*const history=useSelector((state) => state.gameStore.history);
  console.log(history);
  const stepNumber=useSelector((state) => state.gameStore.stepNumber);
  const xIsNext=useSelector((state) => state.gameStore.xIsNext);
  const current=history[stepNumber];
  const winner=calculateWinner(current.squares);
  */

  //Para usar directamente el store
  const stepNumber=state.stepNumber;
  const history=state.history.slice(0, stepNumber+1);
  const current=history[history.length-1];
  const squares=current.squares.slice();
  const winner=calculateWinner(current.squares);
  const xIsNext=useSelector((state) => state.gameStore.xIsNext);

  const moves=history.map(
    (step, move) => {
      return(
        <ButtonsList move={move} key={stepNumber} />
      );
    }
  );

  let status= winner ? ('Winner: ' + winner)  : ('Next player: ' + (xIsNext ? 'X' : 'O'));

  const dispatch=useDispatch();
  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={
            //current.squares
            squares
          }
          onClick={
            (i) => {
              //this.setState(handleClick(i, this.state));
              //useDispatch(addGameStatus(handleClick(i,state)))
              //useDispatch(addGameStatus(handleClick2(i)))
              console.log('Has clicado en: '+i);
              console.log(state);
              
              //Si alguien ya ha ganado o el cuadro está
              //ocupado, no hace caso al click
              if (calculateWinner(squares) || squares[i]) {
                return;
              }

              squares[i]=state.xIsNext ? "X" : "O";
              console.log(squares);

              dispatch(addGameStatus(state,squares));
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

function ButtonsList (props) {
  const desc = props.move ? "Go to move # "+props.move: "Go to game start";
  return(
    <li key={props.move}>
      <button onClick={
          useDispatch(jumpTo(props.move))
      }>
        {desc}
      </button>
    </li>
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
    /*
    const history=this.state.history;
    const current=history[this.state.stepNumber];
    const winner=calculateWinner(current.squares);

    const moves=history.map(
      (step, move) => {
        return(
          <ButtonsList move={move} />
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
    */
    return(
      <GameRender />
    );
  }
}