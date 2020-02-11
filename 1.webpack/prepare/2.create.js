//Object.create(null)
let obj = {};
obj.__proto__ = Object.prototype;
//希望得到一个纯对象 没有属性
let obj2 = Object.create(null);
obj.__proto__ = null;

let CreateFunction = function () {

}
CreateFunction.prototype = null;

let obj3 = new CreateFunction();
obj3.__proto__ = null
//1.为了高性能，得到一个更为纯粹的 map对象
//2.为了不继承任何属性和方法，也不用担心不小心覆盖原来的属性的方法
obj3.toString
obj3.hasOwnProperty();


