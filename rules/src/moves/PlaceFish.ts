import { Fish } from "../GameElements/Fish";
import GameState, { Position } from "../GameState";
import MoveType from "./MoveType";

export type PlaceFish = {
  type: MoveType.PLACE_FISH,
  fish: Fish,
  position: Position, 
}

export function placeFishMove(fish: Fish, position: Position): PlaceFish {
  return {
    type: MoveType.PLACE_FISH,
    fish,
    position, 
  }
}

export function placeFish(state: GameState, move: PlaceFish): void {
  const currentFishAtPosition = state.fishPositions.find(f => f.position.X === move.position.X && f.position.Y === move.position.Y);
  
  if(currentFishAtPosition) {
    currentFishAtPosition.fish = move.fish;
  } else {
    state.fishPositions.push({position: move.position, fish: move.fish});
  }

  const player = state.players.find(player => player.color === move.fish.color);

  if (!player) {
    throw new Error('No active player');
  }

  const availabelFish = player.availableFish[move.fish.size];
  player.availableFish[move.fish.size] = availabelFish - 1;
}