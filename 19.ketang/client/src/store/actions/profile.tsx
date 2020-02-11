import * as actionTypes from '@/store/action-types';
import { validate } from '@/api/profile';
import { push } from 'connected-react-router';
export default {
    validate() {
        return {
            type: actionTypes.VALIDATE,
            payload: validate()
        }
    },
    logout() {
        return function (dispatch: any) {
            sessionStorage.removeItem('access_token');
            dispatch(push('/login'));
        }
    }
}
/**
 * JWT如何退出登录
 * 只要客户端把本地的token删除了，再发的时候就没有
 */