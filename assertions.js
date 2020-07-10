/*!
 * Copyright (c) 2020 Digital Bazaar, Inc. All rights reserved.
 */
class Assert {
  isNumber(value, name) {
    if(typeof value !== 'number') {
      throw new TypeError(`"${name}" must be number.`);
    }
  }

  isPositiveInteger(value, name) {
    if(!(Number.isInteger(value) && value > 0)) {
      throw new TypeError(`"${name}" must be a positive integer.`);
    }
  }

  isString(value, name) {
    if(typeof value !== 'string') {
      throw new TypeError(`"${name}" must be a string.`);
    }
  }

  isBoolean(value, name) {
    if(typeof value !== 'boolean') {
      throw new TypeError(`"${name}" must be a boolean.`);
    }
  }

  isNonNegativeInteger(value, name) {
    if(!(Number.isInteger(value) && value >= 0)) {
      throw new TypeError(`"${name}" must be a non-negative integer.`);
    }
  }

  isUint8Array(value, name) {
    if(!(value instanceof Uint8Array)) {
      throw new TypeError(`"${name}" must be a Uint8Array.`);
    }
  }
}

export default new Assert();

