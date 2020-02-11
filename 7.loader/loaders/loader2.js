let loaderUtils = require('loader-utils');
function xx(inputSource) {
    let options = loaderUtils.getOptions(this);
    return inputSource + options.msg;
}
module.exports = xx;