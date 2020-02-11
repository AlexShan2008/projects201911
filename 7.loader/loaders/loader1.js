/**
 * 为了节省时间，loader的结果可以被缓存。
 * @param {*} inputSource 
 */
function loader1(inputSource) {
    this.cacheable(true);//缓存编译的结果
    console.log('我正在执行loader的转换', inputSource);
    return inputSource + "//loader1";
}
module.exports = loader1;