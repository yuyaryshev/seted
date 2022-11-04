// @ts-check
const { PARASITE_FILES } = require("./constants.cjs");
const { deleteEntry, enumTopLevelPaths } = require("./lib.cjs");
const {clearLite} = require("./clearLite.cjs");

function clear() {
  clearLite();

  // !!! Нельзя тут просто сделать readDirectoryRecursively
  // Потому что удалит папки внутри node_modules
  enumTopLevelPaths((fullPath, fileName)=>{
      if (PARASITE_FILES.includes(fileName)) {
          deleteEntry(fullPath);
      }
  });
}

module.exports = {clear};
