import { Fish } from "../GameElements/Fish";
import GameState from "../GameState";
import MoveType from "./MoveType";

export type PlaceFish = {
  type: MoveType.PLACE_FISH,
  fish: Fish,
  onSquareId: number, 
}

export function placeFishMove(fish: Fish, id: number): PlaceFish {
  return {
    type: MoveType.PLACE_FISH,
    fish: fish,
    onSquareId: id
  }
}

export function placeFish(state: GameState, move: PlaceFish): void {
  const currentFishAtPosition = state.fishes.find(f => f.squareId === move.onSquareId);
  if(currentFishAtPosition) {
    currentFishAtPosition.fish = move.fish;
  } else {
    state.fishes.push({squareId: move.onSquareId, fish: move.fish});
  }

  const player = state.players.find(player => player.color === move.fish.color);

  if (!player) {
    throw new Error('No active player');
  }

  const availabelFish = player.availableFish[move.fish.size];
  player.availableFish[move.fish.size] = availabelFish - 1;
}