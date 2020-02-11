//module可能是一个commonjs模块，也可能是一个es6模块
//es6模块 会有一个 __esModule=true,默认导出在模块的default属性上
function n(mod) {
    let getter = mod.__esModule ? function () {
        return mod.default;
    } : function () {
        return mod;
    }
    return getter;
}
let mod = {
    __esModule: true,
    default: { name: 'zhufeng' }
}
let getter = n(mod);
console.log(getter());
let mod2 = {
    name: 'jiagou'
}
let getter2 = n(mod2);
console.log(getter2());