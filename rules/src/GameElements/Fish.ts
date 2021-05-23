import PlayerColor from "../PlayerColor";

export interface Fish {
  size: FishSizeEnum;
  color: PlayerColor;
  hasJustMoved: boolean;
}

export enum FishSizeEnum { SMALL, MEDIUM, BIG };