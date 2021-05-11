import PlayerColor from "../PlayerColor";

export interface Fish {
  size: FishSizeEnum;
  color: PlayerColor;
  hasBeenUpdated?: boolean;
}

export enum FishSizeEnum { SMALL, MEDIUM, BIG };