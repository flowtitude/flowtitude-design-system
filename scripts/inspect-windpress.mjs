import fs from 'node:fs';
import lzString from 'lz-string';

const file = process.argv[2];
if (!file) {
  console.error('Usage: node scripts/inspect-windpress.mjs <file.windpress>');
  process.exit(1);
}

const data = JSON.parse(lzString.decompressFromUint8Array(new Uint8Array(fs.readFileSync(file))) || '{}');
console.log(JSON.stringify({
  windpress: data._windpress === true,
  type: data._type,
  windpress_version: data._version,
  wordpress_version: data._wp_version,
  timestamp: data._timestamp,
  uid: data._uid,
  entries: (data.entries || []).map((entry) => ({
    relative_path: entry.relative_path,
    handler: entry.handler,
    readonly: entry.readonly === true,
    bytes: Buffer.byteLength(entry.content || '', 'utf8'),
  })),
}, null, 2));
