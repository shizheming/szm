import { ListInterface, PageInterface } from '../../../interface';
import axios from '../../../utils/axios';
import type {
  Api_order_params_interface,
  Api_order_result_interface,
  Api_proxy_order_manage_edit_confirmsign_params_interface,
  Api_order_orderSyncList_params_interface,
  Api_order_orderSyncList_result_item_interface,
  Api_proxy_user_User_UserSearch_epUserSearch_result_item_interface,
  Api_goods_sku_list_result_item_interface,
  Api_goods_sku_list_params_interface,
  Api_order_merchantRemark_batch_params_item_interface,
  Api_proxy_order_Order_BackEnd_submit_params_interface,
  Api_proxy_order_Order_assistant_queryOrderPlansByOslSeq_result_item_interface,
  Api_proxy_order_manage_query_getServerInfo_item_interface,
  Api_proxy_order_Manage_Invoice_repairInvoice_params_interface,
} from './interface';

// 订单列表
export const api_order = (params: Api_order_params_interface) => {
  return axios.get<Api_order_result_interface>('/api/order', {
    params,
  });
};

// 确认签收
export const api_proxy_order_manage_edit_confirmsign = (
  params: Api_proxy_order_manage_edit_confirmsign_params_interface
) => {
  return axios.post('/api/proxy/order/manage/edit/confirmsign', params);
};

// 预订购确认
export const api_proxy_order_manage_edit_confirmPreOrder = (
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

// 用户列表
export const Api_proxy_user_User_UserSearch_epUserSearch = (
  params: { user_id?: string } & PageInterface
) => {
  return axios.post<
    ListInterface<Api_proxy_user_User_UserSearch_epUserSearch_result_item_interface>
  >('/api/proxy/user/User/UserSearch/epUserSearch', params);
};

// 商品列表
export const api_goods_sku_list = (
  params: Api_goods_sku_list_params_interface
) => {
  return axios.get<ListInterface<Api_goods_sku_list_result_item_interface>>(
    '/api/goods/sku/list',
    {
      params,
    }
  );
};

// 人工下单
export const api_proxy_order_Order_BackEnd_submit = (
  params: Api_proxy_order_Order_BackEnd_submit_params_interface
) => {
  return axios.post('/api/proxy/order/Order/BackEnd/submit', params);
};

// 导出发货信息|导出订单明细
export const api_order_orderDetailExport = (
  params: Api_order_params_interface & { service_type: number }
) => {
  return axios.get<{ id: number }>('/api/order/orderDetailExport', { params });
};

// 生成销售出库单
export const api_proxy_order_Order_Purchase_saleOutstock = (params: {
  osl_seq: string;
}) => {
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
export const api_upload_getUrl = (params: {
  key: string;
  bucket: string;
  upload_channel: string;
}) => {
  return axios.post<string>('/api/upload/get-url', params);
};

// 人工下单确认
export const api_proxy_order_Order_BackEnd_confirm = (
  params: Api_proxy_order_Order_BackEnd_submit_params_interface
) => {
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
