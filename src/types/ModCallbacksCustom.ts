/**
 * These are the custom callbacks available for use once the mod object has been upgraded.
 * Also see the [[`upgradeMod`]] function.
 *
 * For a better listing of all custom callbacks, check out the
 * [Function Signatures](https://isaacscript.github.io/docs/function-signatures#custom-callbacks).
 *
 * @category Custom Callbacks
 */
enum ModCallbacksCustom {
  MC_POST_GAME_STARTED,
  MC_POST_NEW_LEVEL,
  MC_POST_NEW_ROOM,
  MC_PRE_ITEM_PICKUP,
  MC_POST_ITEM_PICKUP,
  MC_POST_PLAYER_CHANGE_TYPE,
  MC_POST_FLIP,
  MC_POST_FIRST_FLIP,
  MC_POST_ESAU_JR,
  MC_POST_FIRST_ESAU_JR,
  MC_POST_TRANSFORMATION,
  MC_POST_GRID_ENTITY_INIT,
  MC_POST_GRID_ENTITY_UPDATE,
}
export default ModCallbacksCustom;
