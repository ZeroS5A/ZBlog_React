import { stringify } from 'querystring';
import { router } from 'umi';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

const Model = {
  namespace: 'login',
  state: {
    status: { name: 'ZEROS' },
    currentUser: null,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });

      if (response.code === 200) {
        // 存储用户数据
        yield put({
          type: 'saveCurrentUser',
          payload: response,
        }); // Login successfully
        // 设置token
        localStorage.setItem('token', response.data.token);
        // 设置用户数据
        localStorage.setItem('UserData', JSON.stringify(response.data.UserData));

        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        router.replace(redirect || '/');
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout({ put }) {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      console.log('登出');
      // 登出操作，清空currentUser、token
      localStorage.clear();
      yield put({
        type: 'delUserData',
        payload: {
          data: { UserData: null },
        },
      });

      if (window.location.pathname !== '/user/login' && !redirect) {
        router.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    delUserData(state) {
      return {
        ...state,
        currentUser: null,
      };
    },
    changeLoginStatus(state, { payload }) {
      return { ...state, status: payload.code, type: payload.type };
    },
    saveCurrentUser(state, { payload }) {
      setAuthority(payload.data.UserData.role);
      return {
        ...state,
        currentUser: payload.data.UserData,
        status: payload.code,
      };
    },
    // 保存从本地获取的用户数据
    saveUserData(state, { payload }) {
      setAuthority(payload.role);
      return {
        ...state,
        currentUser: payload,
        status: 200,
      };
    },
  },
};
export default Model;
