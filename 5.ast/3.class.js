//cnpm i @babel/core babel-types babel-traverse -D
// @babel/core esprima 可以把源代码转成语法树
// babel-traverse 可以用来遍历语法树或者修改语法树
//babel-types 生成AST语法的节点，或者验证一个节点是不是某种类型
let babel = require('@babel/core');
let t = require('babel-types');
const code =
    `
class Person {
    
}
`;
//const result = `const sum = function(a,b){return a+b}`
//这是一种访问者模式，就是可以访问语法树中所有的节点，在里面可以对节点进行转换
//path当前路径  path.node 代表当前对应的节点
//path.parent 当前路径的父节点 path.parentPath代表当前路径父路径
let ClassPlugin = {
    visitor: {
        //捕获并处理ClassDeclaration类型的节点
        ClassDeclaration: (path) => {
            let node = path.node; //ClassDeclaration
            let id = node.id;//Person
            let classMethods = node.body.body;//类的所有的方法，包括构造函数[constructor,getName]
            let statements = [];
            classMethods.forEach(method => {
                if (method.kind == 'constructor') {
                    let constructorFunction = t.functionDeclaration(id, method.params, method.body, false, false);
                    statements.push(constructorFunction);
                } else {
                    let functionExpression = t.functionExpression(null, method.params, method.body, false, false);
                    let assignmentExpression = t.assignmentExpression('=',
                        t.memberExpression(t.memberExpression(id, t.identifier('prototype'), false), method.key, false)
                        , functionExpression);
                    statements.push(assignmentExpression);
                }
            });
            if (classMethods.length == 0) {
                path.replaceWith(t.functionDeclaration(id, [], t.blockStatement([]), false, false));
            } else {
                //只能替换 成一个节点，但是replaceWithMultiple可以替换多节点
                path.replaceWithMultiple(statements);
            }

        }
    }
}
//babel只一个转换引擎，默认什么都不做，它要做的工作需要我们通过插件来提供
let result = babel.transform(code, {
    plugins: [ClassPlugin]
});
console.log(result.code);