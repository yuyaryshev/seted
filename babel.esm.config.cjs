module.exports = (api) => {
    api.cache(false);

    return {
        presets: ["@babel/preset-react", "@babel/preset-typescript"],
        plugins: [],
    };
};

/*
module.exports = (api) => {
    api.cache(false);

    return {
        presets: [
		"@babel/preset-env",
		"@babel/preset-typescript"
		],
    };
};

*/
