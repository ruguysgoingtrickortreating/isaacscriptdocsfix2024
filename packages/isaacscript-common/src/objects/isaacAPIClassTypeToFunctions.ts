/* eslint-disable @typescript-eslint/no-explicit-any */

import { CopyableIsaacAPIClassType } from "../enums/private/CopyableIsaacAPIClassType";
import {
  copyBitSet128,
  deserializeBitSet128,
  isSerializedBitSet128,
  serializeBitSet128,
} from "../functions/bitSet128";
import {
  copyColor,
  deserializeColor,
  isSerializedColor,
  serializeColor,
} from "../functions/color";
import {
  copyKColor,
  deserializeKColor,
  isSerializedKColor,
  serializeKColor,
} from "../functions/kColor";
import {
  copyRNG,
  deserializeRNG,
  isSerializedRNG,
  serializeRNG,
} from "../functions/rng";
import {
  copyVector,
  deserializeVector,
  isSerializedVector,
  serializeVector,
} from "../functions/vector";

interface IsaacAPIClassTypeFunctions {
  isSerialized: (object: unknown) => object is unknown;
  copy: (object: any) => any;
  serialize: (object: any) => any;
  deserialize: (object: any) => any;
}

export const ISAAC_API_CLASS_TYPE_TO_FUNCTIONS: {
  readonly [key in CopyableIsaacAPIClassType]: IsaacAPIClassTypeFunctions;
} = {
  [CopyableIsaacAPIClassType.BIT_SET_128]: {
    isSerialized: isSerializedBitSet128,
    copy: copyBitSet128,
    serialize: serializeBitSet128,
    deserialize: deserializeBitSet128,
  },
  [CopyableIsaacAPIClassType.COLOR]: {
    isSerialized: isSerializedColor,
    copy: copyColor,
    serialize: serializeColor,
    deserialize: deserializeColor,
  },
  [CopyableIsaacAPIClassType.K_COLOR]: {
    isSerialized: isSerializedKColor,
    copy: copyKColor,
    serialize: serializeKColor,
    deserialize: deserializeKColor,
  },
  [CopyableIsaacAPIClassType.RNG]: {
    isSerialized: isSerializedRNG,
    copy: copyRNG,
    serialize: serializeRNG,
    deserialize: deserializeRNG,
  },
  [CopyableIsaacAPIClassType.VECTOR]: {
    isSerialized: isSerializedVector,
    copy: copyVector,
    serialize: serializeVector,
    deserialize: deserializeVector,
  },
} as const;
