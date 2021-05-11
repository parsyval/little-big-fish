/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import GameState, { Position } from "@gamepark/little-big-fish/GameState";
import { LBFUtils } from '@gamepark/little-big-fish/LittleBigFishUtils';
import { moveFishMove } from "@gamepark/little-big-fish/moves/MoveFish";
import { placeFishMove } from "@gamepark/little-big-fish/moves/PlaceFish";
import { Phase } from "@gamepark/little-big-fish/Phase";
import PlayerColor from "@gamepark/little-big-fish/PlayerColor";
import { usePlay } from "@gamepark/react-client";
import { FunctionComponent } from "react";

type SquareProps = {
  squareId: number;
  gameState: GameState;
  position: Position;
  playerColor: PlayerColor;
}

export const SQUARE_W = 8.2;
export const SQUARE_H = 16.5;

export const Square: FunctionComponent<SquareProps> = ({squareId, position, gameState, playerColor}) => {
  const play = usePlay()

  const isStartPhaseAndClickable = () => 
    gameState.activePlayer! === playerColor && gameState.phase === Phase.START 
    && LBFUtils.getStartPositionsWithoutFish(playerColor, gameState.fishPositions)
      .some(pos => pos.X === position.X && pos.Y === position.Y);

  const isPlayPhaseAndClickable = () =>
    gameState.activePlayer! === playerColor && gameState.phase === Phase.PLAY
      && LBFUtils.getPossibleMoves(gameState.selectedFish, LBFUtils.getSquareMatrix(LBFUtils.getBoardViews(gameState.boards)), gameState.fishPositions)
      .some(move => move.toPosition.X === position.X && move.toPosition.Y === position.Y);

  const onClick = () => {
    if(isStartPhaseAndClickable()) {
      play(placeFishMove(position));
    } else if(isPlayPhaseAndClickable()) {
      play(moveFishMove({X: gameState.selectedFish!.position.X, Y: gameState.selectedFish!.position.Y}, position));
    }
  }

  const isClickable = () => {
    return isStartPhaseAndClickable() || isPlayPhaseAndClickable();
  }

  const isClickableCss = () => css`
    ${isClickable() ? 'background-color: red' : ''}
  `

  return (
    <span css={[squarePosCss(position), zindex(!!gameState.selectedFish), isClickableCss()]} onClick={ onClick } >
      <span css={css`font-size: large; color: black; font-weight: bold`}>{squareId}</span>
    </span> 
  );
}

export const squarePosCss = (pos: Position) => css`
  position: absolute;
  width: ${SQUARE_W}%;
  height: ${SQUARE_H}%;
  left: ${0.3 + pos.X * SQUARE_W}%;
  top: ${0.5 + pos.Y * SQUARE_H}%;
  border: 2px red solid;
`

const zindex = (isSelectedFish: boolean) => css`
  z-index: ${isSelectedFish ? 400 : 200}
`