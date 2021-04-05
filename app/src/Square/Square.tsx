/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FishSizeEnum } from "@gamepark/little-big-fish/GameElements/Fish";
import GameState from "@gamepark/little-big-fish/GameState";
import { LBFUtils } from "@gamepark/little-big-fish/LittleBigFishUtils";
import { placeFishMove } from "@gamepark/little-big-fish/moves/PlaceFish";
import { Phase } from "@gamepark/little-big-fish/Phase";
import PlayerColor from "@gamepark/little-big-fish/PlayerColor";
import { usePlay } from "@gamepark/react-client";
import { FunctionComponent } from "react";
import { Fish } from "../Fish/Fish";

type SquareProps = {
  squareId: number;
  gameState: GameState;
}

export const Square: FunctionComponent<SquareProps> = ({squareId, gameState}) => {
  const play = usePlay();

  const isStartPhaseAndClickable = () => gameState.phase === Phase.START 
  && LBFUtils.getStartPlacementIds(gameState.activePlayer!, gameState.boards, gameState.fishes).includes(squareId);

  const onClick = function() {
    if(isStartPhaseAndClickable()) {
      play(placeFishMove({size: FishSizeEnum.SMALL, color: PlayerColor.Orange}, squareId));
    }
  }

  const displayFish = function() {
    const fish = gameState.fishes.find(f => f.squareId === squareId)?.fish;
    
    if(fish) {
      return <div css={[css`position: absolute; width: 13%`, fishMargin(fish.size)]}><Fish color={fish.color} size={fish.size}></Fish></div>
    }

    return;
  }

  return (
    <span css={css`border: 2px red solid; display: inline-block; height: 100%; width: 100%`} onClick={ onClick } >
      {displayFish()}
      <span css={css`font-size: large; color: black; font-weight: bold`}>{squareId}</span>
    </span> 
  );
}

const fishMargin = (size: FishSizeEnum) => css`
  margin-left: ${size === FishSizeEnum.SMALL ? '3%' : '1.2%'};
  margin-top: 1.5%;
`
