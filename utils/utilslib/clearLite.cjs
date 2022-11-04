// @ts-check

const fs = require("fs");
const { join } = require("path");
const { PATH, PARASITE_FILES_LITE, PARASITE_FILES_LITE_CJS, PARASITE_FILES_LITE_ESM, PARASITE_FILES_LITE_TS } = require("./constants.cjs");
const { deleteEntry, enumTopLevelPaths, rootAndPackagePaths } = require("./lib.cjs");
const { fixAllPackageJsons } = require("./fixPackageJson.cjs");
const { writeWorkspaces } = require("./writeWorkspaces.cjs");
const { deleteTsBuildArtifacts } = require("./deleteTsBuildArtifacts.cjs");

let baseCleanDone = false;

function baseClean() {
    if (!baseCleanDone) {
        baseCleanDone = true;
        fixAllPackageJsons();
        writeWorkspaces();
        deleteTsBuildArtifacts();
    }
}

function clearLiteTs() {
    baseClean();

    // !!! Нельзя тут просто сделать readDirectoryRecursively
    // Потому что удалит папки внутри node_modules
    enumTopLevelPaths((fullPath, fileName) => {
        if (PARASITE_FILES_LITE_TS.includes(fileName)) {
            deleteEntry(fullPath);
        }
    });
    for (const dirPath of rootAndPackagePaths()) {
        deleteEntry(join(dirPath, "lib", "ts"));
        deleteEntry(join(dirPath, "lib", "types"));
        deleteEntry(join(dirPath, "lib", "tsconfig-declarations.tsbuildinfo"));
    }
}

function clearLiteCjs() {
    baseClean();

    // !!! Нельзя тут просто сделать readDirectoryRecursively
    // Потому что удалит папки внутри node_modules
    enumTopLevelPaths((fullPath, fileName) => {
        if (PARASITE_FILES_LITE_CJS.includes(fileName)) {
            deleteEntry(fullPath);
        }
    });

    for (const dirPath of rootAndPackagePaths()) {
        deleteEntry(join(dirPath, "lib", "cjs"));
    }
}

function clearLiteCjs() {
    baseClean();

    // !!! Нельзя тут просто сделать readDirectoryRecursively
    // Потому что удалит папки внутри node_modules
    enumTopLevelPaths((fullPath, fileName) => {
        if (PARASITE_FILES_LITE_ESM.includes(fileName)) {
            deleteEntry(fullPath);
        }
    });

    for (const dirPath of rootAndPackagePaths()) {
        deleteEntry(join(dirPath, "lib", "esm"));
    }
}

function clearLite() {
    baseClean();
    clearLiteTs();
    clearLiteCjs();
    for (const dirPath of rootAndPackagePaths()) {
        deleteEntry(join(dirPath, "lib"));
    }
}

module.exports = { clearLite, clearLiteCjs, clearLiteTs };
