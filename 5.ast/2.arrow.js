//cnpm i @babel/core babel-types babel-traverse -D
// @babel/core esprima 可以把源代码转成语法树
// babel-traverse 可以用来遍历语法树或者修改语法树
//babel-types 生成AST语法的节点，或者验证一个节点是不是某种类型
let babel = require('@babel/core');
let t = require('babel-types');
const code = `const sum = (a,b)=>a+b`;
//const result = `const sum = function(a,b){return a+b}`
//这是一种访问者模式，就是可以访问语法树中所有的节点，在里面可以对节点进行转换
//path当前路径  path.node 代表当前对应的节点
//path.parent 当前路径的父节点 path.parentPath代表当前路径父路径
let ArrayFunctionPlugin = {
    visitor: {
        ArrowFunctionExpression: (path) => {
            console.log(path);
            let node = path.node;//获取老节点 
            let id = path.parent.id;
            let params = node.params;
            path.parentPath.parent.kind = 'var';
            let body = t.blockStatement([
                t.returnStatement(node.body)
            ]);
            let functionExpression = t.functionExpression(id, params, body, false, false);
            //在当前的路径上，用新的节点替换掉老的节点
            path.replaceWith(functionExpression);


        }
    }
}
//babel只一个转换引擎，默认什么都不做，它要做的工作需要我们通过插件来提供
let result = babel.transform(code, {
    plugins: [ArrayFunctionPlugin]
});
console.log(result.code);