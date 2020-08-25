import { getUserList, banUser } from '@/services/userAdmin';

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

    *changeBan({ payload }, { call, put }) {
      const { userList, record } = payload;
      const response = yield call(banUser, record.userId);

      if (response.code === 200) {
        const index = userList.indexOf(record);
        if (userList[index].isBan === 1) {
          userList[index].isBan = 0;
        } else {
          userList[index].isBan = 1;
        }
        const temp = userList.concat();
        yield put({
          type: 'saveUserList',
          payload: temp,
        });
      }
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
