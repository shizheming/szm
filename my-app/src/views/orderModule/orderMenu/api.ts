import { ListInterface, PageInterface } from '../../../interface';
import axios from '../../../utils/axios';
import type {
  OrderLsitParamsPageInterface,
  OrderListRequestResultInterface,
  ConfirmsignRequestParamsInterface,
  AddParamsInterface,
  InvoiceCodeSingleInterface,
  InvoiceRepairInvoiceRequestParamsInterface,
  OrderDetailResultInterface,
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

// 订单详情
export const orderDetailRequestFunction = (params: {
  user_id: string;
  osl_seq: string;
  show_sublistExt: number;
}) => {
  return axios.post<OrderDetailResultInterface>(
    '/api/proxy/order/Manage/query/getSubList',
    params
  );
};
