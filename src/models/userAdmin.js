import { getUserList } from '@/services/userAdmin';

// const { reduce } = require("lodash");
const Model = {
  state: {
    userList: [],
  },
  effects: {
    *getUserList(_, { call, put }) {
      const response = yield call(getUserList);
      yield put({
        type: 'saveUserList',
        payload: response.data,
      });
    },

    changeRole(payload) {
      console.log(payload);
    },
  },
  reducers: {
    saveUserList(state, { payload }) {
      return {
        ...state,
        userList: payload,
      };
    },
  },
};

export default Model;
