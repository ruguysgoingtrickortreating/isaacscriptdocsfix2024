import type { Challenge, PlayerType } from "isaac-typescript-definitions";
import {
  CHALLENGE_CHARACTERS,
  DEFAULT_CHALLENGE_CHARACTER,
} from "../objects/challengeCharacters";
import {
  CHALLENGE_NAMES,
  DEFAULT_CHALLENGE_NAME,
} from "../objects/challengeNames";

/**
 * Get the starting character of a challenge. This will only work for vanilla challenges.
 *
 * For modded challenges, `PlayerType.ISAAC` (0) will be returned.
 */
export function getChallengeCharacter(challenge: Challenge): PlayerType {
  const challengeCharacter = CHALLENGE_CHARACTERS[challenge];
  // Handle modded challenges.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return challengeCharacter ?? DEFAULT_CHALLENGE_CHARACTER;
}

/**
 * Get the proper name for a `Challenge` enum. This will only work for vanilla challenges.
 *
 * For modded challenges, "Unknown" will be returned.
 */
export function getChallengeName(challenge: Challenge): string {
  const challengeName = CHALLENGE_NAMES[challenge];
  // Handle modded challenges.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return challengeName ?? DEFAULT_CHALLENGE_NAME;
}
