import PlayerColor from "../PlayerColor";
import MoveType from "./MoveType";

export type MoveFish = {
  type: MoveType.MOVE_FISH,
  playerColor: PlayerColor,
  fromSquareId: number,
  toSquareId: number
}