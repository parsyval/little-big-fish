import { FishSizeEnum } from '../GameElements/Fish';
import GameState, { Position } from '../GameState';
import GameView from '../GameView';
import { LBFUtils } from '../LittleBigFishUtils';
import MoveType from './MoveType';

export type UpgradeFish = {
  type: MoveType.UPGRADE_FISH;
  position: Position;
};

export function upgradeFishMove(position: Position): UpgradeFish {
  return { type: MoveType.UPGRADE_FISH, position };
}

export function upgradeFish(state: GameState | GameView, move: UpgradeFish) {
  if (state.fishNeedsAction!.fish.size !== FishSizeEnum.BIG) {
    console.log("%cFish on plankton isn't big", 'color:red');
    const square = LBFUtils.getSquareMatrix(state)[move.position.Y][move.position.X];
    const player = state.players.find(p => p.color === state.activePlayer)!;
    const planktonToken = player.planktonTokens.find(pt => pt.color === square.type);

    if (planktonToken && planktonToken.isAvailable) {
      console.log('%cAuto upgrade fish', 'color:red');
      planktonToken.isAvailable = false;
      const fish = state.fishPositions.find(fp => fp.position.X === move.position.X && fp.position.Y === move.position.Y)!.fish;

      state.fishPositions = state.fishPositions.filter(fp => !(fp.position.X === move.position.X && fp.position.Y === move.position.Y));
      state.fishPositions.push({
        position: move.position,
        fish: {
          color: fish.color,
          size: fish.size === FishSizeEnum.SMALL ? FishSizeEnum.MEDIUM : FishSizeEnum.BIG,
        },
      });
    }
  }

  state.fishNeedsAction = undefined;
  state.nbMoves++;
}
