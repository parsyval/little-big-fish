/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FunctionComponent } from "react";
import { Images } from "../images/Images";

type BoardProps = {
  id: number,
  rotation: number,
};

export const Board: FunctionComponent<BoardProps> = ({id, rotation}) => {

  const getBoardImage = function(id: number) {
    return id === 1 ? Images.board1
    : id === 2 ? Images.board2
    : id === 3 ? Images.board3
    : Images.board4;
  }

  return (
    <img src={getBoardImage(id)} css={[background(rotation)]} alt="Meaningful text"></img>
  );
};

const background = (rotation: number) => css`
  transform: rotate(${90*rotation}deg);
  max-width:100%;
`