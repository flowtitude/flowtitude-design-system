import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve('out')
const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_DOCS_BASE_PATH)
const htmlFiles = []
const errors = []

function normalizeBasePath(value = '') {
  if (!value) {
    return ''
  }

  return `/${value.replace(/^\/+|\/+$/g, '')}`
}

function walk(directory) {
  for (const name of fs.readdirSync(directory)) {
    const filePath = path.join(directory, name)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      walk(filePath)
    } else if (filePath.endsWith('.html')) {
      htmlFiles.push(filePath)
    }
  }
}

function isExternalUrl(url) {
  return (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('mailto:') ||
    url.startsWith('tel:') ||
    url.startsWith('#') ||
    url.startsWith('data:')
  )
}

function resolveExportPath(url) {
  const [pathname] = url.split(/[?#]/)
  let exportPath = pathname

  if (basePath && exportPath.startsWith(`${basePath}/`)) {
    exportPath = exportPath.slice(basePath.length)
  }

  if (!exportPath || exportPath === '/') {
    return path.join(root, 'index.html')
  }

  const target = path.join(root, exportPath)

  if (exportPath.endsWith('/')) {
    return path.join(target, 'index.html')
  }

  return target
}

function targetExists(url) {
  const target = resolveExportPath(url)

  return fs.existsSync(target) || fs.existsSync(path.join(target, 'index.html'))
}

if (!fs.existsSync(root)) {
  throw new Error(`Missing export directory: ${root}`)
}

walk(root)

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8')

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = match[1]

    if (isExternalUrl(url) || !url.startsWith('/')) {
      continue
    }

    if (basePath && !(url === `${basePath}/` || url.startsWith(`${basePath}/`))) {
      errors.push(`${file}: "${url}" is outside base path "${basePath}"`)
      continue
    }

    if (!targetExists(url)) {
      errors.push(`${file}: "${url}" does not resolve inside ${root}`)
    }
  }
}

if (errors.length > 0) {
  console.error(errors.slice(0, 25).join('\n'))
  if (errors.length > 25) {
    console.error(`...and ${errors.length - 25} more`)
  }
  process.exit(1)
}

console.log(
  `OK ${htmlFiles.length} HTML files: local absolute links resolve${
    basePath ? ` under ${basePath}` : ''
  }`,
)
