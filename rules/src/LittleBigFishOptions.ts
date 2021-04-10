import { GameOptions, OptionsDescription, OptionType } from '@gamepark/rules-api'
import { TFunction } from 'i18next'
import GameState from './GameState'
import PlayerColor from './PlayerColor'

/**
 * This is the options for each players in the game.
 */
type LittleBigFishPlayerOptions = { id: PlayerColor }

/**
 * This is the type of object that the game receives when a new game is started.
 * The first generic parameter, "{}", can be changed to include game options like variants or expansions.
 */
export type LittleBigFishOptions = GameOptions<{}, LittleBigFishPlayerOptions>

/**
 * Typeguard to help Typescript distinguish between a GameState and new game's options, for you main class constructor.
 * @param arg GameState or Game options
 * @return true if arg is a Game options
 */
export function isGameOptions(arg: GameState | LittleBigFishOptions): arg is LittleBigFishOptions {
  return typeof (arg as GameState).boards === 'undefined'
}

/**
 * This object describes all the options a game can have, and will be used by GamePark website to create automatically forms for you game
 * (forms for friendly games, or forms for matchmaking preferences, for instance).
 */
export const LittleBigFishOptionsDescription: OptionsDescription<{}, LittleBigFishPlayerOptions> = {
  players: {
    id: {
      type: OptionType.LIST,
      getLabel: (t: TFunction) => t('Color'),
      values: Object.values(PlayerColor),
      getValueLabel: (color: PlayerColor, t: TFunction) => {
        switch (color) {
          case PlayerColor.PINK:
            return t('Pink player')
          case PlayerColor.ORANGE:
            return t('Orange player')
        }
      }
    }
  }
}
