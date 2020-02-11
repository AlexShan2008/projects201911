let fs = require('fs');
const path = require('path');
function loader3(inputSource) {
    let cb = this.async();
    // cb === this.callback
    fs.readFile(path.resolve(__dirname, 'content.txt'), 'utf8', (err, content) => {
        //return inputSource + content;
        cb(err, inputSource + content);
        //this.callback(err, inputSource + content);
    });
    return undefined;
}
module.exports = loader3;