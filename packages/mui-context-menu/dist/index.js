
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./mui-context-menu.cjs.production.min.js')
} else {
  module.exports = require('./mui-context-menu.cjs.development.js')
}
