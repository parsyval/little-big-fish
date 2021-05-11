import GameState, { FishAtPosition } from "../GameState";
import MoveType from "./MoveType";

export type SelectFish = {
  type: MoveType.SELECT_FISH,
  fishAtPos: FishAtPosition, 
}

export function selectFishMove(fishAtPos: FishAtPosition): SelectFish {
  return {type: MoveType.SELECT_FISH, fishAtPos};
}

export function selectFish(state: GameState, move: SelectFish): void {
  state.selectedFish = move.fishAtPos;
}