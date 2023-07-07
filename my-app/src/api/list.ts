import { PageInterface } from '../interface';
import {
  UserRequestResultInterface,
  SkuRequestParamsInterface,
  SkuRequestResultInterface,
} from './interface';
import axios from '../utils/axios';
import { USER_API_STRING, SKU_API_STRING, INVOICE_TITLE_STRING } from './api';

// 用户列表
export const userRequsetFunction = (
  params: { user_id?: string } & PageInterface
) => {
  return Promise.resolve({
    page: 1,
    page_size: 10,
    total: 10,
    code: 0,
    msg: 'success',
    data: {
      list: [
        {
          user_id: '1002433',
          third_user_id: '6815683283032690678',
          username: 'pingtai001',
          name: '',
          wx_nickname: '',
          phone: '',
          exp_value: 0,
          company_name: '123',
          is_employee: 0,
          user_level_name: '银牌会员',
        },
      ],
    },
  });
  // 这个接口太慢了要40秒才回来，我还是写死把
  return axios.post<UserRequestResultInterface>(USER_API_STRING, params);
};

// 商品列表
export const skuRequestFunction = (params: SkuRequestParamsInterface) => {
  return axios.get<SkuRequestResultInterface>(SKU_API_STRING, {
    params,
  });
};

// 发票抬头列表
export const xxxxxxx = (params: SkuRequestParamsInterface) => {
  return axios.post<SkuRequestResultInterface>(INVOICE_TITLE_STRING, {
    params,
  });
};

