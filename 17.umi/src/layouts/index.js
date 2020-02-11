import NavHeader from '../components/NavHeader';
/**
 * 全局布局组件
 * @param {} props 
 */
export default function Layout(props) {
    return (
        <div >
            <NavHeader />
            <div>
                {props.children}
            </div>
        </div>
    );
}
