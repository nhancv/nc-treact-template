// const config = require('./env.js').get(process.env.NODE_ENV);
const config = {
  production: {
    env: "Production"
  },
  default: {
    env: "Default"
  }
};

exports.get = function get(env) {
  return config[env] || config.default;
};
