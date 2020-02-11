const path = require('path');
//join 连接 只是机械的相连接 不解析真实路径
console.log(path.join('a', 'b', 'c'));
//要解析真实路径 永远是一个相对于盘符根目录的绝对路径
console.log(path.resolve('a', 'b', 'c'));