import { ListInterface } from '../../../interface';
import axios from '../../../utils/axios';
import type {
  Api_order_params_interface,
  Api_order_result_interface,
  Api_proxy_order_manage_edit_confirmsign_params_interface,
  Api_proxy_order_manage_edit_confirmPreOrder_params_interface,
  Api_order_orderSyncList_params_interface,
  Api_order_orderSyncList_result_item_interface,
  Api_proxy_user_User_UserSearch_epUserSearch_result_item_interface,
  Api_proxy_user_User_UserSearch_epUserSearch_params_interface,
  Api_goods_sku_list_result_item_interface,
  Api_goods_sku_list_params_interface,
  Api_order_merchantRemark_batch_params_item_interface,
  Api_proxy_order_Order_BackEnd_submit_params_interface,
} from './interface';

// 列表
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
  params: Api_proxy_order_manage_edit_confirmPreOrder_params_interface
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
  params: Api_proxy_user_User_UserSearch_epUserSearch_params_interface
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
