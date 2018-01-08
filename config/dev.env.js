'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ROOT_PATH: '"http://localhost:9090"',
  API_PATH: '"http://localhost:4040/api"',
  FACEBOOK_CLIENT_ID: '"143658296421240"', // CHANGE THIS
  GITHUB_CLIENT_ID: '"5003a7b4e5a299216107"', // CHANGE THIS
  LINKEDIN_CLIENT_ID: '"779524szfvi142"' // CHANGE THIS
})
