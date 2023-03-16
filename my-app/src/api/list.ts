import { ListInterface, PageInterface } from '../interface';
import {
  UserRequestResultInterface,
  SkuRequestParamsPageInterface,
  SkuRequestResultInterface,
} from './interface';
import axios from '../utils/axios';
import { USER_API_STRING, SKU_API_STRING } from './api';

// 用户列表
export const userRequsetFunction = (
  params: { user_id?: string } & PageInterface
) => {
  return axios.post<ListInterface<UserRequestResultInterface>>(
    USER_API_STRING,
    params
  );
};

// 商品列表
export const skuRequestFunction = (params: SkuRequestParamsPageInterface) => {
  return axios.get<ListInterface<SkuRequestResultInterface>>(SKU_API_STRING, {
    params,
  });
};
