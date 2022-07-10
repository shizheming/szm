import axios from "../utils/axios";

// 供应商
export const supplier_api = (params: {}) =>
  axios.get("/api/stock/supplier/get-all/list", { params });

// 后台类目
export const background_category_api = () => axios.get("/api/goods/category");

// 商品品牌
export const goods_brand_api = () => axios.get("/api/goods/brand/list");

// 通用字典
export const dictionary_api = (params: {}) =>
  axios.get("/api/order/dict", { params });

// 销售站点
export const owner_site_api = (params: {}) =>
  axios.get("/api/sys/site", { params });
