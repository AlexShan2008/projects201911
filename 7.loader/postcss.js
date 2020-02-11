const postcss = require('postcss');
const tokenizer = require('css-selector-tokenizer');
// post可以进行CSS语法树遍历，修改和生成
const cssPlugin = (postcssOptions) => {
    //root代表语法树的根节点
    return (root) => {
        root.walkDecls(decl => {
            console.log('decl.prop', decl.prop, decl.value);
            let values = tokenizer.parseValues(decl.value);
            console.log(JSON.stringify(values, null, 2));
            values.nodes.forEach(nodeValue => {
                nodeValue.nodes.forEach(item => {
                    if (item.type === 'url') {
                        // postcssOptions.urls.push(item.url);
                        item.url = require('x')
                    }
                });
            });
        })
    }
}
let postcssOptions = { urls: [] };
let pipeline = postcss([
    cssPlugin(postcssOptions)
]);
let cssText = "background-image: url('./baidu.jpg')";
//postcss先把cssText转成抽象语法树。然后交给插件处理,最后把新的语法树重新生成CSS代码
pipeline.process(cssText).then(result => {
    console.log(postcssOptions);
    //console.log(result);
});