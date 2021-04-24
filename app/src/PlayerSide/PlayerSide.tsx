/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FishSizeEnum } from "@gamepark/little-big-fish/GameElements/Fish";
import PlayerState from "@gamepark/little-big-fish/PlayerState";
import { FunctionComponent } from "react";
import { Fish } from "../Fish/Fish";
import { PlanktonToken } from "../Plankton/Plankton";

type PlayerSideProps = {
  playerState: PlayerState;
}

export const PlayerSide: FunctionComponent<PlayerSideProps> = ({playerState}) => {

  return (
    <div css={css`position: absolute; height: 100%; width: 15%`}>
      <div css={css`height: 25%`}>
        {Array.from({length: playerState.availableFish[FishSizeEnum.SMALL]}).map((_, i) => 
          <span key={i} css={css`width: 20%; float: left`}>
            <Fish size={FishSizeEnum.SMALL} color={playerState.color}></Fish>
          </span>)
        }
      </div>

      <div css={css`height: 25%;`}>
        {Array.from({length: playerState.availableFish[FishSizeEnum.MEDIUM]}).map((_, i) => 
          <span key={i} css={css`width: 20%; float: left`}>
            <Fish size={FishSizeEnum.MEDIUM} color={playerState.color}></Fish>
          </span>)
        }
      </div>

      <div css={css`height: 25%;`}>
        {Array.from({length: playerState.availableFish[FishSizeEnum.BIG]}).map((_, i) => 
          <span key={i} css={css`width: 20%; float: left`}>
            <Fish size={FishSizeEnum.BIG} color={playerState.color}></Fish>
          </span>)
        }
      </div>

      <div css={css`height: 25%;`}>
        {Array.from(playerState.planktonTokens.filter(t => t.isAvailable).map((t, i) => <PlanktonToken key={i} color={t.color}></PlanktonToken>))}
      </div>
    </div>
  );
}