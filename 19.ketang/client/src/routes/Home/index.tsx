import React, { PropsWithChildren } from 'react';
import './index.less';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './components/HomeHeader';
import { CombinedState } from '@/typings/state';
import { HomeState } from '@/typings/state';
import mapDispatchToProps from '@/store/actions/home';
type Props = PropsWithChildren<RouteComponentProps & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps>;
function Home(props: Props) {
    return (
        <>
            <HomeHeader
                currentCategory={props.currentCategory}
                setCurrentCategory={props.setCurrentCategory}
            />
        </>
    )
}
const mapStateToProps = (state: CombinedState): HomeState => state.home;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

/**
 * 因为此组件是由路由渲染出来的
 * 所以属性对象会包括路由属性
 * 另外此组件需要要连接仓库
 *
 */