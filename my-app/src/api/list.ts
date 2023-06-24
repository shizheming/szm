import { PageInterface } from '../interface';
import {
  UserRequestResultInterface,
  SkuRequestParamsInterface,
  SkuRequestResultInterface,
} from './interface';
import axios from '../utils/axios';
import { USER_API_STRING, SKU_API_STRING } from './api';

// 用户列表
export const userRequsetFunction = (
  params: { user_id?: string } & PageInterface
) => {
  return axios.post<UserRequestResultInterface>(USER_API_STRING, params);
};

// 商品列表
export const skuRequestFunction = (params: SkuRequestParamsInterface) => {
  return axios.get<SkuRequestResultInterface>(SKU_API_STRING, {
    params,
  });
};
