/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FishSizeEnum } from "@gamepark/little-big-fish/GameElements/Fish";
import PlayerState from "@gamepark/little-big-fish/PlayerState";
import { FunctionComponent } from "react";
import { Fish } from "../Fish/Fish";

type PlayerSideProps = {
  playerState: PlayerState;
}

export const PlayerSide: FunctionComponent<PlayerSideProps> = ({playerState}) => {

  const getFishElement = function(size: FishSizeEnum) {
    return (
      <Fish size={size} color={playerState.color}></Fish>
    );
  }

  return (
    <div css={css`display: flex`}>
      <div css={css`flex-grow: 6; height: 100%`}>
        {Array.from({length: playerState.availableFish[FishSizeEnum.SMALL]}).map((_, i) => <span key={i}>{getFishElement(FishSizeEnum.SMALL)}</span>)}
      </div>

      <div css={css`flex-grow: 4; height: 100%`}>
        {Array.from({length: playerState.availableFish[FishSizeEnum.MEDIUM]}).map((_, i) => <span key={i}>{getFishElement(FishSizeEnum.MEDIUM)}</span>)}
      </div>

      <div css={css`flex-grow: 2; height: 100%`}>
      {Array.from({length: playerState.availableFish[FishSizeEnum.BIG]}).map((_, i) => <span key={i}>{getFishElement(FishSizeEnum.BIG)}</span>)}
      </div>
    </div>
  );
}