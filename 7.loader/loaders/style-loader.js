/* function loader(source) {//output.css
    return (
        `
        let style = document.createElement('style');
        style.innerHTML = ${JSON.stringify(source)};
        document.head.appendChild(style);
        `
    )
} */
let loaderUtils = require('loader-utils');
//  inputSource=`module.exports ="div{color:red}"`
module.exports = (inputSource) => {

};
//request "./loaders/style-loader.js!./loaders/css-loader.js!./src/style.css"
//remainingRequest剩下的request    css-loader绝对路径!./style.css绝对路径 "./loaders/css-loader.js!./src/style.css"
//loaderUtils.stringifyRequest 转换路径的  绝对路径! 转成相对路径其实就是模块ID，也就是相对于项目根路径 ./src
//"!!" 表示忽略pre normal post 只留下inline   require('!!loader1!loader2!./style.css')
module.exports.pitch = function (remainingRequest) {
    console.log('style pitch');
    console.log('remainingRequest', remainingRequest);
    //"!!../loaders/css-loader.js!./style.css"
    ///../loaders/css-loader.js!style-loader
    console.log('loaderUtils.stringifyRequest(this, "!!" + remainingRequest)=', loaderUtils.stringifyRequest(this, "!!" + remainingRequest));
    return (
        `
        let style = document.createElement('style');
        style.innerHTML = require(${loaderUtils.stringifyRequest(this, "!!" + remainingRequest)});
        document.head.appendChild(style);
        `
    )
}