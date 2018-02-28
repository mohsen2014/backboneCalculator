module.exports = {
  context: __dirname + '/source/js',
  entry: './app.js',
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  watch: true
}
