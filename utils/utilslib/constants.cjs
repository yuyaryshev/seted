// @ts-check
const { resolve } = require("node:path");

const PATH = {
    root: resolve(__dirname, "..", ".."),
};

const PARASITE_FILES_LITE_CJS = [];
const PARASITE_FILES_LITE_ESM = [];

const PARASITE_FILES_LITE_TS = ["dist", "tsconfig.tsbuildinfo"];

const PARASITE_FILES_LITE = [...PARASITE_FILES_LITE_TS, ...PARASITE_FILES_LITE_CJS, ...PARASITE_FILES_LITE_ESM];

const PARASITE_FILES = [...PARASITE_FILES_LITE, "node_modules", "yarn.lock", "pnpm-lock.yaml", "package-lock.json", "npm-shrinkwrap.json"];

const SKIPPED_DIRS = ["..", ".", "node_modules", ".git", ".idea", "lib"];

module.exports = {
    PATH,
    PARASITE_FILES_LITE_CJS,
    PARASITE_FILES_LITE_ESM,
    PARASITE_FILES_LITE_TS,
    PARASITE_FILES_LITE,
    PARASITE_FILES,
    SKIPPED_DIRS,
};
