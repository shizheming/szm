import { ListInterface, PageInterface } from '../interface';
import { UserInterface } from './interface';
import axios from '../utils/axios';
import { USER_API_STRING } from './api';

// 用户列表
export const userRequsetFunction = (
  params: { user_id?: string } & PageInterface
) => {
  return axios.post<ListInterface<UserInterface>>(USER_API_STRING, params);
};
