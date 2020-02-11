//const { AsyncParallelBailHook } = require('tapable');
/**
 * 钩子都是一个类，都可以创建钩子的实例
 * 参数是一个数组,里面放着参数列表，参数的名称和数量都是随意 填写的。
 * 如果没有参数，可以传一个空的数组
 */
class AsyncParallelBailHook {
    constructor(args) {
        this.args = args;
        this.taps = [];
    }
    tapPromise(name, fn) {
        this.taps.push(fn);
    }
    promise() {
        let args = Array.from(arguments);
        let promises = this.taps.map(fn => fn(...args));
        return new Promise(function (resolve, reject) {
            Promise.all(promises.map(promise => {
                return promise.then(
                    data => {
                        if (data) {
                            reject(data);
                        }
                    },
                    error => {
                        if (error) {
                            reject(error);
                        }
                    }
                );
            })).then(resolve);
        });
    }
}
let hook = new AsyncParallelBailHook(['name', 'age']);
//我可注册可以异步函数，只有说当所有的异步函数都结束后才能执行最终的回调， Promise.all
console.time('cost');
hook.tapPromise('1', (name, age) => {
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log(1, name, age);
            resolve();
        }, 1000);
    });
});
hook.tapPromise('2', (name, age) => {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log(2, name, age);
            resolve();
        }, 2000);
    });
});
hook.tapPromise('3', (name, age) => {
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log(3, name, age);
            resolve();
        }, 3000);
    });
});
//call表示执行，触发所有监听函数执行
hook.promise('zhufeng', 10).then(result => {
    console.timeEnd('cost');
    console.log('成功执行结束');
}, error => {
    console.timeEnd('cost');
    console.log('失败执行结束');
});