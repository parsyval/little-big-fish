/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { LBFUtils } from '@gamepark/little-big-fish/LittleBigFishUtils';
import { FunctionComponent } from 'react';
import { Board } from './Board';
import { Square } from './Square/Square';

type BoardsProp = {
  boards: { id: number; rotation: number }[];
};

export const Boards: FunctionComponent<BoardsProp> = ({ boards }) => {
  const getLineOfSquares = function(x: number) {
    let b1 = LBFUtils.getBoardViewFromBoard(boards[0]);
    let b2 = LBFUtils.getBoardViewFromBoard(boards[1]);

    if(x >= 3) {
      b1 = LBFUtils.getBoardViewFromBoard(boards[2]);
      b2 = LBFUtils.getBoardViewFromBoard(boards[3]);
    }

    x = x === 3 ? 0 : x === 4 ? 1 : x === 5 ? 2 : x;

    const marginMatchingBoardImage = (idx: number) => idx === 3 ? css`margin-left: 2%` : 'margin-left: 1%';

    return [...b1.squares[x], ...b2.squares[x]].map((square, idx) => (
          <span key={square.id} css={[css`display: inline-block; height: 100%; width: 16%`, marginMatchingBoardImage(idx)]}>
            <Square squareId={square.id}></Square>
          </span>
        ))
  }

  return (
    <div css={container()}>
      <div css={[overlaping(), css`display: grid; grid-template-columns: 25% 25%;`]}>
        <Board id={boards[0].id} rotation={boards[0].rotation}></Board>
        <Board id={boards[1].id} rotation={boards[1].rotation}></Board>
        <Board id={boards[2].id} rotation={boards[2].rotation}></Board>
        <Board id={boards[3].id} rotation={boards[3].rotation}></Board>
      </div>

      <div css={css` margin-left: -100%; z-index: 1; white-space: nowrap; width: 50%`}>
        <div css={[line(), css`margin-top: 1%`]}>
          {getLineOfSquares(0)}
        </div>
        <div css={line()}>
          {getLineOfSquares(1)}
        </div>
        <div css={line()}>
          {getLineOfSquares(2)}
        </div>
        <div css={[line(), css`margin-top: 2%`]}>
          {getLineOfSquares(3)}
        </div>
        <div css={line()}>
          {getLineOfSquares(4)}
        </div>
        <div css={line()}>
          {getLineOfSquares(5)}
        </div>
      </div>
    </div>
  );
};

const container = () => css`
  display: flex; 
  flex-flow: row nowrap; 
`

const overlaping = () => css`
  box-sizing: border-box;
  width: 100%;
  flex: none;
`

const line = () => css`height: 16%; width: 100%`