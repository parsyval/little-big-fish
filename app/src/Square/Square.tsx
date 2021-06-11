/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Square } from "@gamepark/little-big-fish/GameElements/Board";
import { SymbolEnum } from "@gamepark/little-big-fish/GameElements/Symbols";
import { Position } from "@gamepark/little-big-fish/GameState";
import GameView from "@gamepark/little-big-fish/GameView";
import { LBFUtils } from '@gamepark/little-big-fish/LittleBigFishUtils';
import { moveFishMove } from "@gamepark/little-big-fish/moves/MoveFish";
import { placeFishMove } from "@gamepark/little-big-fish/moves/PlaceFish";
import { Phase } from "@gamepark/little-big-fish/Phase";
import PlayerColor from "@gamepark/little-big-fish/PlayerColor";
import { usePlay } from "@gamepark/react-client";
import { FunctionComponent } from "react";

type SquareProps = {
  squareId: number;
  game: GameView;
  position: Position;
  playerColor: PlayerColor;
}

export const SQUARE_W = 8.2;
export const SQUARE_H = 16.5;

export const SquareComponent: FunctionComponent<SquareProps> = ({squareId, position, game, playerColor}) => {
  const play = usePlay()

  const isPlaceStartFish = (): boolean => 
    game.activePlayer! === playerColor && game.phase === Phase.START 
      && LBFUtils.getStartPositionsWithoutFish(playerColor, game.fishPositions)
      .some(pos => pos.X === position.X && pos.Y === position.Y);

  const isPossibleMove = (): boolean =>
    game.activePlayer! === playerColor && game.phase === Phase.PLAY
      && !game.fishNeedsAction
      && !!game.selectedFish
      && LBFUtils.getPossibleMovePositions(game, game.selectedFish)
      .some(pos => pos.X === position.X && pos.Y === position.Y);
  
  const isOceanWhileActiveFishOnBirth = (): boolean => {
    const squares: Square[][] = LBFUtils.getSquareMatrix(game);
    if(!game.fishNeedsAction || squares[game.fishNeedsAction.position.Y][game.fishNeedsAction.position.X].type !== SymbolEnum.BIRTH) return false;
    
    return LBFUtils.getFreeOceanPositions(game, game.fishNeedsAction.position).some(ocean => ocean.X === position.X && ocean.Y === position.Y);
  }

  const onClick = (): void => {
    if(isPlaceStartFish() || isOceanWhileActiveFishOnBirth()) {
      play(placeFishMove(position));
    } else if(isPossibleMove()) {
      play(moveFishMove({X: game.selectedFish!.position.X, Y: game.selectedFish!.position.Y}, position));
    }
  }

  const isClickable = (): boolean => {
    return isPlaceStartFish() || isPossibleMove() || isOceanWhileActiveFishOnBirth();
  }

  const isClickableCss = () => css`
    ${isClickable() ? 'background-color: red' : ''}
  `

  return (
    <span css={[squarePosCss(position), zindex(!!game.selectedFish), isClickableCss()]} onClick={ onClick } >
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