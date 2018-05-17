'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ROOT_PATH: '"http://localhost:9090"',
  API_PATH: '"https://localhost:4040"',
  FACEBOOK_CLIENT_ID: '""', // CHANGE THIS
  GITHUB_CLIENT_ID: '"4a310d203eed23fd8923"', // CHANGE THIS
  LINKEDIN_CLIENT_ID: '""' // CHANGE THIS
})
