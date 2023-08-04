import { PageInterface } from '../interface';
import {
  BatchRequestParamsInterface,
  SaleManRequestInterface,
  confirmPreOrderRequestParamsType,
} from './formInterface';
import axios from '../utils/axios';
import {
  BATCH_REMARK_STRING,
  SERVER_INFO_REMARK_STRING,
  ORDER_PLANS_STRING,
  CONFIRM_PRE_ORDER_STRING,
  SALES_MAN_STRING,
} from './api';

// 批量修改卖家备注
export const batchRequestFunction = (params: BatchRequestParamsInterface) => {
  return axios.put(BATCH_REMARK_STRING, params);
};

// 预订购确认
export const confirmPreOrderRequestFunction = (
  params: confirmPreOrderRequestParamsType
) => {
  return axios.post(CONFIRM_PRE_ORDER_STRING, params);
};

// 修改销售人员
export const salesManRequestFunction = (
  params: SaleManRequestInterface
) => {
  return axios.post(SALES_MAN_STRING, params);
};
