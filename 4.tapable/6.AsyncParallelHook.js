//const { AsyncParallelHook } = require('tapable');
/**
 * 钩子都是一个类，都可以创建钩子的实例
 * 参数是一个数组,里面放着参数列表，参数的名称和数量都是随意 填写的。
 * 如果没有参数，可以传一个空的数组
 */
class AsyncParallelHook {
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
        let i = 0;
        const done = () => {
            if (++i === this.taps.length)
                finalCallback();
        }
        this.taps.forEach(fn => fn(...args, done));
    }
}
let hook = new AsyncParallelHook(['name', 'age']);
//我可注册可以异步函数，只有说当所有的异步函数都结束后才能执行最终的回调， Promise.all
console.time('cost');
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
hook.callAsync('zhufeng', 10, err => {
    console.timeEnd('cost');
    console.log('执行结束');
});