import request from '@/utils/request';
import { method } from 'lodash';

export async function getUserList() {
    return request('MyBlog/admin/getUserList',{
        method: 'POST',
    });
}