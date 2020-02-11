//normal-loader 要一定要有的 pitch可有可无
function loader(inputSource) {
    console.log('pre-loader-normal');
    return inputSource;
}
//pitch 抛，跳过
loader.pitch = function () {
    console.log('pre-loader-pitch');
    //return `module.exports=${JSON.stringify('result-a')}`;
}
module.exports = loader;