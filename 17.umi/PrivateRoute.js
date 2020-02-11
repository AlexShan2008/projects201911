import { Route, Redirect } from 'react-router-dom';
//render是原来的渲染方法 
export default ({ render, ...others }) => {
    console.log(render, others, localStorage.getItem('login'));
    return (
        <Route

            render={
                (props) => localStorage.getItem('login') ? render(props) : <Redirect to="/login" />
            }
        />
    )
}
/**
 * 渲染一个Route有三种方式
 * component 里面放一个组件，不能写逻辑直接 渲染，而匹配上路径 才渲染
 * render里面放一个函数 可以写逻辑，也是匹配上路径 才渲染
 * children里面也是一个函数，不管匹配不匹配都渲染  匹配会match
 */