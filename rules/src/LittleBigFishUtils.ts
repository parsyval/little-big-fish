import shuffle from 'lodash.shuffle';
import { Board, Board1, Board2, Board3, Board4, BoardView } from "./GameElements/Board";
import { FishSizeEnum } from "./GameElements/Fish";
import { PlanktonColor } from "./GameElements/PlanktonToken";
import { SurpriseToken, SurpriseTokenEnum } from "./GameElements/SurpriseToken";
import { SymbolEnum } from "./GameElements/Symbols";
import { SquareWithAFish } from './GameState';
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
        {color: PlanktonColor.RED, isAvailable: true},
        {color: PlanktonColor.BLUE, isAvailable: true},
        {color: PlanktonColor.YELLOW, isAvailable: true},
        {color: PlanktonColor.GREEN, isAvailable: true},
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

  public static getStartPlacementIds(color: PlayerColor, boards: Board[], fishes: SquareWithAFish[]): number[]{
    const boardViews: BoardView[] = LBFUtils.getBoardViews(boards);
    const line = color === PlayerColor.Orange 
    ? [...boardViews[0].squares[0], ...boardViews[1].squares[0]] 
    : [...boardViews[2].squares[2], ...boardViews[3].squares[2]];

    return line.filter(square => square.type === SymbolEnum.OCEAN)
      .filter(square => !fishes.some(f => f.squareId === square.id))
      .map(square => square.id);
  }
}