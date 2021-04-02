/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FunctionComponent } from "react";

type SquareProps = {
  squareId: number;
}

export const Square: FunctionComponent<SquareProps> = ({squareId}) => {
  return (
    <span css={css`border: 2px red solid; display: inline-block; height: 100%; width: 100%`}>SQUAREID = {squareId}</span>
  );
}