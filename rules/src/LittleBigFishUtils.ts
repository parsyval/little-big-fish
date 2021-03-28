import shuffle from 'lodash.shuffle';
import { Board, Board1, Board2, Board3, Board4, BoardView } from "./GameElements/Board";
import { FishSizeEnum } from "./GameElements/Fish";
import { PlanktonColor } from "./GameElements/PlanktonToken";
import { SurpriseToken, SurpriseTokenEnum } from "./GameElements/SurpriseToken";
import { SymbolEnum } from "./GameElements/Symbols";
import PlayerColor from "./PlayerColor";
import PlayerState from "./PlayerState";

export abstract class LBFUtils {
  public static getInitialPlayerState(color: PlayerColor): PlayerState {
    const availableFish = new Map<FishSizeEnum, number>()
      .set(FishSizeEnum.SMALL, 6)
      .set(FishSizeEnum.MEDIUM, 4)
      .set(FishSizeEnum.BIG, 2);

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

  public static rotateBoard(board: BoardView) {
    // reverse the rows
    board.squares = board.squares.reverse();
    
    // swap the symmetric elements
    for (var i = 0; i < board.squares.length; i++) {
      for (var j = 0; j < i; j++) {
        var temp = board.squares[i][j];
        board.squares[i][j] = board.squares[j][i];
        board.squares[j][i] = temp;
      }
    }
  }

  public static getBoardViewFromBoard(board: Board): BoardView {
    const result = board.id === 1 ? Board1
    : board.id === 2 ? Board2
    : board.id === 3 ? Board3
    : Board4;

    for(let i=0 ; i<board.rotation ; i++) {
      LBFUtils.rotateBoard(result);
    }

    return result;
  }

  public static getStartPlacementIds(color: PlayerColor, boards: Board[]): number[]{
    const boardViews: BoardView[] = boards.map(b => LBFUtils.getBoardViewFromBoard(b));

    if(color === PlayerColor.Orange) {
      return [...boardViews[0].squares[0], ...boardViews[1].squares[0]].filter(square => square.type === SymbolEnum.OCEAN).map(square => square.id);
    } else {
      return [...boardViews[2].squares[2], ...boardViews[4].squares[2]].filter(square => square.type === SymbolEnum.OCEAN).map(square => square.id);
    }
  }
}