import GameState from './GameState';
import GameView from './GameView';
import MoveType from './moves/MoveType';

export enum Phase {START, PLAY}

export type StartPhase = { type: MoveType.START_PHASE, phase: Phase }

export function startPhase(state: GameState | GameView, move: StartPhase) {
  state.phase = move.phase;
}