import { IncompleteInformation, SequentialGame } from '@gamepark/rules-api';
import { shuffle } from 'lodash';
import { Board, Board1, Board2, Board3, Board4 } from './GameElements/Board';
import { FishSizeEnum } from './GameElements/Fish';
import { SurpriseToken } from './GameElements/SurpriseToken';
import { SymbolEnum } from './GameElements/Symbols';
import GameState from './GameState';
import GameView from './GameView';
import { isGameOptions, LittleBigFishOptions } from './LittleBigFishOptions';
import { LBFUtils } from './LittleBigFishUtils';
import Move from './moves/Move';
import { moveFish } from './moves/MoveFish';
import MoveType from './moves/MoveType';
import MoveView from './moves/MoveView';
import { placeFish, placeFishMove } from './moves/PlaceFish';
import { selectFish, selectFishMove } from './moves/SelectFish';
import { switchPlayer } from './moves/SwitchPlayer';
import { upgradeFish, upgradeFishMove } from './moves/UpgradeFish';
import { Phase, startPhase } from './Phase';
import PlayerColor from './PlayerColor';
import PlayerState from './PlayerState';

/**
 * Your Board Game rules must extend either "SequentialGame" or "SimultaneousGame".
 * When there is at least on situation during the game where multiple players can act at the same time, it is a "SimultaneousGame"
 * If the game contains information that players does not know (dices, hidden cards...), it must implement "IncompleteInformation".
 * If the game contains information that some players know, but the other players does not, it must implement "SecretInformation" instead.
 * Later on, you can also implement "Competitive", "Undo", "TimeLimit" and "Eliminations" to add further features to the game.
 */
export default class LittleBigFish
  extends SequentialGame<GameState, Move, PlayerColor>
  implements IncompleteInformation<GameState, GameView, Move, MoveView, PlayerColor> {
  /**
   * This constructor is called when the game "restarts" from a previously saved state.
   * @param state The state of the game
   */
  constructor(state: GameState);
  /**
   * This constructor is called when a new game is created. If your game has options, or a variable number of players, it will be provided here.
   * @param options The options of the new game
   */
  constructor(options: LittleBigFishOptions);
  /**
   * In here you must code the construction of your class. Use a "typeguard" to distinguish a new game from a restored game.
   * @param arg The state of the game, or the options when starting a new game
   */
  constructor(arg: GameState | LittleBigFishOptions) {
    if (isGameOptions(arg)) {
      const boards: Board[] = shuffle([Board1, Board2, Board3, Board4].map(b => ({ id: b.id, rotation: Math.floor(Math.random() * 4) })));
      const surpriseTokens: SurpriseToken[] = LBFUtils.initSupriseTokens();
      const players: PlayerState[] = arg.players.map(playerOptions => LBFUtils.getInitialPlayerState(playerOptions.id));
      super({
        players,
        round: 1,
        boards,
        surpriseTokens,
        phase: Phase.START,
        activePlayer: arg.players[0].id,
        fishPositions: [],
        selectedFish: null,
        nbMoves: 0
      });
    } else {
      super(arg);
    }
  }

  /**
   * Retrieves the player which must act. It is used to secure the game and prevent players from acting outside their turns.
   * Only required in a SequentialGame.
   * @return The identifier of the player whose turn it is
   */
  getActivePlayer(): PlayerColor | undefined {
    const activePlayer = this.state.phase === Phase.PLAY &&
      (this.state.players.some(p => p.capturedFishes === 5) ||
        this.state.fishPositions.filter(f => f.fish.color === PlayerColor.ORANGE).length === 1 ||
        this.state.fishPositions.filter(f => f.fish.color === PlayerColor.PINK).length === 1)
      ? undefined
      : this.state.activePlayer;

    console.log('ActivePlayer', activePlayer);

    return activePlayer;
  }

  /**
   * Return the exhaustive list of moves that can be played by the active player.
   * This is used for 2 features:
   * - security (preventing unauthorized moves from being played);
   * - "Dummy players": when a player leaves a game, it is replaced by a "Dummy" that plays random moves, allowing the other players to finish the game.
   * In a SimultaneousGame, as multiple players can be active you will be passed a playedId as an argument.
   * If the game allows a very large (or infinite) number of moves, instead of implementing this method, you can implement instead:
   * - isLegal(move: Move):boolean, for security; and
   * - A class that implements "Dummy" to provide a custom Dummy player.
   */
  getLegalMoves(): Move[] {
    const legalMoves: Move[] = [];
    const player = this.state.players.find(p => p.color === this.state.activePlayer)!;

    if (this.state.phase === Phase.START) {
      if (player.availableFish[FishSizeEnum.SMALL] > 3) {
        LBFUtils.getStartPositionsWithoutFish(player.color, this.state.fishPositions).forEach(p =>
          legalMoves.push(placeFishMove(p))
        );
      }
    } else {
      if (this.state.selectedFish) {
        const fishAtPosition = this.state.fishPositions.find(fp => 
          fp.position.X === this.state.selectedFish!.position.X && fp.position.Y === this.state.selectedFish!.position.Y
        )!;
        legalMoves.push(...LBFUtils.getPossibleMoves(fishAtPosition, this.state));
      } else {
        const squaresMatrix = LBFUtils.getSquareMatrix(LBFUtils.getBoardViews(this.state.boards));
        const fishes = this.state.fishPositions.filter(fp => !fp.fish.hasJustMoved);
        const fishOnBirth = fishes.find(fp => squaresMatrix[fp.position.Y][fp.position.X].type === SymbolEnum.BIRTH);

        if(fishOnBirth) {
          // TODO
        } else {
          this.state.fishPositions.filter(fp => fp.fish.color === player.color).forEach(fp =>
            legalMoves.push(selectFishMove(fp))
          );
        }
      }
    }

    return legalMoves;
  }

  /**
   * This is the one and only play where you will update the game's state, depending on the move that has been played.
   *
   * @param move The move that should be applied to current state.
   */
  play(move: Move): void {
    switch (move.type) {
      case MoveType.PLACE_FISH:
        return placeFish(this.state, move);
      case MoveType.SWITCH_PLAYER:
        return switchPlayer(this.state);
      case MoveType.SELECT_FISH:
        return selectFish(this.state, move);
      case MoveType.MOVE_FISH:
        return moveFish(this.state, move);
      case MoveType.UPGRADE_FISH:
        return upgradeFish(this.state, move);
      case MoveType.START_PHASE:
        return startPhase(this.state, move);
    }
  }

  /**
   * Here you can return the moves that should be automatically played when the game is in a specific state.
   * Here is an example from monopoly: you roll a dice, then move you pawn accordingly.
   * A first solution would be to do both state updates at once, in a "complex move" (RollDiceAndMovePawn).
   * However, this first solution won't allow you to animate step by step what happened: the roll, then the pawn movement.
   * "getAutomaticMove" is the solution to trigger multiple moves in a single action, and still allow for step by step animations.
   * => in that case, "RollDice" could set "pawnMovement = x" somewhere in the game state. Then getAutomaticMove will return "MovePawn" when
   * "pawnMovement" is defined in the state.
   * Of course, you must return nothing once all the consequences triggered by a decision are completed.
   * VERY IMPORTANT: you should never change the game state in here. Indeed, getAutomaticMove will never be called in replays, for example.
   *
   * @return The next automatic consequence that should be played in current game state.
   */
  getAutomaticMove(): void | Move {
    const activePlayerColor = this.getActivePlayer();
    if (activePlayerColor) {
      if (this.state.phase === Phase.START) {
        if (this.state.players.find(p => p.color === activePlayerColor)?.availableFish[FishSizeEnum.SMALL] === 3) {
          if (this.state.players.find(p => p.color !== activePlayerColor)?.availableFish[FishSizeEnum.SMALL] === 3) {
            return { type: MoveType.START_PHASE, phase: Phase.PLAY };
          }

          return { type: MoveType.SWITCH_PLAYER };
        }
      } else {
        if(this.state.nbMoves === 2) {
          this.state.nbMoves = 0;
          return { type: MoveType.SWITCH_PLAYER };
        } else {
          const squaresMatrix = LBFUtils.getSquareMatrix(LBFUtils.getBoardViews(this.state.boards));
          const fpThatJustMoved = this.state.fishPositions.find(fp => fp.fish.hasJustMoved);
          if (fpThatJustMoved) {
            const pos = fpThatJustMoved.position;
            const isFishOnWreck = squaresMatrix[pos.Y][pos.X].type === SymbolEnum.WRECK;
            const isFishOnPlankton = LBFUtils.isPlanktonSymbol(squaresMatrix[pos.Y][pos.X].type);
            
            fpThatJustMoved.fish.hasJustMoved = false;

            if(isFishOnWreck) {
              return selectFishMove(fpThatJustMoved);
            } 

            if(isFishOnPlankton && fpThatJustMoved.fish.size !== FishSizeEnum.BIG) {
              const square = LBFUtils.getSquareMatrix(LBFUtils.getBoardViews(this.state.boards))[pos.Y][pos.X];
              const player = this.state.players.find(p => p.color === this.state.activePlayer)!;
              const planktonToken = player.planktonTokens.find(pt => pt.color === square.type);
              
              if (planktonToken && planktonToken.isAvailable) {
                planktonToken.isAvailable = false;
                return upgradeFishMove(pos);
              }
            }
          }
        }
      }
    }
  }

  /**
   * If you game has incomplete information, you must hide some of the game's state to the players and spectators.
   * @return What a person can see from the game state
   */
  getView(): GameView {
    return this.state;
  }

  /**
   * If you game has incomplete information, sometime you need to alter a Move before it is sent to the players and spectator.
   * For example, if a card is revealed, the id of the revealed card should be ADDED to the Move in the MoveView
   * Sometime, you will hide information: for example if a player secretly choose a card, you will hide the card to the other players or spectators.
   *
   * @param move The move that has been played
   * @return What a person should know about the move that was played
   */
  getMoveView(move: Move): MoveView {
    return move;
  }
}
