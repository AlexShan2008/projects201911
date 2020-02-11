let obj = {};
Object.defineProperty(obj, 'age', {
    value: 100,
    enumerable: true,// 在枚举的时候是否可以打印出来
    writable: true,//属性是否可以修改
    configurable: true//属性是否可以删除
});
console.log(obj);
obj.age = 200;
console.log(obj);
delete obj.age;
console.log(obj);

let obj2 = {};
let ageProp = 10;
Object.defineProperty(obj2, 'age', {
    set(newAge) {//setter 给对象设置新的属性值
        ageProp = newAge * 2;
    },
    get() { //getter 获取器，用来从对象上获取属性
        return ageProp;
    },
    enumerable: true,// 在枚举的时候是否可以打印出来
    //writable: true,//属性是否可以修改
    configurable: true//属性是否可以删除
});
//TypeError: Invalid property descriptor. 
//Cannot both specify accessors and a value or writable attribute, #<Object>
console.log(obj2);
console.log(obj2.age);
obj2.age = 200;
console.log(obj2.age);

let myAge = 100;
let obj3 = {
    get age() {
        return myAge;
    },
    set age(newAge) {
        myAge = newAge;
    }
}
console.log(obj3.age);
obj3.age = 200;
console.log(obj3.age);
