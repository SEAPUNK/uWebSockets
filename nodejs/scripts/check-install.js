'use strict'

// Attempt to load native binary.
try {
  require('../native.js')
  console.log('Using prebuilt addon.')
  // Everything is fine.
  process.exit(0)
} catch (err) {
  console.log('Prebuilt addon unavailable. Attempting to build addon...')
  // Exit with an error code.
  process.exit(1)
}

