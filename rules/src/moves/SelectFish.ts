import GameState, { Position } from "../GameState";
import MoveType from "./MoveType";

export type SelectFish = {
  type: MoveType.SELECT_FISH,
  position: Position, 
}

export function selectFishMove(position: Position): SelectFish {
  return {type: MoveType.SELECT_FISH, position};
}

export function placeFish(state: GameState, move: SelectFish): void {
  state.selectedFishPosition = move.position;
}