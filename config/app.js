'use strict';

const config = {
  env: process.env.APP_ENV || 'development',
  application: {
    name: process.env.APP_NANE,
    host: process.env.APP_URL,
    port: process.env.APP_PORT || parseInt(4000, 10),
  }
}

module.exports = config;