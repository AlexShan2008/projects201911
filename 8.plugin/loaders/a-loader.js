//normal-loader 要一定要有的 pitch可有可无
function loader(inputSource) {
    // console.log('a-loader里打印b-loader的data', this.loaders[this.loaderIndex + 1]);
    console.log('a-loader-normal');
    return inputSource + "//a-loader";
}
//pitch 抛，跳过
loader.pitch = function (remainingRequest, previousRequest, data) {
    console.log('a-loader-pitch');
    //data.name = '我是a-loader ';
    return `a-loader-pitch结果`;
}
module.exports = loader;