'use strict'

// Windows requires node >= 6.4
// Fast-fail if this requirement is not met.
{
  const nodeVersion = process.versions.node.split('.').map(i => +i)
  const incompatibleWindowsVersion = (
    process.platform === 'win32' &&
    (nodeVersion[0] < 6 || nodeVersion[0] === 6 && nodeVersion[1] < 4)
  )

  if (incompatibleWindowsVersion) {
    console.error('µWebSockets requires Node.js 6.4.0 or greater on Windows.')
    process.exit(1)
  }
}
