import { SymbolEnum } from "./Symbols";

export interface SurpriseToken {
  type: SurpriseTokenEnum;
}

export enum SurpriseTokenEnum {
  FISHERMAN = SymbolEnum.FISHERMAN, 
  PLANKTON = SymbolEnum.PLANKTON, 
  WHIRLWIND = SymbolEnum.WHIRLWIND, 
  BIRTH = SymbolEnum.BIRTH
}