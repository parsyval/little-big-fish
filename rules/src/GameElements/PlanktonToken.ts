import { SymbolEnum } from "./Symbols";

export interface PlanktonToken {
  isAvailable: boolean;
  color: SymbolEnum.PLANKTON_BLUE | SymbolEnum.PLANKTON_GREEN | SymbolEnum.PLANKTON_RED | SymbolEnum.PLANKTON_YELLOW;
}