import { timesSeries } from "async";
import React from "react";

//Hemos redefido la clase Square para que sea un
//componente de función
function Square (props) {
  return (
    <button
      className='square'
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export class Board extends React.Component {
  //Elevamos el control de los squares e xIsNext desde
  //squares a board. Tendremos que pasar un argumento con
  //la ubicación del square.
  /*
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }
  */
  constructor(props) {
    super(props);
  }
 /*
  handleClick (i) {
    //const squares =this.state.squares.slice();
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    
    //Si alguien ya ha ganado o el cuadro está
    //ocupado, no hace caso al click
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i]=this.state.xIsNext ? "X" : "O";
    this.setState(
      {
        history: history.concat(
          [
            {
              squares: squares
            }
          ]
        ),
        xIsNext: !this.state.xIsNext
      }
    );
  }
  */

  renderSquare(i) {
    //Incluido el handleClick
    return (
      <Square
        value={this.props.squares[i]} //Cambio de this.state por this.props
        onClick={() => this.props.onClick(i)} //Cambio this.handleClick por this.props.onClick
      />
    );
  }
  
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}{this.renderSquare(1)}{this.renderSquare(2)} 
        </div>
        <div className="board-row">
          {this.renderSquare(3)}{this.renderSquare(4)}{this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}{this.renderSquare(7)}{this.renderSquare(8)}
        </div>
      </div>
    );
  }
}