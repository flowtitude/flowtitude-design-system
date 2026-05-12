# Flowtitude Design System

Flowtitude Design System is the public distribution repository for Flowtitude `.windpress` packages.

The main purpose of this repository is to keep generated WindPress artifacts downloadable, versioned, and auditable for publication. The CSS files under `src/windpress/` are kept as a readable source snapshot so each package can be inspected and rebuilt, but the automation flow should treat the generated `.windpress` file as the release artifact.

## Downloads

- Current package: `dist/fds-core-1.1.1.windpress`
- Checksum: `dist/fds-core-1.1.1.sha256`

## Structure

- `dist/`: generated `.windpress` packages and checksums for download/publication.
- `src/windpress/`: extracted WindPress Simple File System CSS entries for review and traceability.
- `src/windpress.manifest.json`: package metadata and entry order used to rebuild the artifact.
- `scripts/build-windpress.mjs`: rebuilds the `.windpress` artifact from the source snapshot.
- `scripts/inspect-windpress.mjs`: decodes an artifact and prints its manifest.

## Publication Flow

1. Generate or export the updated `.windpress` package from the Flowtitude Design System workflow.
2. Update the matching files under `src/windpress/` when source inspection or rebuildability is required.
3. Update `src/windpress.manifest.json`, `CHANGELOG.md`, the `dist/*.windpress` artifact, and its checksum.
4. Commit the package update to this repository.
5. Use the committed artifact as the downloadable file for Flowtitude publication and community announcements.

## Current Version

- Package: `fds-core`
- Version: `1.1.1`
- WindPress source plugin version: `3.3.73`
- WordPress source version: `6.9.4`
