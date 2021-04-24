import GameState, { Position } from "../GameState";
import MoveType from "./MoveType";

export type MoveFish = {
  type: MoveType.MOVE_FISH;
  fromPosition: Position;
  toPosition: Position;
  countMove: boolean;
}

export function moveFishMove(fromPosition: Position, toPosition: Position, countMove = true): MoveFish {
  return {type: MoveType.MOVE_FISH, fromPosition, toPosition, countMove};
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

  state.fishPositions.push({fish, position: move.toPosition});
  
  if(move.countMove) {
    // Does not count move when moving from a shipwreck
    state.nbMoves++;
  }
}