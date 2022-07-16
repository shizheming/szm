import axios from "../../../utils/axios";
import type {
  paramsInterface,
  resultInterface,
  confirmsignInterface,
  confirmPreOrderInterface,
  remarkInterface,
} from "./interface";
// 列表
export const order_api = (params: paramsInterface) => {
  return axios.get<resultInterface>("/api/order", {
    params,
  });
};

// 确认签收
export const confirmsign_api = (params: confirmsignInterface) => {
  return axios.post("/api/proxy/order/manage/edit/confirmsign", params);
};

// 预订购确认
export const confirmPreOrder_api = (params: confirmPreOrderInterface) => {
  return axios.post("/api/proxy/order/manage/edit/confirmPreOrder", params);
};

// 批量修改卖家备注
export const merchant_remark_api = (params: remarkInterface) => {
  return axios.put("/api/order/merchant-remark/batch", params);
};
