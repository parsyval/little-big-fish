import { StartPhase } from "../Phase"
import { PlaceFish } from "./PlaceFish"

/**
 * A "Move" is the combination of all the types of moves that exists in you game
 */
type Move = PlaceFish | StartPhase


export default Move