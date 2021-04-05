/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Board as BoardObj } from "@gamepark/little-big-fish/GameElements/Board";
import { FunctionComponent } from "react";
import { Images } from "../images/Images";

type BoardProps = {
  board: BoardObj
};

export const Board: FunctionComponent<BoardProps> = ({board}) => {

  const getBoardImage = function(id: number) {
    return id === 1 ? Images.board1
    : id === 2 ? Images.board2
    : id === 3 ? Images.board3
    : Images.board4;
  }

  return (
    <img src={getBoardImage(board.id)} css={[background(board.rotation)]} alt="Meaningful text"></img>
  );
};

const background = (rotation: number) => css`
  transform: rotate(${90*rotation}deg);
  max-width:100%;
`