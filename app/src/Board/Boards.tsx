/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Board as BoardObj } from '@gamepark/little-big-fish/GameElements/Board';
import { FunctionComponent } from 'react';
import { Board } from './Board';

type BoardsProp = {
  boards: BoardObj[];
};

export const Boards: FunctionComponent<BoardsProp> = ({ boards }) => {
  return (
    <div css={[css`display: grid; grid-template-columns: 25% 25%;`]}>
      {boards.map((bv, i) => <Board key={i} board={bv}></Board>)}
    </div>
  );
};