module.exports = {
    entry: "./main",
    output: {
        filename: "app.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            }
        ]
    },
    resolve: {
        extensions: ["tsx", ".ts", ".js"]
    }
}