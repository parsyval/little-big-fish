import PlayerColor from "../PlayerColor";

export interface Fish {
  size: FishSizeEnum;
  color: PlayerColor;
}

export enum FishSizeEnum { SMALL, MEDIUM, BIG };