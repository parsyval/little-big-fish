import { SymbolEnum } from "../GameElements/Symbols";
import GameState, { FishAtPosition, Position } from "../GameState";
import GameView from "../GameView";
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

export function moveFish(state: GameState | GameView, move: MoveFish) {
  console.log('%cMOVE FISH', 'color:green');
  console.log('----> ', JSON.stringify(move));
  
  const fish = state.fishPositions.find(fp => fp.position.X === move.fromPosition.X && fp.position.Y === move.fromPosition.Y)!.fish;
  
  // Remove old fish position from the list
  state.fishPositions = state.fishPositions.filter(fp => !(fp.position.X === move.fromPosition.X && fp.position.Y === move.fromPosition.Y));
  
  // Get possible ennemy fish at target position
  const ennemyFish = state.fishPositions.find(fp => fp.position.X === move.toPosition.X && fp.position.Y === move.toPosition.Y);

  if(ennemyFish) {
    state.fishPositions = state.fishPositions.filter(fp => !(fp.position.X === move.toPosition.X && fp.position.Y === move.toPosition.Y));
    state.players.find(p => p.color === state.activePlayer)!.capturedFishes++;
  }

  const fishAtPos: FishAtPosition = {fish, position: move.toPosition};

  state.fishPositions.push(fishAtPos);
  
  const squaresMatrix = LBFUtils.getSquareMatrix(state);
  const isFishOnBirth = squaresMatrix[move.toPosition.Y][move.toPosition.X].type === SymbolEnum.BIRTH;
  const isFishOnPlankton = LBFUtils.isPlanktonSymbol(squaresMatrix[move.toPosition.Y][move.toPosition.X].type);

  if(isFishOnBirth || isFishOnPlankton) {
    state.fishNeedsAction = fishAtPos;
  } else {
    state.nbMoves++;
  }
}

export function moveFishInView(state: GameView, move: MoveFish) {
  console.log('%cMove fish in view', 'color:green');
  
  state.selectedFish = undefined;
  moveFish(state, move);
}