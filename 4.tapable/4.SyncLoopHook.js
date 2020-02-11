//const { SyncLoopHook } = require('tapable');

class SyncLoopHook {
    constructor(args) {
        this.args = args;
        this.taps = [];
    }
    tap(name, fn) {
        this.taps.push(fn);
    }
    call() {
        let args = Array.prototype.slice.call(arguments, 0, this.args.length);
        let loop = true;
        while (loop) {
            for (let i = 0; i < this.taps.length; i++) {
                let fn = this.taps[i];
                let result = fn(...args);
                //如果返回值不是undefined就要继续循环
                loop = typeof result != 'undefined';
                if (loop) break;
            }
        }
    }
}
let hook = new SyncLoopHook(['name', 'age']);
let counter1 = 0;
let counter2 = 0;
let counter3 = 0;
let count = 0;
//函数如果返回undefined则不继续循环
hook.tap('1', (name, age) => {
    count++;
    console.log(1, name, age);
    if (++counter1 == 1) {
        counter1 = 0;
        return;
    }
    return true;
});
hook.tap('2', (name, age) => {
    count++;
    console.log(2, name, age);
    if (++counter2 == 2) {
        counter2 = 0;
        return;
    }
    return true;
});
hook.tap('3', (name, age) => {
    count++;
    console.log(3, name, age);
    if (++counter3 == 3) {
        counter3 = 0;
        return;
    }
    return true;
});
//call表示执行，触发所有监听函数执行
hook.call('zhufeng', 10);
console.log(count);