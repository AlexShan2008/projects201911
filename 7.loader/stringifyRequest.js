const path = require('path');
function stringifyRequest(url) {
    //绝地 相对的就是模块名称
    let absPath = require.resolve(url);
    return './' + path.relative(path.resolve(__dirname), absPath);
}
// C:\vipdata\lesson\201911projects\7.loader\src\index.js
// C:\vipdata\lesson\201911projects\7.loader
// ./src\index.js
let p = stringifyRequest('./src/index.js');
console.log(p);
let p2 = stringifyRequest('./src/index.less');
console.log(p2);
let p3 = stringifyRequest('url-loader');
console.log(p3);//  ./node_modules/url-loader/index.js


