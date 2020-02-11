//webpack会给每一个loader配置一个data
function loader(inputSource) {
    console.log('b-loader-normal');
    let finalCallback = this.async();
    setTimeout(() => {
        finalCallback(null, inputSource + "//b-loader");
    }, 3000);
    //console.log(this.data);

    //return inputSource + "//b-loader";
}
//pitch 抛，跳过
//pitch方法一共有三个参数
//require('./index.js');

loader.pitch = function (remainingRequest, previousRequest, data) {
    /*  console.log('b-loader remainingRequest', remainingRequest);
     console.log('b-loader previousRequest', previousRequest);
     data.name = '我是b-loader '; */
    console.log('b-loader-pitch');
    //return 'b-result';
}
module.exports = loader;
/**
 * loader的分类
 * pre 前置loader
 * normal普通loader
 * inline 行内loader
 * post后置loader
 */