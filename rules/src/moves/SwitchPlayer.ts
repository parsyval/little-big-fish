import GameState from "../GameState";
import GameView from "../GameView";
import PlayerColor from "../PlayerColor";
import MoveType from "./MoveType";

export type SwitchPlayer = {
  type: MoveType.SWITCH_PLAYER,
}

export function switchPlayer(state: GameState | GameView): void {
  state.activePlayer = state.activePlayer === PlayerColor.PINK ? PlayerColor.ORANGE : PlayerColor.PINK;
}