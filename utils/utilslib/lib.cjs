// @ts-check
/** @typedef {import('node:fs').Dirent} Dirent */

const fs = require("node:fs");
const { join, basename } = require("node:path");
const { PATH, SKIPPED_DIRS } = require("./constants.cjs");

/*
 * @param {string} path
 * @param {(path: string, dirent: Dirent) => boolean} cb
 */
const _readDirectoryRecursively = (path, cb) => {
    const files = fs.readdirSync(path, {
        withFileTypes: true,
    });

    for (const dirent of files) {
        const ok = cb(path, dirent);

        if (ok !== false && dirent.isDirectory()) {
            _readDirectoryRecursively(join(path, dirent.name), cb);
        }
    }
};

/**
 *
 * @param {string} root
 * @param {string[]} ignore
 * @param {(path: string, parent: string, dirent: Dirent) => boolean} cb
 */
const readDirectoryRecursively = (root, ignore, cb) => {
    _readDirectoryRecursively(root, (parent, dirent) => {
        if (ignore.includes(dirent.name)) {
            return false;
        }

        const path = join(parent, dirent.name);
        return cb(path, parent, dirent);
    });
};

/**
 *
 * @param {string} path
 * @returns {{ path: string, name: string }[]}
 */
const getAllSubdirectory = (path) => {
    const subdirectories = [];

    const files = fs.readdirSync(path, {
        withFileTypes: true,
    });

    for (const dirent of files) {
        if (dirent.isDirectory()) {
            subdirectories.push({
                path: join(path, dirent.name),
                name: dirent.name,
            });
        }
    }

    return subdirectories;
};

/**
 *
 * @param {string} path
 * @returns {{ path: string, name: string }[]}
 */
const getAllPackages = (path) => {
    return getAllSubdirectory(join(PATH.root, "packages"));
};

/**
 *
 * @param {string} path
 * @returns {string[]}
 */
const createWorkspaceList = (path) => {
    const workspaceName = basename(path);
    const subdirectories = getAllSubdirectory(path);

    return subdirectories.map(({ name }) => join(workspaceName, name).split("\\").join("/"));
};

/**
 *
 * @param {string} path
 */
const deleteEntry = (path) => {
    try {
        if (fs.existsSync(path)) {
            fs.rmSync(path, {
                recursive: true,
                force: true,
            });

            console.log("DELETED:" + path);
        }
    } catch (e) {
        console.log("DELETE FAIL: " + path + "\n" + e.message);
    }
};

function rootAndPackagePaths() {
    return [PATH.root, ...getAllPackages().map((p) => p.path)];
}

function enumTopLevelPaths(callback) {
    // !!! Нельзя тут просто сделать readDirectoryRecursively
    // Потому что удалит папки внутри node_modules
    for (const packageDir of rootAndPackagePaths()) {
        for (const dirent of fs.readdirSync(packageDir, { withFileTypes: true })) {
            const fullPath = join(packageDir, dirent.name);
            callback(fullPath, dirent.name);
        }
    }
}

// Нельзя удалять эту функцию!
function readDirRecursiveUtl(callback) {
    return readDirectoryRecursively(PATH.root, SKIPPED_DIRS, callback);
}

module.exports = {
    deleteEntry,
    getAllSubdirectory,
    getAllPackages,
    createWorkspaceList,
    readDirectoryRecursively,
    enumTopLevelPaths,
    readDirRecursiveUtl,
    rootAndPackagePaths,
};
