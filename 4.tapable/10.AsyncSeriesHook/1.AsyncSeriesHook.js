//const { AsyncSeriesHook } = require('tapable');
/**
 * 钩子都是一个类，都可以创建钩子的实例
 * 参数是一个数组,里面放着参数列表，参数的名称和数量都是随意 填写的。
 * 如果没有参数，可以传一个空的数组
 */
class AsyncSeriesHook {
    constructor(args) {
        this.args = args;
        this.taps = [];
    }
    tapAsync(name, fn) {
        this.taps.push(fn);
    }
    callAsync() {
        let args = Array.from(arguments);
        let finalCallback = args.pop();
        let index = 0, length = this.taps.length;
        const next = () => {
            let fn = this.taps[index++];
            if (fn) {
                fn(...args, next);
            } else {
                finalCallback();
            }
        }
        next();
    }
}
let hook = new AsyncSeriesHook(['name', 'age']);
console.time('cost');
//tap用来注册监听函数，就类似于events库中的on
hook.tapAsync('1', (name, age, callback) => {
    setTimeout(function () {
        console.log(1, name, age);
        callback();
    }, 1000);
});
hook.tapAsync('2', (name, age, callback) => {
    setTimeout(function () {
        console.log(2, name, age);
        callback();
    }, 2000);
});
hook.tapAsync('3', (name, age, callback) => {
    setTimeout(function () {
        console.log(3, name, age);
        callback();
    }, 3000);
});
//call表示执行，触发所有监听函数执行
hook.callAsync('zhufeng', 10, () => {
    console.timeEnd('cost');
    console.log('成功执行结束');
});