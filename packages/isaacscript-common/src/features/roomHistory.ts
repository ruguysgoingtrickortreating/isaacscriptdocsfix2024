import { game } from "../cachedClasses";
import { ModUpgraded } from "../classes/ModUpgraded";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { errorIfFeaturesNotInitialized } from "../featuresInitialized";
import { getLastElement } from "../functions/array";
import {
  getRoomGridIndex,
  getRoomListIndex,
  getRoomName,
  getRoomStageID,
  getRoomSubType,
  getRoomVariant,
  getRoomVisitedCount,
} from "../functions/roomData";
import { RoomDescription } from "../interfaces/RoomDescription";
import { saveDataManager } from "./saveDataManager/exports";

const FEATURE_NAME = "roomHistory";

const v = {
  run: {
    roomHistory: [] as RoomDescription[],
  },
};

/** @internal */
export function roomHistoryInit(mod: ModUpgraded): void {
  saveDataManager(FEATURE_NAME, v);

  mod.AddCallbackCustom(
    ModCallbackCustom.POST_NEW_ROOM_EARLY,
    postNewRoomEarly,
  );
}

// ModCallbackCustom.POST_NEW_ROOM_EARLY
function postNewRoomEarly() {
  const level = game.GetLevel();
  const stage = level.GetStage();
  const stageType = level.GetStageType();
  const room = game.GetRoom();
  const roomType = room.GetType();
  const stageID = getRoomStageID();
  const roomVariant = getRoomVariant();
  const roomSubType = getRoomSubType();
  const roomName = getRoomName();
  const roomGridIndex = getRoomGridIndex();
  const roomListIndex = getRoomListIndex();
  const roomVisitedCount = getRoomVisitedCount();

  const roomDescription: RoomDescription = {
    stage,
    stageType,
    stageID,
    roomType,
    roomVariant,
    roomSubType,
    roomName,
    roomGridIndex,
    roomListIndex,
    roomVisitedCount,
  };
  v.run.roomHistory.push(roomDescription);
}

/**
 * Helper function to get information about all of the rooms that a player has visited thus far on
 * this run.
 */
export function getRoomHistory(): readonly RoomDescription[] {
  errorIfFeaturesNotInitialized(FEATURE_NAME);
  return v.run.roomHistory;
}

/**
 * Helper function to get information about the room that was previously visited.
 *
 * In the special case of only one room having been visited thus far (i.e. the starting room of the
 * run), the starting room will be returned.
 */
export function getPreviousRoomDescription(): RoomDescription {
  const previousRoomDescription =
    v.run.roomHistory[v.run.roomHistory.length - 2];
  if (previousRoomDescription !== undefined) {
    return previousRoomDescription;
  }

  const startingRoomDescription = v.run.roomHistory[0];
  if (startingRoomDescription !== undefined) {
    return startingRoomDescription;
  }

  error(
    "Failed to find a room description for any rooms thus far on this run.",
  );
}

/**
 * Helper function to get information about the most recent room that is stored in the room history
 * array.
 *
 * This is useful in the `POST_ENTITY_REMOVE` callback; see the `isLeavingRoom` function.
 */
export function getLatestRoomDescription(): RoomDescription {
  const latestRoomDescription = getLastElement(v.run.roomHistory);
  if (latestRoomDescription === undefined) {
    error(
      "Failed to get the latest room description since the room history array was empty.",
    );
  }

  return latestRoomDescription;
}

/**
 * Helper function to detect if the game is in the state where the room index has changed to a new
 * room, but the entities from the previous room are currently in the process of despawning. (At
 * this point, the `POST_NEW_ROOM` callback will not have fired yet, and there will not be an entry
 * in the room history array for the current room.)
 *
 * This function is intended to be used in the `POST_ENTITY_REMOVE` callback to detect when an
 * entity is pseudo-persistent entity such as a pickup is despawning.
 */
export function isLeavingRoom(): boolean {
  const roomListIndex = getRoomListIndex();
  const roomVisitedCount = getRoomVisitedCount();
  const latestRoomDescription = getLatestRoomDescription();

  return (
    roomListIndex !== latestRoomDescription.roomListIndex ||
    roomVisitedCount !== latestRoomDescription.roomVisitedCount
  );
}
