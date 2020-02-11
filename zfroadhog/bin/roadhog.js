#!/usr/bin/env node
//child_process spawn
const spawn = require('cross-spawn');
let chalk = require('chalk');
const path = require('path');
const script = process.argv[2];//build server test
console.log('script', script);
console.log(path.resolve(`./lib/build.js`));

switch (script) {
    case '-v':
    case '--version':
        console.log(require('../package.json').version);
        break;
    case 'build':
        const result = spawn.sync(
            'node',
            [path.resolve(`./lib/${script}.js`)],
            { stdio: 'inherit' }//继承父进程的标准输入和输出
        );
        process.exit(result.status);
    default:
        break;
}
