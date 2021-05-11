import { FishSizeEnum } from "../GameElements/Fish";
import GameState, { Position } from "../GameState";
import MoveType from "./MoveType";

export type PlaceFish = {
  type: MoveType.PLACE_FISH,
  position: Position, 
}

export function placeFishMove(position: Position): PlaceFish {
  return {
    type: MoveType.PLACE_FISH,
    position, 
  }
}

export function placeFish(state: GameState, move: PlaceFish): void {
  const player = state.players.find(player => player.color === state.activePlayer);
  const availableFish = player!.availableFish[FishSizeEnum.SMALL];
  const currentFishAtPosition = state.fishPositions.find(f => f.position.X === move.position.X && f.position.Y === move.position.Y);
  const newFish = {size: FishSizeEnum.SMALL, color: state.activePlayer!}
  
  if(currentFishAtPosition) {
    currentFishAtPosition.fish = newFish;
  } else {
    state.fishPositions.push({position: move.position, fish: newFish});
  }

  player!.availableFish[FishSizeEnum.SMALL] = availableFish - 1;
}