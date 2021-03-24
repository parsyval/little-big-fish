import PlayerColor from './PlayerColor'
import PlayerState from './PlayerState'

/**
 * In here, you describe what a GameState will look like at any time during a game.
 */
type GameState = {
  players: PlayerState[];
  boards: Board[];
  activePlayer?: PlayerColor;
  round: number;
  deck: number[];
}

export interface Board {
  id: 0 | 1 | 2 | 3;
  orientation: BoardOrientationEnum;
}

enum BoardOrientationEnum {
  UP = 0,
  DOWN = 180,
  LEFT = 90,
  RIGHT = 270
}

export default GameState