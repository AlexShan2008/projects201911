
function exec(name, age) {
    console.log(this.name, name, age);
}
exec.call({ name: 'zhufeng' }, 'jiagou', 10)

let result = require('./1');
console.log(result);