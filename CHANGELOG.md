# bitstring ChangeLog

## 3.1.0 - 2023-01-08

### Changed
- Rename `littleEndianBits` to `leftToRightIndexing` to try and avoid
  confusion over indexing order. There are two (opposite!) interpretations
  of the meaning of "big" or "little" endianness for bits (as opposed to
  bytes where it is more clear). Therefore, that terminology is to be
  avoided. The old parameter name can still be used, but is deprecated.

## 3.0.0 - 2023-01-08

### Added
- Add option `littleEndianBits` to use right to left bit order within a byte
  of the bitstring. This option provides backwards compatibility with previous
  versions. This name has led to confusion and will be renamed in the next
  minor release w/backwards-compatibility support for using it.

### Changed
- **BREAKING**: Default to left to right bit indexing within a byte of the
  bitstring. Previous versions would use right to left bit order with
  big-endian byte order (least significant byte index is at the most
  significant address, i.e., first). This version will default to being
  consistently left to right with indexing (largest and leftmost address
  is the lowest index for both bits and bytes).

### Removed
- **BREAKING**: Remove support for node 14, only node 16+ supported.

## 2.0.0 - 2022-06-02

### Changed
- **BREAKING**: Remove default export.
  - To update: Import named `Bitstring` class directly.
- **BREAKING**: Convert to module (ESM).
- **BREAKING**: Require Node.js >=14.
- Update dependencies.
- Lint module.

## 1.2.1 - 2022-01-21

### Added
- Add `README.md`.

## 1.2.0 - 2020-09-25

### Added
- Add `compressBits` and `uncompressBits` helper functions. These functions
  perform gzip and ungzip operations without doing base64url encoding/decoding.

## 1.1.0 - 2020-07-10

### Changed
- Improve parameter validation and error handling on all APIs.

## 1.0.0 - 2020-07-09

### Added
- Add core files.

- See git history for changes previous to this release.
