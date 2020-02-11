function loader(inputSource) {
    console.log('c-loader-normal');
    return inputSource + "//c-loader";
}
//pitch 抛，跳过
loader.pitch = function () {
    console.log('c-loader-pitch');
}
module.exports = loader;