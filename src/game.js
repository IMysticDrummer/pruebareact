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
    }
  }

  handleClick (i) {
    const indexhistory = this.state.history.length-1;
    const squares =this.state.history[indexhistory].squares.slice();

    //Si alguien ya ha ganado o el cuadro está
    //ocupado, no hace caso al click
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i]=this.state.xIsNext ? "X" : "O";
    this.setState({history: this.state.history.push({'squares':squares}), xIsNext: !this.state.xIsNext});
    console.log('despues de actualizar history: ');
    console.log(this.state.history);
    console.log(this.state);
  }
  
  //Modificamos para mostrar el tablero reciente desde el history
  render() {
    //Código añadido para mostrar el último añadido a history
    const history=this.state.history;
    console.log('history: ');
    console.log(this.state);
    const current=history[history.length-1];
    console.log('current: ');
    console.log(current);
    const winner=calculateWinner(current.squares);
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
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}