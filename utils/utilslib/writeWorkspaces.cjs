// @ts-check

const fs = require("node:fs");
const { join } = require("node:path");
const { PATH } = require("./constants.cjs");
const { createWorkspaceList } = require("./lib.cjs");

function writeWorkspaces() {
    const packageJsonPath = join(PATH.root, "package.json");
    const packageJsonRaw = fs.readFileSync(packageJsonPath, "utf-8");
    const packageJson = JSON.parse(packageJsonRaw);

    const packages = createWorkspaceList(join(PATH.root, "packages"));
    const apps = createWorkspaceList(join(PATH.root, "apps"));

    packageJson.workspaces = [...packages, ...apps];

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, undefined, 4) + "\n", "utf-8");
}

module.exports = { writeWorkspaces };
