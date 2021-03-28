import { FishSizeEnum } from './GameElements/Fish';
import { PlanktonToken } from './GameElements/PlanktonToken';
import PlayerColor from './PlayerColor'

export default interface PlayerState {
  color: PlayerColor;
  capturedFishes: number;
  planktonTokens: PlanktonToken[];
  availableFish: Map<FishSizeEnum, number>;
}