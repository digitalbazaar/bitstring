# bitstring ChangeLog

## 3.0.0 - 2023-01-dd

### Added
- Add option to use big-endian bit order within a byte of the bitstring.
  This option provides backwards compatibility with previous versions,
  but it is not the default because the more natural bit order is little
  endian.

### Changed
- **BREAKING**: Default to little-endian bit order within a byte of the
  bitstring.

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
