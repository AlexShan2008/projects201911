function a() {

}
const b = (a, b) => {
    return a + b
}

let c = new Function('a,b', 'return a+b');
let result = c(1, 2);
console.log(result);

