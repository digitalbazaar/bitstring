/*!
 * Copyright (c) 2020-2023 Digital Bazaar, Inc. All rights reserved.
 */
import * as assert from './assertions.js';
import * as base64url from 'base64url-universal';
import {gzip, ungzip} from 'pako';

export class Bitstring {
  constructor({length, buffer, littleEndian = true} = {}) {
    if(length && buffer) {
      throw new Error('Only one of "length" or "buffer" must be given.');
    }
    if(length !== undefined) {
      assert.isPositiveInteger(length, 'length');
    } else {
      assert.isUint8Array(buffer, 'buffer');
    }
    if(littleEndian !== undefined) {
      assert.isBoolean(littleEndian, 'littleEndian');
    }
    if(length) {
      this.bits = new Uint8Array(Math.ceil(length / 8));
      this.length = length;
    } else {
      this.bits = new Uint8Array(buffer.buffer);
      this.length = buffer.length * 8;
    }
    this.littleEndian = littleEndian;
  }

  set(position, on) {
    assert.isNumber(position, 'position');
    assert.isBoolean(on, 'on');
    const {length, littleEndian} = this;
    const {index, bit} = _parsePosition(position, length, littleEndian);
    if(on) {
      this.bits[index] |= bit;
    } else {
      this.bits[index] &= 0xFF ^ bit;
    }
  }

  get(position) {
    assert.isNumber(position, 'position');
    const {length, littleEndian} = this;
    const {index, bit} = _parsePosition(position, length, littleEndian);
    return !!(this.bits[index] & bit);
  }

  async encodeBits() {
    return base64url.encode(gzip(this.bits));
  }

  static async decodeBits({encoded}) {
    assert.isString(encoded, 'encoded');
    return ungzip(base64url.decode(encoded));
  }

  async compressBits() {
    return gzip(this.bits);
  }

  static async uncompressBits({compressed}) {
    assert.isUint8Array(compressed, 'compressed');
    return ungzip(compressed);
  }
}

function _parsePosition(position, length, littleEndian) {
  assert.isNonNegativeInteger(position, 'position');
  assert.isPositiveInteger(length, 'length');
  assert.isBoolean(littleEndian, 'littleEndian');

  if(position >= length) {
    throw new Error(
      `Position "${position}" is out of range "0-${length - 1}".`);
  }
  const index = Math.floor(position / 8);
  const rem = position % 8;
  const shift = littleEndian ? (7 - rem) : rem;
  const bit = 1 << shift;
  return {index, bit};
}
