/**
 * Use:
 import * as ENV from "./env";
 const config = ENV.get();

 */
const config = {
  production: {
    env: "Production"
  },
  default: {
    env: "Default"
  }
};

const NODE_ENV = process.env.NODE_ENV;

export function get(env?: string) {
  let conf = config.default;
  if (!env && NODE_ENV) env = NODE_ENV;
  if (env) conf = config[env] || conf;
  return conf;
}
