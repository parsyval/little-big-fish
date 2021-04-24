import { FishSizeEnum } from "../GameElements/Fish";
import GameState, { Position } from "../GameState";
import { LBFUtils } from "../LittleBigFishUtils";
import MoveType from "./MoveType";

export type UpgradeFish = {
  type: MoveType.UPGRADE_FISH,
  position: Position;
}

export function upgradeFishMove(position: Position): UpgradeFish {
  return {type: MoveType.UPGRADE_FISH, position};
}

export function upgradeFish(state: GameState, move: UpgradeFish) {
  setBiggerFish(state, move);
  disablePlanktonToken(state, move);
}

function setBiggerFish(state: GameState, move: UpgradeFish) {
  const fish = state.fishPositions.find(fp => fp.position.X === move.position.X && fp.position.Y === move.position.Y)!.fish;

  state.fishPositions = state.fishPositions.filter(fp => !(fp.position.X === move.position.X && fp.position.Y === move.position.Y));
  state.fishPositions.push({position: move.position, fish: {
    color: fish.color,
    size: fish.size === FishSizeEnum.SMALL ? FishSizeEnum.MEDIUM : FishSizeEnum.BIG
  }});
}

function disablePlanktonToken(state: GameState, move: UpgradeFish) {
  const square = LBFUtils.getSquareMatrix(LBFUtils.getBoardViews(state.boards))[move.position.X][move.position.Y];

  const player = state.players.find(p => p.color === state.activePlayer)!;
  player.planktonTokens.find(pt => pt.color === square.type)!.isAvailable = false;
}