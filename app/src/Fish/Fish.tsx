/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FishSizeEnum } from "@gamepark/little-big-fish/GameElements/Fish";
import PlayerColor from "@gamepark/little-big-fish/PlayerColor";
import { FunctionComponent } from "react";
import { Images } from "../images/Images";

type FishProps = {
  color: PlayerColor;
  size: FishSizeEnum;
}

export const Fish: FunctionComponent<FishProps> = ({color, size}) => {

  const getFishImage = function(color: PlayerColor, size: FishSizeEnum) {
    if(size === FishSizeEnum.BIG){
      return color === PlayerColor.Pink ? Images.fishPinkBig : Images.fishOrangeBig;
    } else if(size === FishSizeEnum.MEDIUM){
      return color === PlayerColor.Pink ? Images.fishPinkMedium : Images.fishOrangeMedium;
    } else {
      return color === PlayerColor.Pink ? Images.fishPinkSmall : Images.fishOrangeSmall;
    }
  }

  return (
      <img src={getFishImage(color, size)} alt="Meaningful text" css={[resize()]}></img>
  )
}

const resize = () => css`
  width: 10%;
  height: 10%;
`
