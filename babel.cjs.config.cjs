const config = require("./babel.esm.config.cjs");
module.exports = (api) => {
    const r = config(api);
    r.plugins.push("@babel/transform-modules-commonjs");
    return r;
};
