/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { SymbolEnum } from "@gamepark/little-big-fish/GameElements/Symbols";
import { FunctionComponent } from "react";
import { Images } from "../images/Images";

type PlanktonProps = {
  color: SymbolEnum.PLANKTON_BLUE | SymbolEnum.PLANKTON_GREEN | SymbolEnum.PLANKTON_RED | SymbolEnum.PLANKTON_YELLOW;
}
export const PlanktonToken: FunctionComponent<PlanktonProps> = ({color}) => {
  const getPlanktonImage = function (color: SymbolEnum.PLANKTON_BLUE | SymbolEnum.PLANKTON_GREEN | SymbolEnum.PLANKTON_RED | SymbolEnum.PLANKTON_YELLOW) {
    return color === SymbolEnum.PLANKTON_YELLOW ? Images.planktonYellow
    : color === SymbolEnum.PLANKTON_RED ? Images.planktonRed
    : color === SymbolEnum.PLANKTON_GREEN ? Images.planktonGreen
    : Images.planktonBlue;
  }

  return (
    <img src={getPlanktonImage(color)} alt="Meaningful text" css={css`width: 20%`}></img>
  );
};