import axios from "../../../utils/axios";
import type {
  ParamsInterface,
  ResultInterface,
  ConfirmsignInterface,
  ConfirmPreOrderInterface,
  RemarkInterface,
  TaskParamsInterface,
  TaskResultInterface,
} from "./interface";
// 列表
export const order_api = (params: ParamsInterface) => {
  return axios.get<ResultInterface>("/api/order", {
    params,
  });
};

// 确认签收
export const confirmsign_api = (params: ConfirmsignInterface) => {
  return axios.post("/api/proxy/order/manage/edit/confirmsign", params);
};

// 预订购确认
export const confirmPreOrder_api = (params: ConfirmPreOrderInterface) => {
  return axios.post("/api/proxy/order/manage/edit/confirmPreOrder", params);
};

// 批量修改卖家备注
export const merchant_remark_api = (params: RemarkInterface) => {
  return axios.put("/api/order/merchant-remark/batch", params);
};

// 查看任务
export const orderSyncList_api = (params: TaskParamsInterface) => {
  return axios.get<TaskResultInterface>("/api/order/orderSyncList", { params });
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
