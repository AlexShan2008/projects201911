import a from './a';
let button = document.createElement('button');
button.innerHTML = '异步加载额外的模块' + a;
button.onclick = function () {//绑定一个事件  
    import(/*webpackChunkName: 'b'*/'./b').then(result => {
        console.log(result);
    });
}
document.body.appendChild(button);