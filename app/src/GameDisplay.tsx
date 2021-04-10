/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import GameState from '@gamepark/little-big-fish/GameState'
import { Letterbox } from '@gamepark/react-components'
import { Boards } from './Board/Boards'
import { PlayerSide } from './PlayerSide/PlayerSide'
import { Squares } from './Square/Squares'

type Props = {
  game: GameState
}

export default function GameDisplay({game}: Props) {
  return (
    <Letterbox css={letterBoxStyle} top={0}>
      <div>Active player is {game.activePlayer}</div>
      <PlayerSide playerState={game.players[1]}></PlayerSide>
      <div css={css`position: relative`}>
        <Boards boards={game.boards}></Boards>
        <Squares gameState={game}></Squares>
      </div>
      <PlayerSide playerState={game.players[0]}></PlayerSide>
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