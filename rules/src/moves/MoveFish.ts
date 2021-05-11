import { SymbolEnum } from "../GameElements/Symbols";
import GameState, { Position } from "../GameState";
import { LBFUtils } from "../LittleBigFishUtils";
import MoveType from "./MoveType";

export type MoveFish = {
  type: MoveType.MOVE_FISH;
  fromPosition: Position;
  toPosition: Position;
}

export function moveFishMove(fromPosition: Position, toPosition: Position): MoveFish {
  return {type: MoveType.MOVE_FISH, fromPosition, toPosition};
}

export function moveFish(state: GameState, move: MoveFish) {
  const fish = state.fishPositions.find(fp => fp.position.X === move.fromPosition.X && fp.position.Y === move.fromPosition.Y)!.fish;
  
  // Remove old fish position from the list
  state.fishPositions = state.fishPositions.filter(fp => !(fp.position.X === move.fromPosition.X && fp.position.Y === move.fromPosition.Y));
  
  // Get possible ennemy fish at target position
  const ennemyFish = state.fishPositions.find(fp => fp.position.X === move.toPosition.X && fp.position.Y === move.toPosition.Y);

  if(ennemyFish) {
    state.fishPositions = state.fishPositions.filter(fp => !(fp.position.X === move.toPosition.X && fp.position.Y === move.toPosition.Y));
    state.players.find(p => p.color === state.activePlayer)!.capturedFishes++;
  }

  fish.hasBeenUpdated = false;

  state.fishPositions.push({fish, position: move.toPosition});
  
  const squaresMatrix = LBFUtils.getSquareMatrix(LBFUtils.getBoardViews(state.boards));
  const fishes = state.fishPositions.filter(fp => !fp.fish.hasBeenUpdated);
  const fishOnWreck = fishes.find(fp => squaresMatrix[fp.position.Y][fp.position.X].type === SymbolEnum.WRECK);
  
  if(!fishOnWreck) {
    // Does not count move when moving from a shipwreck
    state.nbMoves++;
  }

  state.selectedFish = null;
}