'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ROOT_PATH: '"http://localhost:9090"',
  API_PATH: '"http://localhost:4040"',
  FACEBOOK_CLIENT_ID: '""', // CHANGE THIS
  GITHUB_CLIENT_ID: '"ebee24375a8e82388626"', // CHANGE THIS
  LINKEDIN_CLIENT_ID: '""' // CHANGE THIS
})
