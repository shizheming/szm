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
  params: { user_id: string } & PageInterface
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
  /* return Promise.resolve({
    data: [
      {
        sku_code: 'qahFfE1pt0uNBMm',
        goods_name: '附件服务4',
        apply_server_time: 0,
        goods_list: [
          {
            oi_seq: 'OI20110462184000001055',
            sku_code: 'qahFfE1pt0uNBMm',
            goods_name: '5/7测试商品创建51',
            pic_url: '',
            sn: 1,
            snapshot: 1227,
            sku_spec: [
              {
                spec_id: 27,
                spec_name: '重量',
                spec_value: '250g',
                spec_group_id: 11,
                spec_value_id: 297,
                spec_group_name: '品味紫荆-粮油米面类',
              },
            ],
          },
        ],
      },
    ],
  }); */
  return axios.post<
    Api_proxy_order_manage_query_getServerInfo_item_interface[]
  >('/api/proxy/order/manage/query/getServerInfo', params);
};

// 配送安装选择时间列表
export const api_proxy_order_Order_assistant_queryOrderPlansByOslSeq =
  (params: { osl_seq: string }) => {
    /* return Promise.resolve({
      data: [
        {
          org_code: '',
          orderPlans: [
            {
              service_code: '服务编码',
              orderPlans: [
                {
                  planDate: '2021-02-28',
                  planTime: 1614441600,
                  planId: '2c90e5cf65b85e740165c134d6200004',
                },
              ],
            },
          ],
        },
      ],
    }); */
    return axios.post<
      Api_proxy_order_Order_assistant_queryOrderPlansByOslSeq_result_item_interface[]
    >('/api/proxy/order/Order/assistant/queryOrderPlansByOslSeq', params);
  };
