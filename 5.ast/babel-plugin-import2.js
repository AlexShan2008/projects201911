let babel = require('@babel/core');
let t = require('babel-types');

let visitor = {
    ImportDeclaration: {
        enter(path, state = { opts }) {
            let specifiers = path.node.specifiers;
            let source = path.node.source;//"lodash"
            if (state.opts.libraryName === source.value && !t.isImportDefaultSpecifier(specifiers[0])) {
                let importDeclarations = specifiers.map(specifier => {
                    return t.importDeclaration([t.importDefaultSpecifier(specifier.local)], t.stringLiteral(`${source.value}/${specifier.imported.name}`));
                });
                path.replaceWithMultiple(importDeclarations);
            }
        }
    }
}
module.exports = function (babel) {
    return { visitor };
}