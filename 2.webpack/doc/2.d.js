//d defineProperty 通过getter的方式增加属性
function d(obj, name, get) {
    Object.defineProperty(obj, name, {
        enumerable: true,
        get
    });
}
let obj = {};
let myAge = 100;
d(obj, 'age', function () {
    return myAge;
});
console.log(obj);
console.log(obj.age);