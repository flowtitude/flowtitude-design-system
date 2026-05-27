'use client'

import { useMemo, useState } from 'react'

import { fdsExamples } from '@/lib/fds-examples'

function buildSrcDoc(html) {
  const basePath = process.env.NEXT_PUBLIC_DOCS_BASE_PATH || ''

  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="${basePath}/fds-preview.css" />
    <style>
      html { color-scheme: light; }
      body {
        margin: 0;
        min-height: 0;
        background: #ffffff;
        color: var(--ft-color-text, #111111);
      }
      .fds-preview-frame {
        min-height: 100vh;
        padding: 1.5rem;
        background:
          linear-gradient(#ffffff, #ffffff) padding-box,
          linear-gradient(135deg, oklch(96% 0.02 80), oklch(97% 0.01 250)) border-box;
      }
      .fds-preview-frame > * {
        max-width: 100%;
      }
      .fds-preview-frame section {
        border-radius: var(--radius-section, .375rem);
      }
    </style>
  </head>
  <body>
    <div class="fds-preview-frame">${html}</div>
  </body>
</html>`
}

export function FdsExample({ name, height }) {
  const [copied, setCopied] = useState(false)
  const example = fdsExamples[name]

  const srcDoc = useMemo(
    () => (example ? buildSrcDoc(example.html) : ''),
    [example],
  )

  if (!example) {
    return (
      <div className="not-prose my-8 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        No existe el ejemplo FDS <code>{name}</code>.
      </div>
    )
  }

  async function copyCode() {
    await navigator.clipboard.writeText(example.html)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  return (
    <div className="not-prose my-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
        <div>
          <p className="font-display text-sm font-semibold text-slate-900 dark:text-white">
            {example.title}
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Preview renderizado con el CSS compilado de FDS
          </p>
        </div>
        <button
          type="button"
          onClick={copyCode}
          className="rounded-md bg-amber-400 px-3 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300/50"
        >
          {copied ? 'Copiado' : 'Copiar HTML'}
        </button>
      </div>

      <iframe
        title={example.title}
        srcDoc={srcDoc}
        className="block w-full border-0 bg-white"
        style={{ height: Number(height ?? example.height ?? 360) }}
      />

      <pre className="overflow-x-auto border-t border-slate-200 bg-slate-950 p-4 text-xs leading-6 text-slate-100 dark:border-slate-800">
        <code>{example.html}</code>
      </pre>
    </div>
  )
}
