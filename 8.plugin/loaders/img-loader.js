// 默认情况下webpack会把模块转成utf8字符串。
function loader(inputSource) {
    console.log(inputSource, typeof inputSource);
    console.log(Buffer.isBuffer(inputSource));
    return inputSource;
}
loader.raw = true;
module.exports = loader;