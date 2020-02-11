import Link from 'umi/link';
export default function Layout(props) {
    return (
        <div >
            <ul>
                <Link to="/users/list" >用户列表</Link>
                <Link to="/users/add">添加用户</Link>
            </ul>
            <div>
                {props.children}
            </div>
        </div>
    );
}
