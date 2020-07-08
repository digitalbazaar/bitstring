/*!
 * Copyright (c) 2020 Digital Bazaar, Inc. All rights reserved.
 */
import Bitstring from '../index.js';

describe('Bitstring', () => {
  it('should create an instance.', async () => {
    const bitstring = new Bitstring({length: 8});

    bitstring.length.should.equal(8);
    bitstring.bits.should.be.a('Uint8Array');
    bitstring.bits.length.should.equal(1);
  });

  it('should fail to create an instance if no "length".', async () => {
    let err;
    try {
      new Bitstring();
    } catch(e) {
      err = e;
    }
    should.exist(err);
    err.name.should.equal('TypeError');
    err.message.should.equal('"buffer" must be a Uint8Array.');
  });

  it('should throw error if "length" and "buffer" are passed.', async () => {
    let err;
    const buffer = new Uint8Array(1);
    try {
      new Bitstring({length: 4, buffer});
    } catch(e) {
      err = e;
    }
    should.exist(err);
    err.message.should.equal('Only one of "length" or "buffer" must be given.');
  });

  it('should throw error if "length" is not a positive integer.', async () => {
    const lengths = [0, -2];
    for(const length of lengths) {
      let err;
      try {
        new Bitstring({length});
      } catch(e) {
        err = e;
      }
      should.exist(err);
      err.message.should.equal('"length" must be a positive integer.');
    }
  });

  it('should set a bit to true.', async () => {
    const bitstring = new Bitstring({length: 8});
    bitstring.get(0).should.equal(false);
    bitstring.get(1).should.equal(false);
    bitstring.get(2).should.equal(false);
    bitstring.get(3).should.equal(false);
    bitstring.get(4).should.equal(false);
    bitstring.get(5).should.equal(false);
    bitstring.get(6).should.equal(false);
    bitstring.get(7).should.equal(false);

    // set the value at the fourth index of bitstring to true
    bitstring.set(4, true);

    bitstring.get(0).should.equal(false);
    bitstring.get(1).should.equal(false);
    bitstring.get(2).should.equal(false);
    bitstring.get(3).should.equal(false);
    bitstring.get(4).should.equal(true);
    bitstring.get(5).should.equal(false);
    bitstring.get(6).should.equal(false);
    bitstring.get(7).should.equal(false);
  });

  it('should set a bit to false.', async () => {
    const buffer = Uint8Array.from([255]);
    const bitstring = new Bitstring({buffer});
    bitstring.get(0).should.equal(true);
    bitstring.get(1).should.equal(true);
    bitstring.get(2).should.equal(true);
    bitstring.get(3).should.equal(true);
    bitstring.get(4).should.equal(true);
    bitstring.get(5).should.equal(true);
    bitstring.get(6).should.equal(true);
    bitstring.get(7).should.equal(true);

    // set the value at the fourth index of bitstring to false
    bitstring.set(4, false);

    bitstring.get(0).should.equal(true);
    bitstring.get(1).should.equal(true);
    bitstring.get(2).should.equal(true);
    bitstring.get(3).should.equal(true);
    bitstring.get(4).should.equal(false);
    bitstring.get(5).should.equal(true);
    bitstring.get(6).should.equal(true);
    bitstring.get(7).should.equal(true);
    bitstring.bits.should.have.length(1);
    bitstring.length.should.equal(8);
    bitstring.bits[0].should.equal(239);
  });

  it('should throw an error if "on" is not a boolean.', async () => {
    const list = new Bitstring({length: 8});
    const onTypes = [1, undefined, 'string', {}, []];

    for(const on of onTypes) {
      let err;
      try {
        list.set(4, on);
      } catch(e) {
        err = e;
      }
      should.exist(err);
      err.name.should.equal('TypeError');
      err.message.should.equal('"on" must be a boolean.');
    }
  });

  it('should fail to get a bit when "position" is out of range.', async () => {
    const list = new Bitstring({length: 8});
    let err;
    try {
      list.get(8);
    } catch(e) {
      err = e;
    }
    should.exist(err);
    err.message.should.equal('Position "8" is out of range "0-7".');
  });

  it('should throw error if "position" is non-negative integer.', async () => {
    const list = new Bitstring({length: 8});
    let err;
    try {
      list.get(-1);
    } catch(e) {
      err = e;
    }
    should.exist(err);
    err.message.should.equal('Position "-1" must be a non-negative integer.');
  });

  it('should encode a bitstring', async () => {
    const bitstring = new Bitstring({length: 8});
    bitstring.set(1, true);
    bitstring.set(4, true);

    const encoded = await bitstring.encodeBits();

    bitstring.length.should.equal(8);
    bitstring.bits.should.be.a('Uint8Array');
    bitstring.bits.length.should.equal(1);
    encoded.should.equal('H4sIAAAAAAAAAxMCAMWeuyEBAAAA');
  });

  it('should decode an encoded bit', async () => {
    const bitstring = new Bitstring({length: 8});
    bitstring.set(1, true);
    bitstring.set(4, true);

    const encoded = await bitstring.encodeBits();
    const decoded = await Bitstring.decodeBits({encoded});

    bitstring.length.should.equal(8);
    bitstring.bits.should.be.a('Uint8Array');
    bitstring.bits.length.should.equal(1);
    decoded.should.deep.equal(bitstring.bits);
  });
});
