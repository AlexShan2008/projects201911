//@ts-check
const path = require('path');
const fs = require('fs');
const readFile = fs.readFileSync;
//入口文件
let entry = './src/title.js';
let options = {
    resource: path.join(__dirname, entry),//要加载的资源,它是个绝对路径
    loaders: [
        path.join(__dirname, 'loaders/a-loader.js'),//C:\vipdata\lesson\201911projects\7.loader\loaders\a-loader.js
        path.join(__dirname, 'loaders/b-loader.js'),//C:\vipdata\lesson\201911projects\7.loader\loaders\b-loader.js
        path.join(__dirname, 'loaders/c-loader.js')//C:\vipdata\lesson\201911projects\7.loader\loaders\c-loader.js
    ]
}
function createLoaderObject(loaderPath) {
    let loaderObject = { data: {} };
    loaderObject.path = loaderPath;// 存放此loader的绝地路径
    loaderObject.normal = require(loaderPath);
    loaderObject.pitch = loaderObject.normal.pitch;
    return loaderObject;
}

function runLoaders(options, finalCallback) {
    let loaderContext = {};//这个对象将会成为webpack loader中的this
    let resource = options.resource;//获取要加载的资源 C:\vipdata\lesson\201911projects\7.loader\src\title.js
    let loaders = options.loaders;
    loaders = loaders.map(createLoaderObject);
    loaderContext.loaderIndex = 0;//当前正在执行的loader的索引
    loaderContext.readResource = readFile;//指定一个读取文件的方法 readFile
    loaderContext.resource = resource;//resource放置着要读取的资源
    loaderContext.loaders = loaders;//缓存了loaderObject的数组

    Object.defineProperty(loaderContext, 'request', {
        get() {
            return loaderContext.loaders.map(loaderObject => loaderObject.path)
                .concat(loaderContext.resource).join('!')
        }
    });
    Object.defineProperty(loaderContext, 'previousRequest', {
        get() {
            return loaderContext.loaders.slice(0, loaderContext.loaderIndex).map(loaderObject => loaderObject.path)
                .join('!')
        }
    });
    Object.defineProperty(loaderContext, 'remainingRequest', {
        get() {
            return loaderContext.loaders.slice(loaderContext.loaderIndex + 1).map(loaderObject => loaderObject.path)
                .concat(loaderContext.resource).join('!')
        }
    });
    Object.defineProperty(loaderContext, 'data', {
        get() {
            return loaderContext.loaders[loaderContext.loaderIndex].data;
        }
    });
    iteratePitchingLoaders(loaderContext, finalCallback);
    //在这里要读取要加载的模块的内容
    function processResource(loaderContext, finalCallback) {
        let buffer = loaderContext.readResource(loaderContext.resource);// 读取文件的内容 
        iterateNormalLoaders(loaderContext, buffer, finalCallback);//进行正掌中的loader执行
    }
    function convertArgs(args, raw) {
        if (!raw && Buffer.isBuffer(args))
            args = args.toString("utf8");
        else if (raw && typeof args === "string")
            args = new Buffer(args, "utf8"); // eslint-disable-line
    }
    //执行正常的 
    function iterateNormalLoaders(loaderContext, args, finalCallback) {
        if (loaderContext.loaderIndex < 0) {
            return finalCallback(null, args);
        }
        let currentLoaderObject = loaderContext.loaders[loaderContext.loaderIndex];
        let normalFn = currentLoaderObject.normal;//拿到当前的normal函数
        let isSync = true;//默认当前的执行模式是同步模式
        const innerCallback = loaderContext.callback = (err, args) => {
            loaderContext.loaderIndex--;
            iterateNormalLoaders(loaderContext, args, finalCallback)
        }
        loaderContext.async = () => {//如果调了它，会把同步变成异步
            isSync = false;
            return innerCallback;
        }
        args = convertArgs(args, normalFn.raw)
        args = normalFn.call(loaderContext, args);
        if (isSync) {//如果是同步的话。
            loaderContext.loaderIndex--;
            iterateNormalLoaders(loaderContext, args, finalCallback);
        } else {
            //如果是异步，就不会再递归迭代了
        }
    }
    function iteratePitchingLoaders(loaderContext, finalCallback) {
        if (loaderContext.loaderIndex >= loaderContext.loaders.length) {
            loaderContext.loaderIndex--;//因为已经越界了,所以让索引减1 
            return processResource(loaderContext, finalCallback);
        }
        let currentLoaderObject = loaderContext.loaders[loaderContext.loaderIndex];//0 获取当前的loaderObject
        let pitchFn = currentLoaderObject.pitch;
        if (!pitchFn) {//如果没有pitch函数，则直接 跳过当前loader,执行下一个loader
            loaderContext.loaderIndex++;
            return iteratePitchingLoaders(loaderContext, finalCallback);
        }
        let args = pitchFn.call(loaderContext, loaderContext.remainingRequest, loaderContext.previousRequest, loaderContext.data);
        if (args) {//如果有返回值，则跳过当前和后面的normal函数以及读取模块文件的逻辑 ，直接把结果返回给前一个loader的normal参数
            loaderContext.loaderIndex--;
            return iterateNormalLoaders(loaderContext, args, finalCallback);
        } else {
            loaderContext.loaderIndex++;
            return iteratePitchingLoaders(loaderContext, finalCallback);
        }
    }

}
console.time('cost');
runLoaders(options, (err, result) => {
    //   title//c-loader//b-loader//a-loader
    console.log('经过loader编译后的结果', result);
    console.timeEnd('cost');
});