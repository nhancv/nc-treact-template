"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Use:
 import * as ENV from "./env";
 const config = ENV.get();

 */
var config = {
    production: {
        env: "Production"
    },
    default: {
        env: "Default"
    }
};
var NODE_ENV = process.env.NODE_ENV;
function get(env) {
    var conf = config.default;
    if (!env && NODE_ENV)
        env = NODE_ENV;
    if (env)
        conf = config[env] || conf;
    return conf;
}
exports.get = get;
//# sourceMappingURL=env.js.map