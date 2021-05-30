import shuffle from 'lodash.shuffle';
import { Board, Board1, Board2, Board3, Board4, BoardView, Square } from "./GameElements/Board";
import { FishSizeEnum } from "./GameElements/Fish";
import { SurpriseToken, SurpriseTokenEnum } from "./GameElements/SurpriseToken";
import { SymbolEnum } from './GameElements/Symbols';
import GameState, { FishAtPosition, Position } from './GameState';
import GameView from './GameView';
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
      ? [{X: 0, Y: 0}, {X: 0, Y: 2}, {X: 0, Y: 3}, {X: 0, Y: 5}]  // Pink got the left column
      : [{X: 5, Y: 0}, {X: 5, Y: 2}, {X: 5, Y: 3}, {X: 5, Y: 5}]) // Orange got the right column
      .filter(p => !fishes.some(f => f.position.X === p.X && f.position.Y === p.Y)); // Remove the postions that already have a fish on it
  }

  public static isPlanktonSymbol(symbol: SymbolEnum): boolean {
    return symbol === SymbolEnum.PLANKTON_BLUE || symbol === SymbolEnum.PLANKTON_GREEN 
      || symbol === SymbolEnum.PLANKTON_RED || symbol === SymbolEnum.PLANKTON_YELLOW || symbol === SymbolEnum.PLANKTON;
  }

  public static getPossibleMovePositions(state: GameState | GameView, fp?: FishAtPosition): Position[] {
    if (!fp) return [];

    const squares: Square[][] = LBFUtils.getSquareMatrix(LBFUtils.getBoardViews(state.boards))

    const biggerFishes = state.fishPositions.filter(otherFishPos =>
      fp.fish.size === FishSizeEnum.SMALL 
        ? otherFishPos.fish.size === FishSizeEnum.MEDIUM || otherFishPos.fish.size === FishSizeEnum.BIG
        : fp.fish.size === FishSizeEnum.MEDIUM
          ? otherFishPos.fish.size === FishSizeEnum.BIG
          : false
    );

    const sameColorFishes = state.fishPositions.filter(otherFishPos => otherFishPos.fish.color === state.activePlayer);

    return LBFUtils.getAdjacentSquares(squares, fp.position, fp.fish.size)
      .filter(position => !(fp.fish.size !== FishSizeEnum.SMALL && squares[position.Y][position.X].type === SymbolEnum.WRECK))
      .filter(position => !sameColorFishes.find(f => f.position.X === position.X && f.position.Y === position.Y))
      .filter(position => !biggerFishes.find(biggerFish => position.X === biggerFish.position.X && position.Y === biggerFish.position.Y));
  }

  public static getAdjacentSquares(squares: Square[][], position: Position, fishSize: FishSizeEnum, alreadyTestedPos: Position[] = []): Position[] {
    let directAdjacent: Position[] = [
      {X: position.X, Y: position.Y - 1}, 
      {X: position.X, Y: position.Y + 1}, 
      {X: position.X - 1, Y: position.Y}, 
      {X: position.X + 1, Y: position.Y},
    ]
    .filter(position => position.X >= 0 && position.X < 6 && position.Y >= 0 && position.Y < 6)
    .filter(pos => !alreadyTestedPos.some(test => test.X === pos.X && test.Y === pos.Y));

    if(fishSize === FishSizeEnum.SMALL) {
      const wrecks = directAdjacent.filter(pos => squares[pos.Y][pos.X].type === SymbolEnum.WRECK);
      alreadyTestedPos = [...alreadyTestedPos, ...wrecks];
      let wreckAdjacentsquares = wrecks.map(wreckPos => this.getAdjacentSquares(squares, wreckPos, fishSize, alreadyTestedPos));
      wreckAdjacentsquares.forEach(adjacentSquares => directAdjacent.push(...adjacentSquares));
    }
    
    return directAdjacent.filter(pos => !(squares[pos.Y][pos.X].type === SymbolEnum.WRECK));
  }
}