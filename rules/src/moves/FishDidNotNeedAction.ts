import GameState from "../GameState";
import GameView from "../GameView";
import MoveType from "./MoveType";

export type fishDidNotNeedAction = {
  type: MoveType.DIDNOTNEEDACTION,
}

export function didNotNeedActionMove(): fishDidNotNeedAction {
  return {type: MoveType.DIDNOTNEEDACTION};
}

export function didNotNeedAction(state: GameState | GameView) {
  state.fishNeedsAction = undefined;
  state.nbMoves++;
}