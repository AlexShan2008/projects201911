//const { SyncHook } = require('tapable');
/**
 * 钩子都是一个类，都可以创建钩子的实例
 * 参数是一个数组,里面放着参数列表，参数的名称和数量都是随意 填写的。
 * 如果没有参数，可以传一个空的数组
 */
class SyncHook {
    constructor(args) {
        this.args = args;
        this.taps = [];
    }
    tap(name, fn) {
        this.taps.push(fn);
    }
    call() {
        let args = Array.prototype.slice.call(arguments, 0, this.args.length);
        this.taps.forEach(fn => fn(...args));
    }
}
let hook = new SyncHook(['name']);
//tap用来注册监听函数，就类似于events库中的on
hook.tap('1', (name, age) => {
    console.log(1, name, age);
});
hook.tap('2', (name, age) => {
    console.log(2, name, age);
});
//call表示执行，触发所有监听函数执行
hook.call('zhufeng', 10);