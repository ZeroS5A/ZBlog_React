const { reduce } = require("lodash");
import { getUserList } from '@/services/userAdmin';

const Model = {
    state: {
        userList: []
    },
    effects: {
        *getUserList(_,{ call, put }) {
            const response = yield call(getUserList);
            console.log(response.data)
            yield put({
              type: 'saveUserList',
              payload: response.data
            });
            
        }
    },
    reducers: {
        saveUserList(state, { payload }){
            return{
                ...state,
                userList: payload
            }
        }
    }
}

export default Model