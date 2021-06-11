/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import GameView from '@gamepark/little-big-fish/GameView'
import { LBFUtils } from '@gamepark/little-big-fish/LittleBigFishUtils'
import { Letterbox } from '@gamepark/react-components'
import { Boards } from './Board/Boards'
import { FishElem } from './Fish/Fish'
import { PlayerSide } from './PlayerSide/PlayerSide'
import { SquareComponent } from './Square/Square'

type Props = {
  game: GameView
}

export default function GameDisplay({game}: Props) {
  return (
    <Letterbox css={letterBoxStyle} top={20}>
      <PlayerSide css={css`left: 1%`} playerState={game.players[1]}></PlayerSide>
      <div css={css`position: absolute; left: 20%; width: 110%`}>
        <Boards boards={game.boards}></Boards>
        
        {LBFUtils.getSquareMatrix(game).map((line, Y) => line.map((square, X) => 
          <SquareComponent squareId={square.id} position={{X, Y}} playerColor={game.activePlayer!} game={game} key={`${X}${Y}`}></SquareComponent>  
        ))}

        {game.fishPositions.map(fp =>
          <FishElem game={game} fishAtPos={fp} key={`${fp.position.X}${fp.position.Y}`}></FishElem>
        )}
      </div>
        <PlayerSide css={css`right: 0`} playerState={game.players[0]}></PlayerSide>
    </Letterbox>
  )
}

const fadeIn = keyframes`
  from, 50% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const letterBoxStyle = css`
  animation: ${fadeIn} 3s ease-in forwards;
`

// const FISH_W = 6;
// const FISH_H = 12;

// const fishSize = () => css`
//   width: ${FISH_W}%;
//   height: ${FISH_H}%;
// `

// const fishPos = (pos?: Position) => css`
//   left: ${pos ? (pos.X === 0 ? 1.5 : 2) * (pos.X + 1) + pos.X * FISH_W : 0}%;
//   top: ${pos ? (pos.Y === 0 ? 2.5 : 4) * (pos.Y + 1) + pos.Y * FISH_H : 0}%;
// `