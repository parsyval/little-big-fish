/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import GameState from "@gamepark/little-big-fish/GameState";
import { FunctionComponent } from "react";

type SquareProps = {
  squareId: number;
  gameState: GameState;
}

export const Square: FunctionComponent<SquareProps> = ({squareId}) => {
  // const isStartPhaseAndClickable = () => gameState.activePlayer! === playerId && gameState.phase === Phase.START 
  // && LBFUtils.getStartPlacementIds(playerId, gameState.boards, gameState.fishes).includes(squareId);

  const onClick = function() {
    // if(isStartPhaseAndClickable()) {
    //   play(placeFishMove({size: FishSizeEnum.SMALL, color: gameState.activePlayer!}, squareId));
    // }
  }

  const displayFish = function() {
    // const fish = gameState.fishes.find(f => f.squareId === squareId)?.fish;
    
    // if(fish) {
    //   return <div css={[css`position: absolute; width: 13%`, fishMargin(fish.size)]}><Fish color={fish.color} size={fish.size}></Fish></div>
    // }

    return;
  }

  return (
    <span css={css`border: 2px red solid; display: inline-block; height: 100%; width: 100%`} onClick={ onClick } >
      {displayFish()}
      <span css={css`font-size: large; color: black; font-weight: bold`}>{squareId}</span>
    </span> 
  );
}

// const fishMargin = (size: FishSizeEnum) => css`
//   margin-left: ${size === FishSizeEnum.SMALL ? '3%' : '1.2%'};
//   margin-top: 1.5%;
// `
