## webpack模块化规范
- 主流有两种  ES6 和commonjs
- JS 标准是es6 module import vs export
- commonjs  require module.exports
- webpack最标准的实现commonjs
- 也可以支持 es6 module

## 异步加载流程
1.先加载主代码块，主代码块里包含入口模块和入口模块直接依赖的模块
2.点击按钮的，会通过JSONP其它 代码块，其它代码里包含其它额外的模块。
3.先创建一个script标签，然后把它的src指向要异步加载 的代码块的文件的路径。然后把这个script标签添加页面里面去。
4.然后浏览器会立刻马上请求对应的资源。
5.资源返回后异步加载的脚本会立刻执行。[].webpackJsonpCallback
6.webpackJsonpCallback里面会把对应的代码块的加载状态设置为0，然后把新取到的模块的定义合并到原来的模块总的对象上。
7.promise完成就，异步加载也就是完成，然后就是调用t进行require这个模块了，然后就可以后续调用了