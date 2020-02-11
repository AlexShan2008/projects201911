import Link from 'umi/link';
/**
 * 全局布局组件
 * @param {} props 
 */
export default function NavHeader(props) {
    return (
        <ul>
            <Link to="/" >首页</Link>
            <Link to="/users/list">用户管理</Link>
            <Link to="/profile">个人中心</Link>
        </ul>
    );
}
