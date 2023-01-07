/*!
 * Copyright (c) 2020-2023 Digital Bazaar, Inc. All rights reserved.
 */
import {Bitstring} from '../lib/index.js';

describe('Bitstring', () => {
  it('should create a little endian bits instance by default', async () => {
    const buffer = Uint8Array.from([0b10000000]);
    const bitstring = new Bitstring({buffer});

    bitstring.length.should.equal(8);
    bitstring.bits.should.be.a('Uint8Array');
    bitstring.bits.length.should.equal(1);
    bitstring.bits[0].should.equal(buffer[0]);
    bitstring.get(0).should.equal(true);
    bitstring.get(1).should.equal(false);
    bitstring.get(2).should.equal(false);
    bitstring.get(3).should.equal(false);
    bitstring.get(4).should.equal(false);
    bitstring.get(5).should.equal(false);
    bitstring.get(6).should.equal(false);
    bitstring.get(7).should.equal(false);
  });

  it('should create a big endian bits instance', async () => {
    const buffer = Uint8Array.from([0b10000000]);
    const bitstring = new Bitstring({buffer, littleEndianBits: false});

    bitstring.length.should.equal(8);
    bitstring.bits.should.be.a('Uint8Array');
    bitstring.bits.length.should.equal(1);
    bitstring.bits[0].should.equal(buffer[0]);
    bitstring.get(0).should.equal(false);
    bitstring.get(1).should.equal(false);
    bitstring.get(2).should.equal(false);
    bitstring.get(3).should.equal(false);
    bitstring.get(4).should.equal(false);
    bitstring.get(5).should.equal(false);
    bitstring.get(6).should.equal(false);
    bitstring.get(7).should.equal(true);
  });

  it('should set a bit to true on default instance', async () => {
    // `littleEndianBits` not specified, so defaults to `true`
    const bitstring = new Bitstring({length: 8});
    bitstring.get(0).should.equal(false);
    bitstring.get(1).should.equal(false);
    bitstring.get(2).should.equal(false);
    bitstring.get(3).should.equal(false);
    bitstring.get(4).should.equal(false);
    bitstring.get(5).should.equal(false);
    bitstring.get(6).should.equal(false);
    bitstring.get(7).should.equal(false);

    // set the value at the fourth index (bit 5) of bitstring to true
    bitstring.set(4, true);

    bitstring.get(0).should.equal(false);
    bitstring.get(1).should.equal(false);
    bitstring.get(2).should.equal(false);
    bitstring.get(3).should.equal(false);
    bitstring.get(4).should.equal(true);
    bitstring.get(5).should.equal(false);
    bitstring.get(6).should.equal(false);
    bitstring.get(7).should.equal(false);
    bitstring.bits.should.have.length(1);
    bitstring.length.should.equal(8);
    // little endian bit order
    bitstring.bits[0].should.equal(0b00001000);
  });

  const params = [{
    name: 'little endian bits',
    littleEndianBits: true,
    lowBitsBuffer: Uint8Array.from([0b11110000])
  }, {
    name: 'big endian bits',
    littleEndianBits: false,
    lowBitsBuffer: Uint8Array.from([0b00001111])
  }];
  for(const {name, littleEndianBits, lowBitsBuffer} of params) {
    describe(name, () => {
      it('should create an instance', async () => {
        const bitstring = new Bitstring({length: 8});

        bitstring.length.should.equal(8);
        bitstring.bits.should.be.a('Uint8Array');
        bitstring.bits.length.should.equal(1);
      });

      it('should create an instance w/endianness param', async () => {
        const bitstring = new Bitstring({length: 8, littleEndianBits});

        bitstring.length.should.equal(8);
        bitstring.bits.should.be.a('Uint8Array');
        bitstring.bits.length.should.equal(1);
      });

      it('should fail to create an instance if no "length"', async () => {
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

      it('should throw error if "length" and "buffer" are passed', async () => {
        let err;
        const buffer = new Uint8Array(1);
        try {
          new Bitstring({length: 4, buffer});
        } catch(e) {
          err = e;
        }
        should.exist(err);
        err.message.should.equal(
          'Only one of "length" or "buffer" must be given.');
      });

      it('should throw error if "length" is not a positive integer',
        async () => {
          const lengths = [0, -2];
          for(const length of lengths) {
            let err;
            try {
              new Bitstring({length});
            } catch(e) {
              err = e;
            }
            should.exist(err);
            err.name.should.equal('TypeError');
            err.message.should.equal('"length" must be a positive integer.');
          }
        });

      it('should throw error if "littleEndianBits" is not a boolean',
        async () => {
          const options = [0, '', {}];
          for(const littleEndianBits of options) {
            let err;
            try {
              new Bitstring({length: 8, littleEndianBits});
            } catch(e) {
              err = e;
            }
            should.exist(err);
            err.name.should.equal('TypeError');
            err.message.should.equal('"littleEndianBits" must be a boolean.');
          }
        });

      it('should set a bit to true', async () => {
        const bitstring = new Bitstring({length: 8, littleEndianBits});
        bitstring.get(0).should.equal(false);
        bitstring.get(1).should.equal(false);
        bitstring.get(2).should.equal(false);
        bitstring.get(3).should.equal(false);
        bitstring.get(4).should.equal(false);
        bitstring.get(5).should.equal(false);
        bitstring.get(6).should.equal(false);
        bitstring.get(7).should.equal(false);

        // set the value at the fourth index (bit 5) of bitstring to true
        bitstring.set(4, true);

        bitstring.get(0).should.equal(false);
        bitstring.get(1).should.equal(false);
        bitstring.get(2).should.equal(false);
        bitstring.get(3).should.equal(false);
        bitstring.get(4).should.equal(true);
        bitstring.get(5).should.equal(false);
        bitstring.get(6).should.equal(false);
        bitstring.get(7).should.equal(false);
        bitstring.bits.should.have.length(1);
        bitstring.length.should.equal(8);
        if(littleEndianBits) {
          bitstring.bits[0].should.equal(0b00001000);
        } else {
          bitstring.bits[0].should.equal(0b00010000);
        }
      });

      it('should set a bit to false', async () => {
        const buffer = Uint8Array.from([255]);
        const bitstring = new Bitstring({buffer, littleEndianBits});
        bitstring.get(0).should.equal(true);
        bitstring.get(1).should.equal(true);
        bitstring.get(2).should.equal(true);
        bitstring.get(3).should.equal(true);
        bitstring.get(4).should.equal(true);
        bitstring.get(5).should.equal(true);
        bitstring.get(6).should.equal(true);
        bitstring.get(7).should.equal(true);

        // set the value at the fourth index (bit 5) of bitstring to false
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
        if(littleEndianBits) {
          bitstring.bits[0].should.equal(0b11110111);
        } else {
          bitstring.bits[0].should.equal(0b11101111);
        }
      });

      it('should check endianness', async () => {
        const buffer = Uint8Array.from([lowBitsBuffer, lowBitsBuffer]);
        const bitstring = new Bitstring({buffer, littleEndianBits});
        bitstring.get(0).should.equal(true);
        bitstring.get(1).should.equal(true);
        bitstring.get(2).should.equal(true);
        bitstring.get(3).should.equal(true);
        bitstring.get(4).should.equal(false);
        bitstring.get(5).should.equal(false);
        bitstring.get(6).should.equal(false);
        bitstring.get(7).should.equal(false);

        // when `littleEndianBits=false`, the bytes are still in little endian
        // order, but the bits are in big endian order
        bitstring.get(8).should.equal(true);
        bitstring.get(9).should.equal(true);
        bitstring.get(10).should.equal(true);
        bitstring.get(11).should.equal(true);
        bitstring.get(12).should.equal(false);
        bitstring.get(13).should.equal(false);
        bitstring.get(14).should.equal(false);
        bitstring.get(15).should.equal(false);

        // set the value at the seventh index (bit 8) and the value at the 8th
        // index (bit 9) of bitstring to false
        bitstring.set(7, true);
        bitstring.set(8, false);

        bitstring.get(0).should.equal(true);
        bitstring.get(1).should.equal(true);
        bitstring.get(2).should.equal(true);
        bitstring.get(3).should.equal(true);
        bitstring.get(4).should.equal(false);
        bitstring.get(5).should.equal(false);
        bitstring.get(6).should.equal(false);
        bitstring.get(7).should.equal(true);
        bitstring.get(8).should.equal(false);
        bitstring.get(9).should.equal(true);
        bitstring.get(10).should.equal(true);
        bitstring.get(11).should.equal(true);
        bitstring.get(12).should.equal(false);
        bitstring.get(13).should.equal(false);
        bitstring.get(14).should.equal(false);
        bitstring.get(15).should.equal(false);

        bitstring.bits.should.have.length(2);
        bitstring.length.should.equal(16);
        if(littleEndianBits) {
          bitstring.bits[0].should.equal(0b11110001);
          bitstring.bits[1].should.equal(0b01110000);
        } else {
          bitstring.bits[0].should.equal(0b10001111);
          bitstring.bits[1].should.equal(0b00001110);
        }
      });

      it('should throw an error if "on" is not a boolean', async () => {
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

      it('should throw an error if "position" is not a number', async () => {
        const list = new Bitstring({length: 8});
        const positionTypes = [undefined, 'string', {}, [], false];

        for(const position of positionTypes) {
          let err;
          try {
            list.get(position);
          } catch(e) {
            err = e;
          }
          should.exist(err);
          err.name.should.equal('TypeError');
          err.message.should.equal('"position" must be number.');
        }
      });

      it('should fail to get a bit when "position" is out of range',
        async () => {
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

      it('should throw error if "position" is non-negative integer',
        async () => {
          const list = new Bitstring({length: 8});
          let err;
          try {
            list.get(-1);
          } catch(e) {
            err = e;
          }
          should.exist(err);
          err.name.should.equal('TypeError');
          err.message.should.equal(
            '"position" must be a non-negative integer.');
        });

      it('should encode a bitstring', async () => {
        const bitstring = new Bitstring({length: 8, littleEndianBits});
        bitstring.set(1, true);
        bitstring.set(4, true);

        const encoded = await bitstring.encodeBits();

        bitstring.length.should.equal(8);
        bitstring.bits.should.be.a('Uint8Array');
        bitstring.bits.length.should.equal(1);
        if(littleEndianBits) {
          encoded.should.equal('H4sIAAAAAAAAA_MAAC8mBaoBAAAA');
          bitstring.bits[0].should.equal(0b01001000);
        } else {
          encoded.should.equal('H4sIAAAAAAAAAxMCAMWeuyEBAAAA');
          bitstring.bits[0].should.equal(0b00010010);
        }
      });

      it('should throw an error if "encoded" is not a string', async () => {
        const badTypes = [1, undefined, {}, [], false];

        for(const encoded of badTypes) {
          let err;
          let decoded;
          try {
            decoded = await Bitstring.decodeBits({encoded});
          } catch(e) {
            err = e;
          }
          should.not.exist(decoded);
          should.exist(err);
          err.name.should.equal('TypeError');
          err.message.should.equal('"encoded" must be a string.');
        }
      });

      it('should decode encoded bits', async () => {
        const bitstring = new Bitstring({length: 8, littleEndianBits});
        bitstring.set(1, true);
        bitstring.set(4, true);

        const encoded = await bitstring.encodeBits();
        const decoded = await Bitstring.decodeBits({encoded});

        bitstring.length.should.equal(8);
        bitstring.bits.should.be.a('Uint8Array');
        bitstring.bits.length.should.equal(1);
        decoded.should.deep.equal(bitstring.bits);
        if(littleEndianBits) {
          bitstring.bits[0].should.equal(0b01001000);
        } else {
          bitstring.bits[0].should.equal(0b00010010);
        }
      });

      it('should compress a bitstring', async () => {
        const bitstring = new Bitstring({length: 8, littleEndianBits});
        bitstring.set(1, true);
        bitstring.set(4, true);

        const compressed = await bitstring.compressBits();

        bitstring.length.should.equal(8);
        bitstring.bits.should.be.a('Uint8Array');
        bitstring.bits.length.should.equal(1);
        if(littleEndianBits) {
          const expected = new Uint8Array([
            31, 139, 8, 0, 0, 0, 0,
            0, 0, 3, 243, 0, 0, 47,
            38, 5, 170, 1, 0, 0, 0
          ]);
          compressed.should.deep.equal(expected);
        } else {
          const expected = new Uint8Array([
            31, 139, 8, 0, 0, 0, 0,
            0, 0, 3, 19, 2, 0, 197,
            158, 187, 33, 1, 0, 0, 0
          ]);
          compressed.should.deep.equal(expected);
        }
      });

      it('should throw an error if "compressed" is not a Uint8Array',
        async () => {
          const badTypes = [1, undefined, {}, [], false];

          for(const compressed of badTypes) {
            let err;
            let uncompressed;
            try {
              uncompressed = await Bitstring.uncompressBits({compressed});
            } catch(e) {
              err = e;
            }
            should.not.exist(uncompressed);
            should.exist(err);
            err.name.should.equal('TypeError');
            err.message.should.equal('"compressed" must be a Uint8Array.');
          }
        });

      it('should uncompress compressed bits', async () => {
        const bitstring = new Bitstring({length: 8});
        bitstring.set(1, true);
        bitstring.set(4, true);

        const compressed = await bitstring.compressBits();
        const uncompressed = await Bitstring.uncompressBits({compressed});

        bitstring.length.should.equal(8);
        bitstring.bits.should.be.a('Uint8Array');
        bitstring.bits.length.should.equal(1);
        uncompressed.should.deep.equal(bitstring.bits);
      });
    });
  }
});
