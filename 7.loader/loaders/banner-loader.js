let loaderUtils = require('loader-utils');
let validateOptions = require('schema-utils');
const fs = require('fs');
function loader(inputSource) {
    let callback = this.async();
    //this loaderContext loader 上下文对象
    let options = loaderUtils.getOptions(this);
    this.cacheable && this.cacheable();//实现缓存
    //schema模式
    let schema = {
        type: 'object',
        properties: {
            filename: {
                type: 'string'
            },
            text: {
                type: 'string'
            }
        }
    }
    //验证options和schema是否匹配，如果匹配则继续执行，如果不匹配则报错
    validateOptions(schema, options);
    let { filename, text } = options;
    if (text) {
        callback(null, text + inputSource);
    } else {
        fs.readFile(filename, 'utf8', (err, text) => {
            callback(err, text + inputSource);
        });
    }

}
module.exports = loader;