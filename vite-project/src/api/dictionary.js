import axios from "../utils/axios";

export const supplier_api = (params) =>
  axios.get("/api/stock/supplier/get-all/list", { params });
