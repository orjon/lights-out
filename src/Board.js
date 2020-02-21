import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: .05
  };

  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    };
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    for (let r=0; r < this.props.nrows; r++) {
      let row = []
      for (let c=0; c<this.props.ncols; c++){
        row.push(Math.random() < this.props.chanceLightStartsOn)
      }
      board.push(row)
    }
    console.log('board');
    console.log(board);  
    // TODO: create array-of-arrays of true/false values

    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    console.log('flipping: '+coord);
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y,x);
    flipCell(y-1,x);
    flipCell(y+1,x);
    flipCell(y,x-1);
    flipCell(y,x+1);
    let hasWon = board.every(row => row.every(cell => !cell ))
    this.setState({board, hasWon}); 
    
  }




  /** Render game board or winning message. */

  render() {

    let boardTable = [];
    for (let r= 0; r < this.props.nrows; r++){
      let row=[];
      for (let c=0; c <this.props.ncols; c++){
        let coord = `${r}-${c}`
        row.push(<Cell key={coord} isLit={this.state.board[r][c]} flipCellsAroundMe={() => this.flipCellsAround(coord)} />)
      }
      boardTable.push(<tr key={r}>{row}</tr>)
    }
    return(
    <div className='BoardContainer'>    
      <table>
        <tbody>
          {boardTable}
        </tbody>
      </table>
    </div>
    );
  }
}


export default Board;