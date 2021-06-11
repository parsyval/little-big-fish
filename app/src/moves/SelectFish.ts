import { FishAtPosition } from "@gamepark/little-big-fish/GameState";
import GameView from "@gamepark/little-big-fish/GameView";

export type SelectFish = {
  type: 'select_fish',
  fishAtPos: FishAtPosition, 
}

export function selectFishMove(fishAtPos: FishAtPosition): SelectFish {
  return {type: 'select_fish', fishAtPos};
}

export function selectFish(state: GameView, move: SelectFish): void {
  state.selectedFish = move.fishAtPos;
}