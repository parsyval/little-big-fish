import { Board } from './GameElements/Board'
import { Fish } from './GameElements/Fish'
import { SurpriseToken } from './GameElements/SurpriseToken'
import { Phase } from './Phase'
import PlayerColor from './PlayerColor'
import PlayerState from './PlayerState'

type GameState = {
  players: PlayerState[];
  boards: Board[];
  phase: Phase;
  activePlayer?: PlayerColor;
  round: number;
  surpriseTokens: SurpriseToken[];
  fishes: Map<number, Fish>; // <squareId, Fish>
}

export default GameState