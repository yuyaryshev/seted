// @ts-check

const { PATH } = require("./constants.cjs");
const { join } = require("node:path");
const fs = require("fs");
const { mutatePackageJson, getAllPackages } = require("./lib.cjs");

const commonPackageJson = JSON.parse(fs.readFileSync(join(PATH.root, "common-package.json"), "utf-8"));

function fixDepsClause(depsClause) {
    if (depsClause) {
        for (const k in depsClause) {
            if (depsClause[k].startsWith("file:")) {
                depsClause[k] = "*";
            }
        }
    }
}

function fixPackageJson(json) {
    for (const k in commonPackageJson) {
        if (typeof commonPackageJson[k] === "object") {
            for (const k2 in commonPackageJson[k]) {
                if (!json[k]) {
                    json[k] = {};
                }
                json[k][k2] = commonPackageJson[k][k2];
            }
        } else {
            json[k] = commonPackageJson[k];
        }
    }

    fixDepsClause(json.dependencies);
    fixDepsClause(json.devDependencies);
    fixDepsClause(json.peerDependencies);
    return json;
}

function fixAllPackageJsons() {
    for (const { name, path } of getAllPackages()) {
        const fullPath = join(path, "package.json");
        try {
            const packageJsonRaw = fs.readFileSync(fullPath, "utf-8");
            const packageJson = JSON.parse(packageJsonRaw);

            const newPackageJson = fixPackageJson(packageJson);
            const newContentStr = JSON.stringify(newPackageJson, undefined, 4) + "\n";
            if (newContentStr !== packageJsonRaw) {
                fs.writeFileSync(fullPath, newContentStr, "utf-8");
            }
        } catch (e) {
            debugger;
            console.trace(e);
        }
    }
}

module.exports = {
    fixPackageJson,
    fixAllPackageJsons,
};
