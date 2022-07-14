import axios from "../../../utils/axios";
import type { paramsInterface, resultInterface } from "./interface";
export const order_list_page_api = (params: paramsInterface) => {
  return axios.get<resultInterface>("/api/order", {
    params,
  });
};
