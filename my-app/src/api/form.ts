import { PageInterface } from '../interface';
import {
  BatchRequestParamsInterface,
  GetServerInfoSingleInterface,
  QueryOrderPlansSingleInterface,
  confirmPreOrderRequestParamsType,
} from './interface';
import axios from '../utils/axios';
import {
  BATCH_REMARK_STRING,
  SERVER_INFO_REMARK_STRING,
  ORDER_PLANS_STRING,
  CONFIRM_PRE_ORDER_STRING,
} from './api';

// 批量修改卖家备注
export const batchRequestFunction = (params: BatchRequestParamsInterface) => {
  return axios.put(BATCH_REMARK_STRING, params);
};

// 配送安装时间列表
export const getServerInfoRequestFunction = (params: { osl_seq: string }) => {
  return axios.post<GetServerInfoSingleInterface[]>(
    SERVER_INFO_REMARK_STRING,
    params
  );
};

// 配送安装选择时间列表
export const queryOrderPlansRequestFunction = (params: { osl_seq: string }) => {
  return axios.post<QueryOrderPlansSingleInterface[]>(
    ORDER_PLANS_STRING,
    params
  );
};

// 预订购确认
export const confirmPreOrderRequestFunction = (
  params: confirmPreOrderRequestParamsType
) => {
  return axios.post(CONFIRM_PRE_ORDER_STRING, params);
};
