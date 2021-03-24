import {css, Global} from '@emotion/react'
import LittleBigFish from '@gamepark/little-big-fish/LittleBigFish'
import {LittleBigFishOptionsDescription} from '@gamepark/little-big-fish/LittleBigFishOptions'
import LittleBigFishView from '@gamepark/little-big-fish/LittleBigFishView'
import {GameProvider, setupTranslation} from '@gamepark/react-client'
import normalize from 'emotion-normalize'
import {StrictMode} from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import translations from './translations.json'

setupTranslation(translations)

const style = css`
  html {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  *, *::before, *::after {
    -webkit-box-sizing: inherit;
    -moz-box-sizing: inherit;
    box-sizing: inherit;
  }

  body {
    margin: 0;
    font-family: 'Oswald', "Roboto Light", serif;
    font-size: 1vh;
    @media (max-aspect-ratio: 16/9) {
      font-size: calc(9vw / 16);
    }
  }

  #root {
    position: absolute;
    height: 100vh;
    width: 100vw;
    user-select: none;
    overflow: hidden;
    background-color: white;
    background-size: cover;
    background-position: center;
    color: #eee;

    &:before {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
`

ReactDOM.render(
  <StrictMode>
    <GameProvider game="little-big-fish" Rules={LittleBigFish} RulesView={LittleBigFishView} optionsDescription={LittleBigFishOptionsDescription}>
      <App/>
    </GameProvider>
    <Global styles={[normalize, style]}/>
  </StrictMode>,
  document.getElementById('root')
)
