var fs = require('fs');

function readFiles(dirname, onFileContent, onError) {
    console.log("H")
    const filenames = fs.readdirSync(dirname)

    console.log("filenames, ", filenames)

    filenames.forEach(function (filename) {
        const content = fs.readFileSync(dirname + filename, { encoding: 'utf8', flag: 'r' })

        onFileContent(filename, content);
    });
    console.log("ffd")
}
var data = {};
readFiles('./', function (filename, content) {
    data[filename] = content;
}, function (err) {
    throw err;
});

console.log("data", data)




