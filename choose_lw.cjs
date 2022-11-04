const existingPackages = [
    "object_to_messages_ifc",
    "odb",
    "persistent_containers",
    "sqlite_keyvalue_storage",
    "ydb",
    "ydb_better_sqlite",
    "ydb_better_sqlite_stub",
    "ydb_migrator",
    "ydb_postgres",
    "ydb_sqlite",
    "ydb_tests",
    "ydomain_client",
    "ydomain_common",
    "ydomain_meta",
    "ydomain_server",
    "ydomain_tests",
    "yhttp_api",
    "yhttp_api_express",
    "yintervals",
    "yobservable",
    "yquery_core",
    "yserializer",
    "ytransport_auth_common",
    "ytransport_callback",
    "ytransport_client",
    "ytransport_client_with_auth",
    "ytransport_common",
    "ytransport_observable",
    "ytransport_server",
    "ytransport_server_with_auth",
    "ytransport_tests"
];

//---- ^^^ generated above ^^^ ----
const lPackages = [
    "object_to_messages_ifc",
//    "odb",
//    "persistent_containers",
];

const {readdirSync,readFileSync,writeFileSync} = require('fs');
const {join,resolve} = require('path');
const packageDirs = readdirSync('./packages');

const choose_lwStr = readFileSync('choose_lw.cjs','utf-8');
const splitted = choose_lwStr.split('//---- ^^^ generated above'+' ^^^ ----')


const rmCmds = lPackages.map(packageDirName=> `rm -rf packages/${packageDirName}`);
const watchFilters = lPackages.map(packageDirName=> `--filter ${packageDirName}`);
const watchFiltersStr = watchFilters.join(" ");

const r = {
        "lt": `${rmCmds.map(s=>s+"/types").join(" && ")} && pnpm run build:types && pnpm run ${watchFiltersStr} --parallel --stream --no-bail build:types -w`,
        "ljs": `${rmCmds.map(s=>s+"/types").join(" && ")} && pnpm run watch:cjs && pnpm run ${watchFiltersStr} --parallel --stream --no-bail build:cjs -w`,
}
// console.log(JSON.stringify(r,undefined, 4));


if(splitted[1] && splitted[1].trim().length > 50) {
    const newContent = `const existingPackages = ${JSON.stringify(packageDirs,undefined,4)};\n`+"\n//---- ^^^ generated above"+' ^^^ ----'+splitted[1];
    writeFileSync('choose_lw.cjs', newContent,'utf-8')
}

const packageJson = JSON.parse(readFileSync('package.json','utf-8'));
Object.assign(packageJson.scripts, r);

// console.log(JSON.stringify(packageJson,undefined, 4));
writeFileSync('package.json', JSON.stringify(packageJson,undefined, 4),'utf-8');