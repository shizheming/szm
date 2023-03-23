import { ListInterface, PageInterface } from '../../../interface';
import axios from '../../../utils/axios';
import type {
  OrderLsitParamsPageInterface,
  OrderListRequestResultInterface,
  ConfirmsignRequestParamsInterface,
  Api_order_orderSyncList_params_interface,
  Api_order_orderSyncList_result_item_interface,
  Api_order_merchantRemark_batch_params_item_interface,
  AddParamsInterface,
  Api_proxy_order_Order_assistant_queryOrderPlansByOslSeq_result_item_interface,
  Api_proxy_order_manage_query_getServerInfo_item_interface,
  Api_proxy_order_Manage_Invoice_repairInvoice_params_interface,
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
export const api_order_merchantRemark_batch = (params: {
  ids: Api_order_merchantRemark_batch_params_item_interface[];
}) => {
  return axios.put('/api/order/merchant-remark/batch', params);
};

// 查看任务
export const api_order_orderSyncList = (
  params: Api_order_orderSyncList_params_interface
) => {
  return axios.get<
    ListInterface<Api_order_orderSyncList_result_item_interface>
  >('/api/order/orderSyncList', {
    params,
  });
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
export const api_proxy_order_manage_query_getServerInfo = (params: {
  osl_seq: string;
}) => {
  return axios.post<
    Api_proxy_order_manage_query_getServerInfo_item_interface[]
  >('/api/proxy/order/manage/query/getServerInfo', params);
};

// 配送安装选择时间列表
export const api_proxy_order_Order_assistant_queryOrderPlansByOslSeq =
  (params: { osl_seq: string }) => {
    return axios.post<
      Api_proxy_order_Order_assistant_queryOrderPlansByOslSeq_result_item_interface[]
    >('/api/proxy/order/Order/assistant/queryOrderPlansByOslSeq', params);
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
export const api_proxy_order_Manage_Invoice_repairInvoice = (
  params: Api_proxy_order_Manage_Invoice_repairInvoice_params_interface
) => {
  return axios.post('/api/proxy/order/Manage/Invoice/repairInvoice', params);
};
