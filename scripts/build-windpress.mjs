import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import lzString from 'lz-string';

const root = process.cwd();
const manifestPath = path.join(root, 'src/windpress.manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const timestamp = Number(process.env.WINDPRESS_TIMESTAMP || Date.now());
const uid = process.env.WINDPRESS_UID || crypto.randomBytes(16).toString('base64url');
const artifact = manifest.artifact || ('dist/' + manifest.package + '-' + manifest.version + '.windpress');

const entries = manifest.entries.map((entry) => {
  const relativePath = entry.relative_path.replace(/^\/+/, '');
  const sourcePath = path.join(root, 'src/windpress', relativePath);
  const content = fs.readFileSync(sourcePath, 'utf8');
  return {
    name: entry.name || path.basename(relativePath),
    content,
    relative_path: relativePath,
    handler: entry.handler || 'internal',
    readonly: entry.readonly === true,
  };
});

const data = {
  entries,
  _windpress: true,
  _version: manifest.windpress?.plugin_version || '3.3.73',
  _wp_version: manifest.windpress?.wordpress_version || '',
  _timestamp: timestamp,
  _uid: uid,
  _type: 'sfs',
};

const output = Buffer.from(lzString.compressToUint8Array(JSON.stringify(data)));
const outputPath = path.join(root, artifact);
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, output);
fs.writeFileSync(outputPath.replace(/\.windpress$/, '.sha256'), crypto.createHash('sha256').update(output).digest('hex') + '  ' + path.basename(outputPath) + '\n');

console.log('Built ' + artifact);
console.log('Entries: ' + entries.length);
