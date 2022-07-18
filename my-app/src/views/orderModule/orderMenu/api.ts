import axios from "../../../utils/axios";
import type {
  OrderParamsInterface,
  OrderResultInterface,
  ConfirmsignParamsInterface,
  ConfirmPreOrderParamsInterface,
  BatchParamsInterface,
  OrderSyncListParamsInterface,
  OrderSyncListResultInterface,
  userListParamsApiInterface,
} from "./interface";
// 列表
export const order_api = (params: OrderParamsInterface) => {
  return axios.get<OrderResultInterface>("/api/order", {
    params,
  });
};

// 确认签收
export const confirmsign_api = (params: ConfirmsignParamsInterface) => {
  return axios.post("/api/proxy/order/manage/edit/confirmsign", params);
};

// 预订购确认
export const confirmPreOrder_api = (params: ConfirmPreOrderParamsInterface) => {
  return axios.post("/api/proxy/order/manage/edit/confirmPreOrder", params);
};

// 批量修改卖家备注
export const batch_api = (params: BatchParamsInterface) => {
  return axios.put("/api/order/merchant-remark/batch", params);
};

// 查看任务
export const orderSyncList_api = (params: OrderSyncListParamsInterface) => {
  return axios.get<OrderSyncListResultInterface>("/api/order/orderSyncList", {
    params,
  });
};

// 查看日志
export const getFileByUrl_api = (params: any) => {
  return axios.get(`/order/getFileByUrl`, {
    params,
    responseType: "blob",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// 用户列表
export const epUserSearch_api = (params: userListParamsApiInterface) => {
  return axios.post("/api/proxy/user/User/UserSearch/epUserSearch", params);
};
