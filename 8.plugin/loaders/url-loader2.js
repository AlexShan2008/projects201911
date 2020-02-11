/**
 * 把文件从源代码的目录输出到了输出目录 里
 * @param {} inputSource 
 */
let { interpolateName, getOptions } = require('loader-utils');
function loader(content) {
    let { limit = 8 * 1024 } = getOptions(this);//{ limit: 100 * 1024}
    limit = parseInt(limit);
    if (!limit || content.length < limit) {
        let base64 = `data:image/png;base64,${content.toString('base64')}`;
        return `
          exports.__esModule = true;
          exports[Symbol.toStringTag]='Module';
          exports.default = ${JSON.stringify(base64)}
          `;
    } else {
        let fileLoader2 = require('./file-loader2');
        return fileLoader2.call(this, content);
    }
}
loader.raw = true;
module.exports = loader;
