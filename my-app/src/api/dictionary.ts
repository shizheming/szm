import axios from "../utils/axios";

// 供应商
export const supplier_api = (params: {}) =>
  axios.get("/api/stock/supplier/get-all/list", { params });

// 后台类目
export const background_Category_api = () => axios.get("/api/goods/category");
