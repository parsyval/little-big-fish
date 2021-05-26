import { StartPhase } from "../Phase"
import { MoveFish } from "./MoveFish"
import { PlaceFish } from "./PlaceFish"
import { SwitchPlayer } from "./SwitchPlayer"
import { UpgradeFish } from "./UpgradeFish"

/**
 * A "Move" is the combination of all the types of moves that exists in you game
 */
type Move = PlaceFish | StartPhase | SwitchPlayer | UpgradeFish | MoveFish


export default Move