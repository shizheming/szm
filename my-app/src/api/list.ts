import { PageInterface } from '../interface';
import {
  UserRequestResultInterface,
  SkuRequestParamsInterface,
  SkuRequestResultInterface,
  InvoiceTitleInterface,
  InvoiceTitleParamsInterface,
  OrderRequestParamsInterface,
  orderRequestResultInterType,
  OrderSyncListRequestParamsInterface,
  orderSyncListRequestResultInterType,
  SalesPersonRequestParamsType,
  SalesPersonRequestResultType,
  QueryOrderPlansSingleInterface,
  GetServerInfoSingleInterface,
} from './listInterface';
import axios from '../utils/axios';
import {
  USER_API_STRING,
  SKU_API_STRING,
  INVOICE_TITLE_STRING,
  ORDER_STRING,
  TASK_STRING,
  LOG_STRING,
  SUB_ACCOUNT_LIST_STRING,
  ORDER_PLANS_STRING,
  SERVER_INFO_REMARK_STRING,
} from './api';

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
export const invoiceTitleRequestFunction = (
  params: InvoiceTitleParamsInterface
) => {
  return axios.post<InvoiceTitleInterface>(INVOICE_TITLE_STRING, {
    params,
  });
};

// 订单列表
export const orderRequestFunction = (params: OrderRequestParamsInterface) => {
  return axios.post<orderRequestResultInterType>(ORDER_STRING, params);
};

// 查看任务
export const orderSyncListRequestFunction = (
  params: OrderSyncListRequestParamsInterface
) => {
  return axios.get<orderSyncListRequestResultInterType>(TASK_STRING, {
    params,
  });
};

// 查看日志
export const fileByUrlRequestFunction = (params: { url: string }) => {
  return axios.get(LOG_STRING, {
    params,
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// 销售人员
export const subAccountRequestFunction = (
  params: SalesPersonRequestParamsType
) => {
  return axios.get<SalesPersonRequestResultType>(SUB_ACCOUNT_LIST_STRING, {
    params,
  });
};

// 配送安装选择时间列表
export const queryOrderPlansRequestFunction = (params: { osl_seq: string }) => {
  return axios.post<QueryOrderPlansSingleInterface[]>(
    ORDER_PLANS_STRING,
    params
  );
};

// 配送安装时间列表
export const getServerInfoRequestFunction = (params: { osl_seq: string }) => {
  return axios.post<GetServerInfoSingleInterface[]>(
    SERVER_INFO_REMARK_STRING,
    params
  );
};
