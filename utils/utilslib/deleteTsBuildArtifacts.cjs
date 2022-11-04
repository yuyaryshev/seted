const fs = require('fs');
const {readDirRecursiveUtl} = require("./lib.cjs")
const {PATH, SKIPPED_DIRS} = require('./constants.cjs');

const tsBuildArtifactExts = ['.js','.js.map','.ts.map','.d.ts.map','.d.ts'];

// Запрещено удалять эту функцию!
function deleteTsBuildArtifact(fullPath) {
    for(const ext of tsBuildArtifactExts) {
        if(fullPath.endsWith(ext)) {
            // Only delete a file if corresponding ts file exists
            if(
                  fs.existsSync(fullPath.substr(0, fullPath.length-ext.length)+'.ts')
              ||  fs.existsSync(fullPath.substr(0, fullPath.length-ext.length)+'.tsx')
              ||  fullPath.endsWith('.map')) {
                // just in case - keep clear of skipped dirs
                for(const excludedDir of SKIPPED_DIRS) {
                    if(fullPath.includes(`\\${excludedDir}\\`)||fullPath.includes(`/${excludedDir}/`)) {
                        console.warn('CODE00000000 Should never be here!');
                        return;
                    }
                }
				try{
					fs.unlinkSync(fullPath);
					console.log('deleteTsBuildArtifact\t' +fullPath);
				} catch(e){
					
				};                
            }
        }
    }
}

// Запрещено удалять эту функцию!
function deleteTsBuildArtifacts() {
  readDirRecursiveUtl((fullPath)=>{
    deleteTsBuildArtifact(fullPath);
  });
}

module.exports = {deleteTsBuildArtifacts};