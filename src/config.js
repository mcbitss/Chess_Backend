/* eslint-disable no-unused-vars */
import path from 'path';
import merge from 'lodash/merge';

/* istanbul ignore next */
const requireProcessEnv = name => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
};

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv-safe');
  dotenv.load({
    path: path.join(__dirname, '../.env'),
    sample: path.join(__dirname, '../.env.example')
  });
}

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    apiRoot: process.env.API_ROOT || '',
    masterKey: requireProcessEnv('MASTER_KEY'),
    jwtSecret: requireProcessEnv('JWT_SECRET'),
    SMTP_USER: requireProcessEnv('SMTP_USER'),
    SMTP_PW: requireProcessEnv('SMTP_PW'),
    BASE_URL: requireProcessEnv('BASE_URL_PROD'),
    mongo: {
      options: {
        // db: {
        //   safe: true
        // }
      }
    }
  },
  development: {
    mongo: {
      // uri: 'mongodb://chessapp:Abh786raM@mcbitsstech.com/chess',
      uri: requireProcessEnv('MONGO_CONNECTION_STRING'),
      options: {
        debug: true
      }
    }
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost/business-cards'
    }
  }
};

module.exports = merge(config.all, config[config.all.env]);
export default module.exports;
