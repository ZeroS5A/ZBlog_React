export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './UserLogin',
      },
    ],
  },
  //菜单页
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/dataShow',
          },
          {
            path: '/dataShow',
            name: 'dataShow',
            icon: 'DatabaseOutlined',
            component: './DataShow/dataShow',
          },
          {
            path: '/userAdmin',
            name: 'userAdmin',
            icon: 'TeamOutlined',
            component: './UserAdmin/userAdmin',
            authority: ['admin'],
          },
          // 博客管理子路由
          {
            path: '/blogAdmin',
            name: 'blogAdmin',
            icon: 'crown',
            component: './BlogAdmin',
            routes: [
              {
                path: '/blogAdmin/blog',
                name: 'blog',
                icon: 'smile',
                component: './BlogAdmin',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
