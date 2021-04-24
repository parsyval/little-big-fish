/** @jsxImportSource @emotion/react */
import GameState from "@gamepark/little-big-fish/GameState";
import { FunctionComponent } from "react";

type SquareProps = {
  gameState: GameState
}

export const Squares: FunctionComponent<SquareProps> = _=> {
  // const [boardViews, setBoardViews] = useState(() => LBFUtils.getBoardViews(gameState.boards));
  // useEffect(() => {setBoardViews(LBFUtils.getBoardViews)}, [gameState.boards]);

  // const playerId = usePlayerId();

  // const getLineOfSquares = function() {
  //   let b1 = boardViews[0];
  //   let b2 = boardViews[1];

  //   if(x >= 3) {
  //     b1 = boardViews[2];
  //     b2 = boardViews[3];
  //   }

  //   x = x === 3 ? 0 : x === 4 ? 1 : x === 5 ? 2 : x;

  //   const marginMatchingBoardImage = (idx: number) => idx === 3 ? css`margin-left: 1.6%` : '';
  //   const colorPlacementSquare = (id: number) => css`${LBFUtils.getStartPlacementIds(playerId, boardViews, gameState.fishes)
  //     .includes(id) ? 'background-color: red;' : ''}`

  //   const test =  [...b1.squares[x], ...b2.squares[x]].map((square, idx) => (
  //     <span key={square.id} css={[
  //       css`display: inline-block; height: 100%; width: 16.3%`, 
  //       marginMatchingBoardImage(idx), 
  //       colorPlacementSquare(square.id)
  //     ]}>
  //       <Square squareId={square.id} gameState={gameState}></Square>
  //     </span>
  //   ))
  //   return test;
  // }

  return <div>Squares</div>
  // <div css={css`position: absolute; width: 50%; height: 100%; margin-top: -50%`}>
  //   <div css={[line(), css`margin-top: 1%`]} id="line1">
  //     {getLineOfSquares(0)}
  //   </div>
  //   <div css={line()} id="line2">
  //     {getLineOfSquares(1)}
  //   </div>
  //   <div css={line()} id="line3">
  //     {getLineOfSquares(2)}
  //   </div>
  //   <div css={[line(), css`margin-top: 2%`]} id="line4">
  //     {getLineOfSquares(3)}
  //   </div>
  //   <div css={line()} id="line5">
  //     {getLineOfSquares(4)}
  //   </div>
  //   <div css={line()} id="line6">
  //     {getLineOfSquares(5)}
  //   </div>
  // </div>
};

// const line = () => css`height: 16%; width: 100%; padding-left: 1%`