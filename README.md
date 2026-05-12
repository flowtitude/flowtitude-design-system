# Flowtitude Design System

Flowtitude Design System packages the core CSS volume used by WindPress.

## Structure

- `src/windpress/`: editable WindPress Simple File System CSS entries.
- `src/windpress.manifest.json`: export metadata and entry order.
- `dist/fds-core-1.1.1.windpress`: current importable WindPress artifact.
- `scripts/build-windpress.mjs`: rebuilds the `.windpress` artifact from source files.
- `scripts/inspect-windpress.mjs`: decodes an artifact and prints its manifest.

## Release Flow

1. Edit files under `src/windpress/`.
2. Update `src/windpress.manifest.json` version.
3. Run `npm install` once, then `npm run build`.
4. Import the generated `dist/*.windpress` file in WindPress.
5. Commit source, manifest, changelog, and artifact together.

## Current Version

- Package: `fds-core`
- Version: `1.1.1`
- WindPress source plugin version: `3.3.73`
- WordPress source version: `6.9.4`
