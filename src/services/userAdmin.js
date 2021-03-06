import request from '@/utils/request';
// import { method } from 'lodash';

export async function getUserList() {
  return request('/MyBlog/admin/getUserList', {
    method: 'POST',
  });
}

export async function banUser(userId) {
  return request('/MyBlog/admin/banUser', {
    method: 'POST',
    data: userId,
  });
}

export async function changeRole(userId, role) {
  return request('/MyBlog/admin/changeRole', {
    method: 'POST',
    data: { userId, role },
  });
}
