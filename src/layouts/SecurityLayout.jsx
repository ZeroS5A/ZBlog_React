import React from 'react';
import { connect } from 'dva';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect } from 'umi';
import { stringify } from 'querystring';

class SecurityLayout extends React.Component {
  state = {
    isReady: false,
  };

  //第一次渲染完成后调用
  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch, currentUser } = this.props;

    // if (dispatch) {
    //   dispatch({
    //     type: 'user/fetchCurrent',
    //   });
    // }

    //此处应检查token是否过期

    //从本地存储获取的userData
    const UserData = JSON.parse(localStorage.getItem('UserData'))
    
    if(currentUser === null && UserData){
      console.log("已经存在用户数据")
      //dispatch调用models中的函数
      dispatch({
        type: 'login/saveUserData',
        payload: UserData,
      });
    }
  }

  render() {
    const { isReady } = this.state;
    const { children, loading, currentUser } = this.props; // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    const token = localStorage.getItem('token')

    const isLogin = currentUser && token 
    const queryString = stringify({
      redirect: window.location.href,
    });

    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }

    //如果没有用户数据
    if (isLogin === null && window.location.pathname !== '/user/login') {
      return <Redirect to={`/user/login?${queryString}`} />;
    }

    return children;
  }
}

export default connect(({ login, loading }) => ({
  currentUser: login.currentUser,
  loading: loading.models.user,
}))(SecurityLayout);
