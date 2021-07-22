/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Square } from "@gamepark/little-big-fish/GameElements/Board";
import { FishSizeEnum } from "@gamepark/little-big-fish/GameElements/Fish";
import { SymbolEnum } from "@gamepark/little-big-fish/GameElements/Symbols";
import { FishAtPosition } from "@gamepark/little-big-fish/GameState";
import GameView from "@gamepark/little-big-fish/GameView";
import { LBFUtils } from "@gamepark/little-big-fish/LittleBigFishUtils";
import { Phase } from "@gamepark/little-big-fish/Phase";
import PlayerColor from "@gamepark/little-big-fish/PlayerColor";
import { usePlay } from "@gamepark/react-client";
import { FunctionComponent } from "react";
import { Images } from "../images/Images";
import { selectFishMove } from "../moves/SelectFish";
import { squarePosCss } from "../Square/Square";

type FishProps = React.HTMLAttributes<HTMLImageElement> & {
  fishAtPos: FishAtPosition;
  game: GameView;
}

export const FishElem: FunctionComponent<FishProps> = ({fishAtPos, game}) => {
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
    let isOnBirthAndHasFreeOcean = false;
    if(game.fishNeedsAction) {
    const squares: Square[][] = LBFUtils.getSquareMatrix(game);
    const isFishOnBirth = squares[game.fishNeedsAction.position.Y][game.fishNeedsAction.position.X].type === SymbolEnum.BIRTH;

    if(isFishOnBirth) {
      const freeOceans = LBFUtils.getFreeOceanPositions(game, game.fishNeedsAction.position);
      if(freeOceans.length > 0) {
        isOnBirthAndHasFreeOcean = true;
      }
    }
  }

    return game.phase === Phase.PLAY && !game.selectedFish
      && !isOnBirthAndHasFreeOcean
      && fishAtPos.fish.color === game.activePlayer;
  }

  const onClick = () => {
    if(isClickable()) {
      play(selectFishMove(fishAtPos), {local: true});
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