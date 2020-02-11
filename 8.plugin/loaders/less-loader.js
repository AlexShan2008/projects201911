//@ts-check
let less = require('less');
/* interface RenderOutput {
    css: string;
    map: string;
    imports: string[];
} */
function loader(source) {
    let callback = this.async();
    less.render(source, (err, output) => {
        console.log('output.css', output.css);
        callback(err, output.css);
    });
}
module.exports = loader;