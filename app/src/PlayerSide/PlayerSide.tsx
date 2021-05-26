/** @jsxImportSource @emotion/react */
import PlayerState from "@gamepark/little-big-fish/PlayerState";
import { FunctionComponent } from "react";

type PlayerSideProps = React.HTMLAttributes<HTMLElement> & {
  playerState: PlayerState;
}

export const PlayerSide: FunctionComponent<PlayerSideProps> = () => {
  return <div>PlayerSide</div>
  // return (
  //   <div css={css`position: absolute; height: 100%; width: 15%`} {...props}>
  //     <div css={css`height: 25%`}>
  //       {Array.from({length: playerState.availableFish[FishSizeEnum.SMALL]}).map((_, i) => 
  //         <FishElem fish={{size: FishSizeEnum.SMALL, color: playerState.color}} css={css`width: 25%;`} key={i}></FishElem>
  //       )
  //       }
  //     </div>

  //     <div css={css`height: 25%;`}>
  //       {Array.from({length: playerState.availableFish[FishSizeEnum.MEDIUM]}).map((_, i) =>
  //         <FishElem fish={{size: FishSizeEnum.MEDIUM, color: playerState.color}} css={css`width: 25%;`} key={i}></FishElem>
  //       )
  //       }
  //     </div>

  //     <div css={css`height: 25%;`}>
  //       {Array.from({length: playerState.availableFish[FishSizeEnum.BIG]}).map((_, i) =>
  //         <FishElem fish={{size: FishSizeEnum.BIG, color: playerState.color}} css={css`width: 25%;`} key={i}></FishElem>
  //       )
  //       }
  //     </div>

  //     <div css={css`height: 25%;`}>
  //       {Array.from(playerState.planktonTokens.filter(t => t.isAvailable).map((t, i) => <PlanktonToken key={i} color={t.color}></PlanktonToken>))}
  //     </div>
  //   </div>
  // );
}