import { ListInterface, PageInterface } from '../../../interface';
import axios from '../../../utils/axios';
import type {
  OrderLsitParamsPageInterface,
  OrderListRequestResultInterface,
  ConfirmsignRequestParamsInterface,
  OrderSyncListRequestParamsPageInterface,
  OrderSyncListRequestResultItemInterface,
  BatchRequestParamsInterface,
  AddParamsInterface,
  QueryOrderPlansByOslSeqRequestResultItemInterface,
  GetServerInfoRequestResultItemInterface,
  InvoiceCodeSingleInterface,
  InvoiceRepairInvoiceRequestParamsInterface,
} from './interface';

// 订单列表
export const orderListRequestFunction = (
  params: OrderLsitParamsPageInterface
) => {
  return axios.get<OrderListRequestResultInterface>('/api/order', {
    params,
  });
};

// 确认签收
export const confirmsignRequestFunction = (
  params: ConfirmsignRequestParamsInterface
) => {
  return axios.post('/api/proxy/order/manage/edit/confirmsign', params);
};

// 预订购确认
export const confirmPreOrderRequestFunction = (
  params:
    | {
        osl_seq: string;
      }
    | {
        osl_seq: string;
        server_list: { apply_server_time: number | string }[];
      }
) => {
  return axios.post('/api/proxy/order/manage/edit/confirmPreOrder', params);
};

// 批量修改卖家备注
export const batchRequestFunction = (params: {
  ids: BatchRequestParamsInterface[];
}) => {
  return axios.put('/api/order/merchant-remark/batch', params);
};

// 查看任务
export const orderSyncListRequestFunction = (
  params: OrderSyncListRequestParamsPageInterface
) => {
  return axios.get<ListInterface<OrderSyncListRequestResultItemInterface>>(
    '/api/order/orderSyncList',
    {
      params,
    }
  );
};

// 查看日志
export const api_order_getFileByUrl = (params: { url: string }) => {
  return axios.get(`/api/order/getFileByUrl`, {
    params,
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// 人工下单
export const submitRequestFunction = (params: AddParamsInterface) => {
  return axios.post('/api/proxy/order/Order/BackEnd/submit', params);
};

// 导出发货信息|导出订单明细
export const orderDetailExportRequestFunction = (
  params: OrderLsitParamsPageInterface & { service_type: number }
) => {
  return axios.get<{ id: number }>('/api/order/orderDetailExport', { params });
};

// 生成销售出库单
export const saleOutstockRequestFunction = (params: { osl_seq: string }) => {
  return axios.post('/api/proxy/order/Order/Purchase/saleOutstock', params);
};

// 配送安装时间列表
export const getServerInfoRequestFunction = (params: { osl_seq: string }) => {
  return axios.post<GetServerInfoRequestResultItemInterface[]>(
    '/api/proxy/order/manage/query/getServerInfo',
    params
  );
};

// 配送安装选择时间列表
export const queryOrderPlansByOslSeqRequestFunction = (params: {
  osl_seq: string;
}) => {
  return axios.post<QueryOrderPlansByOslSeqRequestResultItemInterface[]>(
    '/api/proxy/order/Order/assistant/queryOrderPlansByOslSeq',
    params
  );
};

// 下单商品验证是否在配送地址返回内
export const api_goods_sku_getSkuAreaBySkuIds = (params: {
  shop_goods_ids: number[];
  province: number;
  district: number;
  channel_id: number;
}) => {
  return axios.post<[]>('/api/goods/sku/getSkuAreaBySkuIds', params);
};

// 请求图片
export const imgUrlRequestFunction = (params: {
  key: string;
  bucket: string;
  upload_channel: string;
}) => {
  return axios.post<string>('/api/upload/get-url', params);
};

// 人工下单确认
export const confirmRequestFunction = (params: AddParamsInterface) => {
  return axios.post<{
    qty: number;
    total_price: number;
    total_freight: number;
    total_real_price: number;
  }>('/api/proxy/order/Order/BackEnd/confirm', params);
};

// 补开发票申请
export const repairInvoiceRequestFunction = (params: {
  invoice: {
    content_type: number;
  } & InvoiceRepairInvoiceRequestParamsInterface;
  order: {
    ono: string;
    user_id: string;
  }[];
}) => {
  return axios.post('/api/proxy/order/Manage/Invoice/repairInvoice', params);
};

// 开票主体
export const getInvoiceCodeRequestFunction = () => {
  return axios.post<InvoiceCodeSingleInterface[]>(
    '/api/proxy/order/Manage/query/getInvoiceCode'
  );
};
