import GameView from "@gamepark/little-big-fish/GameView";
import { didNotNeedAction } from "@gamepark/little-big-fish/moves/FishDidNotNeedAction";
import { moveFishInView } from "@gamepark/little-big-fish/moves/MoveFish";
import MoveType from "@gamepark/little-big-fish/moves/MoveType";
import MoveView from "@gamepark/little-big-fish/moves/MoveView";
import { placeFish } from "@gamepark/little-big-fish/moves/PlaceFish";
import { switchPlayer } from "@gamepark/little-big-fish/moves/SwitchPlayer";
import { upgradeFish } from "@gamepark/little-big-fish/moves/UpgradeFish";
import { startPhase } from "@gamepark/little-big-fish/Phase";
import { Game } from '@gamepark/rules-api';
import { SelectFish, selectFish } from "./moves/SelectFish";

type LocalMove = MoveView | SelectFish;

/**
 * This class is useful when the game has "IncompleteInformation" (or "SecretInformation").
 * It allows to handle, in a different way than the backend side, the moves that involve hidden information.
 */
export default class LittleBigFishView implements Game<GameView, MoveView> {
  state: GameView

  constructor(state: GameView) {
    this.state = state
  }

  /**
   * In this method, inside the view, we must return any move that the frontend can fully anticipate.
   * The reason why it should be anticipated instead of waiting for the backend to provide with all the automatic consequences is latency.
   * If the backend takes time to reply, maybe we will have the reply while we are animating the first consequences. The player won't notice the latency!
   *
   * @return A MoveView which can be completely anticipated by the player or the spectator
   */
  getAutomaticMove(): void | MoveView {
    return
  }

  /**
   * This is where a move is reproduced on the browser of a player. Most move will be treated the exact same way on both server and client side,
   * however some moves, that involved hiding information or discovering hidden information, will receive a different treatment than in the main rules class.
   *
   * @param move The move that must be applied in the browser of the player or the spectator
   */
  play(move: LocalMove): void {
    switch (move.type) {
      case MoveType.PLACE_FISH:
        return placeFish(this.state, move);
      case MoveType.SWITCH_PLAYER:
        return switchPlayer(this.state);
      case 'select_fih':
        return selectFish(this.state, move);
      case MoveType.MOVE_FISH:
        return moveFishInView(this.state, move);
      case MoveType.UPGRADE_FISH:
        return upgradeFish(this.state, move);
      case MoveType.START_PHASE: 
        return startPhase(this.state, move);
      case MoveType.DIDNOTNEEDACTION:
        return didNotNeedAction(this.state);
    }
  }
}