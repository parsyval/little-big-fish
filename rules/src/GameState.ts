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
  surpriseTokens: SurpriseToken[];
  fishPositions: FishAtPosition[];
  nbMoves: number;
}

export type Position = {X: number; Y: number;}
export type FishAtPosition = {position: Position; fish: Fish};
export default GameState