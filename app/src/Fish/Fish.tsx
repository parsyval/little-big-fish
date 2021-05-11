/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FishSizeEnum } from "@gamepark/little-big-fish/GameElements/Fish";
import GameState, { FishAtPosition } from "@gamepark/little-big-fish/GameState";
import { selectFishMove } from "@gamepark/little-big-fish/moves/SelectFish";
import { Phase } from "@gamepark/little-big-fish/Phase";
import PlayerColor from "@gamepark/little-big-fish/PlayerColor";
import { usePlay } from "@gamepark/react-client";
import { FunctionComponent } from "react";
import { Images } from "../images/Images";
import { squarePosCss } from "../Square/Square";

type FishProps = React.HTMLAttributes<HTMLImageElement> & {
  fishAtPos: FishAtPosition;
  gameState: GameState;
}

export const FishElem: FunctionComponent<FishProps> = ({fishAtPos, gameState}) => {
  const play = usePlay();

  const getFishImage = function(color: PlayerColor, size: FishSizeEnum) {
    if(size === FishSizeEnum.BIG){
      return color === PlayerColor.PINK ? Images.fishPinkBig : Images.fishOrangeBig;
    } else if(size === FishSizeEnum.MEDIUM){
      return color === PlayerColor.PINK ? Images.fishPinkMedium : Images.fishOrangeMedium;
    } else {
      return color === PlayerColor.PINK ? Images.fishPinkSmall : Images.fishOrangeSmall;
    }
  }

  const isClickable = () => {
    return gameState.phase === Phase.PLAY && gameState.selectedFish === null
      && fishAtPos.fish.color === gameState.activePlayer;
  }

  const onClick = () => {
    if(isClickable()) {
      play(selectFishMove(fishAtPos));
    }
  }


  return (
    <span css={squarePosCss(fishAtPos.position)}>
      <img  src={getFishImage(fishAtPos.fish.color, fishAtPos.fish.size)}
            css={fishCss(isClickable())} 
            onClick={ onClick }
            alt="Meaningful text">
      </img>
    </span>
  )
}

const fishCss = (isClickable: boolean) => css`
  position: absolute;
  width: 75%;
  height: 80%;
  top:10%;
  left: 10%;
  z-index: 300;
  ${isClickable ? 'background-color: red' : ''}
`