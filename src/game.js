import React from "react";
import {Board, calculateWinner} from "./board";

export default class Game extends React.Component {
  //Elevamos el control de los squares e xIsNext desde
  //squares a board. Tendremos que pasar un argumento con
  //la ubicación del square.
  //También guardamos el historial, mostrando el último de
  //ellos
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

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step %2) === 0,
    });
  }

  handleClick (i) {
    const history=this.state.history.slice(0, this.state.stepNumber+1);
    const current=history[history.length-1];
    const squares =current.squares.slice();

    //Si alguien ya ha ganado o el cuadro está
    //ocupado, no hace caso al click
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i]=this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{'squares':squares}]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
    console.log('despues de actualizar history: ');
    console.log(this.state.history);
    console.log(this.state);
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
            <button onClick={()=>this.jumpTo(move)}>
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
            onClick={(i) => this.handleClick(i)}
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