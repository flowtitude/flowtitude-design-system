export function normalizePath(path) {
  if (!path) {
    return '/'
  }

  let [pathname] = path.split(/[?#]/)

  if (pathname.length > 1 && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1)
  }

  return pathname || '/'
}

export function pathsMatch(left, right) {
  return normalizePath(left) === normalizePath(right)
}
