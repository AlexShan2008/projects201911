/**
 * exact: true
 * title: 个人中心
 * Routes:
 *   - ./PrivateRoute.js
 */
import router from 'umi/router';
export default function (props) {
  return (
    <div >
      <h1>Page profile</h1>
      <button onClick={() => router.goBack()}>返回</button>
    </div>
  );
}
//{ title: '个人中心', Routes: [ './PrivateRoute.js' ] }
