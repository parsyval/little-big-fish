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
  state.fishes.set(move.onSquareId, move.fish);

  const player = state.players.find(player => player.color === move.fish.color);
  const availabelFish = player?.availableFish.get(move.fish.size);
  player?.availableFish.set(move.fish.size, availabelFish! - 1);
}