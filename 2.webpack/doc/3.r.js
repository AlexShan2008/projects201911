function r(obj) {
    Object.defineProperty(obj, Symbol.toStringTag, {
        enumerable: true,
        value: 'Module'
    });
    obj[Symbol.toStringTag] = 'Module';
    Object.defineProperty(obj, '__esModule', { enumerable: true, value: true });
    obj['__esModule'] = true;
}
let obj = {};
r(obj);
console.log(obj);