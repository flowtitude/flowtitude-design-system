import withMarkdoc from '@markdoc/next.js'

import withSearch from './src/markdoc/search.mjs'

function normalizeBasePath(path) {
  if (!path) {
    return ''
  }

  return `/${path.replace(/^\/+|\/+$/g, '')}`
}

const docsBasePath = normalizeBasePath(process.env.NEXT_PUBLIC_DOCS_BASE_PATH)

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  pageExtensions: ['js', 'jsx', 'md', 'ts', 'tsx'],
  ...(docsBasePath
    ? {
        basePath: docsBasePath,
        assetPrefix: docsBasePath,
      }
    : {}),
}

export default withSearch(
  withMarkdoc({ schemaPath: './src/markdoc' })(nextConfig),
)
