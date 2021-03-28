import { SymbolEnum } from "./Symbols";

export interface PlanktonToken {
  isAvailable: boolean;
  color: PlanktonColor;
}

export enum PlanktonColor { 
  RED = SymbolEnum.PLANKTON_RED,
  YELLOW = SymbolEnum.PLANKTON_YELLOW,
  BLUE = SymbolEnum.PLANKTON_BLUE,
  GREEN = SymbolEnum.PLANKTON_GREEN
};