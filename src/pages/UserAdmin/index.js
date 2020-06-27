import React from 'react';
import request from '@/utils/request';
import { Button, Table, Switch } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './index.less';
import { connect } from 'dva';


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
        render: (text, record) => (
            <Switch className="switchColor" checked={record.role === 'ban'}/>
        ),
    },
]
  
const data = [
{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
},
{
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
},
{
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
},
];

class UserAdmin extends React.Component {

    // userList = [
    //     {
    //         email: "1164326212@qq.com",
    //         phone: 0,
    //         role: "admin",
    //         userId: 1,
    //         userName: "ZeroS"
    //     }
    // ]


    componentWillMount() {
        console.log("hello?")
        const { dispatch } = this.props
        dispatch({
            type: 'userAdmin/getUserList',
        });

        // this.userList = request('MyBlog/admin/getUserList',{
        //     method: 'POST',
        // }).data;
        
    }
    render(){
        const { userList } = this.props
        console.log(userList)
        return(
            <PageHeaderWrapper>
                <Table columns={columns} dataSource={userList} />
            </PageHeaderWrapper>
        )
    }
}

export default connect(({userAdmin})=>({
    userList: userAdmin.userList
}))(UserAdmin)