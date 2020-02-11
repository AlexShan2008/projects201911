//1.用来把源代码转成抽象语法树 code=>ast
const esprima = require('esprima');
const estraverse = require('estraverse');
const escodegen = require('escodegen');
let indent = 0;
function padding() {
    return ' '.repeat(indent);
}
//Identifier一般就是变量
let code = `function ast(){}`;
let ast = esprima.parseModule(code);
//console.log(JSON.stringify(result, null, 2));
estraverse.traverse(ast, {
    enter(node) { //进入

        console.log(padding() + node.type + '进入');
        if (node.type === 'FunctionDeclaration') {
            node.id.name = 'newAst';
        }
        indent += 2;
    },
    leave(node) {//离开
        indent -= 2;
        console.log(padding() + node.type + '退出');
    }
});
//把修改过后的抽象语法树重新生成源代码
let result = escodegen.generate(ast);
console.log(result);