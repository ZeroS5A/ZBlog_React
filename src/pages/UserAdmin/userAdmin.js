import React from 'react';
import { Table, Switch } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import styles from './index.less';
import { connect } from 'dva';

class UserAdmin extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'userAdmin/getUserList',
    });
  }

  changeBan = record => {
    const { dispatch, userList } = this.props;
    dispatch({
      type: 'userAdmin/changeBan',
      payload: { record, userList },
    });
  };

  render() {
    const { userList } = this.props;

    const columns = [
      {
        title: '用户ID',
        dataIndex: 'userId',
        key: 'userId',
      },
      {
        title: '用户名',
        dataIndex: 'userName',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
      },
      {
        title: '手机',
        dataIndex: 'phone',
      },
      {
        title: '角色',
        dataIndex: 'role',
      },
      {
        title: '是否禁用',
        render: (text, record, index) => (
          <Switch
            className="switchColor"
            onChange={() => this.changeBan(record, index)}
            checked={record.isBan === 1}
          />
        ),
      },
    ];

    return (
      <PageHeaderWrapper>
        <Table columns={columns} dataSource={userList} />
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ userAdmin }) => ({
  userList: userAdmin.userList,
}))(UserAdmin);
