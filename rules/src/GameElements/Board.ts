import { SymbolEnum } from "./Symbols";

export interface Board {
  id: number;
  rotation: number;
}

export interface BoardView extends Board {
  squares: Square[][];
}

export interface Square {
  id: number;
  type: SquareType;
}

export type SquareType = SymbolEnum.OCEAN | SymbolEnum.WRECK | SymbolEnum.SURPRISE | SymbolEnum.BIRTH |
SymbolEnum.PLANKTON_BLUE | SymbolEnum.PLANKTON_GREEN | SymbolEnum.PLANKTON_RED | SymbolEnum.PLANKTON_YELLOW;

export const Board1: BoardView = {
  id: 1,
  rotation: 0,
  squares: [
    [{id: 1, type: SymbolEnum.OCEAN}, {id: 2, type: SymbolEnum.SURPRISE}, {id: 3, type: SymbolEnum.OCEAN}],
    [{id: 4, type: SymbolEnum.BIRTH}, {id: 5, type: SymbolEnum.WRECK}, {id: 6, type: SymbolEnum.PLANKTON_BLUE}],
    [{id: 7, type: SymbolEnum.OCEAN}, {id: 8, type: SymbolEnum.WRECK}, {id: 9, type: SymbolEnum.OCEAN}]
  ],
};

export const Board2: BoardView = {
  id: 2,
  rotation: 0,
  squares: [
    [{id: 11, type: SymbolEnum.OCEAN}, {id: 12, type: SymbolEnum.PLANKTON_RED}, {id: 13, type: SymbolEnum.OCEAN}],
    [{id: 14, type: SymbolEnum.WRECK}, {id: 15, type: SymbolEnum.BIRTH}, {id: 16, type: SymbolEnum.WRECK}],
    [{id: 17, type: SymbolEnum.OCEAN}, {id: 18, type: SymbolEnum.SURPRISE}, {id: 19, type: SymbolEnum.OCEAN}]
  ]
};

export const Board3: BoardView = {
  id: 3,
  rotation: 0,
  squares: [
    [{id: 21, type: SymbolEnum.OCEAN}, {id: 22, type: SymbolEnum.WRECK}, {id: 23, type: SymbolEnum.OCEAN}],
    [{id: 24, type: SymbolEnum.BIRTH}, {id: 25, type: SymbolEnum.PLANKTON_YELLOW}, {id: 26, type: SymbolEnum.SURPRISE}],
    [{id: 27, type: SymbolEnum.OCEAN}, {id: 28, type: SymbolEnum.WRECK}, {id: 29, type: SymbolEnum.OCEAN}]
  ]
};

export const Board4: BoardView = {
  id: 4,
  rotation: 0,
  squares: [
    [{id: 31, type: SymbolEnum.OCEAN}, {id: 32, type: SymbolEnum.WRECK}, {id: 33, type: SymbolEnum.OCEAN}],
    [{id: 34, type: SymbolEnum.BIRTH}, {id: 35, type: SymbolEnum.PLANKTON_GREEN}, {id: 36, type: SymbolEnum.WRECK}],
    [{id: 37, type: SymbolEnum.OCEAN}, {id: 38, type: SymbolEnum.SURPRISE}, {id: 39, type: SymbolEnum.OCEAN}]
  ]
};