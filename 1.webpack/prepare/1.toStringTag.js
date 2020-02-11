let obj = {};
//1参数是要定义属性的对象 2参数是属性名 3参数是属性描述器
Object.defineProperty(obj, Symbol.toStringTag, {
    value: 'Module'
});
console.log(Object.prototype.toString.call(obj));
console.log(Object.prototype.toString.call([]));
console.log(Object.prototype.toString.call(null));
console.log(Object.prototype.toString.call(undefined));
console.log(Object.prototype.toString.call('string'));
console.log(Object.prototype.toString.call(true));