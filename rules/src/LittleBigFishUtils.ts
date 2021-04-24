import shuffle from 'lodash.shuffle';
import { Board, Board1, Board2, Board3, Board4, BoardView, Square } from "./GameElements/Board";
import { FishSizeEnum } from "./GameElements/Fish";
import { SurpriseToken, SurpriseTokenEnum } from "./GameElements/SurpriseToken";
import { SymbolEnum } from './GameElements/Symbols';
import { FishAtPosition, Position } from './GameState';
import { MoveFish, moveFishMove } from './moves/MoveFish';
import PlayerColor from "./PlayerColor";
import PlayerState from "./PlayerState";

export abstract class LBFUtils {
  public static getInitialPlayerState(color: PlayerColor): PlayerState {
    const availableFish = {
      [FishSizeEnum.BIG]: 2,
      [FishSizeEnum.MEDIUM]: 4,
      [FishSizeEnum.SMALL]: 6,
    }

    return {
      color,
      availableFish,
      capturedFishes: 0,
      planktonTokens: [
        {color: SymbolEnum.PLANKTON_BLUE, isAvailable: true},
        {color: SymbolEnum.PLANKTON_RED, isAvailable: true},
        {color: SymbolEnum.PLANKTON_GREEN, isAvailable: true},
        {color: SymbolEnum.PLANKTON_YELLOW, isAvailable: true},
      ]     
    }
  }

  public static initSupriseTokens(): SurpriseToken[] {
    return shuffle([
      {type: SurpriseTokenEnum.BIRTH}, {type: SurpriseTokenEnum.BIRTH},
      {type: SurpriseTokenEnum.FISHERMAN}, {type: SurpriseTokenEnum.FISHERMAN},
      {type: SurpriseTokenEnum.PLANKTON}, {type: SurpriseTokenEnum.PLANKTON},
      {type: SurpriseTokenEnum.WHIRLWIND}, {type: SurpriseTokenEnum.WHIRLWIND},
    ]);
  }

  public static rotateMatrice<T>(matrice: T[][]): T[][] {
    const result: T[][] = JSON.parse(JSON.stringify(matrice));
    
    // reverse the rows
    result.reverse();
    
    // swap the symmetric elements
    for (var i = 0; i < result.length; i++) {
      for (var j = 0; j < i; j++) {
        var temp = result[i][j];
        result[i][j] = result[j][i];
        result[j][i] = temp;
      }
    }

    return result;
  }

  public static getBoardViewFromBoard(board: Board): BoardView {
    let squares = board.id === 1 ? Board1.squares
    : board.id === 2 ? Board2.squares
    : board.id === 3 ? Board3.squares
    : Board4.squares;

    for(let i=0 ; i<board.rotation ; i++) {
      squares = LBFUtils.rotateMatrice(squares);
    }

    return {
      id: board.id,
      rotation: board.rotation,
      squares
    };
  }

  public static getBoardViews(boards: Board[]): BoardView[] {
    return boards.map(LBFUtils.getBoardViewFromBoard);
  }

  public static getSquareMatrix(views: BoardView[]): Square[][] {
    return [
      [...views[0].squares[0], ...views[1].squares[0]],
      [...views[0].squares[1], ...views[1].squares[1]],
      [...views[0].squares[2], ...views[1].squares[2]],
      [...views[2].squares[0], ...views[3].squares[0]],
      [...views[2].squares[1], ...views[3].squares[1]],
      [...views[2].squares[2], ...views[3].squares[2]],
    ]
  }

  public static getStartPositionsWithoutFish(color: PlayerColor, fishes: FishAtPosition[]): Position[]{
    return (color === PlayerColor.PINK 
      ? [{X: 0, Y: 0}, {X: 2, Y: 0}, {X: 3, Y: 0}, {X: 5, Y: 0}]  // Pink got the first line
      : [{X: 0, Y: 5}, {X: 2, Y: 5}, {X: 3, Y: 5}, {X: 5, Y: 5}]) // Orange got the last line
      .filter(p => !fishes.some(f => f.position.X === p.X && f.position.Y === p.Y)); // Remove the postions that already have a fish on it
  }

  public static isPlanktonSymbol(symbol: SymbolEnum): boolean {
    return symbol === SymbolEnum.PLANKTON_BLUE || symbol === SymbolEnum.PLANKTON_GREEN 
      || symbol === SymbolEnum.PLANKTON_RED || symbol === SymbolEnum.PLANKTON_YELLOW || symbol === SymbolEnum.PLANKTON;
  }

  public static getPossibleMoves(fp: FishAtPosition, squares: Square[][]): MoveFish[] {
    return [
      {X: fp.position.X - 1, Y: fp.position.Y - 1}, 
      {X: fp.position.X + 1, Y: fp.position.Y - 1}, 
      {X: fp.position.X - 1, Y: fp.position.Y + 1}, 
      {X: fp.position.X + 1, Y: fp.position.Y + 1}]
      .filter(position => position.X >= 0 || position.X < 6 || position.Y >= 0 || position.Y < 6)
      .filter(position => fp.fish.size !== FishSizeEnum.SMALL && squares[position.X][position.Y].type === SymbolEnum.WRECK)
      .map(position => moveFishMove(fp.position, position));
  }
}